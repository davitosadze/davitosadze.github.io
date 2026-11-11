import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/fraunces';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { siteConfig } from '@/config/site';
import { pageMetadata } from '@/config/metadata';
export const metadata: Metadata = {
  ...pageMetadata('Balance Keeper – Weight & Balance Puzzle Game', siteConfig.description, '/'),
  icons: { icon: '/icons/favicon.svg', apple: '/icons/apple-touch-icon.png' },
  robots: { index: !!siteConfig.url, follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
