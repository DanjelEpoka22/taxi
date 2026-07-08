'use client';

import { useMemo, useState } from 'react';
import { useApp } from '../lib/context';
import { buildWhatsAppLink } from '../lib/whatsapp';

function scoreFaq(faq, query) {
  const q = query.toLowerCase();
  let score = 0;
  const haystacks = [faq.q_al, faq.q_en, faq.q_it, faq.a_al, ...(faq.keywords || [])].join(' ').toLowerCase();
  if (haystacks.includes(q)) score += 3;
  q.split(' ').filter(Boolean).forEach((word) => {
    if (haystacks.includes(word)) score += 1;
  });
  return score;
}

function FaqSearch() {
  const { t, lang, faqs } = useApp();
  const [query, setQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return faqs;
    return faqs
      .map((f) => ({ f, score: scoreFaq(f, query) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.f);
  }, [query, faqs]);

  function q(f) { return lang === 'en' ? f.q_en : lang === 'it' ? f.q_it : f.q_al; }
  function a(f) { return lang === 'en' ? f.a_en : lang === 'it' ? f.a_it : f.a_al; }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('faq_search_placeholder')}
        className="w-full px-4 py-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm mb-4"
      />
      {filtered.length === 0 && <p className="text-sm text-[var(--muted)]">{t('faq_no_results')}</p>}
      <div className="space-y-2">
        {filtered.map((f, i) => (
          <div key={i} className="rounded-lg border border-[var(--border)] overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold"
            >
              {q(f)}
              <span className={`transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIndex === i && <div className="px-4 pb-4 text-sm text-[var(--muted)] leading-relaxed">{a(f)}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatWidget() {
  const { t, lang, faqs, settings } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  function answerFor(query) {
    const scored = faqs.map((f) => ({ f, score: scoreFaq(f, query) })).sort((a, b) => b.score - a.score);
    if (scored[0] && scored[0].score > 0) {
      const f = scored[0].f;
      return lang === 'en' ? f.a_en : lang === 'it' ? f.a_it : f.a_al;
    }
    return t('chat_fallback');
  }

  function send() {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    const botMsg = { role: 'bot', text: answerFor(input) };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput('');
  }

  const whatsappLink = buildWhatsAppLink(settings?.whatsapp_number || '355691234567', lang === 'en' ? 'Hello! I have a question.' : lang === 'it' ? 'Ciao! Ho una domanda.' : 'Përshëndetje! Kam një pyetje.');

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 lg:bottom-8 left-5 z-40 w-14 h-14 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center shadow-lg hover:border-[var(--accent)] transition-colors"
        aria-label="Chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      </button>

      {open && (
        <div className="fixed bottom-40 lg:bottom-24 left-5 z-40 w-[calc(100vw-2.5rem)] max-w-xs rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border)] font-display font-bold text-sm">{t('chat_title')}</div>
          <div className="flex-1 max-h-72 overflow-y-auto p-3 space-y-2 scrollbar-none">
            {messages.length === 0 && <p className="text-xs text-[var(--muted)] px-1">{t('faq_search_placeholder')}</p>}
            {messages.map((m, i) => (
              <div key={i} className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${m.role === 'user' ? 'bg-[var(--accent)] text-[var(--on-accent)] ml-auto' : 'bg-[var(--surface-2)]'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-[var(--border)] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder={t('chat_placeholder')}
              className="flex-1 px-3 py-2 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-sm"
            />
            <button onClick={send} className="px-3 rounded-lg bg-[var(--accent)] text-[var(--on-accent)] font-bold text-sm">→</button>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-center text-xs py-2 border-t border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]">
            {t('chat_fallback')}
          </a>
        </div>
      )}
    </>
  );
}

export default function FaqChat() {
  return <FaqSearch />;
}

export { ChatWidget };
