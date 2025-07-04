'use client';

import { useEffect } from 'react';
import { getCurrentLanguage, languageToHtmlLang } from '../utils/language';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  useEffect(() => {
    const updateHtmlLang = () => {
      const lang = getCurrentLanguage();
      const htmlLang = languageToHtmlLang[lang];
      
      // 動態設定 HTML lang 屬性
      document.documentElement.lang = htmlLang;
      
      // 同時設定 html 元素的 lang 屬性
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        htmlElement.setAttribute('lang', htmlLang);
      }
    };

    // 初始設定
    updateHtmlLang();

    // 監聽 localStorage 變更
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferred-language') {
        updateHtmlLang();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // 監聽自定義事件（當語言在當前頁面變更時）
    const handleLanguageChange = () => {
      updateHtmlLang();
    };

    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
} 