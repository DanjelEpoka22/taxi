'use client';

import { useApp } from '../lib/context';
import { buildWhatsAppLink } from '../lib/whatsapp';

export default function FloatingWhatsApp() {
  const { settings, lang } = useApp();
  const message = lang === 'en' ? 'Hello! I have a question.' : lang === 'it' ? 'Ciao! Ho una domanda.' : 'Përshëndetje! Kam një pyetje.';
  const link = buildWhatsAppLink(settings?.whatsapp_number || '355691234567', message);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-24 lg:bottom-8 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:scale-105 transition-transform"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.5 8.7 9 7.4 8.7 6.9c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4C6.3 7.2 5.5 8 5.5 9.4c0 1.4 1 2.8 1.1 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z" />
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.1 7.1 3.2 12 3.2S20.8 7.1 20.8 12 16.9 20 12 20z" />
      </svg>
    </a>
  );
}
