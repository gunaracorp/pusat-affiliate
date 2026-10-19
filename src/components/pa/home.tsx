'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Fingerprint, Gauge, Rocket, ShieldCheck, Sparkles, Star, TrendingUp, Zap } from 'lucide-react'
import { api, fmtNum, fmtUSD, type AffiliateProgram, type AffiliateUser, type PlatformStat } from '@/lib/affiliate'
import { AnimatedCounter, GlowCard, LiveDot, SectionHeader, TierBadge } from '@/components/pa/shared'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { ViewId } from '@/components/pa/main-app'

const FEATURES = [
  { icon: '🏦', title: 'Arsenal 500+ Program', desc: 'TikTok Shop, Shopee, Amazon, ClickBank, SaaS recurring — semua program komisi tertinggi dunia dikurasi dalam satu tempat.', color: 'emerald' as const },
  { icon: '🧠', title: 'AI Dewan 46 Pakar', desc: 'Generate script viral, hook, caption, dan strategi 90 hari personal dari AI yang dilatih pola affiliate sukses dunia.', color: 'violet' as const },
  { icon: '🎯', title: 'Link Tracker Cerdas', desc: 'Setiap klik terlacak, setiap konversi terukur. Simulasi traffic engine untuk menguji funnel sebelum publik.', color: 'gold' as const },
  { icon: '🎓', title: 'Akademi Legenda', desc: 'Kurikulum terstruktur dari Pemula ke Legenda dengan sistem XP — ilmu yang sama dipakai affiliate top 1%.', color: 'emerald' as const },
  { icon: '🧮', title: 'Kalkulator Komisi Kuantum', desc: 'Proyeksikan cuan 12 bulan ke depan dari views, CTR, dan komisi — tahu eksak kapan bisa resign dari kerjaan.', color: 'violet' as const },
  { icon: '🧿', title: 'Admin Mode Sakti', desc: 'Command center real-time: aliran komisi, aktivitas jaringan, kurasi program, dan AI insight — level enterprise.', color: 'gold' as const },
]

const STEPS = [
  { num: '01', title: 'SERAP ILMU', desc: 'Masuk Akademi, kuasai track TikTok / Shopee / SEO. Kumpulkan XP, naik rank dari Pemula ke Legenda.', icon: '🧬' },
  { num: '02', title: 'EKSEKUSI CEPAT', desc: 'Forge link tracker, generate konten dengan AI Studio, dan tembak program komisi tertinggi di Marketplace.', icon: '⚡' },
  { num: '03', title: 'SCALE TANPA BATAS', desc: 'Baca data tracker, double-down pada yang menang, aktifkan paid ads, dan bangun empire recurring income.', icon: '👑' },
]

