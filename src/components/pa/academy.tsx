'use client'

// ============ AKADEMI VIEW — PUSATAFFILIATE ============
// Kursus affiliate + progres belajar (localStorage) + XP & rank.

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, RotateCcw, Star, Users } from 'lucide-react'
import { api, fmtNum, type Course, type CourseModule } from '@/lib/affiliate'
import { AnimatedCounter, EmptyState, GlowCard, SectionHeader, SkeletonGrid } from '@/components/pa/shared'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

// ---------- konstanta ----------
const PROGRESS_KEY = 'pa-course-progress'

type CourseProgress = Record<string, number[]>

const TRACK_EMOJI: Record<string, string> = {
  Universal: '🌱',
  TikTok: '🎵',
  Shopee: '🛍️',
  Konten: '🔥',
  SEO: '📈',
  Scaling: '⚡',
  Empire: '👑',
}

const LEVEL_STYLES: Record<string, string> = {
  Pemula: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300',
  Menengah: 'border-amber-400/50 bg-amber-400/10 text-amber-300',
  Mahir: 'border-rose-400/50 bg-rose-400/10 text-rose-300',
  Legenda: 'border-amber-300/60 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-900',
}

// ---------- helpers ----------
function trackEmoji(track: string): string {
  return TRACK_EMOJI[track] ?? '📚'
}

function levelClass(level: string): string {
  return LEVEL_STYLES[level] ?? 'border-zinc-400/50 bg-zinc-400/10 text-zinc-300'
}

