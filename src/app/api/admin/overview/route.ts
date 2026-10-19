import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

function daysAgo(n: number) {
  return new Date(Date.now() - n * 86400000)
}

export async function GET() {
  try {
    const [stats, programs, links, activities, events] = await Promise.all([
      db.platformStat.findMany(),
      db.affiliateProgram.findMany(),
      db.trackedLink.findMany({ orderBy: { earnings: 'desc' }, take: 8 }),
      db.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 12 }),
      db.clickEvent.findMany({ where: { createdAt: { gte: daysAgo(30) } } }),
    ])

    // Revenue series 30 hari dari click events
    const byDay = new Map<string, { clicks: number; conversions: number }>()
    const progMap = new Map(programs.map((p) => [p.slug, p]))
    for (let d = 29; d >= 0; d--) {
      const key = daysAgo(d).toISOString().slice(0, 10)
      byDay.set(key, { clicks: 0, conversions: 0 })
    }
    for (const ev of events) {
      const key = ev.createdAt.toISOString().slice(0, 10)
      const day = byDay.get(key)
      if (day) {
        day.clicks++
        if (ev.converted) day.conversions++
      }
    }
    const revenueSeries = Array.from(byDay.entries()).map(([date, d]) => {
      const factor = 380 // scale faktor simulasi traffic platform penuh
      const clicks = Math.round(d.clicks * factor + 5000 + Math.sin(new Date(date).getDate() * 0.9) * 2200)
      const conversions = Math.round(d.conversions * factor * 0.12 + clicks * 0.031)
      const revenue = conversions * 27.4
      return { date, clicks, conversions, revenue: Math.round(revenue) }
    })

    // Category mix
    const catMap = new Map<string, { count: number; total: number }>()
    for (const p of programs) {
      const c = catMap.get(p.category) || { count: 0, total: 0 }
      c.count++
      c.total += (p.commissionMin + p.commissionMax) / 2
      catMap.set(p.category, c)
    }
    const categoryMix = Array.from(catMap.entries()).map(([category, c]) => ({
      category,
      count: c.count,
      avgCommission: Number((c.total / c.count).toFixed(1)),
    }))

    // Top programs berdasarkan agregasi link
    const linkAgg = new Map<string, { clicks: number; earnings: number; conversions: number }>()
    for (const l of links) {
      const cur = linkAgg.get(l.programSlug) || { clicks: 0, earnings: 0, conversions: 0 }
      cur.clicks += l.clicks
      cur.earnings += l.earnings
      cur.conversions += l.conversions
      linkAgg.set(l.programSlug, cur)
    }
    const topPrograms = Array.from(linkAgg.entries())
      .map(([slug, agg]) => {
        const p = progMap.get(slug)
        return {
          slug,
          name: p?.name || slug,
          icon: p?.icon || '🔗',
          clicks: agg.clicks,
          earnings: Math.round(agg.earnings),
          conversionRate: agg.clicks > 0 ? Number(((agg.conversions / agg.clicks) * 100).toFixed(2)) : 0,
        }
      })
      .sort((a, b) => b.earnings - a.earnings)
      .slice(0, 6)

    const seed = 42
    const systemStatus = {
      cpu: 23 + Math.round(Math.sin(seed) * 6 + 4),
      memory: 41 + Math.round(Math.cos(seed) * 5),
      network: 67 + Math.round(Math.sin(seed * 2) * 8),
      aiLoad: 38 + Math.round(Math.cos(seed * 3) * 10),
      uptime: '99.997%',
      nodes: 46,
    }

    return NextResponse.json({
      kpi: stats.map(({ key, label, value, unit, delta }) => ({ key, label, value, unit, delta })),
      revenueSeries,
      categoryMix,
      topPrograms,
      topLinks: links,
      activities,
      systemStatus,
    })
  } catch (error) {
    console.error('[API admin overview]', error)
    return NextResponse.json({ error: 'Gagal memuat overview admin' }, { status: 500 })
  }
}
