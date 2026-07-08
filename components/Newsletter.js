'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';
import { subscribeNewsletter } from '../lib/data';

export default function Newsletter() {
  const { t } = useApp();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    await subscribeNewsletter(email);
    setStatus('done');
    setEmail('');
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h3 className="font-display font-bold text-lg">{t('newsletter_title')}</h3>
      </div>
      {status === 'done' ? (
        <p className="text-sm font-semibold text-available">{t('newsletter_success')}</p>
      ) : (
        <form onSubmit={submit} className="flex gap-2 w-full md:w-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('newsletter_placeholder')}
            className="flex-1 md:w-64 px-3 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm"
          />
          <button type="submit" disabled={status === 'sending'} className="px-5 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm whitespace-nowrap disabled:opacity-50">
            {t('newsletter_submit')}
          </button>
        </form>
      )}
    </div>
  );
}
