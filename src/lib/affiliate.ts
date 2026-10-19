// ============ SHARED TYPES & API CLIENT — PUSATAFFILIATE ============
// File kontrak tunggal untuk semua komponen frontend.

export interface AffiliateProgram {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  icon: string
  commissionMin: number
  commissionMax: number
  commissionType: 'percent' | 'fixed' | 'recurring'
  commissionNote: string
  cookieDuration: number
  paymentThreshold: number
  network: string
  tier: 'S+' | 'S' | 'A' | 'B'
  difficulty: string
  avgOrderValue: number
  conversionRate: number
  gravity: number
  featured: boolean
  trendingScore: number
  color: string
  description: string
  strategy: string
  joinUrl: string
}

export interface CourseModule {
  title: string
  minutes: number
  summary: string
  keyPoints: string[]
}

export interface Course {
  id: string
  slug: string
  title: string
  level: string
  track: string
  duration: number
  lessons: number
  students: number
  rating: number
  xp: number
  icon: string
  description: string
  modules: string // JSON string of CourseModule[]
  order: number
}

export interface AffiliateUser {
  id: string
  name: string
  tier: string
  earnings: number
  clicks: number
  conversions: number
  specialty: string
  country: string
  growth: number
}

export interface PlatformStat {
  id: string
  key: string
  label: string
  value: number
  unit: string
  delta: number
}

export interface TrackedLink {
  id: string
  code: string
  name: string
  programSlug: string
  channel: string
  targetUrl: string
  clicks: number
  conversions: number
  earnings: number
  createdAt: string
}

export interface ActivityLog {
  id: string
  type: string
  message: string
  amount: number | null
  createdAt: string
}

export interface AdminOverview {
  kpi: { key: string; label: string; value: number; unit: string; delta: number }[]
  revenueSeries: { date: string; clicks: number; conversions: number; revenue: number }[]
  categoryMix: { category: string; count: number; avgCommission: number }[]
  topPrograms: { slug: string; name: string; icon: string; clicks: number; earnings: number; conversionRate: number }[]
  topLinks: TrackedLink[]
  activities: ActivityLog[]
  systemStatus: { cpu: number; memory: number; network: number; aiLoad: number; uptime: string; nodes: number }
}

// ---------- helpers ----------
export function fmtUSD(n: number, compact = false): string {
  if (compact) {
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
    if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(2)}M`
    if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(1)}K`
    return `$${n.toFixed(0)}`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: n % 1 === 0 ? 0 : 2 }).format(n)
}

export function fmtIDR(n: number, compact = false): string {
  if (compact) {
    if (Math.abs(n) >= 1e9) return `Rp${(n / 1e9).toFixed(2)}M`
    if (Math.abs(n) >= 1e6) return `Rp${(n / 1e6).toFixed(1)}jt`
    if (Math.abs(n) >= 1e3) return `Rp${(n / 1e3).toFixed(0)}rb`
    return `Rp${n}`
  }
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)
}

export function fmtNum(n: number, compact = false): string {
  if (compact) {
    if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(2)}M`
    if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(2)}jt`
    if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(1)}rb`
    return `${n}`
  }
  return new Intl.NumberFormat('id-ID').format(Math.round(n))
}

export const CATEGORY_LABELS: Record<string, string> = {
  ecommerce: 'E-Commerce',
  travel: 'Travel',
  finance: 'Finansial',
  saas: 'SaaS & Tools',
  digital: 'Produk Digital',
  network: 'Network',
}

export const TIER_COLORS: Record<string, string> = {
  'S+': 'border-amber-400/60 text-amber-300 bg-amber-400/10',
  S: 'border-emerald-400/60 text-emerald-300 bg-emerald-400/10',
  A: 'border-violet-400/60 text-violet-300 bg-violet-400/10',
  B: 'border-zinc-400/50 text-zinc-300 bg-zinc-400/10',
}

// ---------- API client ----------
async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error || `Request gagal (${res.status})`)
  }
  return res.json() as Promise<T>
}

export const api = {
  getPrograms: (params?: { search?: string; category?: string; tier?: string; sort?: string; featured?: string }) => {
    const q = new URLSearchParams()
    if (params?.search) q.set('search', params.search)
    if (params?.category && params.category !== 'all') q.set('category', params.category)
    if (params?.tier && params.tier !== 'all') q.set('tier', params.tier)
    if (params?.sort) q.set('sort', params.sort)
    if (params?.featured) q.set('featured', '1')
    const qs = q.toString()
    return jsonFetch<{ programs: AffiliateProgram[] }>(`/api/programs${qs ? `?${qs}` : ''}`)
  },
  getCourses: () => jsonFetch<{ courses: Course[] }>('/api/courses'),
  getLeaderboard: () => jsonFetch<{ users: AffiliateUser[] }>('/api/leaderboard'),
  getStats: () => jsonFetch<{ stats: PlatformStat[] }>('/api/stats'),
  getLinks: () => jsonFetch<{ links: TrackedLink[] }>('/api/links'),
  createLink: (data: { name: string; programSlug: string; channel: string; targetUrl: string }) =>
    jsonFetch<{ link: TrackedLink }>('/api/links', { method: 'POST', body: JSON.stringify(data) }),
  deleteLink: (id: string) => jsonFetch<{ ok: boolean }>(`/api/links?id=${id}`, { method: 'DELETE' }),
  simulateClick: (id: string) =>
    jsonFetch<{ link: TrackedLink; converted: boolean }>(`/api/links/click`, { method: 'POST', body: JSON.stringify({ id }) }),
  adminOverview: () => jsonFetch<AdminOverview>('/api/admin/overview'),
  adminAddProgram: (data: Partial<AffiliateProgram>) =>
    jsonFetch<{ program: AffiliateProgram }>('/api/admin/programs', { method: 'POST', body: JSON.stringify(data) }),
  adminDeleteProgram: (id: string) => jsonFetch<{ ok: boolean }>(`/api/admin/programs?id=${id}`, { method: 'DELETE' }),
  aiGenerate: (data: { mode: 'script' | 'caption' | 'hook' | 'strategy'; topic: string; platform?: string; tone?: string; program?: string }) =>
    jsonFetch<{ result: string }>('/api/ai', { method: 'POST', body: JSON.stringify(data), signal: undefined }),
}
