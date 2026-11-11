import Link from 'next/link';
import { Brand } from './brand';
import { siteConfig } from '@/config/site';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" aria-label="Balance Keeper home">
          <Brand />
        </Link>
        <p>A little thought. A perfect balance.</p>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/privacy/">Privacy Policy</Link>
          <Link href="/support/">Support</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Balance Keeper. All rights reserved.</span>
        {siteConfig.supportEmail ? (
          <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>
        ) : (
          <span>Made for the moments between.</span>
        )}
      </div>
    </footer>
  );
}
