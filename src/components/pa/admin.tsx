'use client'

// ============ ADMIN MODE SAKTI — COMMAND CENTER WEB 6.0 ============
import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Banknote,
  Copy,
  Loader2,
  PackagePlus,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  UserPlus,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatDistanceToNow } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { api, CATEGORY_LABELS, fmtNum, fmtUSD } from '@/lib/affiliate'
import type { AdminOverview, AffiliateProgram } from '@/lib/affiliate'
import {
  AnimatedCounter,
  EmptyState,
  GlowCard,
  LiveDot,
  SectionHeader,
  SkeletonGrid,
  TierBadge,
} from '@/components/pa/shared'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

// ---------- konstanta visual ----------
const PIE_COLORS = ['#34d399', '#fbbf24', '#a78bfa', '#fb7185', '#2dd4bf', '#f97316', '#eab308']

const TIER_OPTIONS = ['S+', 'S', 'A', 'B']
const DIFFICULTY_OPTIONS = ['Pemula', 'Menengah', 'Mahir']
const COMMISSION_TYPE_OPTIONS = [
  { value: 'percent', label: 'Percent (%)' },
  { value: 'recurring', label: 'Recurring' },
  { value: 'fixed', label: 'Fixed' },
]

const ACTIVITY_META: Record<string, { icon: LucideIcon; cls: string }> = {
  payout: { icon: Banknote, cls: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
  user_join: { icon: UserPlus, cls: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' },
  program_added: { icon: PackagePlus, cls: 'border-violet-400/30 bg-violet-400/10 text-violet-300' },
  ai_generated: { icon: Sparkles, cls: 'border-amber-400/30 bg-amber-400/10 text-amber-300' },
}
const ACTIVITY_FALLBACK: { icon: LucideIcon; cls: string } = {
  icon: Activity,
  cls: 'border-white/10 bg-white/5 text-zinc-300',
}

const SYS_ROWS: { key: 'cpu' | 'memory' | 'network' | 'aiLoad'; label: string; bar: string }[] = [
  { key: 'cpu', label: 'CPU LOAD', bar: '[&>div]:bg-emerald-400' },
  { key: 'memory', label: 'MEMORY', bar: '[&>div]:bg-amber-400' },
  { key: 'network', label: 'NETWORK I/O', bar: '[&>div]:bg-violet-400' },
  { key: 'aiLoad', label: 'AI LOAD', bar: '[&>div]:bg-rose-400' },
]

// ---------- state form tambah program ----------
interface ProgramForm {
  name: string
  brand: string
  icon: string
  joinUrl: string
  description: string
  strategy: string
  commissionMin: string
  commissionMax: string
  tier: string
  category: string
  difficulty: string
  commissionType: string
}

const EMPTY_PROGRAM_FORM: ProgramForm = {
  name: '',
  brand: '',
  icon: '',
  joinUrl: '',
  description: '',
  strategy: '',
  commissionMin: '',
  commissionMax: '',
  tier: 'S',
  category: 'ecommerce',
  difficulty: 'Menengah',
  commissionType: 'percent',
}

const TOOLTIP_STYLE: React.CSSProperties = {
  background: 'rgba(8, 12, 10, 0.94)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  fontSize: 12,
}

export default function AdminView() {
  const [data, setData] = useState<AdminOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [programsAdmin, setProgramsAdmin] = useState<AffiliateProgram[]>([])
  const [openAdd, setOpenAdd] = useState(false)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState<ProgramForm>(EMPTY_PROGRAM_FORM)
  const [topic, setTopic] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [insight, setInsight] = useState('')

  // ---------- data fetching ----------
  const fetchOverview = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const res = await api.adminOverview()
      setData(res)
    } catch (err) {
      toast({
        title: 'Gagal memuat overview',
        description: err instanceof Error ? err.message : 'Coba lagi nanti.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshPrograms = useCallback(async () => {
    try {
      const res = await api.getPrograms()
      setProgramsAdmin(res.programs)
    } catch {
      // biarkan tabel tetap memakai data lama
    }
  }, [])

  useEffect(() => {
    void fetchOverview()
    void refreshPrograms()
    const timer = setInterval(() => void fetchOverview(true), 30000)
    return () => clearInterval(timer)
  }, [fetchOverview, refreshPrograms])

  // ---------- aksi kurasi program ----------
  async function handleAddProgram() {
    if (!form.name.trim() || !form.brand.trim()) {
      toast({
        title: 'Validasi gagal',
        description: 'Nama program dan brand wajib diisi.',
        variant: 'destructive',
      })
      return
    }
    setAdding(true)
    try {
      await api.adminAddProgram({
        name: form.name.trim(),
        brand: form.brand.trim(),
        icon: form.icon.trim() || '🚀',
        joinUrl: form.joinUrl.trim(),
        description: form.description.trim(),
        strategy: form.strategy.trim(),
        commissionMin: Number(form.commissionMin) || 0,
        commissionMax: Number(form.commissionMax) || 0,
        tier: form.tier as AffiliateProgram['tier'],
        category: form.category,
        difficulty: form.difficulty,
        commissionType: form.commissionType as AffiliateProgram['commissionType'],
      })
      toast({ title: '✅ Program masuk arsenal!', description: `${form.name.trim()} kini terdaftar di marketplace.` })
      setOpenAdd(false)
      setForm(EMPTY_PROGRAM_FORM)
      await refreshPrograms()
    } catch (err) {
      toast({
        title: 'Gagal menambah program',
        description: err instanceof Error ? err.message : 'Coba lagi nanti.',
        variant: 'destructive',
      })
    } finally {
      setAdding(false)
    }
  }

  async function handleDeleteProgram(id: string, name: string) {
    try {
      await api.adminDeleteProgram(id)
      toast({ title: '🗑️ Program dihapus', description: `"${name}" keluar dari arsenal kurasi.` })
      await refreshPrograms()
    } catch (err) {
      toast({
        title: 'Gagal menghapus program',
        description: err instanceof Error ? err.message : 'Coba lagi nanti.',
        variant: 'destructive',
      })
    }
  }

  // ---------- AI insight ----------
  async function handleGenerate() {
    if (!topic.trim()) {
      toast({ title: 'Topik kosong', description: 'Tulis topik strategi dulu, komandan.', variant: 'destructive' })
      return
    }
    setAiLoading(true)
    try {
      const res = await api.aiGenerate({ mode: 'strategy', topic: topic.trim() })
      setInsight(res.result)
    } catch (err) {
      toast({
        title: 'Dewan sedang sibuk',
        description: err instanceof Error ? err.message : 'Coba lagi nanti.',
        variant: 'destructive',
      })
    } finally {
      setAiLoading(false)
    }
  }

  async function handleCopyInsight() {
    try {
      await navigator.clipboard.writeText(insight)
      toast({ title: '📋 Insight tersalin!', description: 'Strategi siap ditempel ke catatan kampanye.' })
    } catch {
      toast({ title: 'Gagal menyalin', description: 'Clipboard tidak tersedia.', variant: 'destructive' })
    }
  }

  // ---------- header ----------
  const header = (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <SectionHeader
        kicker="RESTRICTED ACCESS // LEVEL OMEGA"
        title="Admin Mode Sakti 🧿"
        subtitle="Command center web 6.0 — pantau KPI global, kurasi program, dan minta strategi langsung dari dewan 46 pakar AI."
        className="mb-0"
      />
      <div className="flex flex-wrap items-center gap-3">
        <LiveDot label="SYSTEM ONLINE" />
        <Button variant="outline" size="sm" onClick={() => void fetchOverview()} disabled={loading}>
          <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
          Refresh
        </Button>
        <Badge variant="outline" className="border-amber-400/30 font-mono text-[10px] tracking-widest text-amber-300">
          UPTIME {data?.systemStatus.uptime ?? '—'}
        </Badge>
      </div>
    </div>
  )

  // ---------- loading / error state ----------
  if (!data) {
    return (
      <section className="space-y-8">
        {header}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : (
          <EmptyState
            icon="📡"
            title="Command center offline"
            subtitle="Gagal memuat data overview. Klik tombol Refresh untuk mencoba lagi."
          />
        )}
      </section>
    )
  }

  const s = data.systemStatus

  return (
    <section className="space-y-8">
      {header}

      <div className="scanline relative space-y-6 overflow-hidden rounded-2xl border border-white/5 p-4 sm:p-6">
        {/* ===== 1. KPI GRID ===== */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {data.kpi.map((k, i) => (
            <motion.div
              key={k.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <GlowCard variant="plain" className="flex h-full flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {k.label}
                  </p>
                  <span className="shrink-0 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-mono uppercase text-muted-foreground">
                    {k.unit}
                  </span>
                </div>
                <p className="text-xl font-bold text-foreground md:text-2xl">
                  <AnimatedCounter
                    value={k.value}
                    format={k.unit === 'USD' ? (n) => fmtUSD(n, true) : (n) => fmtNum(n, true)}
                  />
                </p>
                <p
                  className={cn(
                    'mt-auto flex items-center gap-1 text-xs font-semibold',
                    k.delta >= 0 ? 'text-emerald-300' : 'text-rose-300'
                  )}
                >
                  {k.delta >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {k.delta}%
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* ===== 2. CHART ROW ===== */}
        <div className="grid gap-4 xl:grid-cols-3">
          <GlowCard variant="plain" className="space-y-3 xl:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Aliran Komisi 30 Hari Terakhir</h3>
              <p className="text-xs text-muted-foreground">Komisi harian (kiri) berdampingan dengan volume klik (kanan).</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data.revenueSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v: string) => String(v).slice(5)}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(v: number) => fmtUSD(v, true)}
                  tickLine={false}
                  axisLine={false}
                  width={58}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v: number) => fmtNum(v, true)}
                  tickLine={false}
                  axisLine={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value, name) => (name === 'Klik' ? fmtNum(Number(value)) : fmtUSD(Number(value)))}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Komisi"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  fill="url(#goldGrad)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="clicks"
                  name="Klik"
                  stroke="#34d399"
                  strokeWidth={2}
                  fill="url(#emeraldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </GlowCard>

          <GlowCard variant="plain" className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Distribusi Kategori Program</h3>
              <p className="text-xs text-muted-foreground">Sebaran arsenal berdasarkan kategori pasar.</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(value, name, item) =>
                    `${name}: ${Number(value)} program (avg ${Number(item?.payload?.avgCommission ?? 0).toFixed(0)}%)`
                  }
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Pie
                  data={data.categoryMix}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  stroke="rgba(0,0,0,0.3)"
                >
                  {data.categoryMix.map((entry, i) => (
                    <Cell key={entry.category} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </GlowCard>
        </div>

        {/* ===== 3. ROW TABEL ===== */}
        <div className="grid gap-4 xl:grid-cols-2">
          <GlowCard variant="plain" className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">🏆 Program Paling Menguntungkan</h3>
            {data.topPrograms.length === 0 ? (
              <EmptyState icon="📦" title="Belum ada data program" subtitle="Tabel terisi setelah traffic mengalir." />
            ) : (
              <div className="max-h-72 overflow-y-auto rounded-lg border border-white/5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead className="text-right">Klik</TableHead>
                      <TableHead className="text-right">Komisi</TableHead>
                      <TableHead className="text-right">CR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.topPrograms.map((p) => (
                      <TableRow key={p.slug}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-base">{p.icon}</span>
                            <span className="text-sm font-medium">{p.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular">{fmtNum(p.clicks)}</TableCell>
                        <TableCell className="text-right font-semibold text-emerald-300 tabular">
                          {fmtUSD(p.earnings)}
                        </TableCell>
                        <TableCell className="text-right tabular">{p.conversionRate.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </GlowCard>

          <GlowCard variant="plain" className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">🔗 Link Teratas</h3>
            {data.topLinks.length === 0 ? (
              <EmptyState icon="🛰️" title="Belum ada link terlacak" subtitle="Buat link di panel Tracker untuk mulai mengukur." />
            ) : (
              <div className="max-h-72 overflow-y-auto rounded-lg border border-white/5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead className="text-right">Klik</TableHead>
                      <TableHead className="text-right">Komisi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.topLinks.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="max-w-44 truncate text-sm font-medium">{l.name}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px] uppercase">
                            {l.channel}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular">{fmtNum(l.clicks)}</TableCell>
                        <TableCell className="text-right font-semibold text-emerald-300 tabular">
                          {fmtUSD(l.earnings)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </GlowCard>
        </div>

        {/* ===== 4. BOTTOM ROW ===== */}
        <div className="grid gap-4 xl:grid-cols-3">
          <GlowCard variant="violet" className="space-y-4 xl:col-span-1">
            <h3 className="text-sm font-semibold text-foreground">🖥️ Status Sistem Web 6.0</h3>
            <div className="space-y-3">
              {SYS_ROWS.map((row) => (
                <div key={row.key} className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-wider">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="text-foreground tabular">{Math.round(s[row.key])}%</span>
                  </div>
                  <Progress value={s[row.key]} className={cn('h-1.5', row.bar)} />
                </div>
              ))}
            </div>
            <p className="border-t border-white/5 pt-3 font-mono text-[10px] tracking-wider text-muted-foreground">
              NODES <span className="font-bold text-emerald-300">{s.nodes}</span>/46 ACTIVE • UPTIME{' '}
              <span className="font-bold text-amber-300">{s.uptime}</span>
            </p>
          </GlowCard>

          <GlowCard variant="plain" className="space-y-3 xl:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-foreground">📡 Aktivitas Real-time</h3>
              <LiveDot label="STREAMING" />
            </div>
            {data.activities.length === 0 ? (
              <EmptyState icon="🌀" title="Belum ada aktivitas" subtitle="Log jaringan akan muncul di sini." />
            ) : (
              <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {data.activities.map((a) => {
                  const meta = ACTIVITY_META[a.type] ?? ACTIVITY_FALLBACK
                  const Icon = meta.icon
                  return (
                    <div
                      key={a.id}
                      className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
                    >
                      <span
                        className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-md border', meta.cls)}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-foreground/90">{a.message}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {formatDistanceToNow(new Date(a.createdAt), { addSuffix: true, locale: localeId })}
                        </p>
                      </div>
                      {a.amount != null && (
                        <span className="shrink-0 text-sm font-semibold text-emerald-300 tabular">
                          {fmtUSD(a.amount)}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </GlowCard>
        </div>

        {/* ===== 5. PANEL MANAJEMEN PROGRAM ===== */}
        <GlowCard variant="gold" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground sm:text-base">⚙️ Manajemen Kurasi Program</h3>
              <p className="text-xs text-muted-foreground">
                {programsAdmin.length} program dalam arsenal — tambahkan yang baru atau buang yang lemah.
              </p>
            </div>
            <Button className="btn-neon" onClick={() => setOpenAdd(true)}>
              <Plus className="h-4 w-4" />
              Tambah Program
            </Button>
          </div>

          {programsAdmin.length === 0 ? (
            <EmptyState icon="🗃️" title="Arsenal kosong" subtitle="Tambahkan program pertama lewat tombol di atas." />
          ) : (
            <div className="max-h-96 overflow-y-auto rounded-lg border border-white/5">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Icon</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Komisi</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-right">Gravity</TableHead>
                    <TableHead className="w-16 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programsAdmin.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-lg">{p.icon}</TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </TableCell>
                      <TableCell>
                        <TierBadge tier={p.tier} />
                      </TableCell>
                      <TableCell className="text-right tabular">
                        {p.commissionMin}–{p.commissionMax}%
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {CATEGORY_LABELS[p.category] ?? p.category}
                      </TableCell>
                      <TableCell className="text-right tabular">{fmtNum(p.gravity)}</TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-rose-300 hover:bg-rose-400/10 hover:text-rose-200"
                              aria-label={`Hapus ${p.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus program ini?</AlertDialogTitle>
                              <AlertDialogDescription>
                                &quot;{p.name}&quot; ({p.brand}) akan dihapus permanen dari arsenal kurasi. Tindakan ini
                                tidak bisa dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-rose-500 text-white hover:bg-rose-600"
                                onClick={() => void handleDeleteProgram(p.id, p.name)}
                              >
                                Ya, Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </GlowCard>

        {/* ===== 6. AI INSIGHT BAR ===== */}
        <GlowCard variant="violet" className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground sm:text-base">
                🧠 AI Strategic Insight — Dewan 46 Pakar
              </h3>
              <p className="text-xs text-muted-foreground">Masukkan topik, dewan akan meracik strategi kampanye untukmu.</p>
            </div>
            <div className="flex w-full gap-2 lg:max-w-lg">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') void handleGenerate()
                }}
                placeholder="Contoh: strategi konten TikTok untuk program SaaS"
              />
              <Button className="btn-neon shrink-0" onClick={() => void handleGenerate()} disabled={aiLoading}>
                {aiLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {aiLoading ? 'Meracik…' : 'Generate Strategi'}
              </Button>
            </div>
          </div>

          {insight && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-mono uppercase tracking-widest text-violet-300">Hasil Dewan</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground hover:text-violet-300"
                  onClick={() => void handleCopyInsight()}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Salin Hasil
                </Button>
              </div>
              <div className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg border border-violet-400/20 bg-violet-400/[0.06] p-4 text-sm leading-relaxed">
                {insight}
              </div>
            </motion.div>
          )}
        </GlowCard>
      </div>

      {/* ===== DIALOG TAMBAH PROGRAM ===== */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Tambah Program Baru</DialogTitle>
            <DialogDescription>
              Daftarkan program afiliasi baru ke arsenal. Field bertanda * wajib diisi.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="prog-name">Nama Program *</Label>
              <Input
                id="prog-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Contoh: Shopee Affiliate"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prog-brand">Brand *</Label>
              <Input
                id="prog-brand"
                value={form.brand}
                onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                placeholder="Contoh: Shopee"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prog-icon">Icon (emoji)</Label>
              <Input
                id="prog-icon"
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                placeholder="🛒"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prog-url">Join URL</Label>
              <Input
                id="prog-url"
                value={form.joinUrl}
                onChange={(e) => setForm((f) => ({ ...f, joinUrl: e.target.value }))}
                placeholder="https://affiliate.example.com/signup"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="prog-desc">Deskripsi</Label>
              <Textarea
                id="prog-desc"
                rows={2}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Ringkasan singkat program untuk marketplace…"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="prog-strategy">Strategi</Label>
              <Textarea
                id="prog-strategy"
                rows={2}
                value={form.strategy}
                onChange={(e) => setForm((f) => ({ ...f, strategy: e.target.value }))}
                placeholder="Taktik promosi yang terbukti untuk program ini…"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prog-cmin">Komisi Min (%)</Label>
              <Input
                id="prog-cmin"
                type="number"
                min={0}
                value={form.commissionMin}
                onChange={(e) => setForm((f) => ({ ...f, commissionMin: e.target.value }))}
                placeholder="1"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prog-cmax">Komisi Max (%)</Label>
              <Input
                id="prog-cmax"
                type="number"
                min={0}
                value={form.commissionMax}
                onChange={(e) => setForm((f) => ({ ...f, commissionMax: e.target.value }))}
                placeholder="10"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tier</Label>
              <Select value={form.tier} onValueChange={(v) => setForm((f) => ({ ...f, tier: v }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih tier" />
                </SelectTrigger>
                <SelectContent>
                  {TIER_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Kategori</Label>
              <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Kesulitan</Label>
              <Select value={form.difficulty} onValueChange={(v) => setForm((f) => ({ ...f, difficulty: v }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih kesulitan" />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTY_OPTIONS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Tipe Komisi</Label>
              <Select value={form.commissionType} onValueChange={(v) => setForm((f) => ({ ...f, commissionType: v }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih tipe komisi" />
                </SelectTrigger>
                <SelectContent>
                  {COMMISSION_TYPE_OPTIONS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>
              Batal
            </Button>
            <Button className="btn-neon" onClick={() => void handleAddProgram()} disabled={adding}>
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {adding ? 'Menyimpan…' : 'Tambah ke Arsenal'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
