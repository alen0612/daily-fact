import { Language } from '../i18n/translations';

// 語言對應的 HTML lang 屬性映射
export const languageToHtmlLang: Record<Language, string> = {
  'zh-TW': 'zh-TW',
  'zh-CN': 'zh-CN', 
  'en': 'en',
  'ja': 'ja',
  'ko': 'ko'
};

// 語言對應的 Open Graph locale 映射
export const languageToOgLocale: Record<Language, string> = {
  'zh-TW': 'zh_TW',
  'zh-CN': 'zh_CN',
  'en': 'en_US',
  'ja': 'ja_JP',
  'ko': 'ko_KR'
};

// 檢測瀏覽器語言
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh-TW'; // 伺服器端預設為繁體中文
  }

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
  
  return defaultLang;
}

// 從 URL 參數或 localStorage 取得語言設定
export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'zh-TW';
  }

  // 優先從 URL 參數取得
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang') as Language;
  if (urlLang && ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'].includes(urlLang)) {
    return urlLang;
  }

  // 從 localStorage 取得
  const storedLang = localStorage.getItem('preferred-language') as Language;
  if (storedLang && ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'].includes(storedLang)) {
    return storedLang;
  }

  // 最後使用瀏覽器語言檢測
  return detectBrowserLanguage();
} 