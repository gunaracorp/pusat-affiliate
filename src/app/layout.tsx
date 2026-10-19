import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { BRAND, SITE_URL, SITE_NAME } from "@/lib/brand";

/**
 * ============================================================
 *  PUSATAFFILIATE — ROOT LAYOUT + SEO BRANDING
 * ============================================================
 *  Branding & kepemilikan (credits):
 *  • Created by      : Gugun Gunara
 *    (Master Polymath · Sage Universal · The Ultimate Problem Solver)
 *  • Co-creator      : Muhammad Lutfi Azmi
 *  • Brand tim       : Prabudanling · Santri Angon
 *  • Support system  : PT Top Konsultan Internasional (topkonsultan.web.id)
 *  • Support system  : PT Digital Bisnis Manajemen (digiman.id)
 *
 *  Sosial media (sameAs → Knowledge Panel Google):
 *  • FB bossdanling · X @gunzz_krenzz · IG @prabudanling
 *  • TikTok @gunaracorp · Threads @prabudanling
 *
 *  Sumber data tunggal: src/lib/brand.ts
 *  Domain kanonik dapat dioverride lewat env NEXT_PUBLIC_SITE_URL.
 * ============================================================
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_TAGLINE =
  "Platform belajar & eksekusi affiliate marketing #1 — TikTok Shop, Shopee, Amazon, ClickBank & 500+ brand raksasa dunia. AI Studio, Link Tracker, Kalkulator Komisi, dan Super Admin Dashboard Web 6.0.";

const CREATORS = {
  companyTop: BRAND.companies[0].name,
  companyTopUrl: BRAND.companies[0].url,
  companyDigi: BRAND.companies[1].name,
  companyDigiUrl: BRAND.companies[1].url,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Platform Affiliate #1 Dunia | by Gugun Gunara`,
    template: `%s | ${SITE_NAME} by Gugun Gunara`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  keywords: [
    // Branding & kepemilikan (SEO nama)
    "Gugun Gunara",
    "Muhammad Lutfi Azmi",
    "Prabudanling",
    "Santri Angon",
    "PT Top Konsultan Internasional",
    "topkonsultan.web.id",
    "PT Digital Bisnis Manajemen",
    "digiman.id",
    "pusataffiliate",
    "pusat affiliate",
    "pusataffiliate by Gugun Gunara",
    // Gelar & reputasi
    "master polymath",
    "sage universal",
    "the ultimate problem solver",
    "Gugun Gunara master polymath",
    // Handle sosial media
    "bossdanling",
    "gunzz_krenzz",
    "gunaracorp",
    "Gugun Gunara bossdanling",
    "Gugun Gunara gunzz_krenzz",
    "Gugun Gunara instagram",
    "Gugun Gunara tiktok",
    // Produk & niche
    "affiliate marketing",
    "TikTok Shop Affiliate",
    "Shopee Affiliate",
    "komisi affiliate",
    "AI affiliate",
    "pasif income",
    "platform affiliate indonesia",
    "affiliate web 6.0",
  ],
  authors: [
    { name: "Gugun Gunara", url: SITE_URL },
    { name: "Muhammad Lutfi Azmi", url: "https://digiman.id" },
  ],
  creator: "Gugun Gunara",
  publisher: `${CREATORS.companyTop} — ${CREATORS.companyDigi}`,
  category: "technology",
  alternates: { canonical: "/" },
  icons: { icon: "/brand/logo.png" },
  openGraph: {
    title: `${SITE_NAME} — Jadilah Affiliate Terbesar Yang Pernah Ada | by Gugun Gunara`,
    description: SITE_TAGLINE,
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/brand/hero.png",
        width: 1344,
        height: 768,
        alt: "PUSATAFFILIATE — Markas belajar & eksekusi affiliate by Gugun Gunara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gunzz_krenzz",
    creator: "@gunzz_krenzz",
    title: `${SITE_NAME} — Platform Affiliate #1 Dunia | by Gugun Gunara`,
    description: SITE_TAGLINE,
    images: ["/brand/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** JSON-LD — Structured data agar Google memahami kepemilikan & entitas:
 *  Person (founder & co-founder), Organization (2 PT pendukung),
 *  WebSite & SoftwareApplication. */
function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person-gugun-gunara`,
        name: "Gugun Gunara",
        alternateName: ["Gugun", "bossdanling", "gunzz_krenzz", "prabudanling", "gunaracorp"],
        url: SITE_URL,
        jobTitle: `Founder & Chief Architect PUSATAFFILIATE — ${BRAND.titlesLine}`,
        honorificPrefix: "Master Polymath",
        description:
          "Master Polymath, Sage Universal, dan The Ultimate Problem Solver. Kreator & arsitek utama PUSATAFFILIATE — platform belajar & eksekusi affiliate marketing Web 6.0, didukung PT Top Konsultan Internasional dan PT Digital Bisnis Manajemen.",
        worksFor: [
          { "@id": `${SITE_URL}/#organization-top-konsultan` },
          { "@id": `${SITE_URL}/#organization-digiman` },
        ],
        sameAs: BRAND.allProfileUrls,
        knowsAbout: [
          "Affiliate Marketing",
          "TikTok Shop Affiliate",
          "Shopee Affiliate",
          "Digital Business",
          "Business Strategy",
          "Content Creation",
          "Problem Solving",
          "Digital Transformation",
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person-muhammad-lutfi-azmi`,
        name: "Muhammad Lutfi Azmi",
        url: CREATORS.companyDigiUrl,
        jobTitle: "Co-Creator PUSATAFFILIATE",
        worksFor: [{ "@id": `${SITE_URL}/#organization-digiman` }],
        sameAs: [CREATORS.companyDigiUrl, SITE_URL],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization-top-konsultan`,
        name: CREATORS.companyTop,
        url: CREATORS.companyTopUrl,
        description:
          "Support system PUSATAFFILIATE — platform affiliate by Gugun Gunara (Master Polymath).",
        founder: { "@id": `${SITE_URL}/#person-gugun-gunara` },
        sameAs: [CREATORS.companyTopUrl, SITE_URL, ...BRAND.socials.map((s) => s.url)],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization-digiman`,
        name: CREATORS.companyDigi,
        alternateName: ["Digiman", "digiman.id"],
        url: CREATORS.companyDigiUrl,
        description:
          "Support system PUSATAFFILIATE — platform affiliate by Gugun Gunara (Master Polymath).",
        founder: { "@id": `${SITE_URL}/#person-muhammad-lutfi-azmi` },
        sameAs: [CREATORS.companyDigiUrl, SITE_URL, ...BRAND.socials.map((s) => s.url)],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} — by Gugun Gunara`,
        alternateName: ["Pusat Affiliate", "PUSATAFFILIATE"],
        description: SITE_TAGLINE,
        inLanguage: "id-ID",
        author: { "@id": `${SITE_URL}/#person-gugun-gunara` },
        creator: { "@id": `${SITE_URL}/#person-gugun-gunara` },
        publisher: { "@id": `${SITE_URL}/#organization-top-konsultan` },
        keywords:
          "Gugun Gunara, Muhammad Lutfi Azmi, Prabudanling, Santri Angon, PT Top Konsultan Internasional, PT Digital Bisnis Manajemen, pusataffiliate, affiliate marketing, master polymath, sage universal, the ultimate problem solver, bossdanling, gunzz_krenzz, gunaracorp",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        author: { "@id": `${SITE_URL}/#person-gugun-gunara` },
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    ],
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0f0e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
        {/* SEO: structured data kepemilikan — Gugun Gunara & partner */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}
