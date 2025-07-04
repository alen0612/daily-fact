import { NextRequest, NextResponse } from 'next/server';
import facts from '@/data/facts.json';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const lang = searchParams.get('lang') || 'zh-TW';

  const fact = facts.find((f) => f.date === date);

  if (!fact) {
    return NextResponse.json({ text: '今天沒有冷知識 😢' });
  }

  const localized = fact.translations[lang] || fact.translations['zh-TW'];

  return NextResponse.json({
    text: localized,
    source: fact.source || '',
  });
}