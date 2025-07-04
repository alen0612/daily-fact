'use client';

import { useEffect, useState } from 'react';

type Fact = {
  text: string;
  source?: string;
};

export default function Home() {
  const [fact, setFact] = useState<Fact | null>(null);

  useEffect(() => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const localDate = `${yyyy}-${mm}-${dd}`;
    const lang = navigator.language || 'zh-TW';

    fetch(`/api/fact?date=${localDate}&lang=${lang}`)
      .then((res) => res.json())
      .then(setFact)
      .catch(() => {
        setFact({ text: '無法取得今日冷知識 😢' });
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-6 px-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center">🌍 每日冷知識</h1>
      </header>

      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        {fact ? (
          <article className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <p className="text-xl leading-relaxed text-gray-800 mb-4">{fact.text}</p>
            {fact.source && (
              <p className="text-sm text-gray-500 italic">— {fact.source}</p>
            )}
          </article>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">載入中...</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-100 py-6 px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            © 2024 每日冷知識. 保留所有權利.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            讓每一天都充滿驚喜與新知
          </p>
        </div>
      </footer>
    </div>
  );
}