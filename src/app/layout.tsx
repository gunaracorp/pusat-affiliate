import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

/**
 * ============================================================
 *  PUSATAFFILIATE — ROOT LAYOUT + SEO BRANDING
 * ============================================================
 *  Branding & kepemilikan (credits):
 *  • Created by      : Gugun Gunara
 *  • Co-creator      : Muhammad Lutfi Azmi
 *  • Brand tim       : Prabudanling · Santri Angon
 *  • Support system  : PT Top Konsultan Internasional (topkonsultan.web.id)
 *  • Support system  : PT Digital Bisnis Manajemen (digiman.id)
 *
 *  Domain kanonik dapat dioverride lewat env NEXT_PUBLIC_SITE_URL.
 * ============================================================
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://topkonsultan.web.id";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "PUSATAFFILIATE";
const SITE_TAGLINE =
  "Platform belajar & eksekusi affiliate marketing #1 — TikTok Shop, Shopee, Amazon, ClickBank & 500+ brand raksasa dunia. AI Studio, Link Tracker, Kalkulator Komisi, dan Super Admin Dashboard Web 6.0.";

const CREATORS = {
  founder: "Gugun Gunara",
  coFounder: "Muhammad Lutfi Azmi",
  brands: ["Prabudanling", "Santri Angon"],
  companyTop: "PT Top Konsultan Internasional",
  companyTopUrl: "https://topkonsultan.web.id",
  companyDigi: "PT Digital Bisnis Manajemen",
  companyDigiUrl: "https://digiman.id",
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
        url: SITE_URL,
        jobTitle: "Founder & Chief Architect PUSATAFFILIATE",
        description:
          "Kreator dan pengembang utama PUSATAFFILIATE — platform belajar & eksekusi affiliate marketing Web 6.0.",
        worksFor: [
          { "@id": `${SITE_URL}/#organization-top-konsultan` },
          { "@id": `${SITE_URL}/#organization-digiman` },
        ],
        knowsAbout: [
          "Affiliate Marketing",
          "TikTok Shop Affiliate",
          "Shopee Affiliate",
          "Digital Business",
        ],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person-muhammad-lutfi-azmi`,
        name: "Muhammad Lutfi Azmi",
        url: CREATORS.companyDigiUrl,
        jobTitle: "Co-Creator PUSATAFFILIATE",
        worksFor: [{ "@id": `${SITE_URL}/#organization-digiman` }],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization-top-konsultan`,
        name: CREATORS.companyTop,
        url: CREATORS.companyTopUrl,
        description:
          "Support system PUSATAFFILIATE — platform affiliate by Gugun Gunara.",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization-digiman`,
        name: CREATORS.companyDigi,
        alternateName: "Digiman",
        url: CREATORS.companyDigiUrl,
        description:
          "Support system PUSATAFFILIATE — platform affiliate by Gugun Gunara.",
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
          "Gugun Gunara, Muhammad Lutfi Azmi, Prabudanling, Santri Angon, PT Top Konsultan Internasional, PT Digital Bisnis Manajemen, pusataffiliate, affiliate marketing",
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
