'use client';

import { useState } from 'react';
import { useApp } from '../lib/context';
import { buildWhatsAppLink } from '../lib/whatsapp';

const ROUTE_D = 'M40,180 C120,60 220,220 320,140 C400,80 460,150 560,70';

export default function Hero() {
  const { t, settings, lang } = useApp();
  const [videoFailed, setVideoFailed] = useState(false);
  const whatsappNumber = settings?.whatsapp_number || '355691234567';
  const phone = settings?.phone_number || '+355691234567';
  const isAvailable = (settings?.live_status || 'available') === 'available';

  const bookLink = buildWhatsAppLink(whatsappNumber, lang === 'en' ? 'Hello! I would like to book a taxi.' : lang === 'it' ? 'Ciao! Vorrei prenotare un taxi.' : 'Përshëndetje! Dua të rezervoj një taksi.');

  return (
    <section id="top" className="relative overflow-hidden min-h-[92vh] flex items-center pt-20 pb-28">
      {/* background video: drop a short looping clip at public/video/hero-bg.mp4
          (car driving, city road at night, etc). falls back to a plain
          gradient + the animated route line if no video is present yet. */}
      <div className="hero-media">
        {!videoFailed && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
            onError={() => setVideoFailed(true)}
          >
            <source src="/video/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
        {videoFailed && (
          <div className="w-full h-full bg-gradient-to-br from-[var(--surface)] via-[var(--bg)] to-[var(--surface-2)]" />
        )}
      </div>

      {/* signature element: the route from elbasan out to the airport / tirana,
          drawn on load with a car marker travelling along the same path,
          layered on top of the video for a bit of motion-graphic polish */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.45] pointer-events-none z-[1]"
        viewBox="0 0 600 260"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d={ROUTE_D} className="route-path" />
        <circle r="4.5" fill="var(--accent-2)">
          <animateMotion dur="2.6s" begin="0.3s" fill="freeze" path={ROUTE_D} />
        </circle>
      </svg>

      <div className="glow glow-accent w-72 h-72 -top-20 -left-10 z-[1]" />
      <div className="glow glow-accent-2 w-96 h-96 top-1/3 -right-20 z-[1]" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold text-[var(--fg)] mb-6">
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-available animate-pulse-soft' : 'bg-busy'}`} />
            {isAvailable ? t('live_available') : t('live_busy')}
            <span className="opacity-40">·</span>
            <span className="text-[var(--muted)]">{t('hero_eyebrow')}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            {t('hero_title_1')}
            <br />
            <span className="accent-gradient-text">{t('hero_title_2')}</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-[var(--muted)] max-w-xl leading-relaxed">
            {t('hero_sub')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={bookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--on-accent)] font-bold hover:bg-[var(--accent-2)] transition-colors shadow-[0_8px_30px_-8px_var(--accent)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.5 8.7 9 7.4 8.7 6.9c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4C6.3 7.2 5.5 8 5.5 9.4c0 1.4 1 2.8 1.1 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3C3.7 14.7 3.2 13.4 3.2 12 3.2 7.1 7.1 3.2 12 3.2S20.8 7.1 20.8 12 16.9 20 12 20z"/></svg>
              {t('hero_cta_book')}
            </a>
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-card font-bold hover:border-[var(--accent)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2.9z"/></svg>
              {t('hero_cta_call')}
            </a>
          </div>

          <div className="mt-12 flex gap-4 max-w-lg">
            <div className="glass-card rounded-xl px-5 py-4 flex-1 text-center">
              <div className="font-display font-bold text-2xl md:text-3xl accent-gradient-text">{(settings?.trips_count || 7800).toLocaleString('en-US')}+</div>
              <div className="text-xs text-[var(--muted)] mt-1">{t('hero_stat_trips')}</div>
            </div>
            <div className="glass-card rounded-xl px-5 py-4 flex-1 text-center">
              <div className="font-display font-bold text-2xl md:text-3xl accent-gradient-text">{settings?.rating || 4.9}/5</div>
              <div className="text-xs text-[var(--muted)] mt-1">{t('hero_stat_rating')}</div>
            </div>
            <div className="glass-card rounded-xl px-5 py-4 flex-1 text-center">
              <div className="font-display font-bold text-2xl md:text-3xl accent-gradient-text">{settings?.happy_percent || 98}%</div>
              <div className="text-xs text-[var(--muted)] mt-1">{t('hero_stat_happy')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
