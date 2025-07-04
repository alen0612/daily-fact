export type Language = 'zh-TW' | 'zh-CN' | 'en' | 'ja' | 'ko';

export const translations = {
  'zh-TW': {
    // Header
    title: 'DAILY FACT',
    subtitle: '每日冷知識',
    tagline: '每天一則冷知識，讓生活更有趣',
    
    // Language options
    languages: {
      'zh-TW': '繁體中文',
      'zh-CN': '简体中文',
      'en': 'English',
      'ja': '日本語',
      'ko': '한국어'
    },
    
    // Buttons
    changeFact: '換一則冷知識',
    share: '分享',
    
    // Status messages
    loading: '載入中...',
    noFactToday: '尚無今日冷知識',
    fallbackMessage: '今天還沒有冷知識喔，明天再來看看！',
    
    // Card headers
    todayFact: '今日冷知識',
    noFactTodayHeader: '今日無冷知識',
    
    // Tomorrow section
    seeYouTomorrow: '明天見！',
    tomorrowMessage: '明天還會有新的冷知識等著你，記得回來看看喔！',
    timeUntilTomorrow: '距離明天還有',
    onTimeUpdate: '準時更新',
    
    // Share toast
    shareSuccess: '連結已複製到剪貼簿！',
    
    // Footer
    copyright: '© 2024 每日冷知識. 保留所有權利.',
    footerTagline: '讓每一天都充滿驚喜與新知',
    
    // Ad zones
    topAdZone: '這裡是頂部廣告區塊',
    middleAdZone: '這裡是內容中廣告區塊',
    bottomAdZone: '這裡是底部廣告區塊'
  },
  
  'zh-CN': {
    title: 'DAILY FACT',
    subtitle: '每日冷知识',
    tagline: '每天一则冷知识，让生活更有趣',
    
    languages: {
      'zh-TW': '繁體中文',
      'zh-CN': '简体中文',
      'en': 'English',
      'ja': '日本語',
      'ko': '한국어'
    },
    
    changeFact: '换一则冷知识',
    share: '分享',
    
    loading: '加载中...',
    noFactToday: '暂无今日冷知识',
    fallbackMessage: '今天还没有冷知识哦，明天再来看吧！',
    
    todayFact: '今日冷知识',
    noFactTodayHeader: '今日无冷知识',
    
    seeYouTomorrow: '明天见！',
    tomorrowMessage: '明天还会有新的冷知识等着你，记得回来看吧！',
    timeUntilTomorrow: '距离明天还有',
    onTimeUpdate: '准时更新',
    
    shareSuccess: '链接已复制到剪贴板！',
    
    copyright: '© 2024 每日冷知识. 保留所有权利.',
    footerTagline: '让每一天都充满惊喜与新知',
    
    topAdZone: '这里是顶部广告区块',
    middleAdZone: '这里是内容中广告区块',
    bottomAdZone: '这里是底部广告区块'
  },
  
  'en': {
    title: 'DAILY FACT',
    subtitle: 'Daily Facts',
    tagline: 'One fact a day keeps boredom away',
    
    languages: {
      'zh-TW': '繁體中文',
      'zh-CN': '简体中文',
      'en': 'English',
      'ja': '日本語',
      'ko': '한국어'
    },
    
    changeFact: 'Another Fact',
    share: 'Share',
    
    loading: 'Loading...',
    noFactToday: 'No fact for today',
    fallbackMessage: 'No fact for today yet, come back tomorrow!',
    
    todayFact: 'Today\'s Fact',
    noFactTodayHeader: 'No Fact Today',
    
    seeYouTomorrow: 'See you tomorrow!',
    tomorrowMessage: 'There will be new facts waiting for you tomorrow, remember to come back!',
    timeUntilTomorrow: 'Time until tomorrow',
    onTimeUpdate: 'On time update',
    
    shareSuccess: 'Link copied to clipboard!',
    
    copyright: '© 2024 Daily Facts. All rights reserved.',
    footerTagline: 'Make every day full of surprises and new knowledge',
    
    topAdZone: 'Top Ad Zone',
    middleAdZone: 'Middle Ad Zone',
    bottomAdZone: 'Bottom Ad Zone'
  },
  
  'ja': {
    title: 'DAILY FACT',
    subtitle: '毎日の冷知識',
    tagline: '毎日一つの冷知識で、生活をより楽しく',
    
    languages: {
      'zh-TW': '繁體中文',
      'zh-CN': '简体中文',
      'en': 'English',
      'ja': '日本語',
      'ko': '한국어'
    },
    
    changeFact: '別の冷知識',
    share: 'シェア',
    
    loading: '読み込み中...',
    noFactToday: '今日の冷知識はありません',
    fallbackMessage: '今日の冷知識はまだありません、明日また来てください！',
    
    todayFact: '今日の冷知識',
    noFactTodayHeader: '今日の冷知識なし',
    
    seeYouTomorrow: 'また明日！',
    tomorrowMessage: '明日も新しい冷知識があなたを待っています、また来てくださいね！',
    timeUntilTomorrow: '明日まで',
    onTimeUpdate: '定時更新',
    
    shareSuccess: 'リンクがクリップボードにコピーされました！',
    
    copyright: '© 2024 毎日の冷知識. 全著作権所有.',
    footerTagline: '毎日を驚きと新しい知識で満たしましょう',
    
    topAdZone: 'トップ広告エリア',
    middleAdZone: 'コンテンツ広告エリア',
    bottomAdZone: 'ボトム広告エリア'
  },
  
  'ko': {
    title: 'DAILY FACT',
    subtitle: '매일의 냉지식',
    tagline: '매일 하나의 냉지식으로 삶을 더욱 재미있게',
    
    languages: {
      'zh-TW': '繁體中文',
      'zh-CN': '简体中文',
      'en': 'English',
      'ja': '日本語',
      'ko': '한국어'
    },
    
    changeFact: '다른 냉지식',
    share: '공유',
    
    loading: '로딩 중...',
    noFactToday: '오늘의 냉지식이 없습니다',
    fallbackMessage: '오늘의 냉지식이 아직 없습니다, 내일 다시 와주세요!',
    
    todayFact: '오늘의 냉지식',
    noFactTodayHeader: '오늘 냉지식 없음',
    
    seeYouTomorrow: '내일 봐요!',
    tomorrowMessage: '내일도 새로운 냉지식이 당신을 기다리고 있습니다, 다시 와주세요!',
    timeUntilTomorrow: '내일까지',
    onTimeUpdate: '정시 업데이트',
    
    shareSuccess: '링크가 클립보드에 복사되었습니다!',
    
    copyright: '© 2024 매일의 냉지식. 모든 권리 보유.',
    footerTagline: '매일을 놀라움과 새로운 지식으로 가득 채우세요',
    
    topAdZone: '상단 광고 영역',
    middleAdZone: '콘텐츠 광고 영역',
    bottomAdZone: '하단 광고 영역'
  }
};

export function useTranslation(lang: Language) {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = translations[lang];
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    return (value as string) || key;
  };
  
  return { t };
} 