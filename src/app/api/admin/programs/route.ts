import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, brand, category, icon, commissionMin, commissionMax, commissionType,
      commissionNote, cookieDuration, paymentThreshold, network, tier, difficulty,
      avgOrderValue, conversionRate, gravity, description, strategy, joinUrl, color,
    } = body as Record<string, unknown>

    if (typeof name !== 'string' || !name.trim())
      return NextResponse.json({ error: 'Nama program wajib diisi' }, { status: 400 })
    if (typeof brand !== 'string' || !brand.trim())
      return NextResponse.json({ error: 'Brand wajib diisi' }, { status: 400 })

    const slugBase = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    let slug = slugBase
    let i = 1
    while (await db.affiliateProgram.findUnique({ where: { slug } })) {
      slug = `${slugBase}-${i++}`
    }

    const num = (v: unknown, d: number) => (typeof v === 'number' && !isNaN(v) ? v : d)

    const program = await db.affiliateProgram.create({
      data: {
        slug,
        name: name.trim(),
        brand: brand.trim(),
        category: typeof category === 'string' && category ? category : 'ecommerce',
        icon: typeof icon === 'string' && icon ? icon : '🔗',
        commissionMin: num(commissionMin, 5),
        commissionMax: num(commissionMax, 15),
        commissionType: typeof commissionType === 'string' ? commissionType : 'percent',
        commissionNote: typeof commissionNote === 'string' ? commissionNote : 'Komisi custom via negosiasi',
        cookieDuration: num(cookieDuration, 30),
        paymentThreshold: num(paymentThreshold, 25),
        network: typeof network === 'string' && network ? network : 'Direct',
        tier: typeof tier === 'string' && ['S+', 'S', 'A', 'B'].includes(tier) ? tier : 'A',
        difficulty: typeof difficulty === 'string' ? difficulty : 'Pemula',
        avgOrderValue: num(avgOrderValue, 40),
        conversionRate: num(conversionRate, 2.5),
        gravity: num(gravity, 70),
        featured: false,
        trendingScore: 60,
        color: typeof color === 'string' && color ? color : '#34D399',
        description: typeof description === 'string' && description ? description : `Program affiliate ${brand}.`,
        strategy: typeof strategy === 'string' && strategy ? strategy : 'Fokus pada audiens warm dan konten review mendalam.',
        joinUrl: typeof joinUrl === 'string' && joinUrl ? joinUrl : '#',
      },
    })

    await db.activityLog.create({
      data: { type: 'program_added', message: `Program baru dikurasi: ${program.name} (Tier ${program.tier})`, amount: program.commissionMax },
    })

    return NextResponse.json({ program })
  } catch (error) {
    console.error('[API admin programs POST]', error)
    return NextResponse.json({ error: 'Gagal menambah program' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID program diperlukan' }, { status: 400 })
    await db.affiliateProgram.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[API admin programs DELETE]', error)
    return NextResponse.json({ error: 'Gagal menghapus program' }, { status: 500 })
  }
}
