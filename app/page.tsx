'use client';

import { useEffect, useState } from 'react';

type Fact = {
  text: string;
  source?: string;
};

export default function Home() {
  const [fact, setFact] = useState<Fact | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lang = navigator.language || 'zh-TW';
    fetch(`/api/fact?date=${today}&timezone=${timezone}&lang=${lang}`)
      .then((res) => res.json())
      .then(setFact);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">🌍 每日冷知識</h1>
      {fact ? (
        <article>
          <p className="text-lg">{fact.text}</p>
          {fact.source && <p className="mt-2 text-sm text-gray-500">— {fact.source}</p>}
        </article>
      ) : (
        <p>載入中...</p>
      )}
    </main>
  );
}