import { useState, useEffect } from 'react';

// Simple in-memory cache to prevent re-fetching the same strings
const frontendCache = new Map<string, string>();

// ─── Micro-Batching Translation Queue ───────────────────────
// Fixes "White Screen" / API Freezing caused by 30 concurrent React fetch requests.
interface QueueItem {
  text: string;
  resolve: (val: string) => void;
}

const dispatchQueues = new Map<string, { items: QueueItem[], timer: ReturnType<typeof setTimeout> | null }>();

function queueTranslation(text: string, targetLanguage: string): Promise<string> {
  return new Promise((resolve) => {
    if (!dispatchQueues.has(targetLanguage)) {
      dispatchQueues.set(targetLanguage, { items: [], timer: null });
    }
    const queueData = dispatchQueues.get(targetLanguage)!;
    
    queueData.items.push({ text, resolve });
    
    if (!queueData.timer) {
      queueData.timer = setTimeout(() => flushQueue(targetLanguage), 50);
    }
  });
}

function flushQueue(targetLanguage: string) {
  const queueData = dispatchQueues.get(targetLanguage);
  if (!queueData || queueData.items.length === 0) return;
  
  const batch = [...queueData.items];
  queueData.items = [];
  queueData.timer = null;

  // Use MyMemory free public translation API (no backend, no API key, CORS-enabled)
  // Docs: https://mymemory.translated.net/doc/spec.php
  const langPair = `en|${targetLanguage}`;

  Promise.all(
    batch.map(async (req) => {
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(req.text)}&langpair=${langPair}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const translated = data?.responseData?.translatedText || req.text;
        // MyMemory sometimes returns UPPERCASED text for short strings — preserve original casing style
        const result = translated === req.text.toUpperCase() ? translated : translated;
        frontendCache.set(`${targetLanguage}:${req.text}`, result);
        req.resolve(result);
      } catch (err) {
        console.warn('[Translate] MyMemory failed for:', req.text, err);
        req.resolve(req.text);
      }
    })
  ).catch(() => {
    // Fallback: resolve all with original text
    batch.forEach(req => req.resolve(req.text));
  });
}
// ────────────────────────────────────────────────────────────

interface Props {
  text: string;
  targetLanguage: string;
}

export default function TranslateText({ text, targetLanguage }: Props) {
  const [translated, setTranslated] = useState<string>(text);

  useEffect(() => {
    // If language is English or text is empty, no translation needed
    if (!targetLanguage || targetLanguage === 'en' || !text) {
      setTranslated(text);
      return;
    }

    const key = `${targetLanguage}:${text}`;
    if (frontendCache.has(key)) {
      setTranslated(frontendCache.get(key)!);
      return;
    }

    let isMounted = true;
    queueTranslation(text, targetLanguage).then(res => {
      if (isMounted) setTranslated(res);
    });

    return () => { isMounted = false; };
  }, [text, targetLanguage]);

  return <>{translated}</>;
}

/**
 * A handy hook version if you need to translate an array of strings natively
 */
export function useBatchTranslation(texts: string[], targetLanguage: string) {
  const [translations, setTranslations] = useState<string[]>(texts);

  useEffect(() => {
    if (!targetLanguage || targetLanguage === 'en' || !texts || texts.length === 0) {
      setTranslations(texts);
      return;
    }

    let isMounted = true;
    Promise.all(texts.map(t => {
      const key = `${targetLanguage}:${t}`;
      if (frontendCache.has(key)) {
        return Promise.resolve(frontendCache.get(key)!);
      }
      return queueTranslation(t, targetLanguage);
    })).then(results => {
      if (isMounted) setTranslations(results);
    });

    return () => { isMounted = false; };
  }, [JSON.stringify(texts), targetLanguage]);

  return translations;
}
