'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============ SECTION HEADER ============
export function SectionHeader({
  kicker,
  title,
  subtitle,
  icon,
  className,
}: {
  kicker: string
  title: string
  subtitle?: string
  icon?: string
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-8', className)}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="h-px w-8 bg-gradient-to-r from-emerald-400/80 to-transparent" />
        <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-emerald-400/90">{kicker}</span>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
        {icon && <span className="text-3xl sm:text-4xl">{icon}</span>}
        <span className="text-gradient-neon">{title}</span>
      </h2>
      {subtitle && <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">{subtitle}</p>}
    </motion.div>
  )
}

// ============ ANIMATED COUNTER ============
export function AnimatedCounter({
  value,
  format,
  duration = 1.6,
  className,
}: {
  value: number
  format?: (n: number) => string
  duration?: number
  className?: string
}) {
  // Animasi easing dari nilai sebelumnya ke nilai baru.
  // Trigger: saat mount & setiap kali `value` berubah (tanpa bergantung pada IntersectionObserver).
  const [display, setDisplay] = useState(value)
  const displayRef = useRef(value)

  useEffect(() => {
    let raf = 0
    const from = displayRef.current
    const delta = value - from
    if (Math.abs(delta) < 1e-9) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 4)
      const next = from + delta * eased
      displayRef.current = next
      setDisplay(next)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span className={cn('tabular', className)}>
      {format ? format(display) : Math.round(display).toLocaleString('id-ID')}
    </span>
  )
}

// ============ GLOW CARD ============
export function GlowCard({
  children,
  className,
  variant = 'emerald',
  hover = true,
}: {
  children: React.ReactNode
  className?: string
  variant?: 'emerald' | 'gold' | 'violet' | 'plain'
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl p-5',
        variant === 'emerald' && 'neon-border',
        variant === 'gold' && 'neon-border border-box',
        variant === 'violet' && 'neon-border neon-border-vio',
        variant === 'plain' && 'glass',
        hover && 'glass-hover',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============ TIER BADGE ============
export function TierBadge({ tier }: { tier: string }) {
  const map: Record<string, string> = {
    'S+': 'border-amber-400/60 text-amber-300 bg-amber-400/10 shadow-[0_0_12px_-2px] shadow-amber-400/40',
    S: 'border-emerald-400/60 text-emerald-300 bg-emerald-400/10',
    A: 'border-violet-400/60 text-violet-300 bg-violet-400/10',
    B: 'border-zinc-400/50 text-zinc-300 bg-zinc-400/10',
  }
  return (
    <span className={cn('inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wider', map[tier] || map.B)}>
      {tier}
    </span>
  )
}

// ============ PULSE LIVE DOT ============
export function LiveDot({ label = 'LIVE' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping-soft" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {label}
    </span>
  )
}

// ============ SKELETON GRID ============
export function SkeletonGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-5 space-y-3">
          <div className="h-5 w-2/3 rounded bg-white/5 animate-pulse" />
          <div className="h-3 w-1/3 rounded bg-white/5 animate-pulse" />
          <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-white/5 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

// ============ EMPTY STATE ============
export function EmptyState({ icon = '🌌', title, subtitle }: { icon?: string; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-14 text-center">
      <div className="text-4xl mb-3 opacity-70">{icon}</div>
      <p className="font-semibold text-foreground/90">{title}</p>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground max-w-sm">{subtitle}</p>}
    </div>
  )
}
