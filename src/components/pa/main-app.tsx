'use client'

/**
 * ============================================================
 *  PUSATAFFILIATE — APP SHELL (Web 6.0)
 * ============================================================
 *  Kerangka navigasi utama. Struktur menu ditarik dari
 *  menu-config.tsx (sumber tunggal):
 *
 *  • Desktop : nav grup + dropdown berisi semua modul
 *  • Mobile  : bottom nav ringkas (5 slot) + Sheet peta menu
 *  • Footer  : sitemap lengkap 6 grup × 17 modul
 *
 *  Modul berstatus 'soon' tetap bisa dibuka → tampil
 *  ComingSoonView. Isi satu per satu dengan mengganti
 *  status di menu-config + daftarkan view di VIEWS bawah.
 * ============================================================
 */

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Menu as MenuIcon, Rocket, ShieldCheck } from 'lucide-react'
import type { MenuItem, MenuGroup } from '@/components/pa/menu-config'
import { MENU, SOON_COUNT, findGroupOf, findItem } from '@/components/pa/menu-config'
import { HomeView } from '@/components/pa/home'
import MarketplaceView from '@/components/pa/marketplace'
import AcademyView from '@/components/pa/academy'
import { AIStudioView } from '@/components/pa/ai-studio'
import { CalculatorView } from '@/components/pa/calculator'
import TrackerView from '@/components/pa/tracker'
import AdminView from '@/components/pa/admin'
import { ComingSoonView } from '@/components/pa/coming-soon'
import { LiveDot } from '@/components/pa/shared'
import { SocialRow } from '@/components/pa/social-icons'
import { BRAND } from '@/lib/brand'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export type ViewId = string

/** Registry komponen view yang SUDAH SIAP. Modul baru: ganti status di
 *  menu-config.tsx jadi 'ready', lalu daftarkan komponennya di sini. */
const VIEWS: Record<string, React.ComponentType<{ onNavigate: (v: ViewId) => void }>> = {
  home: HomeView,
  marketplace: MarketplaceView,
  academy: AcademyView,
  ai: AIStudioView,
  calc: CalculatorView,
  tracker: TrackerView,
  admin: AdminView,
}

/** Slot bottom-nav mobile → item tujuan utama tiap grup. */
const GROUP_TARGET: Record<string, string> = {
  pasar: 'marketplace',
  akademi: 'academy',
  senjata: 'ai',
}

