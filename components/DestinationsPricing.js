'use client';

import { useApp } from '../lib/context';
import { buildWhatsAppLink } from '../lib/whatsapp';
import { formatPrice } from '../lib/pricing';

export default function DestinationsPricing() {
  const { t, lang, destinations, currency, settings } = useApp();

  function nameOf(d) {
    return lang === 'en' ? d.name_en : lang === 'it' ? d.name_it : d.name_al;
  }

  function linkFor(d) {
    const text = `Taxi Luli → ${nameOf(d)}`;
    return buildWhatsAppLink(settings?.whatsapp_number || '355691234567', text);
  }

  const featured = destinations.filter((d) => d.featured);
  const rest = destinations.filter((d) => !d.featured);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {featured.map((d) => (
          <a
            key={d.slug}
            href={linkFor(d)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)] transition-colors"
          >
            <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">Elbasan → </p>
            <p className="font-display font-bold text-xl mt-1">{nameOf(d)}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-[var(--muted)]">{d.distance_km} {t('distance_km')} · {d.duration_min} {t('distance_duration')}</span>
              <span className="font-display font-bold text-[var(--accent)]">{formatPrice(d.price_eur, currency, settings?.eur_to_all_rate)}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]">
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <h3 className="font-display font-bold text-lg">{t('pricing_title')}</h3>
          <span className="text-xs text-[var(--muted)]">{t('pricing_from')}</span>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {[...featured, ...rest].map((d, i) => (
              <tr key={d.slug} className={i % 2 === 0 ? '' : 'bg-[var(--surface-2)]/50'}>
                <td className="px-6 py-3 font-medium">Elbasan → {nameOf(d)}</td>
                <td className="px-6 py-3 text-[var(--muted)] hidden sm:table-cell">{d.distance_km} {t('distance_km')}</td>
                <td className="px-6 py-3 text-right font-display font-bold text-[var(--accent)]">{formatPrice(d.price_eur, currency, settings?.eur_to_all_rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-6 py-3 text-xs text-[var(--muted)] border-t border-[var(--border)]">{t('pricing_note')}</p>
      </div>
    </div>
  );
}
