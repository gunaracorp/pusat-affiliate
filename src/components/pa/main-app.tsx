'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, Calculator, Crown, GraduationCap, Home, Link2, Rocket, ShieldCheck, Store } from 'lucide-react'
import { HomeView } from '@/components/pa/home'
import MarketplaceView from '@/components/pa/marketplace'
import AcademyView from '@/components/pa/academy'
import { AIStudioView } from '@/components/pa/ai-studio'
import { CalculatorView } from '@/components/pa/calculator'
import TrackerView from '@/components/pa/tracker'
import AdminView from '@/components/pa/admin'
import { LiveDot } from '@/components/pa/shared'
import { cn } from '@/lib/utils'

export type ViewId = 'home' | 'marketplace' | 'academy' | 'ai' | 'calc' | 'tracker' | 'admin'

const NAV: { id: ViewId; label: string; icon: React.ElementType; short: string; gold?: boolean }[] = [
  { id: 'home', label: 'Beranda', short: 'Home', icon: Home },
  { id: 'marketplace', label: 'Marketplace', short: 'Market', icon: Store },
  { id: 'academy', label: 'Akademi', short: 'Akademi', icon: GraduationCap },
  { id: 'ai', label: 'AI Studio', short: 'AI', icon: Brain },
  { id: 'calc', label: 'Kalkulator', short: 'Hitung', icon: Calculator },
  { id: 'tracker', label: 'Tracker', short: 'Track', icon: Link2 },
  { id: 'admin', label: 'Admin Sakti', short: 'Admin', icon: Crown, gold: true },
]

const VIEWS: Record<ViewId, React.ComponentType<{ onNavigate: (v: ViewId) => void }>> = {
  home: HomeView,
  marketplace: MarketplaceView,
  academy: AcademyView,
  ai: AIStudioView,
  calc: CalculatorView,
  tracker: TrackerView,
  admin: AdminView,
}

export function MainApp() {
  const [view, setView] = useState<ViewId>('home')

  function navigate(v: ViewId) {
    setView(v)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  const ActiveView = VIEWS[view]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Background layer */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="orb orb-emerald animate-orb top-[-10%] right-[-8%] h-[420px] w-[420px] opacity-15" />
        <div className="orb orb-gold animate-orb bottom-[-12%] left-[-10%] h-[380px] w-[380px] opacity-10 [animation-delay:-7s]" />
      </div>

      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <button onClick={() => navigate('home')} className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
            <img src="/brand/logo.png" alt="Logo PUSATAFFILIATE" className="h-9 w-9 rounded-lg object-cover shadow-[0_0_14px_-2px_rgba(52,211,153,0.6)]" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="text-left">
              <p className="font-display text-base leading-none font-extrabold tracking-tight">
                PUSAT<span className="text-gradient-neon">AFFILIATE</span>
              </p>
              <p className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground">WEB 6.0 ENGINE</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => navigate(n.id)}
                aria-current={view === n.id ? 'page' : undefined}
                className={cn(
                  'relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  view === n.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  n.gold && 'text-amber-300/90 hover:text-amber-200'
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
                {view === n.id && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-2 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300" />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LiveDot />
            <button
              onClick={() => navigate('tracker')}
              className="btn-neon flex h-9 items-center gap-2 rounded-lg bg-emerald-400/15 px-4 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/25"
            >
              <Rocket className="h-4 w-4" /> Mulai Cuan
            </button>
          </div>

          {/* Mobile status */}
          <div className="lg:hidden"><LiveDot /></div>
        </div>
      </header>

      {/* ============ MAIN ============ */}
      <main className="flex-1 pb-24 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActiveView onNavigate={navigate} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ============ FOOTER (sticky bottom) ============ */}
      <footer className="mt-auto border-t border-white/5 bg-background/60 pb-20 backdrop-blur-xl lg:pb-0">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/brand/logo.png" alt="Logo PUSATAFFILIATE" className="h-9 w-9 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <p className="font-display text-lg font-extrabold">
                PUSAT<span className="text-gradient-neon">AFFILIATE</span>
              </p>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Markas belajar & eksekusi affiliate komisi tertinggi dunia. Dari TikTok Shop sampai SaaS recurring — satu platform, satu tujuan: <span className="text-emerald-300">ratusan juta dollar</span>.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              WEB 6.0 PROTOCOL • NODE CLUSTER 46/46
            </div>
          </div>
          <nav aria-label="Navigasi footer">
            <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">Ekspedisi</p>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV.slice(1, 6).map((n) => (
                <li key={n.id}>
                  <button onClick={() => navigate(n.id)} className="text-muted-foreground transition-colors hover:text-emerald-300">
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">Transparansi</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Platform edukasi & simulasi. Statistik komisi, EPC, dan leaderboard merupakan data demonstrasi. Angka nyata bergantung pada eksekusi & program resmi masing-masing brand.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              © 2045 PUSATAFFILIATE Labs — Jakarta / Everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* ============ MOBILE BOTTOM NAV ============ */}
      <nav
        aria-label="Navigasi bawah"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/85 backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-stretch justify-between gap-0.5 overflow-x-auto px-1 py-1.5">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => navigate(n.id)}
              className={cn(
                'flex min-w-[52px] flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[9px] font-medium transition-colors',
                view === n.id ? (n.gold ? 'bg-amber-400/10 text-amber-300' : 'bg-emerald-400/10 text-emerald-300') : 'text-muted-foreground'
              )}
            >
              <n.icon className="h-4.5 w-4.5" />
              {n.short}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
