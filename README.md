<div align="center">

<img src="public/brand/logo.png" alt="PUSATAFFILIATE Logo" width="110" />

# ⚡ PUSATAFFILIATE

### The Affiliate Empire Command Center — Learn, Execute, Scale.

**Markas belajar & eksekusi affiliate komisi tertinggi dunia. Satu platform, satu tujuan: ratusan juta dollar.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Prisma 6](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](#-license)

**🌐 Language / Bahasa:** [**English**](#-about-the-project) · [**Bahasa Indonesia**](#-tentang-proyek-ini)

</div>

---

## 📖 About the Project

**PUSATAFFILIATE** is an all-in-one *learning + execution* platform for affiliate marketers, built around the highest-commission programs on earth — **TikTok Shop, Shopee, Amazon, ClickBank, Lazada, Involve Asia, Binance, and more**.

It combines:

- 🏦 A **curated program marketplace** with commission, EPC, gravity & conversion benchmarks
- 🎓 A **gamified academy** with XP, ranks and progress tracking
- ⚔️ An **execution arsenal**: AI content studio, commission calculator, and link tracker with conversion simulation
- 👑 A **super admin dashboard**: global KPIs, revenue charts, program curation & AI insights

> **Note:** This is a demonstration/education platform. All commission statistics, EPC figures and leaderboard numbers are simulated demo data — real results depend on actual execution and each brand's official program terms.

### ✨ Feature Modules — 6 Groups · 20 Modules

| # | Group | Module | Status | Description |
|---|-------|--------|--------|-------------|
| 1 | 🏠 **Utama** | Beranda | 🟢 LIVE | Central dashboard: stats, features, featured programs, hall of fame |
| 2 | 🏠 **Utama** | Leaderboard | 🟡 SOON | Global affiliate hall of fame |
| 3 | 🏠 **Utama** | Statistik Global | 🟡 SOON | Real-time market data: trends, EPC benchmarks, niche heat |
| 4 | 🏦 **Pasar** | Marketplace | 🟢 LIVE | 20+ program database: TikTok Shop, Shopee, Amazon, SaaS recurring |
| 5 | 🏦 **Pasar** | Trending & Viral | 🟡 SOON | This week's hot products — catch the wave |
| 6 | 🏦 **Pasar** | Duel Komisi | 🟡 SOON | Side-by-side comparison of 2+ programs |
| 7 | 🏦 **Pasar** | Kurasi S+ | 🟡 SOON | Expert-curated top-tier programs only |
| 8 | 🎓 **Akademi** | Kursus | 🟢 LIVE | 8 courses / 34 modules: TikTok Shop, Shopee, content, SEO, scaling |
| 9 | 🎓 **Akademi** | Playbook Strategi | 🟡 SOON | 50+ battle-tested playbooks |
| 10 | 🎓 **Akademi** | Roadmap $100K | 🟡 SOON | 12-month milestone map from $0 to $100K |
| 11 | 🎓 **Akademi** | Glosarium | 🟡 SOON | 100+ affiliate terms dictionary |
| 12 | ⚔️ **Senjata** | AI Studio | 🟢 LIVE | Council-of-46-experts AI: scripts, captions, hooks & strategies |
| 13 | ⚔️ **Senjata** | Kalkulator | 🟢 LIVE | 12-month compound commission projection with funnel animation |
| 14 | ⚔️ **Senjata** | Tracker Link | 🟢 LIVE | Forge affiliate links, track clicks/conversions/earnings |
| 15 | ⚔️ **Senjata** | Generator Konten | 🟡 SOON | 30-day content calendar + auto captions |
| 16 | ⚔️ **Senjata** | Spy Kompetitor | 🟡 SOON | Competitor intelligence radar |
| 17 | 🌍 **Komunitas** | Event & Challenge | 🟡 SOON | Weekly & monthly commission tournaments |
| 18 | 🌍 **Komunitas** | Tim & Squad | 🟡 SOON | Build affiliate squads, share strategies |
| 19 | 🌍 **Komunitas** | Panduan Memulai | 🟡 SOON | Day-1-to-7 beginner checklist |
| 20 | 👑 **Command Center** | Admin Sakti | 🟢 LIVE | Super admin: KPIs, curation, AI insights, system monitor |

🟡 *SOON modules are fully wired into navigation and render an elegant "Coming Soon" page — activate one by changing its `status` to `'ready'` in `menu-config.tsx` and registering its view component.*

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (React 19)                         │
│  ┌────────────┬────────────┬───────────┬──────────┬───────────┐  │
│  │  HomeView  │Marketplace │ Academy   │AI Studio │Calculator │  │
│  │            │            │           │          │           │  │
│  │  Tracker   │  AdminView │ ComingSoon│   Shell: header nav,    │  │
│  │            │            │   View    │   bottom nav, sheet,    │  │
│  │            │            │           │   footer sitemap        │  │
│  └────────────┴────────────┴───────────┴──────────┴───────────┘  │
│        menu-config.tsx  →  single source of truth for nav        │
│        framer-motion · recharts · shadcn/ui · Tailwind 4         │
└──────────────────────────────┬───────────────────────────────────┘
                               │  fetch (JSON)
┌──────────────────────────────▼───────────────────────────────────┐
│                    API ROUTES (Next.js App Router)               │
│  /api/programs  /api/courses  /api/leaderboard  /api/stats       │
│  /api/links  /api/links/click  /api/ai                           │
│  /api/admin/overview  /api/admin/programs                        │
└──────────────────────────────┬───────────────────────────────────┘
                               │  Prisma Client
              ┌────────────────▼────────────────┐
              │   SQLite  ←  Prisma ORM (6.x)   │
              │   7 models · seeded demo data   │
              └────────────────┬────────────────┘
                               │  server-side only
              ┌────────────────▼────────────────┐
              │      z-ai-web-dev-sdk (LLM)     │
              │   "Council of 46 experts" AI    │
              └─────────────────────────────────┘
```

**Key architectural decisions**

- **Single-route SPA shell** — all 20 modules live under one `/` route via a typed view registry; module status (`ready` / `soon`) is declared in `menu-config.tsx`, so navigation, mobile sheet, and footer sitemap always stay in sync automatically.
- **API routes, not server actions** — every data operation is an HTTP endpoint, keeping client/server contracts explicit and testable.
- **Probabilistic traffic engine** — `/api/links/click` simulates visitor batches using each program's real `conversionRate` & `avgOrderValue`, writing `ClickEvent` rows for realistic analytics.
- **AI stays server-side** — `z-ai-web-dev-sdk` is imported exclusively in API routes, never in client bundles.

---

## 🧱 Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Next.js 16** (App Router, Turbopack) | Single `/` route, API routes |
| UI Library | **React 19** | Client components with `"use client"` |
| Language | **TypeScript 5** (strict) | No `any`, typed API contracts |
| Styling | **Tailwind CSS 4** | Dark-first futuristic theme |
| Components | **shadcn/ui** (New York) | 45+ components in `src/components/ui` |
| Animation | **framer-motion 12** | View transitions, counters, stagger |
| Charts | **recharts 2** | Revenue area chart, category donut |
| Database | **Prisma 6 + SQLite** | 7 models, file-based DB |
| AI | **z-ai-web-dev-sdk** | LLM generation (server-side only) |
| Icons | **lucide-react** | Consistent iconography |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| [Bun](https://bun.sh) | ≥ 1.1 *(recommended)* or Node.js ≥ 20 |
| Git | any recent |

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd my-project

# 2. Install dependencies
bun install

# 3. Configure environment
cp .env.example .env   # or create .env manually (see below)

# 4. Push the database schema
bun run db:push

# 5. Seed demo data (20 programs, 8 courses, leaderboard, stats)
bun run db:seed

# 6. Start the development server
bun run dev
```

Open **http://localhost:3000** — welcome to the empire. 🏝️

### Environment Variables

Create a `.env` file in the project root:

```dotenv
# Prisma — SQLite database file location
DATABASE_URL="file:./db/custom.db"
```

> No AI API key is required in this sandbox — `z-ai-web-dev-sdk` resolves credentials automatically. If you self-host outside the sandbox, follow the SDK's own credential setup.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `bun run dev` | Start dev server on port **3000** (logs tee'd to `dev.log`) |
| `build` | `bun run build` | Production build (standalone output) |
| `start` | `bun run start` | Run the production standalone server |
| `lint` | `bun run lint` | ESLint (Next.js rules) |
| `db:push` | `bun run db:push` | Push `schema.prisma` to the database |
| `db:generate` | `bun run db:generate` | Generate Prisma Client |
| `db:seed` | `bun run db:seed` | Seed demo data (programs, courses, users, stats) |
| `db:migrate` | `bun run db:migrate` | Create & apply a dev migration |
| `db:reset` | `bun run db:reset` | Reset the database |

---

## 📁 Project Structure

```
my-project/
├── prisma/
│   ├── schema.prisma          # 7 models (see Data Model)
│   └── seed.ts                # Demo data: 20 programs, 8 courses, ...
├── db/
│   └── custom.db              # SQLite database file
├── public/
│   └── brand/                 # logo.png, hero.png
├── src/
│   ├── app/
│   │   ├── api/               # 9 REST endpoints (see API Reference)
│   │   │   ├── admin/overview/ & admin/programs/
│   │   │   ├── ai/            # LLM generation (4 modes)
│   │   │   ├── courses/ · leaderboard/ · stats/
│   │   │   ├── links/ & links/click/   # tracker engine
│   │   │   └── programs/      # marketplace database
│   │   ├── layout.tsx
│   │   ├── globals.css        # design system: neon, glass, orbs...
│   │   └── page.tsx           # renders <MainApp /> (single route)
│   ├── components/
│   │   ├── pa/                # ★ application modules
│   │   │   ├── menu-config.tsx    # ★ SSOT: 6 groups × 20 modules
│   │   │   ├── main-app.tsx       # shell: nav, sheet, footer sitemap
│   │   │   ├── coming-soon.tsx    # placeholder for SOON modules
│   │   │   ├── home.tsx           # hero, stats, ticker, roadmap
│   │   │   ├── marketplace.tsx    # program database + strategy dialog
│   │   │   ├── academy.tsx        # courses, XP, localStorage progress
│   │   │   ├── ai-studio.tsx      # 4-mode AI generator
│   │   │   ├── calculator.tsx     # 12-month compound projection
│   │   │   ├── tracker.tsx        # forge links + traffic simulation
│   │   │   ├── admin.tsx          # super dashboard + curation
│   │   │   └── shared.tsx         # SectionHeader, GlowCard, counters
│   │   └── ui/                # shadcn/ui primitives (45+)
│   └── lib/
│       ├── affiliate.ts       # typed API client + shared interfaces
│       ├── db.ts              # Prisma client singleton
│       └── utils.ts           # cn() helper
└── worklog.md                 # agent development log
```

---

## 🔌 API Reference

Base URL: `http://localhost:3000` · All responses are `application/json`.

### Public

| Method | Endpoint | Query / Body | Response |
|--------|----------|--------------|----------|
| `GET` | `/api/programs` | `?search=&category=&tier=&sort=trending\|commission\|conversion\|gravity\|aov\|newest&featured=1` | `{ programs: AffiliateProgram[] }` |
| `GET` | `/api/courses` | — | `{ courses: Course[] }` |
| `GET` | `/api/leaderboard` | — | `{ users: AffiliateUser[] }` |
| `GET` | `/api/stats` | — | `{ stats: PlatformStat[] }` |
| `GET` | `/api/links` | — | `{ links: TrackedLink[] }` |
| `POST` | `/api/links` | `{ name, programSlug, channel, targetUrl? }` | `{ link: TrackedLink }` |
| `DELETE` | `/api/links` | `?id=<linkId>` | `{ success }` |
| `POST` | `/api/links/click` | `{ code }` | `{ link, converted, batch, newConversions, newEarnings }` |
| `POST` | `/api/ai` | `{ mode: "script"\|"caption"\|"hook"\|"strategy", topic, platform?, tone?, program? }` | `{ result: string }` |

### Admin

| Method | Endpoint | Query / Body | Response |
|--------|----------|--------------|----------|
| `GET` | `/api/admin/overview` | — | `{ kpis, revenueSeries, categoryMix, topPrograms, topLinks, activities, system }` |
| `POST` | `/api/admin/programs` | `{ name*, brand*, icon?, joinUrl?, description?, strategy?, commissionMin?, commissionMax?, tier?, category?, difficulty?, commissionType? }` | `{ program }` |
| `DELETE` | `/api/admin/programs` | `?id=<programId>` | `{ success }` |

**Example — forge a tracked link:**

```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"name":"Review Serum Viral","programSlug":"tiktok-shop-affiliate","channel":"tiktok"}'

# → { "link": { "code": "pa-jv8vm4", ... } }
```

**Example — simulate a visitor batch:**

```bash
curl -X POST http://localhost:3000/api/links/click \
  -H "Content-Type: application/json" \
  -d '{"code":"pa-jv8vm4"}'

# → { "batch": 25, "newConversions": 1, "newEarnings": 1.75, ... }
```

---

## 🗃️ Data Model (Prisma · 7 models)

| Model | Purpose | Key fields |
|-------|---------|-----------|
| `AffiliateProgram` | Program database | `slug`, `commissionMin/Max`, `commissionType` (percent/fixed/recurring), `tier` (S+/S/A/B), `gravity`, `conversionRate`, `avgOrderValue`, `strategy`, `joinUrl` |
| `Course` | Academy catalog | `track`, `level` (Pemula→Legenda), `modules` (JSON), `xp`, `rating`, `duration` |
| `AffiliateUser` | Leaderboard legends | `tier` (Diamond/Platinum/Gold/Silver), `earnings`, `clicks`, `conversions`, `growth` |
| `TrackedLink` | Affiliate links | `code` (unique, e.g. `pa-jv8vm4`), `programSlug`, `channel`, `clicks`, `conversions`, `earnings` |
| `ClickEvent` | Raw click/conversion log | `linkId` (FK, cascade), `converted`, `source`, `device` |
| `PlatformStat` | Hero KPI counters | `key`, `label`, `value`, `unit` (USD/user/click), `delta` |
| `ActivityLog` | Admin activity feed | `type` (payout/user_join/program_added/ai_generated), `message`, `amount` |

---

## 🤖 AI Capabilities

AI Studio & Admin AI Insight are powered by the **"Council of 46 Experts"** system prompt (Indonesian-language master affiliate panel):

| Mode | Output |
|------|--------|
| `script` | Short-video affiliate scripts (TikTok/Reels) with hooks & CTAs |
| `caption` | Platform-ready captions + hashtags |
| `hook` | Scroll-stopping first-2-second hooks |
| `strategy` | 90-day affiliate growth strategies |

> ⚠️ The SDK runs **server-side only** — never import `z-ai-web-dev-sdk` in client components.

---

## 🧭 Navigation Map

```
🏠 Utama ──── Beranda ● / Leaderboard ◌ / Statistik Global ◌
🏦 Pasar ──── Marketplace ● / Trending & Viral ◌ / Duel Komisi ◌ / Kurasi S+ ◌
🎓 Akademi ── Kursus ● / Playbook Strategi ◌ / Roadmap $100K ◌ / Glosarium ◌
⚔️ Senjata ── AI Studio ● / Kalkulator ● / Tracker Link ● / Generator Konten ◌ / Spy Kompetitor ◌
🌍 Komunitas  Event & Challenge ◌ / Tim & Squad ◌ / Panduan Memulai ◌
👑 Command    Admin Sakti ●
              ● = LIVE   ◌ = Coming Soon (elegant placeholder page)
```

**How to activate a SOON module** (one-by-one content fill):

1. Open `src/components/pa/menu-config.tsx` → set the module's `status: 'soon'` → `'ready'`.
2. Build/register its view component in the `VIEWS` registry inside `main-app.tsx`.
3. Done — desktop dropdown, mobile sheet, footer sitemap & page routing update automatically.

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Theme | Dark futurist "Web 6.0" — deep black base |
| Primary | Emerald `emerald-400` (#34d399) — action & money |
| Accent | Gold `amber-300` (#fcd34d) — prestige & Admin tier |
| Support | Violet — AI features |
| Fonts | `font-display` (headings), `font-mono` (data/protocol labels) |
| Effects | `.glass`, `.neon-border`, `.orb`, `.scanline`, `.bg-grid`, `.marquee`, gradient text |
| Numbers | `.tabular` for stable numeric alignment |

Accessibility: semantic HTML (`header`/`nav`/`main`/`footer`), `aria-current`, `aria-label` on icon buttons, keyboard-operable menus, `min-h-screen flex` layout with sticky footer, safe-area insets on mobile.

---

## 🗺️ Roadmap

- [x] Core shell + 6 groups × 20 modules navigation architecture
- [x] Marketplace (20 seeded programs) · Academy (8 courses) · AI Studio · Calculator · Tracker · Super Admin
- [ ] Leaderboard & Statistik Global pages
- [ ] Trending & Viral radar · Duel Komisi comparison
- [ ] Playbook library · Roadmap $100K · Glosarium
- [ ] Content generator · Competitor spy
- [ ] Community: events, squads, onboarding guide

---

## ⚠️ Disclaimer

This platform is for **education & simulation**. Commission statistics, EPC figures, leaderboards and activity feeds are **demonstration data**. Real income depends entirely on your own execution and the official terms of each affiliate program (TikTok Shop, Shopee, Amazon, etc.). Always comply with each program's policies and your local regulations.

## 🤝 Contributing

1. Fork & create a branch (`feat/my-feature`)
2. Commit with clear messages
3. Run `bun run lint` before pushing
4. Open a Pull Request

For module contributions, follow the *"How to activate a SOON module"* guide above — content fills in without touching navigation code.

## 📄 License

Released under the [MIT License](LICENSE).

---

<div align="center">

**PUSATAFFILIATE** · Web 6.0 Protocol · Node Cluster 46/46
*Jakarta / Everywhere — 2045*

⭐ Star this repo if it helped you land your first commission!

</div>

---

<!-- ================= BAHASA INDONESIA ================= -->

## 🇮🇩 Tentang Proyek Ini

**PUSATAFFILIATE** adalah platform *belajar + eksekusi* all-in-one untuk pekerja affiliate, dibangun mengelilingi program-program komisi tertinggi di dunia — **TikTok Shop, Shopee, Amazon, ClickBank, Lazada, Involve Asia, Binance, dan lainnya**.

Platform ini menggabungkan:

- 🏦 **Marketplace program terkurasi** dengan benchmark komisi, EPC, gravity & konversi
- 🎓 **Akademi tergamifikasi** dengan XP, rank, dan pelacakan progres
- ⚔️ **Arsenal eksekusi**: AI Studio konten, kalkulator komisi, dan tracker link dengan simulasi konversi
- 👑 **Super admin dashboard**: KPI global, grafik pendapatan, kurasi program & AI insight

> **Catatan:** Ini adalah platform demonstrasi/edukasi. Semua statistik komisi, angka EPC, dan data leaderboard adalah data demo tersimulasi — hasil nyata bergantung pada eksekusi aktual serta ketentuan resmi program masing-masing brand.

### ✨ Modul Fitur — 6 Grup · 20 Modul

| # | Grup | Modul | Status | Deskripsi |
|---|------|-------|--------|-----------|
| 1 | 🏠 **Utama** | Beranda | 🟢 LIVE | Dashboard pusat: statistik, fitur, program unggulan, hall of fame |
| 2 | 🏠 **Utama** | Leaderboard | 🟡 SOON | Hall of Fame affiliate se-universe |
| 3 | 🏠 **Utama** | Statistik Global | 🟡 SOON | Data pasar real-time: tren, EPC benchmark, suhu niche |
| 4 | 🏦 **Pasar** | Marketplace | 🟢 LIVE | Database 20+ program: TikTok Shop, Shopee, Amazon, SaaS recurring |
| 5 | 🏦 **Pasar** | Trending & Viral | 🟡 SOON | Produk panas minggu ini — kejar wave-nya |
| 6 | 🏦 **Pasar** | Duel Komisi | 🟡 SOON | Bandingkan 2+ program berdampingan |
| 7 | 🏦 **Pasar** | Kurasi S+ | 🟡 SOON | Hanya program terbaik hasil kurasi pakar |
| 8 | 🎓 **Akademi** | Kursus | 🟢 LIVE | 8 kursus / 34 modul: TikTok Shop, Shopee, konten, SEO, scaling |
| 9 | 🎓 **Akademi** | Playbook Strategi | 🟡 SOON | 50+ playbook siap tempur |
| 10 | 🎓 **Akademi** | Roadmap $100K | 🟡 SOON | Peta milestone 12 bulan dari $0 ke $100K |
| 11 | 🎓 **Akademi** | Glosarium | 🟡 SOON | Kamus 100+ istilah affiliate |
| 12 | ⚔️ **Senjata** | AI Studio | 🟢 LIVE | AI dewan 46 pakar: script, caption, hook & strategi |
| 13 | ⚔️ **Senjata** | Kalkulator | 🟢 LIVE | Proyeksi komisi compound 12 bulan dengan animasi funnel |
| 14 | ⚔️ **Senjata** | Tracker Link | 🟢 LIVE | Tempa link affiliate, lacak klik/konversi/komisi |
| 15 | ⚔️ **Senjata** | Generator Konten | 🟡 SOON | Kalender konten 30 hari + caption otomatis |
| 16 | ⚔️ **Senjata** | Spy Kompetitor | 🟡 SOON | Radar intel kompetitor |
| 17 | 🌍 **Komunitas** | Event & Challenge | 🟡 SOON | Turnamen komisi mingguan & bulanan |
| 18 | 🌍 **Komunitas** | Tim & Squad | 🟡 SOON | Bangun squad affiliate, berbagi strategi |
| 19 | 🌍 **Komunitas** | Panduan Memulai | 🟡 SOON | Checklist hari ke-1 sampai ke-7 untuk pemula |
| 20 | 👑 **Command Center** | Admin Sakti | 🟢 LIVE | Super admin: KPI, kurasi, AI insight, monitor sistem |

🟡 *Modul SOON sudah terhubung penuh ke navigasi dan menampilkan halaman "Coming Soon" yang elegan — aktifkan dengan mengubah `status` menjadi `'ready'` di `menu-config.tsx` lalu daftarkan komponen view-nya.*

---

## 🚀 Memulai

### Prasyarat

| Kebutuhan | Versi |
|-----------|-------|
| [Bun](https://bun.sh) | ≥ 1.1 *(disarankan)* atau Node.js ≥ 20 |
| Git | versi terkini |

### Instalasi

```bash
# 1. Clone repositori
git clone <url-repositori>
cd my-project

# 2. Install dependensi
bun install

# 3. Siapkan environment
cp .env.example .env   # atau buat .env manual (lihat bawah)

# 4. Push skema database
bun run db:push

# 5. Isi data demo (20 program, 8 kursus, leaderboard, statistik)
bun run db:seed

# 6. Jalankan development server
bun run dev
```

Buka **http://localhost:3000** — selamat datang di markas. 🏝️

### Variabel Environment

Buat file `.env` di root proyek:

```dotenv
# Prisma — lokasi file database SQLite
DATABASE_URL="file:./db/custom.db"
```

### Script Tersedia

| Script | Perintah | Deskripsi |
|--------|----------|-----------|
| `dev` | `bun run dev` | Jalankan dev server di port **3000** (log ke `dev.log`) |
| `build` | `bun run build` | Build produksi (output standalone) |
| `start` | `bun run start` | Jalankan server produksi standalone |
| `lint` | `bun run lint` | ESLint (aturan Next.js) |
| `db:push` | `bun run db:push` | Push `schema.prisma` ke database |
| `db:generate` | `bun run db:generate` | Generate Prisma Client |
| `db:seed` | `bun run db:seed` | Isi data demo (program, kursus, user, statistik) |
| `db:migrate` | `bun run db:migrate` | Buat & terapkan migrasi dev |
| `db:reset` | `bun run db:reset` | Reset database |

---

## 🔌 Referensi API

Base URL: `http://localhost:3000` · Semua respons berupa `application/json`.

### Publik

| Method | Endpoint | Query / Body | Respons |
|--------|----------|--------------|---------|
| `GET` | `/api/programs` | `?search=&category=&tier=&sort=trending\|commission\|conversion\|gravity\|aov\|newest&featured=1` | `{ programs: AffiliateProgram[] }` |
| `GET` | `/api/courses` | — | `{ courses: Course[] }` |
| `GET` | `/api/leaderboard` | — | `{ users: AffiliateUser[] }` |
| `GET` | `/api/stats` | — | `{ stats: PlatformStat[] }` |
| `GET` | `/api/links` | — | `{ links: TrackedLink[] }` |
| `POST` | `/api/links` | `{ name, programSlug, channel, targetUrl? }` | `{ link: TrackedLink }` |
| `DELETE` | `/api/links` | `?id=<linkId>` | `{ success }` |
| `POST` | `/api/links/click` | `{ code }` | `{ link, converted, batch, newConversions, newEarnings }` |
| `POST` | `/api/ai` | `{ mode: "script"\|"caption"\|"hook"\|"strategy", topic, platform?, tone?, program? }` | `{ result: string }` |

### Admin

| Method | Endpoint | Query / Body | Respons |
|--------|----------|--------------|---------|
| `GET` | `/api/admin/overview` | — | `{ kpis, revenueSeries, categoryMix, topPrograms, topLinks, activities, system }` |
| `POST` | `/api/admin/programs` | `{ name*, brand*, icon?, joinUrl?, description?, strategy?, commissionMin?, commissionMax?, tier?, category?, difficulty?, commissionType? }` | `{ program }` |
| `DELETE` | `/api/admin/programs` | `?id=<programId>` | `{ success }` |

---

## 🗃️ Model Data (Prisma · 7 model)

| Model | Fungsi | Field utama |
|-------|--------|-------------|
| `AffiliateProgram` | Database program | `slug`, `commissionMin/Max`, `commissionType` (percent/fixed/recurring), `tier` (S+/S/A/B), `gravity`, `conversionRate`, `avgOrderValue`, `strategy`, `joinUrl` |
| `Course` | Katalog akademi | `track`, `level` (Pemula→Legenda), `modules` (JSON), `xp`, `rating`, `duration` |
| `AffiliateUser` | Legenda leaderboard | `tier` (Diamond/Platinum/Gold/Silver), `earnings`, `clicks`, `conversions`, `growth` |
| `TrackedLink` | Link affiliate | `code` (unik, mis. `pa-jv8vm4`), `programSlug`, `channel`, `clicks`, `conversions`, `earnings` |
| `ClickEvent` | Log klik/konversi mentah | `linkId` (FK, cascade), `converted`, `source`, `device` |
| `PlatformStat` | Counter KPI hero | `key`, `label`, `value`, `unit` (USD/user/click), `delta` |
| `ActivityLog` | Feed aktivitas admin | `type` (payout/user_join/program_added/ai_generated), `message`, `amount` |

---

## 🧭 Peta Navigasi

```
🏠 Utama ──── Beranda ● / Leaderboard ◌ / Statistik Global ◌
🏦 Pasar ──── Marketplace ● / Trending & Viral ◌ / Duel Komisi ◌ / Kurasi S+ ◌
🎓 Akademi ── Kursus ● / Playbook Strategi ◌ / Roadmap $100K ◌ / Glosarium ◌
⚔️ Senjata ── AI Studio ● / Kalkulator ● / Tracker Link ● / Generator Konten ◌ / Spy Kompetitor ◌
🌍 Komunitas  Event & Challenge ◌ / Tim & Squad ◌ / Panduan Memulai ◌
👑 Command    Admin Sakti ●
              ● = LIVE   ◌ = Coming Soon (halaman placeholder elegan)
```

**Cara mengisi modul SOON** (satu per satu):

1. Buka `src/components/pa/menu-config.tsx` → ubah `status: 'soon'` → `'ready'`.
2. Bangun & daftarkan komponen view-nya di registry `VIEWS` pada `main-app.tsx`.
3. Selesai — dropdown desktop, sheet mobile, footer sitemap & routing halaman ter-update otomatis.

---

## ⚠️ Disclaimer

Platform ini untuk **edukasi & simulasi**. Statistik komisi, angka EPC, leaderboard, dan feed aktivitas adalah **data demonstrasi**. Pendapatan nyata sepenuhnya bergantung pada eksekusi Anda sendiri dan ketentuan resmi tiap program affiliate (TikTok Shop, Shopee, Amazon, dll.). Selalu patuhi kebijakan masing-masing program dan regulasi setempat.

<div align="center">

**PUSATAFFILIATE** · Web 6.0 Protocol · Node Cluster 46/46
*Jakarta / Everywhere — 2045*

</div>
