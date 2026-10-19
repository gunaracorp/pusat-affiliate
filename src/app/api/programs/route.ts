import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams
    const search = sp.get('search')?.trim().toLowerCase() || ''
    const category = sp.get('category') || 'all'
    const tier = sp.get('tier') || 'all'
    const sort = sp.get('sort') || 'trending'
    const featured = sp.get('featured') === '1'

    let programs = await db.affiliateProgram.findMany()

    if (featured) programs = programs.filter((p) => p.featured)
    if (category !== 'all') programs = programs.filter((p) => p.category === category)
    if (tier !== 'all') programs = programs.filter((p) => p.tier === tier)
    if (search) {
      programs = programs.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.brand.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.network.toLowerCase().includes(search)
      )
    }

    switch (sort) {
      case 'commission':
        programs.sort((a, b) => b.commissionMax - a.commissionMax)
        break
      case 'conversion':
        programs.sort((a, b) => b.conversionRate - a.conversionRate)
        break
      case 'gravity':
        programs.sort((a, b) => b.gravity - a.gravity)
        break
      case 'aov':
        programs.sort((a, b) => b.avgOrderValue - a.avgOrderValue)
        break
      case 'easiest':
        programs.sort((a, b) => a.commissionMax * a.conversionRate - b.commissionMax * b.conversionRate)
        break
      default:
        programs.sort((a, b) => b.trendingScore - a.trendingScore)
    }

    return NextResponse.json({ programs })
  } catch (error) {
    console.error('[API programs]', error)
    return NextResponse.json({ error: 'Gagal memuat program affiliate' }, { status: 500 })
  }
}
