import type { Metadata } from 'next';
import { siteConfig } from './site';
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const origin = siteConfig.url || undefined;
  return {
    title,
    description,
    ...(origin ? { alternates: { canonical: `${origin}${path}` } } : {}),
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: siteConfig.name,
      locale: 'en_US',
      ...(origin
        ? {
            url: `${origin}${path}`,
            images: [
              {
                url: `${origin}${siteConfig.socialPreview.image}`,
                width: siteConfig.socialPreview.width,
                height: siteConfig.socialPreview.height,
                alt: siteConfig.socialPreview.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(origin ? { images: [`${origin}${siteConfig.socialPreview.image}`] } : {}),
    },
  };
}
