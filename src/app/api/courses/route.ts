import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const courses = await db.course.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json({ courses })
  } catch (error) {
    console.error('[API courses]', error)
    return NextResponse.json({ error: 'Gagal memuat kursus' }, { status: 500 })
  }
}
