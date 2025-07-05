'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Language } from '../src/i18n/translations';
import { getCurrentLanguage, languageToOgLocale } from '../src/utils/language';

// 各語言的標題和描述
const siteMetadata: Record<Language, { title: string; description: string; siteName: string }> = {
  'zh-TW': {
    title: '🌍 每日冷知識 Daily Fact',
    description: '每天一則冷知識，支援多語言，讓你每天都學到一點點有趣的事！',
    siteName: '每日冷知識'
  },
  'zh-CN': {
    title: '🌍 每日冷知识 Daily Fact',
    description: '每天一则冷知识，支持多语言，让你每天都学到一点点有趣的事！',
    siteName: '每日冷知识'
  },
  'en': {
    title: '🌍 Daily Fact - Learn Something New Every Day',
    description: 'One fact a day keeps boredom away. Discover interesting facts in multiple languages!',
    siteName: 'Daily Fact'
  },
  'ja': {
    title: '🌍 毎日の冷知識 - 毎日新しいことを学ぼう',
    description: '毎日一つの冷知識で、生活をより楽しく。多言語で興味深い事実を発見しましょう！',
    siteName: '毎日の冷知識'
  },
  'ko': {
    title: '🌍 매일의 냉지식 - 매일 새로운 것을 배우자',
    description: '매일 하나의 냉지식으로 삶을 더욱 재미있게. 다국어로 흥미로운 사실을 발견하세요!',
    siteName: '매일의 냉지식'
  }
};

export default function Head() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh-TW');
  const [metadata, setMetadata] = useState(siteMetadata['zh-TW']);

  useEffect(() => {
    const lang = getCurrentLanguage();
    setCurrentLanguage(lang);
    setMetadata(siteMetadata[lang]);
  }, []);

  // 取得完整的 URL（用於 Open Graph）
  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return 'https://yourdomain.com'; // 預設值，部署時需要更新
  };

  // 取得完整的圖片 URL
  const getImageUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/og-image.png`;
    }
    return 'https://yourdomain.com/og-image.png'; // 預設值，部署時需要更新
  };

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Google AdSense 驗證程式碼 */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1281401893626384"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      {/* Favicon 設定 */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* 應用程式設定 */}
      <meta name="application-name" content={metadata.siteName} />
      <meta name="theme-color" content="#fdf6e3" />
      <meta name="msapplication-TileColor" content="#fdf6e3" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* 基本 SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Alen" />
      <meta name="keywords" content="冷知識,每日知識,fun facts,日常知識,知識小品,daily fact" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={getFullUrl()} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={getFullUrl()} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={getImageUrl()} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={metadata.title} />
      <meta property="og:site_name" content={metadata.siteName} />
      <meta property="og:locale" content={languageToOgLocale[currentLanguage]} />
      
      {/* Open Graph 多語言替代版本 */}
      <meta property="og:locale:alternate" content="zh_TW" />
      <meta property="og:locale:alternate" content="zh_CN" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="ja_JP" />
      <meta property="og:locale:alternate" content="ko_KR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yourtwitterhandle" />
      <meta name="twitter:creator" content="@yourtwitterhandle" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={getImageUrl()} />
      <meta name="twitter:image:alt" content={metadata.title} />

      {/* LINE 分享優化 */}
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:secure_url" content={getImageUrl()} />

      {/* Apple 行動裝置優化 */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={metadata.siteName} />
      
      {/* 預載入圖片以改善分享效能 */}
      <link rel="preload" as="image" href="/og-image.png" />
    </>
  );
}