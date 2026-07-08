'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';
import { lookupBookingByPhone } from '../lib/data';

const STAGES = [
  { key: 'pending', label: 'timeline_received' },
  { key: 'confirmed', label: 'timeline_confirmed' },
  { key: 'on_the_way', label: 'timeline_on_way' },
  { key: 'completed', label: 'timeline_completed' },
];

export default function BookingTimeline() {
  const { t } = useApp();
  const [phone, setPhone] = useState('');
  const [booking, setBooking] = useState(undefined); // undefined = not searched yet, null = not found

  async function check() {
    const result = await lookupBookingByPhone(phone);
    setBooking(result);
  }

  const currentIndex = booking ? STAGES.findIndex((s) => s.key === booking.status) : -1;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      <h3 className="font-display font-bold text-xl mb-5">{t('timeline_title')}</h3>

      <div className="flex gap-2 mb-6">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder={t('timeline_lookup_label')}
          className="flex-1 px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm"
        />
        <button onClick={check} className="px-5 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm">
          {t('timeline_lookup_btn')}
        </button>
      </div>

      {booking === null && (
        <p className="text-sm text-[var(--muted)]">{t('timeline_not_found')}</p>
      )}

      <div className="flex justify-between">
        {STAGES.map((stage, i) => (
          <div key={stage.key} className="flex-1 flex flex-col items-center text-center relative">
            {i > 0 && (
              <div className={`absolute top-4 right-1/2 w-full h-0.5 -z-0 ${i <= currentIndex ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />
            )}
            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= currentIndex ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'bg-[var(--surface-2)] text-[var(--muted)]'}`}>
              {i <= currentIndex ? '✓' : i + 1}
            </div>
            <span className="text-[11px] mt-2 text-[var(--muted)] max-w-[80px]">{t(stage.label)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
