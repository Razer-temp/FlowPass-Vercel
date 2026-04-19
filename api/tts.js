/**
 * FlowPass — Text-to-Speech Serverless Function (Vercel)
 *
 * Proxies text to Google Cloud Text-to-Speech API on environments
 * that have a service account configured. On Vercel without GCP
 * credentials, returns 503 — the client automatically falls back
 * to the browser's Web Speech API.
 *
 * Endpoint: POST /api/tts
 * Body: { text: string, language?: string }
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { text, language = 'en-US' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing "text" in request body.' });
    }

    // On Vercel, we don't have GCP metadata server.
    // Check if a service account is configured for TTS.
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      return res.status(503).json({
        error: 'Google Cloud TTS is not available in this deployment.',
        hint: 'The browser will fall back to Web Speech API automatically.'
      });
    }

    // If a service account is available, use google-auth-library to get a token
    let accessToken = '';
    try {
      const { GoogleAuth } = await import('google-auth-library');
      const credentials = JSON.parse(serviceAccountKey);
      const auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });
      const client = await auth.getClient();
      const tokenResponse = await client.getAccessToken();
      accessToken = tokenResponse.token || '';
    } catch (authError) {
      console.error('[TTS] Auth failed:', authError.message);
      return res.status(503).json({
        error: 'TTS authentication failed.',
        hint: 'The browser will fall back to Web Speech API automatically.'
      });
    }

    // Truncate to 5000 chars (API limit per request)
    const truncatedText = text.slice(0, 5000);

    // Call Google Cloud Text-to-Speech API
    const ttsResponse = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text: truncatedText },
        voice: {
          languageCode: language,
          name: `${language}-Standard-C`,
          ssmlGender: 'FEMALE',
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.95,
          pitch: 0,
        },
      }),
    });

    if (!ttsResponse.ok) {
      const errorBody = await ttsResponse.text();
      console.error('[TTS] API error:', errorBody);
      return res.status(502).json({ error: 'Google Cloud TTS API returned an error.' });
    }

    const ttsData = await ttsResponse.json();
    res.json({ audioContent: ttsData.audioContent });

  } catch (error) {
    console.error('[TTS] Endpoint failed:', error.message || error);
    res.status(500).json({ error: 'TTS processing failed.' });
  }
}
