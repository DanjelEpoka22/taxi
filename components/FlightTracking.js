'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';

export default function FlightTracking() {
  const { t, lang } = useApp();
  const [flightNumber, setFlightNumber] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function check() {
    if (!flightNumber) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/flight?flight=${encodeURIComponent(flightNumber)}`);
      const json = await res.json();
      setResult(json);
    } catch {
      setResult({ error: true });
    } finally {
      setLoading(false);
    }
  }

  const manualMsg = lang === 'en'
    ? 'Automatic tracking isn\'t enabled yet — just tell us your flight number in the booking message and the driver will check it manually.'
    : lang === 'it'
    ? 'Il monitoraggio automatico non è ancora attivo: indicaci il numero di volo nel messaggio di prenotazione e l\'autista lo controllerà manualmente.'
    : 'Ndjekja automatike nuk është aktivizuar ende — thjesht na jep numrin e fluturimit te mesazhi i rezervimit dhe shoferi e kontrollon manualisht.';

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
      <h3 className="font-display font-bold text-xl mb-1">{t('flight_title')}</h3>
      <p className="text-sm text-[var(--muted)] mb-5">{t('flight_note')}</p>

      <div className="flex gap-2">
        <input
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
          placeholder="W6 3845"
          className="flex-1 px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] font-mono text-sm"
        />
        <button onClick={check} disabled={loading} className="px-5 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm disabled:opacity-50">
          {t('flight_check')}
        </button>
      </div>

      {result && result.configured === false && (
        <p className="text-sm text-[var(--muted)] mt-4">{manualMsg}</p>
      )}
      {result && result.configured && !result.found && (
        <p className="text-sm text-busy mt-4">{lang === 'en' ? 'Flight not found. Check the number.' : lang === 'it' ? 'Volo non trovato. Controlla il numero.' : 'Fluturimi nuk u gjet. Kontrollo numrin.'}</p>
      )}
      {result && result.found && (
        <div className="mt-4 rounded-lg bg-[var(--surface-2)] p-4 text-sm space-y-1 font-mono">
          <p>Status: {result.status}</p>
          <p>Scheduled: {result.arrival}</p>
          {result.estimated && <p>Estimated: {result.estimated}</p>}
          {result.terminal && <p>Terminal: {result.terminal}</p>}
        </div>
      )}
    </div>
  );
}