function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m}m`
  return m > 0 ? `${h}j ${m}m` : `${h}j`
}

function parseModules(raw: string): CourseModule[] {
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => {
      const obj = (item ?? {}) as Partial<CourseModule>
      return {
        title: typeof obj.title === 'string' ? obj.title : 'Modul',
        minutes: typeof obj.minutes === 'number' ? obj.minutes : 0,
        summary: typeof obj.summary === 'string' ? obj.summary : '',
        keyPoints: Array.isArray(obj.keyPoints)
          ? obj.keyPoints.filter((k): k is string => typeof k === 'string')
          : [],
      }
    })
  } catch {
    return []
  }
}

function getRank(pct: number): { label: string; className: string } {
  if (pct >= 85)
    return {
      label: '👑 LEGENDA',
      className:
        'border-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-zinc-900 shadow-[0_0_16px_-2px] shadow-amber-400/60',
    }
  if (pct >= 60) return { label: 'ELITE', className: 'border-rose-400/50 bg-rose-400/10 text-rose-300' }
  if (pct >= 35) return { label: 'PRO', className: 'border-amber-400/50 bg-amber-400/10 text-amber-300' }
  if (pct >= 10) return { label: 'OPERATOR', className: 'border-violet-400/50 bg-violet-400/10 text-violet-300' }
  return { label: 'PEMULA', className: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300' }
}

function LevelBadge({ level }: { level: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wider',
        levelClass(level)
      )}
    >
      {level}
    </span>
  )
}

// ============ VIEW ============
export default function AcademyView() {
  const { toast } = useToast()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [progress, setProgress] = useState<CourseProgress>({})
  const [trackFilter, setTrackFilter] = useState('all')
  const [selected, setSelected] = useState<Course | null>(null)

  // Fetch kursus (setState async agar tidak cascading render)
  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const res = await api.getCourses()
        if (cancelled) return
        setCourses(res.courses)
        setError(null)
      } catch (err: unknown) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Gagal memuat kursus')
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
  }, [reloadKey])

  // Load progres dari localStorage saat mount
  useEffect(() => {
    const load = () => {
      try {
        const raw = window.localStorage.getItem(PROGRESS_KEY)
        if (!raw) return
        const parsed: unknown = JSON.parse(raw)
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return
        const out: CourseProgress = {}
        for (const [slug, val] of Object.entries(parsed as Record<string, unknown>)) {
          if (Array.isArray(val)) out[slug] = val.filter((n): n is number => typeof n === 'number')
        }
        setProgress(out)
      } catch {
        // data korup — abaikan
      }
    }
    const t = setTimeout(load, 0)
    return () => clearTimeout(t)
  }, [])

  // Simpan progres ke localStorage tiap perubahan
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch {
      // storage penuh / private mode — abaikan
    }
  }, [progress])

  // Parse modul per kursus
  const modulesBySlug = useMemo(() => {
    const map: Record<string, CourseModule[]> = {}
    for (const c of courses) map[c.slug] = parseModules(c.modules)
    return map
  }, [courses])

  const tracks = useMemo(() => Array.from(new Set(courses.map((c) => c.track))), [courses])

  // Statistik global: modul selesai, XP, persentase
  const stats = useMemo(() => {
    let totalModules = 0
    let doneModules = 0
    let xp = 0
    for (const c of courses) {
      const total = modulesBySlug[c.slug]?.length || c.lessons
      const done = Math.min((progress[c.slug] ?? []).length, total)
      totalModules += total
      doneModules += done
      if (total > 0) xp += c.xp * (done / total)
    }
    const pct = totalModules > 0 ? Math.round((doneModules / totalModules) * 100) : 0
    return { totalModules, doneModules, xp, pct }
  }, [courses, modulesBySlug, progress])

  const visibleCourses = useMemo(
    () => (trackFilter === 'all' ? courses : courses.filter((c) => c.track === trackFilter)),
    [courses, trackFilter]
  )

  const rank = getRank(stats.pct)

  // ---------- aksi progres ----------
  const toggleModule = (slug: string, index: number) => {
    setProgress((prev) => {
      const done = prev[slug] ?? []
      const next = done.includes(index)
        ? done.filter((i) => i !== index)
        : [...done, index].sort((a, b) => a - b)
      return { ...prev, [slug]: next }
    })
  }

  const markAllModules = (course: Course) => {
    const total = modulesBySlug[course.slug]?.length || course.lessons
    setProgress((prev) => ({ ...prev, [course.slug]: Array.from({ length: total }, (_, i) => i) }))
    toast({
      title: '🎉 Semua modul ditandai selesai',
      description: `+${fmtNum(course.xp)} XP dari "${course.title}" mengalir ke progresmu.`,
    })
  }

  const resetCourse = (course: Course) => {
    setProgress((prev) => ({ ...prev, [course.slug]: [] }))
    toast({
      title: '♻️ Progres direset',
      description: `Progres "${course.title}" dikembalikan ke nol.`,
    })
  }

  // ---------- render dialog detail kursus ----------
  const renderCourseDialog = (course: Course) => {
    const mods = modulesBySlug[course.slug] ?? []
    const done = progress[course.slug] ?? []
    const totalModules = mods.length || course.lessons
    const doneCount = Math.min(done.length, totalModules)
    const pct = totalModules > 0 ? Math.round((doneCount / totalModules) * 100) : 0

    return (
      <>
        <DialogHeader>
          <div className="flex items-start gap-3 pr-6">
            <span className="text-4xl leading-none">{course.icon}</span>
            <div className="min-w-0 flex-1 space-y-1.5">
              <DialogTitle className="text-lg leading-tight">{course.title}</DialogTitle>
              <div className="flex flex-wrap items-center gap-1.5">
                <LevelBadge level={course.level} />
                <span className="inline-flex items-center rounded-md border border-violet-400/50 bg-violet-400/10 px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wider text-violet-300">
                  {trackEmoji(course.track)} {course.track}
                </span>
              </div>
              <DialogDescription className="text-xs leading-relaxed">{course.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="tabular">{course.rating.toFixed(1)}</span> rating
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" />
            {fmtNum(course.students)} siswa
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {formatDuration(course.duration)}
          </span>
          <span className="inline-flex items-center gap-1">
            <BookOpen className="size-3.5" />
            {totalModules} modul
          </span>
          <span className="font-mono font-semibold text-amber-300">+{fmtNum(course.xp)} XP</span>
        </div>

        {/* Progress bar kursus */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            <span>Progres Kursus</span>
            <span className="tabular text-violet-300/90">
              {doneCount}/{totalModules} • {pct}%
            </span>
          </div>
          <Progress value={pct} className="h-1.5 [&>div]:bg-violet-400" aria-label={`Progres ${course.title}`} />
        </div>

        {/* Daftar modul */}
        <div className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
          {mods.map((m, i) => {
            const isDone = done.includes(i)
            return (
              <div
                key={i}
                className={cn(
                  'rounded-lg border p-4 transition-colors',
                  isDone ? 'border-emerald-400/30 bg-emerald-400/[0.04]' : 'border-white/5 bg-white/[0.02]'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="shrink-0 rounded border border-violet-400/30 px-1.5 py-0.5 font-mono text-xs tabular text-violet-300/90">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">{m.title}</p>
                      <span className="mt-1 inline-block rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                        {m.minutes} menit
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Checkbox
                      checked={isDone}
                      onCheckedChange={() => toggleModule(course.slug, i)}
                      aria-label={`Tandai modul "${m.title}" selesai`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleModule(course.slug, i)}
                      className={cn(
                        'text-[10px] font-medium transition-colors',
                        isDone ? 'text-emerald-300' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {isDone ? '✓ Selesai' : 'Tandai'}
                    </button>
                  </div>
                </div>
                {m.summary && <p className="mt-2 text-sm text-muted-foreground">{m.summary}</p>}
                {m.keyPoints.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {m.keyPoints.map((k, ki) => (
                      <li key={ki} className="flex gap-2 text-sm text-foreground/80">
                        <span className="text-violet-400">•</span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="secondary" size="sm" onClick={() => markAllModules(course)}>
            Tandai Semua Selesai
          </Button>
          <Button variant="ghost" size="sm" onClick={() => resetCourse(course)}>
            Reset Progress
          </Button>
        </DialogFooter>
      </>
    )
  }

  return (
    <div>
      <SectionHeader
        kicker="AKADEMI AFFILIATE"
        title="Kurikulum Menuju Legenda"
        icon="🎓"
        subtitle="Kurikulum terstruktur dari nol hingga mahir — selesaikan modul, kumpulkan XP, dan evolusi rank-mu menjadi LEGENDA."
      />

      {/* Panel progres global */}
      <GlowCard variant="gold" className="mb-8" hover={false}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-300/90">Progres Belajar</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-semibold tabular text-foreground">{stats.doneModules}</span> dari{' '}
                  <span className="font-semibold tabular text-foreground">{stats.totalModules}</span> modul selesai
                </p>
              </div>
              <span
                className={cn(
                  'inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-bold font-mono tracking-widest',
                  rank.className
                )}
              >
                {rank.label}
              </span>
            </div>
            <Progress
              value={stats.pct}
              className="h-2.5 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:via-amber-300 [&>div]:to-amber-400"
              aria-label="Progres keseluruhan akademi"
            />
          </div>
          <div className="shrink-0 lg:text-right">
            <p className="text-3xl font-bold tabular text-amber-300">
              <AnimatedCounter
                value={stats.xp}
                format={(n) => `${Math.round(n).toLocaleString('id-ID')} XP`}
                duration={0.9}
              />
            </p>
            <p className="mt-1 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Total XP Terkumpul
            </p>
          </div>
        </div>
      </GlowCard>

      {/* Filter track */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={trackFilter === 'all' ? 'secondary' : 'ghost'}
          onClick={() => setTrackFilter('all')}
          className={trackFilter === 'all' ? 'border border-emerald-400/40 text-emerald-300' : 'text-muted-foreground'}
        >
          Semua
        </Button>
        {tracks.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={trackFilter === t ? 'secondary' : 'ghost'}
            onClick={() => setTrackFilter(t)}
            className={trackFilter === t ? 'border border-violet-400/40 text-violet-300' : 'text-muted-foreground'}
          >
            {trackEmoji(t)} {t}
          </Button>
        ))}
      </div>

      {/* Error state */}
      {!loading && error && (
        <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-xl border border-rose-400/30 bg-rose-400/5 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-rose-300">⚠️ Gagal memuat kursus</p>
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
      ) : !error && visibleCourses.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Belum ada kursus di track ini"
          subtitle="Pilih track lain di atas untuk melihat kursus yang tersedia."
        />
      ) : (
        !error && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((c, i) => {
              const mods = modulesBySlug[c.slug] ?? []
              const total = mods.length || c.lessons
              const done = Math.min((progress[c.slug] ?? []).length, total)
              const pct = total > 0 ? Math.round((done / total) * 100) : 0
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60"
                  onClick={() => setSelected(c)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelected(c)
                    }
                  }}
                >
                  <GlowCard variant="violet" className="flex h-full flex-col gap-3">
                    {/* Icon + level */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-3xl leading-none">{c.icon}</span>
                      <LevelBadge level={c.level} />
                    </div>

                    {/* Judul */}
                    <h3 className="line-clamp-2 font-semibold leading-snug">{c.title}</h3>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="tabular">{c.rating.toFixed(1)}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="size-3.5" />
                        {fmtNum(c.students)} siswa
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {formatDuration(c.duration)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="size-3.5" />
                        {total} modul
                      </span>
                    </div>

                    {/* XP + progres */}
                    <div className="mt-auto space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded border border-amber-400/40 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-bold font-mono text-amber-300">
                          +{fmtNum(c.xp)} XP
                        </span>
                        <span className="text-[11px] tabular text-muted-foreground">{pct}% selesai</span>
                      </div>
                      <Progress
                        value={pct}
                        className="h-1.5 [&>div]:bg-violet-400"
                        aria-label={`Progres ${c.title}`}
                      />
                    </div>
                  </GlowCard>
                </motion.div>
              )
            })}
          </div>
        )
      )}

      {/* Dialog detail kursus */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
          {selected ? renderCourseDialog(selected) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
