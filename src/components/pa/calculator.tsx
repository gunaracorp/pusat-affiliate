'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Calculator, Coins, Eye, MousePointerClick, Percent, ShoppingCart, TrendingUp, Users, Video } from 'lucide-react'
import { GlowCard, SectionHeader } from '@/components/pa/shared'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fmtIDR, fmtNum, fmtUSD } from '@/lib/affiliate'

const IDR_RATE = 16400

interface CalcState {
  views: number // rata-rata views per konten
  freq: number // konten per minggu
  ctr: number // % views -> klik link
  conv: number // % klik -> beli
  aov: number // USD
  comm: number // % komisi
  growth: number // % pertumbuhan traffic per bulan
}

const PRESETS: { name: string; icon: string; desc: string; state: CalcState }[] = [
  { name: 'Pemula TikTok', icon: '🌱', desc: '10K views, 5 video/minggu', state: { views: 10000, freq: 5, ctr: 1.2, conv: 2.5, aov: 18, comm: 12, growth: 15 } },
  { name: 'Kreator 100K', icon: '🔥', desc: '80K views, 10 video/minggu', state: { views: 80000, freq: 10, ctr: 1.8, conv: 3.5, aov: 22, comm: 15, growth: 20 } },
  { name: 'Sultan Shopee', icon: '👑', desc: '250K views, 14 video/minggu', state: { views: 250000, freq: 14, ctr: 2.2, conv: 4.5, aov: 16, comm: 18, growth: 25 } },
  { name: 'SEO Blogger', icon: '📈', desc: '40K pageview, 4 artikel/minggu', state: { views: 40000, freq: 4, ctr: 3.5, conv: 4, aov: 90, comm: 8, growth: 8 } },
]

function fmtMonthIDR(n: number) {
  return fmtIDR(Math.round(n * IDR_RATE), true)
}

