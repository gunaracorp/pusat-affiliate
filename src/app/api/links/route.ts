import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

function genCode() {
  let s = 'pa-'
  for (let i = 0; i < 6; i++) s += CHARS[Math.floor(Math.random() * CHARS.length)]
  return s
}

export async function GET() {
  try {
    const links = await db.trackedLink.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ links })
  } catch (error) {
    console.error('[API links GET]', error)
    return NextResponse.json({ error: 'Gagal memuat link' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, programSlug, channel, targetUrl } = body as {
      name?: string; programSlug?: string; channel?: string; targetUrl?: string
    }
    if (!name?.trim()) return NextResponse.json({ error: 'Nama link wajib diisi' }, { status: 400 })
    if (!programSlug) return NextResponse.json({ error: 'Pilih program affiliate' }, { status: 400 })
    if (!channel) return NextResponse.json({ error: 'Pilih channel promosi' }, { status: 400 })

    const program = await db.affiliateProgram.findUnique({ where: { slug: programSlug } })
    if (!program) return NextResponse.json({ error: 'Program tidak ditemukan' }, { status: 404 })

    let url = targetUrl?.trim()
    if (!url) url = program.joinUrl
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'URL target tidak valid' }, { status: 400 })
    }

    let code = genCode()
    for (let i = 0; i < 5; i++) {
      const exists = await db.trackedLink.findUnique({ where: { code } })
      if (!exists) break
      code = genCode()
    }

    const link = await db.trackedLink.create({
      data: {
        code,
        name: name.trim(),
        programSlug,
        channel,
        targetUrl: url,
      },
    })
    return NextResponse.json({ link })
  } catch (error) {
    console.error('[API links POST]', error)
    return NextResponse.json({ error: 'Gagal membuat link' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID link diperlukan' }, { status: 400 })
    await db.trackedLink.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[API links DELETE]', error)
    return NextResponse.json({ error: 'Gagal menghapus link' }, { status: 500 })
  }
}
