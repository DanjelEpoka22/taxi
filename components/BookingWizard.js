'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';
import { buildWhatsAppLink, buildBookingMessage } from '../lib/whatsapp';
import { submitBooking } from '../lib/data';
import { applyPromoCode, formatPrice, findDestination } from '../lib/pricing';

const STEPS = ['step_1', 'step_2', 'step_3', 'step_4'];

const initialForm = {
  name: '', phone: '', pickup: 'Elbasan', destination: '', destinationSlug: '',
  date: '', time: '', flightNumber: '',
  passengers: 1, luggage: 0, childSeat: false, petFriendly: false, meetGreet: false,
  recurring: false, promo: '', message: '',
};

export default function BookingWizard() {
  const { t, lang, settings, destinations, currency } = useApp();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [promoResult, setPromoResult] = useState(null);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function selectDestination(slug) {
    const dest = findDestination(destinations, slug);
    if (dest) {
      const name = lang === 'en' ? dest.name_en : lang === 'it' ? dest.name_it : dest.name_al;
      update('destinationSlug', slug);
      update('destination', name);
    } else {
      update('destinationSlug', '');
    }
  }

  function checkPromo() {
    const dest = findDestination(destinations, form.destinationSlug);
    const base = dest?.price_eur || 0;
    setPromoResult(applyPromoCode(base, form.promo));
  }

  function buildMessage() {
    return buildBookingMessage({
      name: form.name, phone: form.phone, pickup: form.pickup, destination: form.destination,
      date: form.date, time: form.time, passengers: form.passengers, luggage: form.luggage,
      message: [form.flightNumber ? `Flight ${form.flightNumber}` : '', form.message].filter(Boolean).join(' — '),
      childSeat: form.childSeat, petFriendly: form.petFriendly, meetGreet: form.meetGreet, recurring: form.recurring,
      lang,
    });
  }

  async function persistBooking() {
    await submitBooking({
      name: form.name, phone: form.phone, pickup: form.pickup, destination: form.destination,
      date: form.date || null, time: form.time || null, passengers: Number(form.passengers) || 1,
      luggage: Number(form.luggage) || 0, message: form.message || null,
      child_seat: form.childSeat, pet_friendly: form.petFriendly, meet_greet: form.meetGreet,
      recurring: form.recurring, promo_code: form.promo || null, flight_number: form.flightNumber || null,
      status: 'pending',
    });
  }

  async function send(channel) {
    await persistBooking();
    const message = buildMessage();

    if (channel === 'whatsapp' || channel === 'both') {
      const link = buildWhatsAppLink(settings?.whatsapp_number || '355691234567', message);
      window.open(link, '_blank', 'noopener,noreferrer');
    }
    if (channel === 'email' || channel === 'both') {
      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message }),
      }).catch(() => {});
    }
    setSent(true);
  }

  const dest = findDestination(destinations, form.destinationSlug);

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-available/20 flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3FAE7A" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <p className="font-display font-bold text-lg">{t('booking_success')}</p>
        <button onClick={() => { setSent(false); setStep(0); setForm(initialForm); }} className="mt-5 text-sm text-[var(--accent)] font-semibold underline">
          {t('booking_title')}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      {/* step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1 flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= step ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'bg-[var(--surface-2)] text-[var(--muted)]'}`}>
              {i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-[var(--fg)]' : 'text-[var(--muted)]'}`}>{t(s)}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_name')}</label>
            <input value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_phone')}</label>
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)} type="tel" required className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_pickup')}</label>
            <input value={form.pickup} onChange={(e) => update('pickup', e.target.value)} required className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_destination')}</label>
            <select value={form.destinationSlug} onChange={(e) => selectDestination(e.target.value)} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]">
              <option value="">{t('distance_select')}</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>{lang === 'en' ? d.name_en : lang === 'it' ? d.name_it : d.name_al}</option>
              ))}
            </select>
            {!form.destinationSlug && (
              <input value={form.destination} onChange={(e) => update('destination', e.target.value)} placeholder={t('field_destination')} className="mt-2 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_date')}</label>
            <input value={form.date} onChange={(e) => update('date', e.target.value)} type="date" className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_time')}</label>
            <input value={form.time} onChange={(e) => update('time', e.target.value)} type="time" className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
          </div>
          {form.destinationSlug === 'rinas-airport' && (
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[var(--muted)]">{t('flight_number')}</label>
              <input value={form.flightNumber} onChange={(e) => update('flightNumber', e.target.value.toUpperCase())} placeholder="W6 3845" className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] font-mono" />
              <p className="text-xs text-[var(--muted)] mt-1">{t('flight_note')}</p>
            </div>
          )}
          {dest && (
            <div className="sm:col-span-2 rounded-lg bg-[var(--surface-2)] px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">{dest.distance_km} {t('distance_km')} · {dest.duration_min} {t('distance_duration')}</span>
              <span className="font-display font-bold text-[var(--accent)]">{formatPrice(dest.price_eur, currency, settings?.eur_to_all_rate)}</span>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_passengers')}</label>
            <div className="mt-1 flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <button key={n} type="button" onClick={() => update('passengers', n)} className={`w-10 h-10 rounded-lg border text-sm font-bold ${form.passengers === n ? 'bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)]' : 'border-[var(--border)]'}`}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_luggage')}</label>
            <div className="mt-1 flex gap-2">
              {[0, 1, 2, '3+'].map((n) => (
                <button key={n} type="button" onClick={() => update('luggage', n)} className={`w-10 h-10 rounded-lg border text-sm font-bold ${form.luggage === n ? 'bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)]' : 'border-[var(--border)]'}`}>{n}</button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.childSeat} onChange={(e) => update('childSeat', e.target.checked)} className="accent-[var(--accent)] w-4 h-4" />{t('field_child_seat')}</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.petFriendly} onChange={(e) => update('petFriendly', e.target.checked)} className="accent-[var(--accent)] w-4 h-4" />{t('field_pet_friendly')}</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.meetGreet} onChange={(e) => update('meetGreet', e.target.checked)} className="accent-[var(--accent)] w-4 h-4" />{t('field_meet_greet')}</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.recurring} onChange={(e) => update('recurring', e.target.checked)} className="accent-[var(--accent)] w-4 h-4" />{t('field_recurring')}</label>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_promo')}</label>
            <div className="mt-1 flex gap-2">
              <input value={form.promo} onChange={(e) => update('promo', e.target.value)} placeholder="SUMMER10" className="flex-1 px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] font-mono uppercase" />
              <button type="button" onClick={checkPromo} className="px-4 rounded-lg border border-[var(--border)] font-semibold text-sm hover:border-[var(--accent)]">OK</button>
            </div>
            {promoResult && (
              <p className={`text-xs mt-1 ${promoResult.valid ? 'text-available' : 'text-busy'}`}>
                {promoResult.valid ? `-${Math.round((promoResult.discount / (dest?.price_eur || 1)) * 100)}% → ${formatPrice(promoResult.finalPrice, currency, settings?.eur_to_all_rate)}` : (lang === 'en' ? 'Invalid code' : lang === 'it' ? 'Codice non valido' : 'Kod jo valid')}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-[var(--muted)]">{t('field_message')}</label>
            <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={2} className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]" />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="rounded-lg bg-[var(--surface-2)] p-4 text-sm space-y-1.5 font-mono">
            <p>{form.name || '—'} · {form.phone || '—'}</p>
            <p>{form.pickup} → {form.destination || '—'}</p>
            <p>{form.date || '—'} {form.time || ''}</p>
            <p>{form.passengers} pax · {form.luggage} bags</p>
          </div>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <button onClick={() => send('whatsapp')} className="py-3 rounded-lg bg-[#25D366] text-white font-bold text-sm">{t('send_whatsapp')}</button>
            <button onClick={() => send('email')} className="py-3 rounded-lg border border-[var(--border)] font-bold text-sm hover:border-[var(--accent)]">{t('send_email')}</button>
            <button onClick={() => send('both')} className="py-3 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm">{t('send_both')}</button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className={`text-sm font-semibold text-[var(--muted)] ${step === 0 ? 'invisible' : ''}`}
        >
          ← {t('back')}
        </button>
        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            className="px-5 py-2 rounded-full bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm"
          >
            {t('next')} →
          </button>
        )}
      </div>
    </div>
  );
}