export function CalculatorView() {
  const [s, setS] = useState<CalcState>(PRESETS[1].state)
  const set = (k: keyof CalcState) => (v: number[]) => setS((p) => ({ ...p, [k]: v[0] }))

  const model = useMemo(() => {
    const contentsPerMonth = s.freq * 4.33
    const monthlyViews = contentsPerMonth * s.views
    const monthlyClicks = monthlyViews * (s.ctr / 100)
    const monthlyConv = monthlyClicks * (s.conv / 100)
    const monthlyUSD = monthlyConv * s.aov * (s.comm / 100)

    const series: { month: string; income: number; cumulative: number }[] = []
    let cumulative = 0
    let viewsNow = monthlyViews
    for (let m = 1; m <= 12; m++) {
      const inc = viewsNow * (s.ctr / 100) * (s.conv / 100) * s.aov * (s.comm / 100)
      cumulative += inc
      series.push({ month: `B${m}`, income: Math.round(inc), cumulative: Math.round(cumulative) })
      viewsNow *= 1 + s.growth / 100
    }
    const yearly = series[series.length - 1].cumulative
    const epc = monthlyClicks > 0 ? monthlyUSD / monthlyClicks : 0
    return { contentsPerMonth, monthlyViews, monthlyClicks, monthlyConv, monthlyUSD, series, yearly, epc }
  }, [s])

  const funnel = [
    { label: 'Views / bulan', value: model.monthlyViews, icon: Eye, pct: 100, color: 'bg-violet-400' },
    { label: 'Klik link', value: model.monthlyClicks, icon: MousePointerClick, pct: Math.max(2, (model.monthlyClicks / Math.max(1, model.monthlyViews)) * 100 * 12), color: 'bg-emerald-400' },
    { label: 'Pembelian', value: model.monthlyConv, icon: ShoppingCart, pct: Math.max(2, (model.monthlyConv / Math.max(1, model.monthlyClicks)) * 100 * 12), color: 'bg-amber-400' },
  ]

  const sliders: { key: keyof CalcState; label: string; icon: React.ElementType; min: number; max: number; step: number; fmt: (v: number) => string; hint?: string }[] = [
    { key: 'views', label: 'Rata-rata Views / Konten', icon: Users, min: 500, max: 500000, step: 500, fmt: (v) => fmtNum(v) },
    { key: 'freq', label: 'Konten per Minggu', icon: Video, min: 1, max: 30, step: 1, fmt: (v) => `${v}x` },
    { key: 'ctr', label: 'CTR Views → Klik Link', icon: MousePointerClick, min: 0.2, max: 8, step: 0.1, fmt: (v) => `${v.toFixed(1)}%`, hint: 'Rata-rata industri: 1-2.5%' },
    { key: 'conv', label: 'Konversi Klik → Beli', icon: ShoppingCart, min: 0.5, max: 10, step: 0.1, fmt: (v) => `${v.toFixed(1)}%`, hint: 'TikTok/Shopee: 3-6%' },
    { key: 'aov', label: 'Harga Produk (AOV)', icon: Coins, min: 5, max: 500, step: 5, fmt: (v) => fmtUSD(v) },
    { key: 'comm', label: 'Komisi Program', icon: Percent, min: 1, max: 75, step: 1, fmt: (v) => `${v}%`, hint: 'Produk digital bisa 50-75%' },
    { key: 'growth', label: 'Pertumbuhan Traffic / Bulan', icon: TrendingUp, min: 0, max: 40, step: 1, fmt: (v) => `${v}%` },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeader
        kicker="QUANTUM ENGINE"
        title="Kalkulator Komisi Kuantum"
        icon="🧮"
        subtitle="Geser, lihat, putuskan. Simulasi matematis aliran komisi 12 bulan ke depan dengan efek compounding traffic."
      />

      {/* Presets */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calculator className="h-3.5 w-3.5" /> Preset cepat:
        </span>
        {PRESETS.map((p) => (
          <Button
            key={p.name}
            size="sm"
            variant={JSON.stringify(s) === JSON.stringify(p.state) ? 'default' : 'secondary'}
            className={`h-8 gap-1.5 rounded-lg text-xs ${JSON.stringify(s) === JSON.stringify(p.state) ? 'btn-neon' : ''}`}
            onClick={() => setS(p.state)}
          >
            <span>{p.icon}</span> {p.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr]">
        {/* ===== INPUT ===== */}
        <GlowCard variant="emerald" hover={false}>
          <h3 className="font-display mb-5 text-lg font-bold">⚙️ Parameter Funnel Kamu</h3>
          <div className="space-y-6">
            {sliders.map((sl) => (
              <div key={sl.key}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <label className="flex items-center gap-1.5 text-sm font-medium">
                    <sl.icon className="h-4 w-4 text-emerald-400" /> {sl.label}
                  </label>
                  <span className="tabular rounded-md bg-emerald-400/10 px-2 py-0.5 text-sm font-bold text-emerald-300">{sl.fmt(s[sl.key])}</span>
                </div>
                <Slider value={[s[sl.key]]} min={sl.min} max={sl.max} step={sl.step} onValueChange={set(sl.key)} className="cursor-pointer" />
                {sl.hint && <p className="mt-1 text-[11px] text-muted-foreground">💡 {sl.hint}</p>}
              </div>
            ))}
          </div>
        </GlowCard>

        {/* ===== OUTPUT ===== */}
        <div className="space-y-6">
          {/* Big numbers */}
          <div className="grid grid-cols-2 gap-4">
            <GlowCard variant="gold" hover={false}>
              <p className="text-[11px] tracking-widest text-muted-foreground uppercase">Komisi / Bulan (sekarang)</p>
              <p className="tabular mt-1 text-3xl font-extrabold text-amber-300 sm:text-4xl">{fmtUSD(model.monthlyUSD)}</p>
              <p className="mt-1 text-xs text-muted-foreground">≈ {fmtMonthIDR(model.monthlyUSD)}</p>
            </GlowCard>
            <GlowCard variant="emerald" hover={false}>
              <p className="text-[11px] tracking-widest text-muted-foreground uppercase">Total 12 Bulan (compound)</p>
              <p className="tabular mt-1 text-3xl font-extrabold text-emerald-300 sm:text-4xl">{fmtUSD(model.yearly, true)}</p>
              <p className="mt-1 text-xs text-muted-foreground">≈ {fmtIDR(Math.round(model.yearly * IDR_RATE), true)}</p>
            </GlowCard>
          </div>

          {/* Funnel */}
          <GlowCard variant="violet" hover={false}>
            <h3 className="font-display mb-4 text-base font-bold">🔻 Funnel Bulanan</h3>
            <div className="space-y-4">
              {funnel.map((f) => (
                <div key={f.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><f.icon className="h-4 w-4" /> {f.label}</span>
                    <span className="tabular font-bold">{fmtNum(f.value)}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className={`h-full rounded-full ${f.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, f.pct)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Badge variant="outline" className="border-white/15">EPC: <b className="tabular ml-1 text-emerald-300">{fmtUSD(model.epc, true)}</b></Badge>
              <Badge variant="outline" className="border-white/15">{model.contentsPerMonth.toFixed(1)} konten/bln</Badge>
              <Badge variant="outline" className="border-white/15">≈ {fmtUSD(model.monthlyUSD / Math.max(1, model.contentsPerMonth), true)} / konten</Badge>
            </div>
          </GlowCard>

          {/* Chart */}
          <GlowCard variant="plain" hover={false}>
            <h3 className="font-display mb-1 text-base font-bold">📈 Proyeksi 12 Bulan</h3>
            <p className="mb-3 text-xs text-muted-foreground">Dengan pertumbuhan traffic {s.growth}% per bulan (compound interest afiliasi).</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={model.series} margin={{ top: 5, right: 8, left: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="calcGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="calcGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(v: number) => fmtUSD(v, true)} tickLine={false} axisLine={false} width={58} />
                <Tooltip formatter={(v: number | string) => fmtUSD(Number(v))} labelFormatter={(l) => `Bulan ${String(l).slice(1)}`} />
                <Area type="monotone" dataKey="income" name="Komisi/bulan" stroke="#fbbf24" strokeWidth={2} fill="url(#calcGold)" />
                <Area type="monotone" dataKey="cumulative" name="Akumulasi" stroke="#34d399" strokeWidth={2} fill="url(#calcGreen)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlowCard>

          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            *Simulasi edukatif berbasis industri benchmark. Angka nyata bergantung pada konsistensi, kualitas konten, dan program yang dipilih — tapi sekarang kamu tahu targetnya.
          </p>
        </div>
      </div>
    </div>
  )
}
