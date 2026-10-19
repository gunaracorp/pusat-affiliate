'use client'

/**
 * ============================================================
 *  PUSATAFFILIATE — MENU MASTER CONFIG
 * ============================================================
 *  Sumber tunggal (single source of truth) untuk SELURUH
 *  struktur navigasi aplikasi: header desktop, dropdown,
 *  bottom nav mobile, sheet peta menu, dan footer sitemap.
 *
 *  CARA MENGISI MODUL BARU (satu per satu):
 *  1. Ganti `status: 'soon'` → `'ready'` pada item terkait.
 *  2. Daftarkan komponen view-nya di VIEWS registry (main-app.tsx).
 *  3. Selesai — nav, sheet, footer, dan peta menu otomatis ikut.
 * ============================================================
 */

import {
  BarChart3,
  BookOpen,
  Brain,
  Calculator,
  CalendarDays,
  Compass,
  Crown,
  Flame,
  GraduationCap,
  Home,
  Library,
  Link2,
  Map,
  PenLine,
  Radar,
  Scale,
  Sparkles,
  Store,
  Swords,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'

// ============ TIPE ============

export type MenuItemStatus = 'ready' | 'soon'

export type MenuItem = {
  /** id unik — dipakai sebagai view id & lookup */
  id: string
  label: string
  /** label pendek untuk bottom nav mobile */
  short: string
  emoji: string
  icon: LucideIcon
  /** deskripsi 1 baris, tampil di dropdown & sheet */
  desc: string
  status: MenuItemStatus
  /** % progres pembangunan (khusus status 'soon') */
  progress?: number
  /** fitur yang akan hadir (khusus status 'soon') */
  features?: string[]
  /** chip kecil tambahan, mis. "S+" atau "OMEGA" */
  badge?: string
  /** gaya emas khusus Command Center */
  gold?: boolean
}

export type MenuGroup = {
  id: string
  label: string
  emoji: string
  icon: LucideIcon
  tagline: string
  items: MenuItem[]
}

// ============ STRUKTUR MENU LENGKAP ============

export const MENU: MenuGroup[] = [
  {
    id: 'utama',
    label: 'Utama',
    emoji: '🏠',
    icon: Home,
    tagline: 'Pusat kendali ekspedisi',
    items: [
      {
        id: 'home',
        label: 'Beranda',
        short: 'Home',
        emoji: '🏠',
        icon: Home,
        desc: 'Dashboard pusat — ringkasan cuan, fitur, dan armada program',
        status: 'ready',
      },
      {
        id: 'leaderboard',
        label: 'Leaderboard',
        short: 'Rank',
        emoji: '🏆',
        icon: Trophy,
        desc: 'Hall of Fame affiliate dengan komisi terbesar se-universe',
        status: 'soon',
        progress: 45,
        features: ['Ranking global & mingguan', 'Profil legenda + badge', 'Rekornya komisi terbesar', 'Sistem poin & level'],
      },
      {
        id: 'statistik',
        label: 'Statistik Global',
        short: 'Stat',
        emoji: '📊',
        icon: BarChart3,
        desc: 'Data pasar real-time: tren produk, EPC rata-rata, dan suhu niche',
        status: 'soon',
        progress: 20,
        features: ['Grafik tren 30 hari', 'Peta komisi per negara', 'Indeks suhu niche', 'EPC benchmark per platform'],
      },
    ],
  },
  {
    id: 'pasar',
    label: 'Pasar',
    emoji: '🏦',
    icon: Store,
    tagline: 'Arsenal program komisi tertinggi',
    items: [
      {
        id: 'marketplace',
        label: 'Marketplace',
        short: 'Market',
        emoji: '🏦',
        icon: Store,
        desc: 'Database 20+ program: TikTok Shop, Shopee, Amazon, SaaS recurring',
        status: 'ready',
      },
      {
        id: 'trending',
        label: 'Trending & Viral',
        short: 'Viral',
        emoji: '🔥',
        icon: Flame,
        desc: 'Produk yang lagi panas minggu ini — kejar wave sebelum turun',
        status: 'soon',
        progress: 30,
        features: ['Radar produk viral harian', 'Skor potensi komisi', 'Deteksi tren TikTok & Shopee', 'Alert produk naik daun'],
      },
      {
        id: 'duel',
        label: 'Duel Komisi',
        short: 'Duel',
        emoji: '⚖️',
        icon: Scale,
        desc: 'Bandingkan 2+ program side-by-side: komisi, cookie, dan pembayaran',
        status: 'soon',
        progress: 15,
        features: ['Mode duel 2–4 program', 'Matriks komisi & cookie window', 'Simulasi EPC head-to-head', 'Rekomendasi pemenang'],
      },
      {
        id: 'kurasi',
        label: 'Kurasi S+',
        short: 'S+',
        emoji: '💎',
        icon: Sparkles,
        desc: 'Hanya program terbaik hasil kurasi tim 46 pakar — garansi kualitas',
        status: 'soon',
        progress: 10,
        features: ['Shortlist mingguan tim kurator', 'Audit track record pembayaran', 'Skor kepercayaan 0–100', 'Akses program eksklusif'],
      },
    ],
  },
  {
    id: 'akademi',
    label: 'Akademi',
    emoji: '🎓',
    icon: GraduationCap,
    tagline: 'Dari nol sampai legenda',
    items: [
      {
        id: 'academy',
        label: 'Kursus',
        short: 'Kursus',
        emoji: '🎓',
        icon: GraduationCap,
        desc: '8 kursus / 34 modul: TikTok Shop, Shopee, konten, SEO, scaling',
        status: 'ready',
      },
      {
        id: 'playbook',
        label: 'Playbook Strategi',
        short: 'Playbook',
        emoji: '📖',
        icon: BookOpen,
        desc: 'Taktik rahasia dewan 46 pakar — playbook siap eksekusi step-by-step',
        status: 'soon',
        progress: 25,
        features: ['50+ playbook siap tempur', 'Template funnel & hook', 'Studi kasus komisi nyata', 'Checklist eksekusi harian'],
      },
      {
        id: 'roadmap',
        label: 'Roadmap $100K',
        short: 'Roadmap',
        emoji: '🗺️',
        icon: Map,
        desc: 'Peta jalan 12 bulan dari $0 menuju $100K — tahap demi tahap',
        status: 'soon',
        progress: 20,
        features: ['Milestone bulanan terukur', 'Target KPI per tahap', 'Unlock level & hadiah', 'Tracking progres otomatis'],
      },
      {
        id: 'glosarium',
        label: 'Glosarium',
        short: 'Kamus',
        emoji: '📚',
        icon: Library,
        desc: 'Kamus istilah affiliate: EPC, cookie window, gravity, dan 100+ lagi',
        status: 'soon',
        progress: 40,
        features: ['100+ istilah & definisi', 'Contoh perhitungan nyata', 'Pencarian instan', 'Istilah berbahasa Indonesia'],
      },
    ],
  },
  {
    id: 'senjata',
    label: 'Senjata',
    emoji: '⚔️',
    icon: Swords,
    tagline: 'Arsenal eksekusi harian',
    items: [
      {
        id: 'ai',
        label: 'AI Studio',
        short: 'AI',
        emoji: '🧠',
        icon: Brain,
        desc: 'Dewan 46 pakar: generate script, caption, hook & strategi 24/7',
        status: 'ready',
      },
      {
        id: 'calc',
        label: 'Kalkulator',
        short: 'Hitung',
        emoji: '🧮',
        icon: Calculator,
        desc: 'Simulasi cuan: proyeksi komisi 12 bulan dari views & konversi',
        status: 'ready',
      },
      {
        id: 'tracker',
        label: 'Tracker Link',
        short: 'Track',
        emoji: '🔗',
        icon: Link2,
        desc: 'Tempa link affiliate, lacak klik, konversi & komisi real-time',
        status: 'ready',
      },
      {
        id: 'konten',
        label: 'Generator Konten',
        short: 'Konten',
        emoji: '✍️',
        icon: PenLine,
        desc: 'Kalender konten 30 hari + caption otomatis siap posting',
        status: 'soon',
        progress: 25,
        features: ['Kalender konten otomatis', 'Caption & hashtag siap pakai', 'Ide hook 30 hari ke depan', 'Ekspor ke Kalender/Notion'],
      },
      {
        id: 'spy',
        label: 'Spy Kompetitor',
        short: 'Spy',
        emoji: '🛰️',
        icon: Radar,
        desc: 'Intel musuh: pantau strategi & performa kompetitor top',
        status: 'soon',
        progress: 8,
        features: ['Pantau akun kompetitor', 'Analisa konten terbaik mereka', 'Estimasi komisi kompetitor', 'Alert perubahan strategi'],
      },
    ],
  },
  {
    id: 'komunitas',
    label: 'Komunitas',
    emoji: '🌍',
    icon: Users,
    tagline: 'Tidak berperang sendirian',
    items: [
      {
        id: 'event',
        label: 'Event & Challenge',
        short: 'Event',
        emoji: '📅',
        icon: CalendarDays,
        desc: 'Turnamen komisi berhadiah — kompetisi mingguan & bulanan',
        status: 'soon',
        progress: 15,
        features: ['Challenge komisi mingguan', 'Hadiah cash & bonus program', 'Leaderboard event', 'Sesi live bareng pakar'],
      },
      {
        id: 'squad',
        label: 'Tim & Squad',
        short: 'Squad',
        emoji: '🤝',
        icon: Users,
        desc: 'Bangun pasukan affiliate — share strategi, saling naikkan komisi',
        status: 'soon',
        progress: 8,
        features: ['Form squad 5 orang', 'Chat room squad', 'Target squad bersama', 'Papan peringkat squad'],
      },
      {
        id: 'panduan',
        label: 'Panduan Memulai',
        short: 'Mulai',
        emoji: '🧭',
        icon: Compass,
        desc: 'Baru di dunia affiliate? Ini langkah pertama yang paling aman',
        status: 'soon',
        progress: 35,
        features: ['Checklist hari ke-1 sampai 7', 'Pilih niche dengan framework', 'Setup akun TikTok & Shopee', 'Komisi pertama dalam 14 hari'],
      },
    ],
  },
  {
    id: 'command',
    label: 'Command Center',
    emoji: '👑',
    icon: Crown,
    tagline: 'Kendali penuh armada',
    items: [
      {
        id: 'admin',
        label: 'Admin Sakti',
        short: 'Admin',
        emoji: '👑',
        icon: Crown,
        desc: 'KPI global, kurasi program, AI insight & monitoring sistem',
        status: 'ready',
        gold: true,
        badge: 'OMEGA',
      },
    ],
  },
]

// ============ HELPERS ============

/** Semua item menu dalam satu list datar (urut sesuai grup). */
export const ALL_ITEMS: MenuItem[] = MENU.flatMap((g) => g.items)

/** Cari item berdasarkan id. */
export function findItem(id: string): MenuItem | undefined {
  return ALL_ITEMS.find((i) => i.id === id)
}

/** Cari grup pemilik item (untuk breadcrumb di coming soon). */
export function findGroupOf(itemId: string): MenuGroup | undefined {
  return MENU.find((g) => g.items.some((i) => i.id === itemId))
}

/** Item yang sudah siap — untuk bottom nav mobile & quick link. */
export const READY_ITEMS: MenuItem[] = ALL_ITEMS.filter((i) => i.status === 'ready')

/** Jumlah modul dalam pengerjaan. */
export const SOON_COUNT = ALL_ITEMS.filter((i) => i.status === 'soon').length
