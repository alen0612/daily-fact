import { NextRequest, NextResponse } from 'next/server';
import facts from '@/data/facts.json';

const errorMessages: Record<string, Record<string, string>> = {
  'zh-TW': {
    'noDate': '請提供日期參數（YYYY-MM-DD）',
    'noFact': '今天沒有冷知識 😢'
  },
  'zh-CN': {
    'noDate': '请提供日期参数（YYYY-MM-DD）',
    'noFact': '今天没有冷知识 😢'
  },
  'en': {
    'noDate': 'Please provide date parameter (YYYY-MM-DD)',
    'noFact': 'No fact for today 😢'
  },
  'ja': {
    'noDate': '日付パラメータを提供してください（YYYY-MM-DD）',
    'noFact': '今日の冷知識はありません 😢'
  },
  'ko': {
    'noDate': '날짜 매개변수를 제공해주세요 (YYYY-MM-DD)',
    'noFact': '오늘의 냉지식이 없습니다 😢'
  }
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const date = searchParams.get('date');
  const lang = searchParams.get('lang') || 'zh-TW';
  const random = searchParams.get('random');

  if (random === '1') {
    // 隨機回傳一則冷知識
    const idx = Math.floor(Math.random() * facts.length);
    const fact = facts[idx];
    const localized = fact.translations[lang as keyof typeof fact.translations] || fact.translations['zh-TW'];
    return NextResponse.json({
      error: false,
      text: localized,
      source: fact.source || '',
      id: fact.id,
      date: fact.date
    });
  }

  if (!date) {
    const messages = errorMessages[lang] || errorMessages['zh-TW'];
    return NextResponse.json({ 
      error: true,
      text: messages.noDate
    });
  }

  const fact = facts.find((f) => f.date === date);

  if (!fact) {
    const messages = errorMessages[lang] || errorMessages['zh-TW'];
    return NextResponse.json({ 
      error: true,
      notFound: true,
      text: messages.noFact
    });
  }

  const localized = fact.translations[lang as keyof typeof fact.translations] || fact.translations['zh-TW'];

  return NextResponse.json({
    error: false,
    text: localized,
    source: fact.source || '',
  });
}