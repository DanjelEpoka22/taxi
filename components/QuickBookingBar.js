'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';
import { buildWhatsAppLink, buildBookingMessage } from '../lib/whatsapp';
import { submitBooking } from '../lib/data';

export default function QuickBookingBar() {
  const { t, lang, settings } = useApp();
  const [form, setForm] = useState({ pickup: 'Elbasan', destination: '', date: '', phone: '' });
  const [expanded, setExpanded] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const message = buildBookingMessage({
      pickup: form.pickup,
      destination: form.destination,
      date: form.date,
      phone: form.phone,
      lang,
    });
    submitBooking({
      name: null,
      phone: form.phone,
      pickup: form.pickup,
      destination: form.destination,
      date: form.date,
      time: null,
      passengers: null,
      luggage: null,
      message: 'quick booking bar',
      status: 'pending',
    });
    const link = buildWhatsAppLink(settings?.whatsapp_number || '355691234567', message);
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-[var(--surface)]/95 backdrop-blur border-t border-[var(--border)] shadow-[0_-8px_30px_rgba(0,0,0,0.25)]">
        {expanded && (
          <form onSubmit={handleSubmit} className="px-4 pt-3 pb-1 grid grid-cols-2 gap-2 text-sm">
            <input
              value={form.pickup}
              onChange={(e) => update('pickup', e.target.value)}
              placeholder={t('quick_from')}
              className="col-span-1 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm"
              required
            />
            <input
              value={form.destination}
              onChange={(e) => update('destination', e.target.value)}
              placeholder={t('quick_to')}
              className="col-span-1 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm"
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              className="col-span-1 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm"
            />
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder={t('quick_phone')}
              className="col-span-1 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm"
              required
            />
            <button type="submit" className="col-span-2 mt-1 mb-2 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm">
              {t('quick_submit')}
            </button>
          </form>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-available animate-pulse-soft" />
            {t('quick_submit')}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
