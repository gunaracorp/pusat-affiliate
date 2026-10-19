import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export const maxDuration = 120
export const dynamic = 'force-dynamic'

type Mode = 'script' | 'caption' | 'hook' | 'strategy'

const SYSTEM_BASE =
  'Kamu adalah PUSATAFFILIATE AI — kombinasi 46 dewan pakar affiliate marketing dunia. ' +
  'Kamu menguasai TikTok Shop, Shopee, Amazon, ClickBank, SaaS recurring, dan semua model komisi. ' +
  'Jawab SELALU dalam Bahasa Indonesia yang punchy, praktis, dan bisa langsung dieksekusi. ' +
  'Gunakan format markdown rapi dengan heading, bullet, dan angka konkret. Jangan bertele-tele.'

function buildUserPrompt(mode: Mode, topic: string, platform: string, tone: string, program: string) {
  switch (mode) {
    case 'script':
      return `Buatkan script video affiliate ${platform} durasi 30-45 detik untuk produk/niche: "${topic}".${program ? ` Program affiliate: ${program}.` : ''}
Format output WAJIB:
## 🎯 Hook (0-3 detik)
## 📦 Masalah (3-10 detik)
## ✨ Solusi & Demo (10-25 detik)
## 💰 CTA Komisi (25-40 detik)
Plus: 3 variasi hook alternatif, rekomendasi sound/bgm, dan estimasi komisi per 10.000 views.`

    case 'caption':
      return `Buatkan caption affiliate ${platform} untuk produk/niche: "${topic}". Tone: ${tone}. ${program ? `Program: ${program}.` : ''}
Beri: 1 caption utama siap posting (dengan emoji terukur), 8-10 hashtag riset tinggi, 2 varian A/B, dan best time to post untuk audiens Indonesia.`

    case 'hook':
      return `Buatkan 10 hook viral (maks 12 kata per hook) untuk konten affiliate tentang: "${topic}" di ${platform}.
Kelompokkan menjadi: 🔥 Curiosity, 😱 Fear of Missing Out, 💸 Money Hook, 🧠 Authority. Beri skor viral 1-10 per hook dan jelaskan singkat kenapa hook terbaik bisa menang.`

    case 'strategy':
      return `Buatkan strategi affiliate 90 hari yang super personal untuk: "${topic}". ${program ? `Fokus program: ${program}.` : 'Rekomendasikan 3 program terbaik dari raksasa dunia (TikTok, Shopee, dll).'}
Format WAJIB:
## 📊 Analisis Potensi
## 🗓️ Fase 1 (Hari 1-30): Fondasi
## 🚀 Fase 2 (Hari 31-60): Optimasi
## 👑 Fase 3 (Hari 61-90): Scaling
## 💵 Proyeksi Komisi (konservatif, realistis, agresif)
## ⚡ 3 Kunci Sukses Paling Kritis
Gunakan angka konkret (views, CTR, konversi, komisi USD).`
  }
}

export async function POST(req: NextRequest) {
  try {
    const { mode, topic, platform, tone, program } = (await req.json()) as {
      mode?: Mode
      topic?: string
      platform?: string
      tone?: string
      program?: string
    }

    if (!topic?.trim()) return NextResponse.json({ error: 'Topik/niche wajib diisi' }, { status: 400 })
    const validModes: Mode[] = ['script', 'caption', 'hook', 'strategy']
    const m: Mode = mode && validModes.includes(mode) ? mode : 'script'

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: SYSTEM_BASE },
        {
          role: 'user',
          content: buildUserPrompt(m, topic.trim(), platform || 'TikTok', tone || 'Santai & relatable', program || ''),
        },
      ],
      thinking: { type: 'disabled' },
    })

    const result = completion.choices[0]?.message?.content
    if (!result?.trim()) throw new Error('Respon AI kosong')

    return NextResponse.json({ result })
  } catch (error) {
    console.error('[API ai]', error)
    const msg = error instanceof Error ? error.message : 'AI sedang sibuk, coba lagi'
    return NextResponse.json({ error: `AI Studio bermasalah: ${msg}` }, { status: 500 })
  }
}
