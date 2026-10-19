'use client'

// ============ TRACKER — FORGE LINK & PANTAU KOMISI ============
import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Banknote,
  Copy,
  ExternalLink,
  Loader2,
  MousePointerClick,
  ShoppingCart,
  Target,
  Trash2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import { api, fmtNum, fmtUSD } from '@/lib/affiliate'
import type { AffiliateProgram, TrackedLink } from '@/lib/affiliate'
import {
  AnimatedCounter,
  EmptyState,
  GlowCard,
  SectionHeader,
  SkeletonGrid,
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

// ---------- konstanta ----------
const CHANNELS: { value: string; label: string }[] = [
  { value: 'tiktok', label: 'TikTok 🎵' },
  { value: 'instagram', label: 'Instagram 📸' },
  { value: 'youtube', label: 'YouTube ▶️' },
  { value: 'whatsapp', label: 'WhatsApp 💬' },
  { value: 'telegram', label: 'Telegram ✈️' },
  { value: 'blog', label: 'Blog 📝' },
  { value: 'facebook', label: 'Facebook 👍' },
  { value: 'x', label: 'X ✖️' },
]

interface LinkForm {
  name: string
  programSlug: string
  channel: string
  targetUrl: string
}

const EMPTY_LINK_FORM: LinkForm = { name: '', programSlug: '', channel: 'tiktok', targetUrl: '' }

// ---------- kartu statistik kecil ----------
function StatCard({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <GlowCard variant="plain" className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-emerald-300" />
        <span className="text-[10px] font-mono uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground md:text-2xl">{children}</p>
    </GlowCard>
  )
}

export default function TrackerView() {
  const [links, setLinks] = useState<TrackedLink[] | null>(null)
  const [programs, setPrograms] = useState<AffiliateProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<LinkForm>(EMPTY_LINK_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [simulatingId, setSimulatingId] = useState<string | null>(null)

  // ---------- fetch paralel saat mount ----------
  useEffect(() => {
    let alive = true
    void (async () => {
      try {
        const [linkRes, progRes] = await Promise.all([api.getLinks(), api.getPrograms()])
        if (!alive) return
        setLinks(linkRes.links)
        setPrograms(progRes.programs)
      } catch (err) {
        if (!alive) return
        toast({
          title: 'Gagal memuat data tracker',
          description: err instanceof Error ? err.message : 'Coba lagi nanti.',
          variant: 'destructive',
        })
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const programMap = useMemo(() => new Map(programs.map((p) => [p.slug, p])), [programs])

  // ---------- ringkasan ----------
  const totalClicks = (links ?? []).reduce((acc, l) => acc + l.clicks, 0)
  const totalConversions = (links ?? []).reduce((acc, l) => acc + l.conversions, 0)
  const totalEarnings = (links ?? []).reduce((acc, l) => acc + l.earnings, 0)
  const avgCR = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) + '%' : '0.00%'

  // ---------- aksi ----------
  async function handleCreate() {
    if (!form.name.trim() || !form.programSlug) {
      toast({
        title: 'Lengkapi dulu',
        description: 'Nama link dan program wajib diisi.',
        variant: 'destructive',
      })
      return
    }
    setSubmitting(true)
    try {
      const res = await api.createLink({
        name: form.name.trim(),
        programSlug: form.programSlug,
        channel: form.channel,
        targetUrl: form.targetUrl.trim(),
      })
      setLinks((prev) => [res.link, ...(prev ?? [])])
      toast({ title: '⚡ Link ter-forge!', description: `"${res.link.name}" siap disebar ke kanalmu.` })
      setForm((f) => ({ ...f, name: '', targetUrl: '' }))
    } catch (err) {
      toast({
        title: 'Gagal membuat link',
        description: err instanceof Error ? err.message : 'Coba lagi nanti.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleCopy(code: string) {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/?ref=${code}`)
      toast({ title: '📋 Link tersalin! (mode demo)' })
    } catch {
      toast({ title: 'Gagal menyalin', description: 'Clipboard tidak tersedia di browser ini.', variant: 'destructive' })
    }
  }

  async function handleDelete(id: string, name: string) {
    try {
      await api.deleteLink(id)
      setLinks((prev) => (prev ?? []).filter((l) => l.id !== id))
      toast({ title: '🗑️ Link dihapus', description: `"${name}" ditarik dari grid tracking.` })
    } catch (err) {
      toast({
        title: 'Gagal menghapus link',
        description: err instanceof Error ? err.message : 'Coba lagi nanti.',
        variant: 'destructive',
      })
    }
  }

  async function handleSimulate(link: TrackedLink) {
    setSimulatingId(link.id)
    try {
      const res = await api.simulateClick(link.id)
      const batch = res.link.clicks - link.clicks
      const newConversions = res.link.conversions - link.conversions
      const newEarnings = res.link.earnings - link.earnings
      setLinks((prev) => (prev ?? []).map((l) => (l.id === res.link.id ? res.link : l)))
      toast({
        title: newConversions > 0 ? '🎉 ADA KONVERSI!' : '🚀 Traffic mengalir!',
        description: `+${batch} klik • +${newConversions} konversi • +${fmtUSD(newEarnings)}`,
      })
    } catch (err) {
      toast({
        title: 'Simulasi gagal',
        description: err instanceof Error ? err.message : 'Coba lagi nanti.',
        variant: 'destructive',
      })
    } finally {
      setSimulatingId(null)
    }
  }

  // ---------- loading ----------
  if (loading) {
    return (
      <section className="space-y-8">
        <SectionHeader
          kicker="SURVEILLANCE // LINK INTEL"
          title="Tracker Komisi 🛰️"
          subtitle="Forge link, pantau klik, konversi, dan komisi dari setiap kanal promosimu."
        />
        <SkeletonGrid count={4} />
      </section>
    )
  }

  const list = links ?? []

  return (
    <section className="space-y-8">
      <SectionHeader
        kicker="SURVEILLANCE // LINK INTEL"
        title="Tracker Komisi 🛰️"
        subtitle="Forge link, pantau klik, konversi, dan komisi dari setiap kanal promosimu."
      />

      {/* ===== SUMMARY STRIP ===== */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard icon={MousePointerClick} label="Total Klik">
          <AnimatedCounter value={totalClicks} format={(n) => fmtNum(n, true)} />
        </StatCard>
        <StatCard icon={ShoppingCart} label="Total Konversi">
          <AnimatedCounter value={totalConversions} format={(n) => fmtNum(n, true)} />
        </StatCard>
        <StatCard icon={Banknote} label="Total Komisi">
          <AnimatedCounter value={totalEarnings} format={(n) => fmtUSD(n, true)} />
        </StatCard>
        <StatCard icon={Target} label="Rata-rata CR">
          <span className="tabular">{avgCR}</span>
        </StatCard>
      </div>

      {/* ===== FORGE LINK BARU ===== */}
      <GlowCard variant="emerald" className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground sm:text-base">⚡ Forge Link Baru</h3>
          <p className="text-xs text-muted-foreground">Ciptakan jejak tracking baru untuk kanal promosimu.</p>
        </div>
        <form
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            void handleCreate()
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="link-name">Nama Link *</Label>
            <Input
              id="link-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Contoh: Review Shopee — TikTok"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Program *</Label>
            <Select value={form.programSlug} onValueChange={(v) => setForm((f) => ({ ...f, programSlug: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih program" />
              </SelectTrigger>
              <SelectContent>
                {programs.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-muted-foreground">Belum ada program tersedia.</div>
                ) : (
                  programs.map((p) => (
                    <SelectItem key={p.slug} value={p.slug}>
                      {p.icon} {p.name} — up to {p.commissionMax}%
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Channel</Label>
            <Select value={form.channel} onValueChange={(v) => setForm((f) => ({ ...f, channel: v }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih channel" />
              </SelectTrigger>
              <SelectContent>
                {CHANNELS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="link-target">Target URL (opsional)</Label>
            <Input
              id="link-target"
              value={form.targetUrl}
              onChange={(e) => setForm((f) => ({ ...f, targetUrl: e.target.value }))}
              placeholder="Kosongkan = pakai link resmi program"
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="btn-neon" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitting ? 'Menempa…' : 'Buat Link'}
            </Button>
          </div>
        </form>
      </GlowCard>

      {/* ===== DAFTAR LINK ===== */}
      {list.length === 0 ? (
        <EmptyState
          icon="🛰️"
          title="Belum ada link terlacak"
          subtitle="Forge link pertamamu dan mulai kumpulkan komisi."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {list.map((link, i) => {
            const program = programMap.get(link.programSlug)
            const cr = link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(2) + '%' : '0.00%'
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <GlowCard variant="plain" className="flex h-full flex-col gap-3">
                  {/* baris atas: nama + channel + kode + aksi */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate font-semibold text-foreground">{link.name}</p>
                        <Badge variant="secondary" className="text-[10px] uppercase">
                          {link.channel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <code className="rounded bg-emerald-400/10 px-2 py-0.5 font-mono text-xs text-emerald-300">
                          {link.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-emerald-300"
                          onClick={() => void handleCopy(link.code)}
                          aria-label="Salin link"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-rose-300 hover:bg-rose-400/10 hover:text-rose-200"
                          aria-label={`Hapus ${link.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus link ini?</AlertDialogTitle>
                          <AlertDialogDescription>
                            &quot;{link.name}&quot; beserta statistik klik & komisinya akan dihapus permanen dari grid
                            tracking.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-rose-500 text-white hover:bg-rose-600"
                            onClick={() => void handleDelete(link.id, link.name)}
                          >
                            Ya, Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* program asal */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-base">{program?.icon ?? '📦'}</span>
                    <span className="truncate">{program?.name ?? link.programSlug}</span>
                  </div>

                  {/* stats row */}
                  <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-center">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Klik</p>
                      <p className="text-sm font-semibold text-foreground tabular">{fmtNum(link.clicks)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Konversi</p>
                      <p className="text-sm font-semibold text-foreground tabular">{fmtNum(link.conversions)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Komisi</p>
                      <p className="text-sm font-bold text-emerald-300 tabular">{fmtUSD(link.earnings)}</p>
                    </div>
                  </div>

                  {/* CR + tanggal */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      CR <span className="font-semibold text-foreground tabular">{cr}</span>
                    </span>
                    <span>{formatDistanceToNow(new Date(link.createdAt), { addSuffix: true, locale: localeId })}</span>
                  </div>

                  {/* aksi */}
                  <div className={cn('mt-auto flex flex-wrap items-center gap-2 pt-1')}>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={simulatingId === link.id}
                      onClick={() => void handleSimulate(link)}
                    >
                      {simulatingId === link.id ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {simulatingId === link.id ? 'Mengalirkan…' : '🚀 Simulasi Traffic'}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={link.targetUrl || program?.joinUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Buka Target
                      </a>
                    </Button>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      )}
    </section>
  )
}
