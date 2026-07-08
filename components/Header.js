'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';
import { languages } from '../lib/i18n';

function IconSun() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function IconMoon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function Header() {
  const { lang, setLang, currency, setCurrency, dark, setDark, settings, t } = useApp();
  const [open, setOpen] = useState(false);

  const navItems = [
    { key: 'nav_destinations', href: '#destinations' },
    { key: 'nav_pricing', href: '#pricing' },
    { key: 'nav_reviews', href: '#reviews' },
    { key: 'nav_faq', href: '#faq' },
    { key: 'nav_contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[var(--bg)]/85 border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="var(--accent)" />
            <path d="M9 24l2.5-7.5A3 3 0 0 1 14.3 14.5h11.4a3 3 0 0 1 2.8 2l2.5 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1H12.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 8.5 30v-6z" fill="#0B1120" />
            <circle cx="13" cy="26" r="1.8" fill="var(--accent)" />
            <circle cx="27" cy="26" r="1.8" fill="var(--accent)" />
          </svg>
          <span className="font-display font-bold text-lg tracking-tight">Taxi Luli</span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className="hover:text-[var(--fg)] transition-colors">
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center rounded-full border border-[var(--border)] p-1 gap-0.5">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 text-xs font-semibold rounded-full transition-colors ${lang === l.code ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'text-[var(--muted)] hover:text-[var(--fg)]'}`}
                aria-label={`Switch language to ${l.label}`}
              >
                {l.flag}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrency(currency === 'EUR' ? 'ALL' : 'EUR')}
            className="px-3 py-1.5 rounded-full border border-[var(--border)] text-xs font-semibold hover:border-[var(--accent)] transition-colors"
          >
            {currency === 'EUR' ? '€ EUR' : 'L ALL'}
          </button>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
            aria-label="Toggle dark mode"
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>

          <a
            href="#booking"
            className="ml-1 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-sm font-bold hover:bg-[var(--accent-2)] transition-colors"
          >
            {t('nav_book')}
          </a>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border)] px-5 py-4 flex flex-col gap-4 bg-[var(--bg)]">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium">
              {t(item.key)}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 text-xs font-semibold rounded-full ${lang === l.code ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'border border-[var(--border)]'}`}
              >
                {l.flag}
              </button>
            ))}
            <button onClick={() => setCurrency(currency === 'EUR' ? 'ALL' : 'EUR')} className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold">
              {currency === 'EUR' ? '€ EUR' : 'L ALL'}
            </button>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-full border border-[var(--border)]">
              {dark ? <IconSun /> : <IconMoon />}
            </button>
          </div>
          <a href="#booking" onClick={() => setOpen(false)} className="px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--on-accent)] text-sm font-bold text-center">
            {t('nav_book')}
          </a>
        </div>
      )}
    </header>
  );
}
