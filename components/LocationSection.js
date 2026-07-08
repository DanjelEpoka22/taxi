'use client';

import { useEffect, useState } from 'react';
import { useApp } from '../lib/context';

const ELBASAN_LAT = 41.1125;
const ELBASAN_LON = 20.0822;

function WeatherBadge() {
  const { t } = useApp();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // open-meteo is free and needs no api key
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ELBASAN_LAT}&longitude=${ELBASAN_LON}&current=temperature_2m,precipitation,weather_code`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setWeather(json?.current || null);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  if (!weather) return null;

  const isRaining = weather.precipitation > 0 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(weather.weather_code);

  return (
    <div className="flex items-center gap-3 rounded-lg bg-[var(--surface-2)] px-4 py-3">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
        {isRaining ? (
          <path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25" />
        ) : (
          <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
        )}
      </svg>
      <div className="text-sm">
        <span className="font-bold font-mono">{Math.round(weather.temperature_2m)}°C</span>
        {isRaining && <span className="ml-2 text-[var(--muted)]">{t('weather_rain_msg')}</span>}
      </div>
    </div>
  );
}

export default function LocationSection() {
  const { t, lang, areas, settings } = useApp();

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-[var(--border)] h-80 lg:h-auto">
        <iframe
          title="map"
          src={settings?.google_maps_embed_url || 'https://www.google.com/maps?q=Elbasan,+Albania&output=embed'}
          className="w-full h-full grayscale-[0.3] contrast-[1.05]"
          style={{ border: 0 }}
          loading="lazy"
        />
      </div>

      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="font-display font-bold text-lg mb-4">{t('areas_title')}</h3>
          <ul className="space-y-3">
            {areas.map((area) => (
              <li key={area.name_al} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">{lang === 'en' ? area.name_en : lang === 'it' ? area.name_it : area.name_al}</p>
                  <p className="text-xs text-[var(--muted)]">{lang === 'en' ? area.info_en : lang === 'it' ? area.info_it : area.info_al}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <WeatherBadge />
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Elbasan,Albania"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm font-semibold rounded-lg border border-[var(--border)] py-3 hover:border-[var(--accent)] transition-colors"
        >
          {lang === 'en' ? 'Get Directions' : lang === 'it' ? 'Ottieni Indicazioni' : 'Merr Drejtimet'}
        </a>
      </div>
    </div>
  );
}
