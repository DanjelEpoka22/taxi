'use client';

import { useApp } from '../lib/context';

export default function Footer() {
  const { t, settings } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-20">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="10" fill="var(--accent)" />
                <path d="M9 24l2.5-7.5A3 3 0 0 1 14.3 14.5h11.4a3 3 0 0 1 2.8 2l2.5 7.5v6a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1H12.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 8.5 30v-6z" fill="#0B1120" />
              </svg>
              <span className="font-display font-bold">Taxi Elbasan</span>
            </div>
            <p className="text-sm text-[var(--muted)] mt-4 leading-relaxed">{t('footer_areas')}</p>
          </div>
          <div className="text-sm text-[var(--muted)] space-y-2">
            <p className="font-mono">{settings?.phone_number}</p>
            <p className="font-mono">{settings?.email}</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted)] flex flex-col sm:flex-row justify-between gap-2">
          <span>© {year} Taxi Elbasan. {t('footer_rights')}</span>
        </div>
      </div>
    </footer>
  );
}
