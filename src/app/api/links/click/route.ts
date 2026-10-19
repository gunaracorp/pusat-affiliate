import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Simulasi engine traffic + tracking konversi nyata.
// Setiap POST = 1 batch pengunjung yang masuk ke funnel:
// klik -> (probabilistik berdasarkan conversion rate program) -> konversi -> komisi
export async function POST(req: NextRequest) {
  try {
    const { id, visitors } = (await req.json()) as { id?: string; visitors?: number }
    if (!id) return NextResponse.json({ error: 'ID link diperlukan' }, { status: 400 })

    const link = await db.trackedLink.findUnique({ where: { id } })
    if (!link) return NextResponse.json({ error: 'Link tidak ditemukan' }, { status: 404 })

    const program = await db.affiliateProgram.findUnique({ where: { slug: link.programSlug } })

    const batch = Math.min(Math.max(1, Math.floor(visitors || 25)), 100)
    const convRate = (program?.conversionRate ?? 3) / 100
    const avgOrder = program?.avgOrderValue ?? 20
    const commissionMid = program ? (program.commissionMin + program.commissionMax) / 2 / 100 : 0.08

    let newConversions = 0
    const events: { converted: boolean; source: string; device: string }[] = []
    for (let i = 0; i < batch; i++) {
      const converted = Math.random() < convRate
      if (converted) newConversions++
      events.push({
        converted,
        source: link.channel,
        device: Math.random() < 0.75 ? 'mobile' : 'desktop',
      })
    }
    const newEarnings = newConversions * avgOrder * commissionMid

    const updated = await db.trackedLink.update({
      where: { id },
      data: {
        clicks: { increment: batch },
        conversions: { increment: newConversions },
        earnings: { increment: newEarnings },
      },
    })
    await db.clickEvent.createMany({ data: events.map((e) => ({ ...e, linkId: id })) })

    return NextResponse.json({
      link: updated,
      converted: newConversions > 0,
      batch,
      newConversions,
      newEarnings,
    })
  } catch (error) {
    console.error('[API links click]', error)
    return NextResponse.json({ error: 'Gagal memproses klik' }, { status: 500 })
  }
}
