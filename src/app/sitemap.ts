import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return ['', '/privacy/', '/support/'].map((path) => ({
    url: `${siteConfig.url}${path || '/'}`,
    changeFrequency: 'monthly',
    priority: path ? 0.5 : 1,
  }));
}
