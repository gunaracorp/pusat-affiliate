'use client'

// ============ MARKETPLACE VIEW — PUSATAFFILIATE ============
// Katalog program affiliate + filter + dialog detail & strategi.

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Gem, Globe, RotateCcw, Search, Target } from 'lucide-react'
import { api, fmtUSD, CATEGORY_LABELS, type AffiliateProgram } from '@/lib/affiliate'
import { SectionHeader, GlowCard, TierBadge, SkeletonGrid, EmptyState } from '@/components/pa/shared'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

// ---------- konstanta ----------
const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'trending', label: '🔥 Terpopuler' },
  { value: 'commission', label: '💰 Komisi Tertinggi' },
  { value: 'conversion', label: '⚡ Konversi Terbaik' },
  { value: 'gravity', label: '🌊 Gravity' },
  { value: 'aov', label: '💎 Nilai Order Tertinggi' },
  { value: 'easiest', label: '🟢 Paling Mudah Dimenangkan' },
]

const TIER_OPTIONS = ['S+', 'S', 'A', 'B'] as const

const DIFFICULTY_STYLES: Record<string, string> = {
  Pemula: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
  Menengah: 'border-amber-400/50 bg-amber-400/10 text-amber-300',
  Mahir: 'border-rose-400/50 bg-rose-400/10 text-rose-300',
}

// ---------- helpers ----------
function commissionText(p: AffiliateProgram): string {
  if (p.commissionType === 'fixed') {
    return p.commissionMin === p.commissionMax
      ? fmtUSD(p.commissionMin)
      : `${fmtUSD(p.commissionMin)} - ${fmtUSD(p.commissionMax)}`
  }
  return p.commissionMin === p.commissionMax
    ? `${p.commissionMin}%`
    : `${p.commissionMin} - ${p.commissionMax}%`
}

function difficultyClass(difficulty: string): string {
  return DIFFICULTY_STYLES[difficulty] ?? 'border-zinc-400/50 bg-zinc-400/10 text-zinc-300'
}

function programMetrics(p: AffiliateProgram): { label: string; value: string }[] {
  return [
    { label: 'Komisi', value: commissionText(p) },
    { label: 'Cookie', value: `${p.cookieDuration} hari` },
    { label: 'Payment Threshold', value: fmtUSD(p.paymentThreshold) },
    { label: 'CR', value: `${p.conversionRate}%` },
    { label: 'AOV', value: fmtUSD(p.avgOrderValue) },
    { label: 'Gravity', value: `${p.gravity}` },
  ]
}

