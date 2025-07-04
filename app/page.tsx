'use client';

import { useEffect, useState } from 'react';

type Fact = {
  text: string;
  source?: string;
};

export default function Home() {
  const [fact, setFact] = useState<Fact | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [timeUntilMidnight, setTimeUntilMidnight] = useState<string>('');

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

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilMidnight(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
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
      <header className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white shadow-2xl relative overflow-hidden">
        {/* Pixel art background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-sm"></div>
          <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-sm"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-sm"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-sm"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-sm"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-sm"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 relative">
          <div className="text-center">
            <h1 className="group cursor-pointer inline-block transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/20">
              <span className="inline-block font-mono font-black text-2xl sm:text-3xl lg:text-4xl tracking-wider mb-2 drop-shadow-lg">
                📘 DAILY FACT ⭐️
              </span>
              <br />
              <span className="inline-block font-mono font-black text-xl sm:text-2xl lg:text-3xl tracking-wider drop-shadow-lg">
                🌍 每日冷知識 🎮
              </span>
            </h1>
            <p className="font-mono font-semibold text-blue-100 text-xs sm:text-sm lg:text-base mt-3 sm:mt-4 tracking-wide drop-shadow-md">
              🎯 每天一則冷知識，讓生活更有趣 🎯
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
          <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-400/20">
            {fact ? (
              <div className="flex flex-col">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-xl lg:text-2xl">📖</span>
                    <h2 className="font-mono font-bold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
                      Today&apos;s Fact
                    </h2>
                    <span className="text-lg sm:text-xl lg:text-2xl">✨</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="space-y-6">
                    {/* Fact Text */}
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-100">
                      <p className="font-mono text-sm sm:text-base lg:text-lg leading-relaxed text-gray-800">
                        {fact.text}
                      </p>
                    </div>
                    
                    {/* Middle Ad Zone */}
                    <div className="bg-green-100 border-2 border-dashed border-green-400 rounded-lg">
                      <div className="h-12 sm:h-16 lg:h-20 flex items-center justify-center">
                        <p className="text-xs sm:text-sm lg:text-base font-medium text-green-800">
                          這裡是內容中廣告區塊
                        </p>
                      </div>
                    </div>
                    
                    {/* Source Attribution */}
                    {fact.source && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="font-mono text-xs sm:text-sm text-gray-500 italic text-center">
                          — {fact.source}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Collectible Fact Card Placeholder */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-sm sm:text-base lg:text-lg">🎴</span>
                    <span className="font-mono font-semibold text-xs sm:text-sm lg:text-base text-gray-700">
                      Collectible Fact Card
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg">🎴</span>
                  </div>
                  <div className="mt-2 flex justify-center">
                    <div className="bg-white rounded-lg border border-gray-200 px-3 py-1">
                      <span className="font-mono text-xs sm:text-xs text-gray-500">
                        #001 • {currentDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex justify-center items-center h-48 sm:h-56 lg:h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-600">
                      載入中...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* See You Tomorrow Section */}
          <section className="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-xl border border-purple-300 p-6 sm:p-8 lg:p-10 transform transition-all duration-700 animate-fade-in-up">
            <div className="text-center text-white">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl animate-bounce">🌙</span>
                <h2 className="font-mono font-bold text-xl sm:text-2xl lg:text-3xl tracking-wide">
                  See you tomorrow!
                </h2>
                <span className="text-2xl sm:text-3xl lg:text-4xl animate-pulse">⏰</span>
              </div>
              
              <p className="text-pink-100 text-sm sm:text-base lg:text-lg mb-6 font-medium">
                明天還會有新的冷知識等著你，記得回來看看喔！
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-pink-100 mb-1">距離明天還有</p>
                    <div className="font-mono font-bold text-lg sm:text-xl lg:text-2xl text-white tracking-wider">
                      {timeUntilMidnight}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl">🎯</span>
                  <span className="text-sm sm:text-base text-pink-100 font-medium">
                    準時更新
                  </span>
                </div>
              </div>
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