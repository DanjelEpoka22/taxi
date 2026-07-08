'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';
import { findDestination, formatPrice } from '../lib/pricing';
import { buildWhatsAppLink } from '../lib/whatsapp';

export default function FareEstimator() {
  const { t, lang, destinations, currency, settings } = useApp();
  const [slug, setSlug] = useState('');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePhone, setQuotePhone] = useState('');

  const dest = findDestination(destinations, slug);

  function nameOf(d) {
    return lang === 'en' ? d.name_en : lang === 'it' ? d.name_it : d.name_al;
  }

  function sendQuoteRequest() {
    const text = `${lang === 'en' ? 'Quote request' : lang === 'it' ? 'Richiesta preventivo' : 'Kërkesë oferte'}: Elbasan → ${dest ? nameOf(dest) : '?'}. ${lang === 'en' ? 'Phone' : lang === 'it' ? 'Telefono' : 'Telefoni'}: ${quotePhone}`;
    const link = buildWhatsAppLink(settings?.whatsapp_number || '355691234567', text);
    window.open(link, '_blank', 'noopener,noreferrer');
    setQuoteOpen(false);
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      <h3 className="font-display font-bold text-xl mb-1">{t('distance_title')}</h3>
      <p className="text-sm text-[var(--muted)] mb-5">{t('booking_sub')}</p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs font-semibold text-[var(--muted)]">{t('quick_from')}</label>
            <div className="mt-1 px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] font-mono text-sm">Elbasan</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" className="mt-5 shrink-0"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          <div className="flex-1">
            <label className="text-xs font-semibold text-[var(--muted)]">{t('quick_to')}</label>
            <select value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm">
              <option value="">{t('distance_select')}</option>
              {destinations.map((d) => <option key={d.slug} value={d.slug}>{nameOf(d)}</option>)}
            </select>
          </div>
        </div>
        <button onClick={() => setQuoteOpen(true)} className="px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm whitespace-nowrap">
          {t('quote_cta')}
        </button>
      </div>

      {dest && (
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-[var(--surface-2)] py-4">
            <div className="font-display font-bold text-2xl">{dest.distance_km}</div>
            <div className="text-xs text-[var(--muted)]">{t('distance_km')}</div>
          </div>
          <div className="rounded-lg bg-[var(--surface-2)] py-4">
            <div className="font-display font-bold text-2xl">{dest.duration_min}</div>
            <div className="text-xs text-[var(--muted)]">{t('distance_duration')}</div>
          </div>
          <div className="rounded-lg bg-[var(--surface-2)] py-4">
            <div className="font-display font-bold text-2xl text-[var(--accent)]">{formatPrice(dest.price_eur, currency, settings?.eur_to_all_rate)}</div>
            <div className="text-xs text-[var(--muted)]">{t('distance_price')}</div>
          </div>
        </div>
      )}

      {quoteOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4" onClick={() => setQuoteOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-6">
            <h4 className="font-display font-bold text-lg mb-4">{t('quote_title')}</h4>
            <label className="text-xs font-semibold text-[var(--muted)]">{t('quick_phone')}</label>
            <input value={quotePhone} onChange={(e) => setQuotePhone(e.target.value)} type="tel" className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" autoFocus />
            <button onClick={sendQuoteRequest} disabled={!quotePhone} className="mt-4 w-full py-2.5 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm disabled:opacity-40">
              {t('send_whatsapp')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
