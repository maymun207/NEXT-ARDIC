import { NextResponse } from 'next/server';
import pricesData from '@/data/prices.json';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    const verifiedDate = new Date(pricesData.last_verified);
    const now = new Date();
    const daysSinceVerified = Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24));

    let freshness: 'live' | 'stale' | 'outdated';
    if (daysSinceVerified <= 2)  freshness = 'live';
    else if (daysSinceVerified <= 7) freshness = 'stale';
    else freshness = 'outdated';

    return NextResponse.json({
      ...pricesData,
      freshness,
      days_since_verified: daysSinceVerified,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load pricing data' },
      { status: 500 }
    );
  }
}