// ============ VIEW ============
export default function MarketplaceView() {
  const { toast } = useToast()
  const [programs, setPrograms] = useState<AffiliateProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [tier, setTier] = useState('all')
  const [sort, setSort] = useState('trending')
  const [reloadKey, setReloadKey] = useState(0)
  const [selected, setSelected] = useState<AffiliateProgram | null>(null)

  // Debounce 350ms untuk input pencarian
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 350)
    return () => clearTimeout(t)
  }, [searchInput])

  // Fetch program dari API (setState dipanggil async agar tidak cascading render)
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const res = await api.getPrograms({ search, category, tier, sort })
        if (cancelled) return
        setPrograms(res.programs)
        setError(null)
      } catch (err: unknown) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Gagal memuat program')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    const t = setTimeout(() => {
      setLoading(true)
      void run()
    }, 0)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [search, category, tier, sort, reloadKey])

  const copyStrategy = async () => {
    if (!selected) return
    try {
      await navigator.clipboard.writeText(selected.strategy)
      toast({
        title: '✅ Strategi tersalin',
        description: `Strategi untuk ${selected.name} siap ditempel di catatanmu.`,
      })
    } catch {
      toast({
        title: 'Gagal menyalin',
        description: 'Browser tidak mengizinkan akses clipboard.',
      })
    }
  }

  const renderProgramDialog = (p: AffiliateProgram) => (
    <>
      <DialogHeader>
        <div className="flex items-start gap-3 pr-6">
          <span className="text-4xl leading-none">{p.icon}</span>
          <div className="min-w-0 flex-1">
            <DialogTitle className="flex flex-wrap items-center gap-2 text-lg leading-tight">
              {p.name}
              <TierBadge tier={p.tier} />
            </DialogTitle>
            <DialogDescription className="mt-1 text-xs">
              {p.brand} • {p.network}
              {CATEGORY_LABELS[p.category] ? ` • ${CATEGORY_LABELS[p.category]}` : ''}
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      {/* Grid metrik */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {programMetrics(p).map((m) => (
          <div key={m.label} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{m.label}</p>
            <p className="mt-0.5 text-sm font-bold tabular text-foreground">{m.value}</p>
          </div>
        ))}
      </div>

      {p.commissionNote && <p className="text-[11px] text-muted-foreground">💡 {p.commissionNote}</p>}

      <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>

      {/* Strategi rahasia */}
      <div className="rounded border-l-2 border-emerald-400/50 bg-emerald-400/5 p-4">
        <p className="mb-1.5 text-sm font-semibold text-emerald-300">🎯 Strategi Rahasia</p>
        <p className="text-sm leading-relaxed text-foreground/85">{p.strategy}</p>
      </div>

      <DialogFooter className="gap-2">
        <Button asChild className="btn-neon w-full sm:w-auto">
          <a href={p.joinUrl} target="_blank" rel="noopener noreferrer">
            🚀 Gabung Program Sekarang
          </a>
        </Button>
        <Button variant="outline" onClick={copyStrategy}>
          📋 Salin Strategi
        </Button>
      </DialogFooter>
    </>
  )

  return (
    <div>
      <SectionHeader
        kicker="MARKETPLACE KOMISI"
        title="Arsenal Program Raksasa Dunia"
        icon="🏦"
        subtitle="Jaringan affiliate papan atas dunia — bandingkan komisi, cookie, dan gravity, lalu kunci posisimu sebelum kompetitor."
      />

      {/* Filter bar */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative sm:w-64 sm:shrink-0">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari program, brand, atau network..."
              className="pl-9"
            />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[170px]" aria-label="Filter kategori">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={tier} onValueChange={setTier}>
            <SelectTrigger className="w-full sm:w-[140px]" aria-label="Filter tier">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tier</SelectItem>
              {TIER_OPTIONS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-[250px]" aria-label="Urutkan program">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <p className="text-xs font-mono text-muted-foreground">{programs.length} program ditemukan</p>
        </div>
      </div>

      {/* Error state */}
      {!loading && error && (
        <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-rose-400/30 bg-rose-400/5 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-rose-300">⚠️ Gagal memuat program</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setReloadKey((k) => k + 1)}>
            <RotateCcw className="size-3.5" /> Coba Lagi
          </Button>
        </div>
      )}

      {/* Konten */}
      {loading ? (
        <SkeletonGrid count={6} />
      ) : !error && programs.length === 0 ? (
        <EmptyState
          icon="🔭"
          title="Tidak ada program yang cocok"
          subtitle="Coba ubah kata kunci pencarian, atau longgarkan filter kategori, tier, dan urutan untuk menemukan lebih banyak program."
        />
      ) : (
        !error && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                role="button"
                tabIndex={0}
                className="cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                onClick={() => setSelected(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(p)
                  }
                }}
              >
                <GlowCard variant="emerald" className="flex h-full flex-col gap-3">
                  {/* Baris atas: icon + nama + tier */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="text-3xl leading-none">{p.icon}</span>
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold leading-tight">{p.name}</h3>
                        <p className="truncate text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                    </div>
                    <TierBadge tier={p.tier} />
                  </div>

                  {/* Komisi besar + label tipe */}
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl font-bold tabular text-emerald-300">{commissionText(p)}</span>
                    {p.commissionType === 'recurring' && (
                      <span className="rounded border border-amber-400/50 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wider text-amber-300">
                        RECURRING
                      </span>
                    )}
                    {p.commissionType === 'fixed' && (
                      <span className="rounded border border-amber-400/50 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wider text-amber-300">
                        FLAT $
                      </span>
                    )}
                  </div>
                  {p.commissionNote && (
                    <p className="line-clamp-1 text-[11px] leading-snug text-muted-foreground">{p.commissionNote}</p>
                  )}

                  {/* Meta chips */}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Globe className="size-3.5" />
                      {p.network}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {p.cookieDuration} hari
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Target className="size-3.5" />
                      CR {p.conversionRate}%
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Gem className="size-3.5" />
                      {fmtUSD(p.avgOrderValue)}
                    </span>
                  </div>

                  {/* Gravity bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      <span>Gravity</span>
                      <span className="tabular text-emerald-300/90">{p.gravity}</span>
                    </div>
                    <Progress
                      value={Math.min(100, Math.max(0, p.gravity))}
                      className="h-1.5 [&>div]:bg-emerald-400"
                      aria-label={`Gravity ${p.name}`}
                    />
                  </div>

                  {/* Bawah: difficulty + strategi */}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold',
                        difficultyClass(p.difficulty)
                      )}
                    >
                      {p.difficulty}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-emerald-300 hover:text-emerald-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelected(p)
                      }}
                    >
                      Strategi →
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )
      )}

      {/* Dialog detail program */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          {selected ? renderProgramDialog(selected) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
