/**
 * FlowPass — FCM Push Notification Serverless Function (Vercel)
 *
 * Sends Firebase Cloud Messaging push notifications to attendees
 * when zones are unlocked or announcements are broadcast.
 *
 * Uses google-auth-library with a service account key (instead of
 * GCP metadata server) to obtain OAuth2 tokens for the FCM v1 API.
 *
 * Endpoint: POST /api/notify-zone
 * Body: { eventId, zoneId, zoneName, gate?, type?, title?, body? }
 *
 * Required env vars:
 *   GOOGLE_SERVICE_ACCOUNT_KEY — JSON string of Firebase service account
 *   FIREBASE_PROJECT_ID — Firebase project ID
 *   VITE_SUPABASE_URL — Supabase REST API base URL
 *   VITE_SUPABASE_ANON_KEY — Supabase anon/public key
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { eventId, zoneId, zoneName, gate, type, title, body } = req.body;

    if (!eventId || !zoneId) {
      return res.status(400).json({ error: 'Missing eventId or zoneId.' });
    }

    const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || '';
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
    const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
    const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '';

    if (!FIREBASE_PROJECT_ID) {
      return res.status(503).json({
        error: 'Firebase Cloud Messaging is not configured.',
        hint: 'Set FIREBASE_PROJECT_ID environment variable.'
      });
    }

    if (!SERVICE_ACCOUNT_KEY) {
      return res.status(503).json({
        error: 'Service account key is not configured.',
        hint: 'Set GOOGLE_SERVICE_ACCOUNT_KEY environment variable with your Firebase service account JSON.'
      });
    }

    // Step 1: Get OAuth2 access token via service account
    let accessToken = '';
    try {
      const { GoogleAuth } = await import('google-auth-library');
      const credentials = JSON.parse(SERVICE_ACCOUNT_KEY);
      const auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
      });
      const client = await auth.getClient();
      const tokenResponse = await client.getAccessToken();
      accessToken = tokenResponse.token || '';
    } catch (authError) {
      console.error('[FCM] Auth failed:', authError.message);
      return res.status(503).json({ error: 'FCM authentication failed. Check service account key.' });
    }

    if (!accessToken) {
      return res.status(503).json({ error: 'Failed to obtain FCM access token.' });
    }

    // Step 2: Query Supabase for all FCM tokens in this zone
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return res.status(503).json({ error: 'Supabase credentials not configured on server.' });
    }

    const zoneQuery = zoneId === 'ALL' ? `event_id=eq.${eventId}` : `zone_id=eq.${zoneId}`;
    const supabaseQuery = await fetch(
      `${SUPABASE_URL}/rest/v1/passes?${zoneQuery}&fcm_token=not.is.null&select=id,fcm_token,gate_id,attendee_name`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!supabaseQuery.ok) {
      console.error('[FCM] Supabase query failed:', await supabaseQuery.text());
      return res.status(502).json({ error: 'Failed to query pass tokens from database.' });
    }

    const passes = await supabaseQuery.json();
    const tokens = passes.map(p => p.fcm_token).filter(Boolean);

    if (tokens.length === 0) {
      return res.json({ sent: 0, message: 'No push tokens registered for this zone.' });
    }

    console.log(`[FCM] Sending push to ${tokens.length} devices for ${zoneName}`);

    // Step 3: Send FCM notifications in batches (max 500 per request)
    const BATCH_SIZE = 500;
    let totalSuccess = 0;
    let totalFailure = 0;
    const staleTokenIds = [];

    const APP_URL = process.env.APP_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://flowpass.vercel.app';

    for (let i = 0; i < tokens.length; i += BATCH_SIZE) {
      const batch = tokens.slice(i, i + BATCH_SIZE);
      const batchPasses = passes.slice(i, i + BATCH_SIZE);

      const sendPromises = batch.map(async (token, idx) => {
        const pass = batchPasses[idx];
        const passGate = pass?.gate_id || gate || 'your assigned gate';
        const passUrl = `${APP_URL}/pass/${pass?.id || ''}`;

        const fcmPayload = {
          message: {
            token,
            data: {
              title: title || `🟢 EXIT NOW — ${zoneName}`,
              body: body || `Your zone is open! Head to ${passGate} now.`,
              zoneId: zoneId,
              zoneName: zoneName || 'ALL',
              gate: passGate,
              passUrl: passUrl,
              type: type || 'unlock'
            },
            webpush: {
              headers: { Urgency: 'high', TTL: type === 'announcement' ? '86400' : '600' },
              fcm_options: { link: passUrl },
            },
          },
        };

        try {
          const fcmResponse = await fetch(
            `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(fcmPayload),
            }
          );

          if (fcmResponse.ok) {
            totalSuccess++;
          } else {
            const errorBody = await fcmResponse.json().catch(() => ({}));
            const errorCode = errorBody?.error?.details?.[0]?.errorCode || errorBody?.error?.status || '';

            // Clean up stale/invalid tokens
            if (errorCode === 'UNREGISTERED' || errorCode === 'INVALID_ARGUMENT') {
              staleTokenIds.push(pass?.id);
            }
            totalFailure++;
          }
        } catch {
          totalFailure++;
        }
      });

      await Promise.all(sendPromises);
    }

    // Step 4: Clean up stale tokens from Supabase
    if (staleTokenIds.length > 0) {
      console.log(`[FCM] Cleaning ${staleTokenIds.length} stale tokens.`);
      await fetch(
        `${SUPABASE_URL}/rest/v1/passes?id=in.(${staleTokenIds.join(',')})`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ fcm_token: null }),
        }
      );
    }

    console.log(`[FCM] Results: ${totalSuccess} sent, ${totalFailure} failed, ${staleTokenIds.length} cleaned.`);
    res.json({ sent: totalSuccess, failed: totalFailure, cleaned: staleTokenIds.length });

  } catch (error) {
    console.error('[FCM] notify-zone failed:', error.message || error);
    res.status(500).json({ error: 'Push notification dispatch failed.' });
  }
}
