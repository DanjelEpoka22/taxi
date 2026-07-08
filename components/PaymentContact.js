'use client';

import { useApp } from '../lib/context';
import { buildWhatsAppLink } from '../lib/whatsapp';

const PAYMENT_METHODS = [
  { key: 'cash', label: { al: 'Cash', en: 'Cash', it: 'Contanti' }, icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
  { key: 'card', label: { al: 'Kartë', en: 'Card', it: 'Carta' }, icon: 'M2 7h20M2 11h20v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z' },
  { key: 'bank', label: { al: 'Transfertë Bankare', en: 'Bank Transfer', it: 'Bonifico' }, icon: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6' },
];

export default function PaymentContact() {
  const { t, lang, settings } = useApp();

  const contactMethods = [
    { name: 'WhatsApp', href: buildWhatsAppLink(settings?.whatsapp_number || '355691234567', ''), color: '#25D366' },
    { name: 'Viber', href: `viber://chat?number=${settings?.phone_number || ''}`, color: '#7360F2' },
    { name: 'Telegram', href: `https://t.me/${(settings?.phone_number || '').replace('+', '')}`, color: '#26A5E4' },
    { name: 'Email', href: `mailto:${settings?.email || 'info@taxielbasan.al'}`, color: 'var(--accent)' },
  ];

  return (
    <div id="contact" className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h3 className="font-display font-bold text-lg mb-4">{t('payment_title')}</h3>
        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((m) => (
            <div key={m.key} className="flex flex-col items-center gap-2 rounded-lg bg-[var(--surface-2)] py-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d={m.icon} /></svg>
              <span className="text-xs font-semibold text-center">{lang === 'en' ? m.label.en : lang === 'it' ? m.label.it : m.label.al}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h3 className="font-display font-bold text-lg mb-4">{t('contact_title')}</h3>
        <div className="grid grid-cols-2 gap-3">
          {contactMethods.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] py-3 text-sm font-semibold hover:border-[var(--accent)] transition-colors"
            >
              {c.name}
            </a>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--muted)] font-mono">{settings?.phone_number}</p>
      </div>
    </div>
  );
}
