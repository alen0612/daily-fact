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
      <header className="bg-blue-600 text-white py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 shadow-lg">
        <div className="max-w-screen-md mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">🌍 每日冷知識</h1>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-screen-md mx-auto w-full">
        {fact ? (
          <article className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 border border-gray-200">
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-800 mb-3 sm:mb-4 lg:mb-6">{fact.text}</p>
            {fact.source && (
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 italic">— {fact.source}</p>
            )}
          </article>
        ) : (
          <div className="flex justify-center items-center h-48 sm:h-56 lg:h-64">
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">載入中...</p>
          </div>
        )}
      </main>

      <footer className="bg-gray-100 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8 border-t border-gray-200">
        <div className="max-w-screen-md mx-auto text-center">
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">
            © 2024 每日冷知識. 保留所有權利.
          </p>
          <p className="text-xs sm:text-xs lg:text-sm text-gray-500 mt-1 sm:mt-2 lg:mt-3">
            讓每一天都充滿驚喜與新知
          </p>
        </div>
      </footer>
    </div>
  );
}