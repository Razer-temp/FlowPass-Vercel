/**
 * FlowPass — Translation Serverless Function (Vercel)
 *
 * Batch-translates text strings using google-translate-api-x.
 * This is a free, unofficial translation engine (not a GCP API).
 * Includes a per-instance in-memory cache for deduplication.
 *
 * Endpoint: POST /api/translate
 * Body: { texts: string | string[], targetLanguage: string }
 */

import translate from 'google-translate-api-x';

// Simple in-memory cache (per cold-start instance)
const translationCache = new Map();

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { texts, targetLanguage } = req.body;

    if (!texts || !targetLanguage) {
      return res.status(400).json({ error: 'Missing texts or targetLanguage in request body.' });
    }

    const textArray = Array.isArray(texts) ? texts : [texts];
    const results = [];
    const textsToTranslate = [];
    const indicesToTranslate = [];

    // Check cache first
    textArray.forEach((text, i) => {
      const cacheKey = `${targetLanguage}:${text}`;
      if (translationCache.has(cacheKey)) {
        results[i] = translationCache.get(cacheKey);
      } else {
        textsToTranslate.push(text);
        indicesToTranslate.push(i);
      }
    });

    // Translate what's missing from cache
    if (textsToTranslate.length > 0) {
      const translateResponse = await translate(textsToTranslate, { to: targetLanguage });
      const translatedArray = Array.isArray(translateResponse) ? translateResponse : [translateResponse];

      translatedArray.forEach((translatedItem, i) => {
        const translatedText = translatedItem.text;
        const originalText = textsToTranslate[i];
        const cacheKey = `${targetLanguage}:${originalText}`;

        translationCache.set(cacheKey, translatedText);

        const originalIndex = indicesToTranslate[i];
        results[originalIndex] = translatedText;
      });
    }

    res.json({ translations: results, source: 'google-translate-api-x' });

  } catch (error) {
    console.error('[Translate] Engine failed:', error.message || error);
    // Graceful degradation: return original text so the UI never breaks
    const textArray = Array.isArray(req.body?.texts) ? req.body.texts : [req.body?.texts].filter(Boolean);
    res.json({ translations: textArray, error: 'Free engine temporarily unavailable: Falling back to original text.' });
  }
}
