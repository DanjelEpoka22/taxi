'use client';

import { useEffect, useRef, useState } from 'react';
import { useApp } from '../lib/context';

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min(1, (now - start) / duration);
          setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, value];
}

function Counter({ target, suffix, label }) {
  const [ref, value] = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-3xl md:text-4xl text-[var(--accent)]">
        {value.toLocaleString('en-US')}{suffix}
      </div>
      <div className="text-xs text-[var(--muted)] mt-1">{label}</div>
    </div>
  );
}

const REVIEW_QUOTES = [
  { al: 'Shofer shumë i sjellshëm, erdhi para kohe në aeroport. Rekomandoj!', en: 'Very polite driver, arrived early at the airport. Recommend!', it: 'Autista molto gentile, arrivato in anticipo in aeroporto. Consiglio!', name: 'A. Hoxha' },
  { al: 'Çmim i drejtë dhe makina shumë e pastër. Do e përdor prap.', en: 'Fair price and a very clean car. Will use again.', it: 'Prezzo giusto e macchina pulitissima. Lo userò di nuovo.', name: 'E. Kola' },
  { al: 'Komunikim i shpejtë në WhatsApp, rezervimi u bë brenda 2 minutash.', en: 'Fast communication on WhatsApp, booking took 2 minutes.', it: 'Comunicazione rapida su WhatsApp, prenotazione in 2 minuti.', name: 'M. Sinani' },
];

export default function TrustSection() {
  const { t, lang, settings } = useApp();

  return (
    <div className="space-y-14">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-xl">{t('reviews_title')}</h3>
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <span className="text-[var(--accent)]">{'★'.repeat(5)}</span>
            <span>{settings?.rating || 4.9}/5</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {REVIEW_QUOTES.map((r) => (
            <div key={r.name} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <div className="text-[var(--accent)] text-sm mb-2">{'★'.repeat(5)}</div>
              <p className="text-sm leading-relaxed">{lang === 'en' ? r.en : lang === 'it' ? r.it : r.al}</p>
              <p className="text-xs text-[var(--muted)] mt-3 font-semibold">{r.name}</p>
            </div>
          ))}
        </div>
        <a href={settings?.google_reviews_url || '#'} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm font-semibold text-[var(--accent)] underline">
          {t('reviews_google')}
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4 py-8 border-y border-[var(--border)]">
        <Counter target={settings?.trips_count || 7800} suffix="+" label={t('hero_stat_trips')} />
        <Counter target={settings?.happy_percent || 98} suffix="%" label={t('hero_stat_happy')} />
        <Counter target={1200} suffix="+" label={lang === 'en' ? 'WhatsApp Bookings' : lang === 'it' ? 'Prenotazioni WhatsApp' : 'Rezervime në WhatsApp'} />
      </div>
    </div>
  );
}
