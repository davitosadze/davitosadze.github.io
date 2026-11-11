'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Brand } from './brand';
import { PlayButton } from './play-button';
const links = [
  { name: 'Game', href: '/#game' },
  { name: 'Features', href: '/#features' },
  { name: 'Screenshots', href: '/#screenshots' },
  { name: 'Support', href: '/support/' },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand-link"
          aria-label="Balance Keeper home"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="header-cta">
          <PlayButton compact />
        </div>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          <span className={open ? 'open' : ''} />
          <span className={open ? 'open' : ''} />
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false);
              document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
            }
          }}
        >
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setOpen(false)}>
              {link.name}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <PlayButton />
        </nav>
      )}
    </header>
  );
}
