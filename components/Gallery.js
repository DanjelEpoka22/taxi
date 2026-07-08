'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';

// each slot points to an exact file path under /public/images/. drop a photo
// with that exact filename in and it appears automatically, no code changes
// needed. sizes are the recommended minimum so photos stay sharp.
const SLOTS = [
  { path: '/images/car-exterior.jpg', label_al: 'Makina — jashtë', label_en: 'Car — exterior', size: '1600×1200' },
  { path: '/images/car-interior.jpg', label_al: 'Makina — brenda', label_en: 'Car — interior', size: '1600×1200' },
  { path: '/images/driver.jpg', label_al: 'Shoferi', label_en: 'Driver', size: '1200×1200' },
  { path: '/images/airport-pickup.jpg', label_al: 'Marrja në Aeroport', label_en: 'Airport pickup', size: '1600×1200' },
];

function PhotoSlot({ path, labelAl, labelEn, size, lang }) {
  const [error, setError] = useState(false);
  return (
    <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
      {!error ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={path} alt={lang === 'en' ? labelEn : labelAl} onError={() => setError(true)} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></svg>
          <p className="text-xs text-[var(--muted)] font-mono">{path}</p>
          <p className="text-[11px] text-[var(--muted)]">{lang === 'en' ? labelEn : labelAl} · min {size}</p>
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  const { lang } = useApp();
  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SLOTS.map((s) => (
          <PhotoSlot key={s.path} path={s.path} labelAl={s.label_al} labelEn={s.label_en} size={s.size} lang={lang} />
        ))}
      </div>
      <p className="text-xs text-[var(--muted)] mt-4 font-mono">
        public/images/car-exterior.jpg · car-interior.jpg · driver.jpg · airport-pickup.jpg
      </p>
    </div>
  );
}
