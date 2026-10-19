'use client'

/**
 * ============================================================
 *  PUSATAFFILIATE — SOCIAL ROW (branding SEO on-page)
 * ============================================================
 *  Baris ikon sosial media resmi Gugun Gunara.
 *  Data ditarik dari src/lib/brand.ts (SSOT).
 *
 *  SEO: setiap link memakai rel="me noopener noreferrer" —
 *  rel="me" adalah standar verifikasi kepemilikan profil
 *  (IndieWeb / GitHub profile convention) yang juga dibaca
 *  mesin pencari untuk mengaitkan situs ↔ profil sosial.
 * ============================================================
 */

import { Facebook, Instagram, Twitter } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BRAND } from '@/lib/brand'
import { cn } from '@/lib/utils'

/* ---------- Ikon brand tanpa padanan Lucide ---------- */

export function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

export function ThreadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.063 1.066.963 1.769 2.248 1.769l.098-.003c1.754-.098 2.857-1.041 3.055-3.948a12 12 0 0 0-1.746.018Z" />
    </svg>
  )
}

/* ---------- Pemetaan label → ikon ---------- */

const ICONS: Record<string, LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Facebook,
  'X (Twitter)': Twitter,
  Instagram,
  TikTok: TikTokIcon,
  Threads: ThreadsIcon,
}

/* ---------- SocialRow ---------- */

export function SocialRow({ className }: { className?: string }) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-2.5', className)} aria-label="Sosial media resmi Gugun Gunara">
      {BRAND.socials.map((s) => {
        const Icon = ICONS[s.label]
        if (!Icon) return null
        return (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`${s.label} — Gugun Gunara (@${s.handle.replace('@', '')})`}
              title={`${s.label} · @${s.handle.replace('@', '')}`}
              className="glass-hover flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:outline-none"
            >
              {typeof Icon === 'string' ? null : (
                /* Ikon brand custom (TikTok/Threads) berbasis fill; ikon Lucide berbasis stroke */
                <Icon
                  className={cn('h-4 w-4', (s.label === 'TikTok' || s.label === 'Threads') && 'fill-current')}
                />
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
