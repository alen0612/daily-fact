import { NextRequest, NextResponse } from 'next/server';
import facts from '@/data/facts.json';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const lang = searchParams.get('lang') || 'zh-TW';

  const fact = facts.find((f) => f.date === date);

  if (!fact) {
    return NextResponse.json({ text: '今天沒有冷知識 😢' });
  }

  const localized = fact.translations[lang as keyof typeof fact.translations] || fact.translations['zh-TW'];

  return NextResponse.json({
    text: localized,
    source: fact.source || '',
  });
}