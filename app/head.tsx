'use client';

import { useEffect, useState } from 'react';
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

  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* SEO: Open Graph */}
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={metadata.siteName} />
      <meta property="og:locale" content={languageToOgLocale[currentLanguage]} />

      {/* SEO: Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
    </>
  );
}