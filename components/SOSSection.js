'use client';

import { useApp } from '../lib/context';

export default function SOSSection() {
  const { t, settings } = useApp();
  const phone = settings?.phone_number || '+355691234567';

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[var(--on-accent)]">
      <div>
        <h3 className="font-display font-bold text-2xl md:text-3xl">{t('sos_title')}</h3>
      </div>
      <a
        href={`tel:${phone}`}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0B1120] text-white font-bold text-lg shrink-0 hover:scale-105 transition-transform"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2.9z"/></svg>
        {t('sos_cta')}
      </a>
    </div>
  );
}