export function MainApp() {
  const [view, setView] = useState<ViewId>('home')
  const [sheetOpen, setSheetOpen] = useState(false)

  function navigate(v: ViewId) {
    setView(v)
    setSheetOpen(false)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [view])

  const activeItem = findItem(view) ?? findItem('home')!
  const activeGroupId = findGroupOf(activeItem.id)?.id

  /** Item status 'soon' → render ComingSoonView; 'ready' → komponen asli. */
  function renderView() {
    if (activeItem.status === 'soon') {
      return <ComingSoonView item={activeItem} onNavigate={navigate} />
    }
    const Cmp = VIEWS[activeItem.id]
    if (!Cmp) return <ComingSoonView item={activeItem} onNavigate={navigate} />
    return <Cmp onNavigate={navigate} />
  }

  const ActiveView = renderView()

  return (
    <div className="flex min-h-screen flex-col">
      {/* ================= BACKGROUND ================= */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="orb orb-emerald animate-orb top-[-10%] right-[-8%] h-[420px] w-[420px] opacity-15" />
        <div className="orb orb-gold animate-orb bottom-[-12%] left-[-10%] h-[380px] w-[380px] opacity-10 [animation-delay:-7s]" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex shrink-0 items-center gap-2.5 transition-transform hover:scale-[1.02]"
            aria-label="Kembali ke Beranda"
          >
            <img
              src="/brand/logo.png"
              alt="Logo PUSATAFFILIATE"
              className="h-9 w-9 rounded-lg object-cover shadow-[0_0_14px_-2px_rgba(52,211,153,0.6)]"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            <div className="text-left">
              <p className="font-display text-base leading-none font-extrabold tracking-tight">
                PUSAT<span className="text-gradient-neon">AFFILIATE</span>
              </p>
              <p className="font-mono text-[9px] tracking-[0.25em] text-muted-foreground">WEB 6.0 ENGINE</p>
            </div>
          </button>

          {/* ---------- DESKTOP NAV (grup + dropdown) ---------- */}
          <nav aria-label="Navigasi utama" className="hidden items-center gap-0.5 lg:flex">
            {/* Beranda — direct */}
            <NavButton active={activeItem.id === 'home'} gold={false} onClick={() => navigate('home')}>
              Beranda
            </NavButton>

            {/* Grup dropdown: Pasar, Akademi, Senjata, Komunitas */}
            {MENU.filter((g) => !['utama', 'command'].includes(g.id)).map((g) => (
              <GroupDropdown
                key={g.id}
                group={g}
                active={activeGroupId === g.id}
                onNavigate={navigate}
              />
            ))}

            {/* Admin — direct, gold */}
            <NavButton active={activeItem.id === 'admin'} gold onClick={() => navigate('admin')}>
              Admin Sakti
            </NavButton>
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <span className="hidden xl:inline-flex">
              <LiveDot />
            </span>
            <button
              onClick={() => navigate('tracker')}
              className="btn-neon flex h-9 items-center gap-2 rounded-lg bg-emerald-400/15 px-4 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/25"
            >
              <Rocket className="h-4 w-4" /> Mulai Cuan
            </button>
          </div>

          {/* Mobile: sheet trigger */}
          <div className="lg:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  id="nav-sheet-trigger"
                  suppressHydrationWarning
                  aria-label="Buka peta menu lengkap"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-300 transition hover:bg-emerald-400/10"
                >
                  <MenuIcon className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <MenuSheetContent activeItem={activeItem} onNavigate={navigate} />
            </Sheet>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 pb-24 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {ActiveView}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ================= FOOTER (sticky bottom + sitemap) ================= */}
      <footer className="mt-auto border-t border-white/5 bg-background/60 pb-24 backdrop-blur-xl lg:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <img
                  src="/brand/logo.png"
                  alt="Logo PUSATAFFILIATE"
                  className="h-9 w-9 rounded-lg object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <p className="font-display text-lg font-extrabold">
                  PUSAT<span className="text-gradient-neon">AFFILIATE</span>
                </p>
              </div>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Markas belajar &amp; eksekusi affiliate komisi tertinggi dunia. Dari TikTok Shop sampai SaaS recurring
                — satu platform, satu tujuan: <span className="text-emerald-300">ratusan juta dollar</span>.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Dipersembahkan oleh <span className="font-semibold text-foreground">Gugun Gunara</span> bersama{' '}
                <span className="text-foreground/90">Muhammad Lutfi Azmi</span> · Prabudanling · Santri Angon.
              </p>
              <p className="mt-1.5 font-mono text-[11px] tracking-wide text-amber-300/90">
                {BRAND.titlesLine}
              </p>
              <SocialRow className="mt-4" />
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                WEB 6.0 PROTOCOL • NODE CLUSTER 46/46
              </div>
            </div>

            {/* Sitemap: 6 grup lengkap */}
            <nav aria-label="Peta situs" className="lg:col-span-3">
              <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                Peta Situs — {MENU.reduce((n, g) => n + g.items.length, 0)} Modul
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
                {MENU.map((g) => (
                  <FooterGroup key={g.id} group={g} activeItem={activeItem.id} onNavigate={navigate} />
                ))}
              </div>
            </nav>
          </div>

          {/* ============ PITA KREDIT & DUKUNGAN (branding SEO on-page) ============ */}
          <div
            id="kredit"
            className="mt-10 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.03] p-5 sm:p-6"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.25em] text-emerald-400/90 uppercase">
                  Dipersembahkan &amp; Didukung Oleh
                </p>
                <p className="font-display mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
                  by <span className="text-gradient-neon">Gugun Gunara</span>
                </p>
                <p className="mt-1.5 font-mono text-[11px] tracking-[0.08em] text-amber-300/90">
                  ✦ {BRAND.titlesLine} ✦
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Bersama{' '}
                  <span className="font-semibold text-foreground/90">Muhammad Lutfi Azmi</span>
                  <span className="mx-1.5 text-emerald-400/50">•</span>Prabudanling
                  <span className="mx-1.5 text-emerald-400/50">•</span>Santri Angon
                </p>
                <SocialRow className="mt-4" />
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://topkonsultan.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PT Top Konsultan Internasional — topkonsultan.web.id"
                  className="glass-hover group flex min-w-[220px] flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-emerald-400/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-lg">
                    🏢
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm leading-snug font-bold">PT Top Konsultan Internasional</span>
                    <span className="mt-0.5 block text-xs leading-snug text-emerald-300/80 group-hover:text-emerald-300">
                      topkonsultan.web.id — Support System
                    </span>
                  </span>
                </a>
                <a
                  href="https://digiman.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PT Digital Bisnis Manajemen — digiman.id"
                  className="glass-hover group flex min-w-[220px] flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-amber-300/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-300/30 bg-amber-400/10 text-lg">
                    ⚙️
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm leading-snug font-bold">PT Digital Bisnis Manajemen</span>
                    <span className="mt-0.5 block text-xs leading-snug text-amber-200/80 group-hover:text-amber-200">
                      digiman.id — Support System
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-white/5 pt-6">
            <p className="text-xs leading-relaxed text-muted-foreground">
              Platform edukasi &amp; simulasi. Statistik komisi, EPC, dan leaderboard merupakan data demonstrasi.
              Angka nyata bergantung pada eksekusi &amp; program resmi masing-masing brand.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              © 2045 PUSATAFFILIATE Labs by{' '}
              <span className="font-semibold text-emerald-300">Gugun Gunara</span> — didukung{' '}
              <a
                href="https://topkonsultan.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-emerald-400/40 underline-offset-2 transition-colors hover:text-emerald-300"
              >
                PT Top Konsultan Internasional
              </a>{' '}
              &amp;{' '}
              <a
                href="https://digiman.id"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-amber-300/40 underline-offset-2 transition-colors hover:text-amber-200"
              >
                PT Digital Bisnis Manajemen
              </a>{' '}
              — Jakarta / Everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <BottomNav activeItem={activeItem} onNavigate={navigate} onOpenSheet={() => setSheetOpen(true)} />
    </div>
  )
}

