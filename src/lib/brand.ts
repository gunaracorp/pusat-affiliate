/**
 * ============================================================
 *  PUSATAFFILIATE — BRAND SSOT (Single Source of Truth)
 * ============================================================
 *  Satu file untuk SEMUA identitas brand: nama tim, gelar,
 *  perusahaan pendukung, dan sosial media resmi.
 *
 *  Dipakai oleh:
 *  • src/app/layout.tsx      → metadata + JSON-LD structured data
 *  • src/app/robots.ts       → sitemap kanonik
 *  • src/components/pa/*     → footer, pita kredit, ikon sosial
 *  • sitemap / OG / Twitter card
 *
 *  ⚡ SEO: ganti handle sosial di sini → seluruh situs ikut.
 * ============================================================
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://topkonsultan.web.id";

export const SITE_NAME = "PUSATAFFILIATE";

/** Identitas kreator & tim brand */
export const BRAND = {
  /** Kreator utama */
  founder: "Gugun Gunara",
  /** Ko-kreator */
  coFounder: "Muhammad Lutfi Azmi",
  /** Tim brand binaan */
  brands: ["Prabudanling", "Santri Angon"] as const,

  /** Gelar kebanggaan — tampil di footer, JSON-LD & metadata */
  titles: [
    "Master Polymath",
    "Sage Universal",
    "The Ultimate Problem Solver",
  ] as const,
  titlesLine: "Master Polymath · Sage Universal · The Ultimate Problem Solver",

  /** Perusahaan pendukung / support system */
  companies: [
    {
      name: "PT Top Konsultan Internasional",
      domain: "topkonsultan.web.id",
      url: "https://topkonsultan.web.id",
    },
    {
      name: "PT Digital Bisnis Manajemen",
      domain: "digiman.id",
      url: "https://digiman.id",
    },
  ] as const,

  /**
   * Sosial media resmi Gugun Gunara.
   * ⚡ SEO: URL ini diinject ke `sameAs` JSON-LD Person →
   * Google mengaitkan nama ↔ profil & berpeluang membentuk
   * Knowledge Panel di hasil pencarian.
   */
  socials: [
    {
      label: "Facebook",
      handle: "bossdanling",
      url: "https://www.facebook.com/bossdanling",
    },
    {
      label: "X (Twitter)",
      handle: "gunzz_krenzz",
      url: "https://x.com/gunzz_krenzz",
    },
    {
      label: "Instagram",
      handle: "prabudanling",
      url: "https://www.instagram.com/prabudanling",
    },
    {
      label: "TikTok",
      handle: "gunaracorp",
      url: "https://www.tiktok.com/@gunaracorp",
    },
    {
      label: "Threads",
      handle: "prabudanling",
      url: "https://www.threads.net/@prabudanling",
    },
  ] as const,

  /** Semua URL profil — untuk JSON-LD sameAs (Person & Organization) */
  get allProfileUrls(): string[] {
    return [
      ...this.socials.map((s) => s.url),
      ...this.companies.map((c) => c.url),
      SITE_URL,
    ];
  },
} as const;

/** Baris kredit singkat satu kalimat (dipakai README & footer) */
export const BRAND_CREDIT_LINE =
  `by ${BRAND.founder} — bersama ${BRAND.coFounder} · ${BRAND.brands.join(" · ")} — didukung ` +
  BRAND.companies.map((c) => `${c.name} (${c.domain})`).join(" & ");
