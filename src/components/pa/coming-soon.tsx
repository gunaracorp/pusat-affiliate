'use client'

/**
 * ============================================================
 *  PUSATAFFILIATE — COMING SOON VIEW
 * ============================================================
 *  Placeholder premium untuk modul yang statusnya 'soon'.
 *  Menampilkan: identitas modul, progres pembangunan,
 *  fitur yang akan hadir, dan jalan pintas ke modul siap.
 *  Dipakai bersama menu-config.tsx.
 * ============================================================
 */

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Clock3, Hammer, Store } from 'lucide-react'
import type { MenuItem } from '@/components/pa/menu-config'
import { findGroupOf } from '@/components/pa/menu-config'
import { SectionHeader } from '@/components/pa/shared'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

export function ComingSoonView({ item, onNavigate }: { item: MenuItem; onNavigate: (id: string) => void }) {
  const group = findGroupOf(item.id)
  const progress = item.progress ?? 0
  const Icon = item.icon

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      {/* ---------- HEADER MODUL ---------- */}
      <SectionHeader
        kicker={`${group?.emoji ?? ''} ${group?.label ?? 'Modul'} • Dalam Pengerjaan`}
        title={item.label}
        subtitle={item.desc}
        icon={item.emoji}
        className="mb-10"
      />

      {/* ---------- KARTU UTAMA ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass neon-border relative overflow-hidden rounded-2xl p-6 sm:p-10"
      >
        {/* dekorasi scanline + glow icon */}
        <div className="scanline pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center">
          {/* ikon besar dengan ring orbit */}
          <div className="relative shrink-0" aria-hidden>
            <div className="absolute inset-0 animate-ping rounded-2xl bg-emerald-400/10 [animation-duration:2.5s]" />
            <div
              className={cn(
                'relative flex h-24 w-24 items-center justify-center rounded-2xl border',
                item.gold
                  ? 'border-amber-300/40 bg-amber-400/10 shadow-[0_0_40px_-6px_rgba(251,191,36,0.5)]'
                  : 'border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_40px_-6px_rgba(52,211,153,0.5)]'
              )}
            >
              <Icon className={cn('h-12 w-12', item.gold ? 'text-amber-300' : 'text-emerald-300')} />
              <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-background text-lg">
                {item.emoji}
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-amber-300 uppercase">
                <Clock3 className="h-3 w-3" /> Segera Hadir
              </span>
              {item.badge && (
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  {item.badge}
                </span>
              )}
              <span className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-emerald-300/80 uppercase">
                Web 6.0 Engine
              </span>
            </div>

            <h3 className="font-display mt-4 text-xl font-bold sm:text-2xl">
              Struktur sudah terpasang — <span className="text-gradient-neon">kontennya menyusul</span>
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Modul <span className="font-semibold text-foreground">{item.label}</span> sudah masuk arsitektur resmi
              PUSATAFFILIATE. Tim dewan 46 pakar sedang menempa isinya — begitu siap, modul ini otomatis menyala tanpa
              perlu menu baru.
            </p>

            {/* progres pembangunan */}
            <div className="mt-5 max-w-md">
              <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Hammer className="h-3 w-3 text-emerald-400" /> Progres Pembangunan
                </span>
                <span className="tabular text-emerald-300">{progress}%</span>
              </div>
              <Progress
                value={progress}
                className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-amber-300"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ---------- FITUR YANG AKAN HADIR ---------- */}
      {item.features && item.features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          <p className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
            <span className="h-px w-6 bg-gradient-to-r from-emerald-400/80 to-transparent" />
            Yang Akan Kamu Dapatkan
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {item.features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.18 + i * 0.07 }}
                className="glass-hover flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
              >
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-400" />
                <span className="text-sm text-foreground/90">{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ---------- JALAN PINTAS KE MODUL SIAP ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase sm:mr-2">
          Sambil menunggu, gas dulu:
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button
            onClick={() => onNavigate('marketplace')}
            className="btn-neon gap-2 rounded-xl bg-emerald-400/15 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/25"
          >
            <Store className="h-4 w-4" /> Marketplace Program <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onNavigate('ai')}
            variant="outline"
            className="gap-2 rounded-xl border-violet-400/40 text-sm font-semibold text-violet-200 hover:bg-violet-400/10"
          >
            🧠 AI Studio <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            className="gap-2 rounded-xl text-sm text-muted-foreground hover:text-foreground"
          >
            🏠 Kembali ke Beranda
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
