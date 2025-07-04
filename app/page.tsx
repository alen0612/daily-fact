'use client';

import { useEffect, useState } from 'react';

type Fact = {
  text: string;
  source?: string;
};

export default function Home() {
  const [fact, setFact] = useState<Fact | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const localDate = `${yyyy}-${mm}-${dd}`;
    setCurrentDate(localDate);
    
    const lang = navigator.language || 'zh-TW';

    fetch(`/api/fact?date=${localDate}&lang=${lang}`)
      .then((res) => res.json())
      .then(setFact)
      .catch(() => {
        setFact({ text: '無法取得今日冷知識 😢' });
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
              🌍 每日冷知識
            </h1>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg">
              每天一則冷知識，讓生活更有趣
            </p>
          </div>
        </div>
      </header>

      {/* Top Ad Zone */}
      <section className="bg-yellow-100 border-b border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-yellow-200 border-2 border-dashed border-yellow-400 rounded-lg">
            <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center">
              <p className="text-sm sm:text-base lg:text-lg font-medium text-yellow-800">
                這裡是頂部廣告區塊
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid gap-6 sm:gap-8 lg:gap-10">
          
          {/* Date and Metadata Row */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm sm:text-base text-gray-600">
                  {currentDate && formatDate(currentDate)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500">
                <span>📅 今日更新</span>
                <span>🌐 多語言支援</span>
              </div>
            </div>
          </section>

          {/* Main Fact Card */}
          <section className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {fact ? (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-800 mb-6">
                    {fact.text}
                  </p>
                  
                  {/* Middle Ad Zone */}
                  <div className="bg-green-100 border-2 border-dashed border-green-400 rounded-lg my-6 sm:my-8">
                    <div className="h-12 sm:h-16 lg:h-20 flex items-center justify-center">
                      <p className="text-xs sm:text-sm lg:text-base font-medium text-green-800">
                        這裡是內容中廣告區塊
                      </p>
                    </div>
                  </div>
                  
                  {fact.source && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-sm sm:text-base text-gray-500 italic">
                        — {fact.source}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex justify-center items-center h-48 sm:h-56 lg:h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                      載入中...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* See You Tomorrow Section */}
          <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                👋 明天見！
              </h2>
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                明天還會有新的冷知識等著你，記得回來看看喔！
              </p>
            </div>
          </section>

          {/* Action Buttons */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                <span>💬</span>
                <span>留言</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base">
                <span>🔖</span>
                <span>收藏</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base">
                <span>📤</span>
                <span>分享</span>
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Bottom Ad Zone */}
      <section className="bg-purple-100 border-t border-purple-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-purple-200 border-2 border-dashed border-purple-400 rounded-lg">
            <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center">
              <p className="text-sm sm:text-base lg:text-lg font-medium text-purple-800">
                這裡是底部廣告區塊
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-300 mb-2">
              © 2024 每日冷知識. 保留所有權利.
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              讓每一天都充滿驚喜與新知
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}