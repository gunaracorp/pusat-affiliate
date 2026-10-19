import type { MetadataRoute } from 'next'

/** Domain kanonik — override lewat env NEXT_PUBLIC_SITE_URL bila deploy ke domain lain. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://topkonsultan.web.id'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