export function HomeView({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  const [stats, setStats] = useState<PlatformStat[]>([])
  const [featured, setFeatured] = useState<AffiliateProgram[]>([])
  const [users, setUsers] = useState<AffiliateUser[]>([])
  const [heroOk, setHeroOk] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    Promise.all([api.getStats(), api.getPrograms({ featured: '1', sort: 'trending' }), api.getLeaderboard()])
      .then(([s, p, u]) => {
        if (cancelled) return
        setStats(s.stats)
        setFeatured(p.programs.slice(0, 6))
        setUsers(u.users.slice(0, 6))
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [])

  const totalKomisi = stats.find((s) => s.key === 'total_komisi')?.value ?? 84200000
  const totalAffiliate = stats.find((s) => s.key === 'total_affiliate')?.value ?? 148230
  const totalGmv = stats.find((s) => s.key === 'total_gmv')?.value ?? 412000000
  const totalKlik = stats.find((s) => s.key === 'total_klik')?.value ?? 21400000

  return (
    <div className="relative">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-4 pt-10 pb-16 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="orb orb-emerald animate-orb -top-32 -left-32 h-96 w-96" />
        <div className="orb orb-gold animate-orb top-10 -right-32 h-80 w-80 [animation-delay:-6s]" />
        <div className="orb orb-vio animate-orb bottom-0 left-1/3 h-72 w-72 [animation-delay:-3s]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="outline" className="gap-2 border-emerald-400/40 bg-emerald-400/5 px-3 py-1.5 font-mono text-[11px] tracking-widest text-emerald-300">
                <LiveDot label="" />
                WEB 6.0 PROTOCOL // AKTIF
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Jadilah <span className="text-gradient-neon">Affiliate Terbesar</span> Yang Pernah Ada.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              PUSATAFFILIATE adalah markas belajar & eksekusi untuk menggali komisi dari{' '}
              <span className="font-semibold text-foreground">TikTok Shop, Shopee, Amazon, ClickBank</span>, dan ratusan
              raksasa dunia — ditenagai AI dewan 46 pakar dan sistem tracking Web 6.0.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button size="lg" className="btn-neon h-12 gap-2 rounded-xl px-6 text-base font-semibold" onClick={() => onNavigate('marketplace')}>
                <Rocket className="h-5 w-5" /> Mulai Buruan Komisi
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="btn-gold h-12 gap-2 rounded-xl border-amber-400/40 bg-amber-400/5 px-6 text-base font-semibold text-amber-200 hover:bg-amber-400/10 hover:text-amber-100"
                onClick={() => onNavigate('ai')}
              >
                <Sparkles className="h-5 w-5" /> Jalankan AI Studio
              </Button>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { label: 'Komisi Dibayarkan', value: totalKomisi, fmt: (n: number) => fmtUSD(n, true) },
                { label: 'Affiliate Aktif', value: totalAffiliate, fmt: (n: number) => fmtNum(n, true) },
                { label: 'GMV Anggota', value: totalGmv, fmt: (n: number) => fmtUSD(n, true) },
                { label: 'Klik Terproses', value: totalKlik, fmt: (n: number) => fmtNum(n, true) },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl px-4 py-3">
                  <div className="text-lg font-bold text-emerald-300 sm:text-xl">
                    {loading ? <Skeleton className="h-6 w-16 bg-white/10" /> : <AnimatedCounter value={s.value} format={s.fmt} />}
                  </div>
                  <div className="mt-0.5 text-[11px] tracking-wide text-muted-foreground uppercase">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="neon-border scanline relative overflow-hidden rounded-2xl">
              {heroOk ? (
                <img
                  src="/brand/hero.png"
                  alt="Visualisasi dashboard komisi PUSATAFFILIATE"
                  className="aspect-[2/1] w-full object-cover"
                  onError={() => setHeroOk(false)}
                />
              ) : (
                <div className="flex aspect-[2/1] w-full items-center justify-center bg-gradient-to-br from-emerald-400/10 via-transparent to-amber-400/10">
                  <div className="text-center">
                    <div className="text-7xl">💸</div>
                    <p className="font-mono mt-3 text-xs tracking-[0.3em] text-emerald-300/70">KOMISI ENGINE ONLINE</p>
                  </div>
                </div>
              )}
              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium">Komisi hari ini</span>
                </div>
                <span className="tabular text-sm font-bold text-amber-300">+$142,847</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 rounded-xl border border-amber-400/40 bg-black/60 px-3 py-2 font-mono text-[11px] tracking-widest text-amber-300 backdrop-blur">
              EPC $3.94 ▲ 6.8%
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= TICKER ================= */}
      <div className="relative border-y border-white/5 bg-white/[0.02] py-3">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex items-center gap-8">
                {[
                  '🎵 TikTok Shop · up to 30%',
                  '🛍️ Shopee XTRA · up to 22%',
                  '📦 Amazon · 10%',
                  '💎 ClickBank · 75%',
                  '🪙 Binance · 40% recurring',
                  '🏨 Booking.com · 40%',
                  '🖥️ Hostinger · 100%',
                  '🖌️ Canva Pro · $36/sale',
                  '⚡ Impact · 1000 brand',
                  '📊 Semrush · $200/sale',
                ].map((t) => (
                  <span key={t} className="font-mono text-xs tracking-wider text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          kicker="SUPERPOWERS"
          title="Senjata Lengkap di Satu Markas"
          icon="⚔️"
          subtitle="Bukan sekadar kursus. Bukan sekadar directory. Ini adalah sistem operasi lengkap untuk membangun imperium affiliate."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <GlowCard variant={f.color} className="h-full">
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PROGRAMS ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            kicker="HANDPICKED"
            title="Program Komisi Paling Meledak"
            icon="🔥"
            subtitle="Dikurasi manual oleh dewan pakar: konversi tinggi, payment reliable, dan support affiliate kelas dunia."
            className="mb-4"
          />
          <Button variant="ghost" className="mb-8 gap-1 text-emerald-300 hover:text-emerald-200" onClick={() => onNavigate('marketplace')}>
            Lihat semua 20+ program <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl bg-white/5" />)
            : featured.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  onClick={() => onNavigate('marketplace')}
                  className="glass glass-hover rounded-xl p-5 text-left"
                  style={{ ['--tw-shadow-color' as string]: p.color }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <div>
                        <p className="font-display font-bold">{p.name}</p>
                        <p className="text-xs text-muted-foreground">oleh {p.brand}</p>
                      </div>
                    </div>
                    <TierBadge tier={p.tier} />
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="tabular text-2xl font-extrabold text-emerald-300">
                        up to {p.commissionType === 'fixed' ? fmtUSD(p.commissionMax) : `${p.commissionMax}%`}
                      </p>
                      <p className="text-xs text-muted-foreground">{p.commissionNote.slice(0, 52)}...</p>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-amber-300/80">GRAVITY {p.gravity}</span>
                  </div>
                </motion.button>
              ))}
        </div>
      </section>

      {/* ================= LEADERBOARD ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <SectionHeader
          kicker="HALL OF FAME"
          title="Para Legenda Sedang Cuan"
          icon="🏆"
          subtitle="Mereka memulai dari nol seperti kamu. Bedanya: mereka mulai HARI INI lebih dulu."
        />
        <GlowCard variant="plain" hover={false} className="p-2 sm:p-4">
          <div className="space-y-2">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg bg-white/5" />)
              : users.map((u, i) => (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-emerald-400/25"
                  >
                    <span className={`font-display w-8 text-center text-lg font-extrabold ${i === 0 ? 'text-amber-300' : i === 1 ? 'text-zinc-300' : i === 2 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {i + 1}
                    </span>
                    <span className="text-xl">{u.country.split(' ')[0]}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {u.name} <span className="ml-1 text-xs font-normal text-muted-foreground">· {u.specialty}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{fmtNum(u.clicks, true)} klik · {fmtNum(u.conversions, true)} konversi</p>
                    </div>
                    <Badge variant="outline" className="border-white/15 font-mono text-[10px]">{u.tier}</Badge>
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <TrendingUp className="h-3 w-3" />{u.growth}%
                    </span>
                    <span className="tabular w-28 text-right text-sm font-bold text-amber-300">{fmtUSD(u.earnings, true)}</span>
                  </motion.div>
                ))}
          </div>
        </GlowCard>
      </section>

      {/* ================= ROADMAP ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <SectionHeader kicker="OPERASI" title="Roadmap 3 Langkah Menuju $100K" icon="🗺️" />
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <GlowCard variant={i === 2 ? 'gold' : 'emerald'} className="relative h-full overflow-hidden">
                <span className="font-display absolute -top-3 right-3 text-7xl font-black text-white/[0.04]">{s.num}</span>
                <div className="text-3xl">{s.icon}</div>
                <h3 className="font-display mt-3 text-lg font-bold tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="neon-border neon-border-vio relative mt-14 overflow-hidden rounded-2xl p-8 text-center sm:p-12">
            <div className="orb orb-emerald animate-orb -top-20 left-1/4 h-64 w-64" />
            <div className="relative">
              <div className="mb-4 flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.3em] text-violet-300">
                <Zap className="h-4 w-4" /> TIME TO EXECUTE <Zap className="h-4 w-4" />
              </div>
              <h2 className="font-display mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
                Komisi Besar Tidak Datang ke Yang <span className="text-gradient-gold">Paling Pintar</span> — Tapi ke Yang{' '}
                <span className="text-gradient-neon">Paling Cepat Eksekusi</span>.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
                Ratusan juta dollar mengalir setiap hari ke affiliate di seluruh dunia. Ambil bagianmu mulai detik ini.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button size="lg" className="btn-neon gap-2 rounded-xl px-8" onClick={() => onNavigate('academy')}>
                  <Brain className="h-5 w-5" /> Masuk Akademi
                </Button>
                <Button size="lg" variant="outline" className="gap-2 rounded-xl border-emerald-400/40 px-8 text-emerald-200 hover:bg-emerald-400/10" onClick={() => onNavigate('tracker')}>
                  <Gauge className="h-5 w-5" /> Forge Link Pertama
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Tanpa biaya tersembunyi</span>
                <span className="flex items-center gap-1.5"><Fingerprint className="h-3.5 w-3.5 text-emerald-400" /> Data kamu milik kamu</span>
                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-emerald-400" /> Rating 4.9/5 dari 48.000+ siswa</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
