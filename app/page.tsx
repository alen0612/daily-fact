'use client';

import { useEffect, useState } from 'react';
import { getFactByDate, getRandomFact, Language } from '../src/utils/facts';

type Fact = {
  text: string;
  source?: string;
  error?: boolean;
  notFound?: boolean;
  id?: string;
  date?: string;
};

const fallbackMessages: Record<Language, string> = {
  'zh-TW': '今天還沒有冷知識喔，明天再來看看！',
  'zh-CN': '今天还没有冷知识哦，明天再来看吧！',
  'en': 'No fact for today yet, come back tomorrow!',
  'ja': '今日の冷知識はまだありません、明日また来てください！',
  'ko': '오늘의 냉지식이 아직 없습니다, 내일 다시 와주세요!'
};

const changeFactButtonText: Record<Language, string> = {
  'zh-TW': '換一則冷知識',
  'zh-CN': '换一则冷知识',
  'en': 'Another Fact',
  'ja': '別の冷知識',
  'ko': '다른 냉지식'
};

export default function Home() {
  const [fact, setFact] = useState<Fact | null>(null);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [timeUntilMidnight, setTimeUntilMidnight] = useState<string>('');
  const [showShareToast, setShowShareToast] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh-TW');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRandom, setIsRandom] = useState<boolean>(false);

  const fetchFact = async (date: string, lang: Language, random = false) => {
    setIsLoading(true);
    try {
      let factData: Fact | null = null;
      if (random) {
        factData = getRandomFact(lang);
      } else {
        factData = getFactByDate(date, lang);
      }
      if (!factData) {
        setFact({ text: fallbackMessages[lang], error: true, notFound: true });
      } else {
        setFact(factData);
      }
    } catch {
      setFact({ text: fallbackMessages[lang], error: true });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const localDate = `${yyyy}-${mm}-${dd}`;
    setCurrentDate(localDate);
    
    // 檢測瀏覽器語言，預設為繁體中文
    const browserLang = navigator.language;
    let defaultLang: Language = 'zh-TW';
    
    if (browserLang.startsWith('zh')) {
      defaultLang = browserLang.includes('CN') ? 'zh-CN' : 'zh-TW';
    } else if (browserLang.startsWith('en')) {
      defaultLang = 'en';
    } else if (browserLang.startsWith('ja')) {
      defaultLang = 'ja';
    } else if (browserLang.startsWith('ko')) {
      defaultLang = 'ko';
    }
    
    setCurrentLanguage(defaultLang);
    setIsRandom(false);
    fetchFact(localDate, defaultLang, false);
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

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLanguage(newLang);
    if (currentDate) {
      if (isRandom) {
        fetchFact(currentDate, newLang, true);
      } else {
        fetchFact(currentDate, newLang, false);
      }
    }
  };

  const handleChangeFact = () => {
    setIsRandom(true);
    fetchFact(currentDate, currentLanguage, true);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white shadow-2xl relative overflow-hidden animate-fade-in-down">
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
            <h1 className="inline-block">
              <span className="inline-block font-mono font-black text-2xl sm:text-3xl lg:text-4xl tracking-wider mb-2 drop-shadow-lg">
                <span className="inline-block animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>📘</span>
                <span className="mx-2">DAILY FACT</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }}>⭐️</span>
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
      <section className="bg-yellow-100 border-b border-yellow-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
          <section className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-lg border-2 border-white/20 p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <span className="text-lg sm:text-xl">📅</span>
                </div>
                <div className="text-white">
                  <div className="font-mono font-bold text-sm sm:text-base">
                    {currentDate && formatDate(currentDate)}
                  </div>
                </div>
              </div>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-xs sm:text-sm font-medium">🌐</span>
                <select 
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <option value="zh-TW" className="text-gray-800">繁體中文</option>
                  <option value="zh-CN" className="text-gray-800">简体中文</option>
                  <option value="en" className="text-gray-800">English</option>
                  <option value="ja" className="text-gray-800">日本語</option>
                  <option value="ko" className="text-gray-800">한국어</option>
                </select>
              </div>
            </div>
          </section>

          {/* Change Fact Button */}
          <section className="flex justify-center">
            <button
              onClick={handleChangeFact}
              className="group flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg hover:from-pink-600 hover:to-orange-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base font-medium animate-fade-in-up mb-2"
              style={{ animationDelay: '0.2s' }}
            >
              <span className="text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110">🔄</span>
              <span>{changeFactButtonText[currentLanguage]}</span>
            </button>
          </section>

          {/* Main Fact Card */}
          <section className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-400/20 animate-scale-in">
            {isLoading ? (
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
            ) : fact ? (
              <div className="flex flex-col">
                {/* Card Header */}
                <div className={`px-4 sm:px-6 lg:px-8 py-3 sm:py-4 ${
                  fact.error && fact.notFound 
                    ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                } text-white`}>
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-xl lg:text-2xl">
                      {fact.error && fact.notFound ? '📭' : '📖'}
                    </span>
                    <h2 className="font-mono font-bold text-sm sm:text-base lg:text-lg tracking-wide uppercase">
                      {fact.error && fact.notFound ? 'No Fact Today' : 'Today\'s Fact'}
                    </h2>
                    <span className="text-lg sm:text-xl lg:text-2xl">
                      {fact.error && fact.notFound ? '😊' : '✨'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="space-y-6">
                    {/* Fact Text or Fallback Message */}
                    <div className={`rounded-lg p-4 sm:p-6 border ${
                      fact.error && fact.notFound 
                        ? 'bg-orange-50 border-orange-200' 
                        : 'bg-gray-50 border-gray-100'
                    }`}>
                      <p className={`font-mono text-sm sm:text-base lg:text-lg leading-relaxed ${
                        fact.error && fact.notFound ? 'text-orange-800' : 'text-gray-800'
                      }`}>
                        {fact.text}
                      </p>
                    </div>
                    
                    {/* Middle Ad Zone - 只在有冷知識時顯示 */}
                    {!fact.error && (
                      <div className="bg-green-100 border-2 border-dashed border-green-400 rounded-lg">
                        <div className="h-12 sm:h-16 lg:h-20 flex items-center justify-center">
                          <p className="text-xs sm:text-sm lg:text-base font-medium text-green-800">
                            這裡是內容中廣告區塊
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Source Attribution - 只在有冷知識時顯示 */}
                    {fact.source && !fact.error && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="font-mono text-xs sm:text-sm text-gray-500 italic text-center">
                          — {fact.source}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex justify-center items-center h-48 sm:h-56 lg:h-64">
                  <div className="text-center">
                    <span className="text-4xl mb-4 block">😢</span>
                    <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-600">
                      {fallbackMessages[currentLanguage]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* See You Tomorrow Section */}
          <section className="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-xl border border-purple-300 p-6 sm:p-8 lg:p-10 transform transition-all duration-700 animate-fade-in-bottom">
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
            <div className="flex justify-center">
              {/* Share Button */}
              <button 
                onClick={handleShare}
                className="group flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 text-sm sm:text-base font-medium animate-fade-in-up" 
                style={{ animationDelay: '0.4s' }}
              >
                <span className="text-lg sm:text-xl transition-transform duration-300 group-hover:scale-110">📤</span>
                <span>Share</span>
              </button>
            </div>
          </section>

          {/* Share Toast */}
          {showShareToast && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span className="text-sm font-medium">連結已複製到剪貼簿！</span>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Bottom Ad Zone */}
      <section className="bg-purple-100 border-t border-purple-200 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
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