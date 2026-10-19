import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const stats = await db.platformStat.findMany()
    return NextResponse.json({ stats })
  } catch (error) {
    console.error('[API stats]', error)
    return NextResponse.json({ error: 'Gagal memuat statistik' }, { status: 500 })
  }
}
