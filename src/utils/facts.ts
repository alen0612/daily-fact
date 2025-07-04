import facts from '@/data/facts.json';

export type Fact = typeof facts[number];
export type Language = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';

export function getFactByDate(date: string, lang: Language) {
  const fact = facts.find((f) => f.date === date);
  if (!fact) return null;
  const localized = fact.translations[lang] || fact.translations['zh-TW'];
  return {
    id: fact.id,
    date: fact.date,
    text: localized,
    source: fact.source || '',
  };
}

export function getRandomFact(lang: Language) {
  if (!facts.length) return null;
  const idx = Math.floor(Math.random() * facts.length);
  const fact = facts[idx];
  const localized = fact.translations[lang] || fact.translations['zh-TW'];
  return {
    id: fact.id,
    date: fact.date,
    text: localized,
    source: fact.source || '',
  };
} 