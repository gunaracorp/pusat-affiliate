import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const users = await db.affiliateUser.findMany({ orderBy: { earnings: 'desc' } })
    return NextResponse.json({ users })
  } catch (error) {
    console.error('[API leaderboard]', error)
    return NextResponse.json({ error: 'Gagal memuat leaderboard' }, { status: 500 })
  }
}