// =====================================================================
//  SUB-KOMPONEN NAVIGASI
// =====================================================================

/** Tombol nav level-1 (Beranda / Admin) dengan underline motion. */
function NavButton({
  active,
  gold,
  onClick,
  children,
}: {
  active: boolean
  gold: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'text-foreground'
          : gold
            ? 'text-amber-300/90 hover:text-amber-200'
            : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute inset-x-2 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300"
        />
      )}
    </button>
  )
}

/** Trigger + dropdown grup (desktop). Menampilkan semua modul grup
 *  lengkap dengan deskripsi & status LIVE / SOON. */
function GroupDropdown({
  group,
  active,
  onNavigate,
}: {
  group: MenuGroup
  active: boolean
  onNavigate: (v: ViewId) => void
}) {
  const GroupIcon = group.icon
  const readyCount = group.items.filter((i) => i.status === 'ready').length

  // ID stabil eksplisit pada trigger → menimpa ID acak generate-an Radix
  // (useId) sehingga SSR & client selalu identik — mencegah hydration
  // mismatch. suppressHydrationWarning: pengaman untuk atribut internal
  // Radix (mis. aria-controls) yang bisa beda saat dev/HMR & tak berdampak.
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id={`nav-${group.id}`}
          suppressHydrationWarning
          aria-haspopup="menu"
          className={cn(
            'relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors outline-none',
            active
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground data-[state=open]:text-foreground'
          )}
        >
          <GroupIcon className="h-4 w-4" />
          {group.label}
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          {active && (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-2 -bottom-[13px] h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-amber-300"
            />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={14}
        className="w-[22rem] border-white/10 bg-background/95 p-2 backdrop-blur-xl"
      >
        {/* header grup */}
        <div className="flex items-center justify-between gap-2 px-2 py-2">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{group.emoji}</span>
            <div>
              <p className="text-sm leading-tight font-bold">{group.label}</p>
              <p className="text-[11px] leading-tight text-muted-foreground">{group.tagline}</p>
            </div>
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-emerald-300/80 uppercase">
            {readyCount}/{group.items.length} live
          </span>
        </div>
        <DropdownMenuSeparator className="bg-white/5" />

        {group.items.map((item) => (
          <DropdownItem key={item.id} item={item} onNavigate={onNavigate} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Baris item di dalam dropdown. 'soon' tetap bisa diklik → ComingSoon. */
function DropdownItem({ item, onNavigate }: { item: MenuItem; onNavigate: (v: ViewId) => void }) {
  const Icon = item.icon
  const soon = item.status === 'soon'
  return (
    <DropdownMenuItem asChild>
      <button
        onClick={() => onNavigate(item.id)}
        className={cn(
          'flex w-full cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 text-left outline-none',
          soon ? 'focus:bg-white/[0.04]' : 'focus:bg-emerald-400/10',
          item.gold && 'focus:bg-amber-400/10'
        )}
      >
      <span
        className={cn(
          'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
          item.gold
            ? 'border-amber-300/30 bg-amber-400/10 text-amber-300'
            : soon
              ? 'border-white/10 bg-white/5 text-muted-foreground'
              : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className={cn('truncate text-sm font-semibold', soon && 'text-foreground/70')}>{item.label}</span>
          {soon ? (
            <span className="shrink-0 rounded-full border border-amber-300/30 bg-amber-400/10 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-[0.15em] text-amber-300 uppercase">
              Soon
            </span>
          ) : (
            <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-[0.15em] text-emerald-300 uppercase">
              Live
            </span>
          )}
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted-foreground">{item.desc}</span>
      </span>
      </button>
    </DropdownMenuItem>
  )
}

/** Satu grup di footer sitemap. */
function FooterGroup({
  group,
  activeItem,
  onNavigate,
}: {
  group: MenuGroup
  activeItem: string
  onNavigate: (v: ViewId) => void
}) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-sm font-bold">
        <span>{group.emoji}</span> {group.label}
      </p>
      <ul className="mt-3 space-y-2">
        {group.items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={cn(
                'flex items-center gap-1.5 text-xs transition-colors',
                item.status === 'soon' ? 'text-muted-foreground/70 hover:text-emerald-300' : 'text-muted-foreground hover:text-emerald-300',
                activeItem === item.id && 'font-semibold text-emerald-300',
                item.gold && 'text-amber-300/80 hover:text-amber-200'
              )}
            >
              {item.label}
              {item.status === 'soon' && (
                <span className="rounded-sm border border-amber-300/20 px-1 font-mono text-[7px] tracking-wider text-amber-300/70 uppercase">
                  Soon
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Bottom nav mobile: 4 slot grup + 1 slot Menu (buka sheet). */
function BottomNav({
  activeItem,
  onNavigate,
  onOpenSheet,
}: {
  activeItem: MenuItem
  onNavigate: (v: ViewId) => void
  onOpenSheet: () => void
}) {
  const groupId = findGroupOf(activeItem.id)?.id
  const slots: { key: string; label: string; icon: React.ElementType; target?: string; active: boolean; gold?: boolean }[] = [
    {
      key: 'beranda',
      label: 'Home',
      icon: MENU[0].items[0].icon,
      target: 'home',
      active: activeItem.id === 'home',
    },
    {
      key: 'pasar',
      label: 'Pasar',
      icon: MENU[1].icon,
      target: GROUP_TARGET.pasar,
      active: groupId === 'pasar',
    },
    {
      key: 'akademi',
      label: 'Akademi',
      icon: MENU[2].icon,
      active: groupId === 'akademi',
      target: GROUP_TARGET.akademi,
    },
    {
      key: 'senjata',
      label: 'Senjata',
      icon: MENU[3].icon,
      active: groupId === 'senjata',
      target: GROUP_TARGET.senjata,
    },
  ]

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/85 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch justify-between gap-0.5 px-1 py-1.5">
        {slots.map((s) => {
          const Icon = s.icon
          return (
            <button
              key={s.key}
              onClick={() => s.target && onNavigate(s.target)}
              aria-current={s.active ? 'page' : undefined}
              className={cn(
                'flex min-w-[52px] flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[9px] font-medium transition-colors',
                s.active ? 'bg-emerald-400/10 text-emerald-300' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              {s.label}
            </button>
          )
        })}
        {/* Slot Menu → sheet peta lengkap */}
        <button
          onClick={onOpenSheet}
          aria-haspopup="dialog"
          className={cn(
            'flex min-w-[52px] flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[9px] font-medium transition-colors',
            activeItem.id === 'admin' ? 'bg-amber-400/10 text-amber-300' : 'text-muted-foreground'
          )}
        >
          <MenuIcon className="h-4.5 w-4.5" />
          Menu
        </button>
      </div>
    </nav>
  )
}

/** Sheet peta menu lengkap (mobile) — semua grup & modul. */
function MenuSheetContent({ activeItem, onNavigate }: { activeItem: MenuItem; onNavigate: (v: ViewId) => void }) {
  return (
    <SheetContent
      side="right"
      className="flex w-[88vw] max-w-sm flex-col gap-0 overflow-hidden border-white/10 bg-background/95 p-0 backdrop-blur-xl sm:w-[22rem]"
    >
      {/* Header sheet */}
      <SheetHeader className="border-b border-white/5 px-4 py-4">
        <SheetTitle className="flex items-center gap-2.5">
          <img
            src="/brand/logo.png"
            alt="Logo PUSATAFFILIATE"
            className="h-8 w-8 rounded-lg object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <span className="font-display text-sm font-extrabold tracking-tight">
            PETA <span className="text-gradient-neon">ARMADA</span>
          </span>
          <span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
            6 GRUP • {MENU.reduce((n, g) => n + g.items.length, 0)} MODUL
          </span>
        </SheetTitle>
      </SheetHeader>

      {/* Daftar grup */}
      <div className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {MENU.map((g) => (
          <div key={g.id} className="mb-3">
            <p className="mb-1.5 flex items-center gap-2 px-1 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              <span className="text-sm">{g.emoji}</span>
              {g.label}
              <span className="h-px flex-1 bg-white/5" />
            </p>
            {g.items.map((item) => (
              <SheetRow
                key={item.id}
                item={item}
                active={activeItem.id === item.id}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer sheet */}
      <div className="space-y-2.5 border-t border-white/5 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Button
          onClick={() => onNavigate('tracker')}
          className="btn-neon h-11 w-full gap-2 rounded-xl bg-emerald-400/15 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/25"
        >
          <Rocket className="h-4 w-4" /> Mulai Cuan Sekarang
        </Button>
        <p className="text-center font-mono text-[9px] tracking-[0.25em] text-muted-foreground">
          {SOON_COUNT} MODUL DALAM PENGERJAAN • WEB 6.0
        </p>
        <p className="text-center text-[10px] text-muted-foreground">
          by <span className="font-semibold text-emerald-300">Gugun Gunara</span> ·{' '}
          <span className="text-foreground/70">Top Konsultan × Digiman</span>
        </p>
      </div>
    </SheetContent>
  )
}

/** Baris item dalam sheet — mirror DropdownItem dengan chevron. */
function SheetRow({
  item,
  active,
  onNavigate,
}: {
  item: MenuItem
  active: boolean
  onNavigate: (v: ViewId) => void
}) {
  const Icon = item.icon
  const soon = item.status === 'soon'
  return (
    <button
      onClick={() => onNavigate(item.id)}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors',
        active
          ? item.gold
            ? 'bg-amber-400/10'
            : 'bg-emerald-400/10'
          : soon
            ? 'hover:bg-white/[0.04]'
            : 'hover:bg-emerald-400/5'
      )}
    >
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
          item.gold
            ? 'border-amber-300/30 bg-amber-400/10 text-amber-300'
            : soon
              ? 'border-white/10 bg-white/5 text-muted-foreground'
              : 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className={cn('truncate text-sm font-semibold', soon && 'text-foreground/70')}>{item.label}</span>
          {soon ? (
            <span className="shrink-0 rounded-full border border-amber-300/30 bg-amber-400/10 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-[0.15em] text-amber-300 uppercase">
              Soon
            </span>
          ) : (
            <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-[0.15em] text-emerald-300 uppercase">
              Live
            </span>
          )}
        </span>
        <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">{item.desc}</span>
      </span>
      {active ? (
        <ChevronRight className="h-4 w-4 shrink-0 text-emerald-300" />
      ) : (
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
      )}
    </button>
  )
}
