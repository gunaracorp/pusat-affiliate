import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PUSATAFFILIATE — Platform Affiliate #1 Dunia | Web 6.0",
  description:
    "Pusat belajar & eksekusi affiliate marketing untuk program komisi tertinggi dunia: TikTok Shop, Shopee, Amazon, ClickBank, dan 500+ brand raksasa. AI Studio, Link Tracker, Kalkulator Komisi, dan Admin Dashboard Web 6.0.",
  keywords: [
    "affiliate marketing", "TikTok Shop Affiliate", "Shopee Affiliate",
    "komisi affiliate", "pusat affiliate", "AI affiliate", "pasif income",
  ],
  authors: [{ name: "PUSATAFFILIATE Labs" }],
  icons: { icon: "/brand/logo.png" },
  openGraph: {
    title: "PUSATAFFILIATE — Jadilah Affiliate Terbesar Yang Pernah Ada",
    description: "Belajar, eksekusi, dan scale komisi affiliate dari perusahaan raksasa dunia.",
    siteName: "PUSATAFFILIATE",
    type: "website",
  },
};

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
      </body>
    </html>
  );
}
