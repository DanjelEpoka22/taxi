'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getDestinations, getFaqs, getSettings, getServiceAreas } from './data';
import { t as translate } from './i18n';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('al');
  const [currency, setCurrency] = useState('EUR');
  const [dark, setDark] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [settings, setSettings] = useState(null);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLang = window.localStorage.getItem('taxi_lang');
    const savedCurrency = window.localStorage.getItem('taxi_currency');
    const savedDark = window.localStorage.getItem('taxi_dark');
    if (savedLang) setLang(savedLang);
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedDark !== null) setDark(savedDark === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('taxi_dark', String(dark));
  }, [dark]);

  useEffect(() => {
    window.localStorage.setItem('taxi_lang', lang);
  }, [lang]);

  useEffect(() => {
    window.localStorage.setItem('taxi_currency', currency);
  }, [currency]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [d, f, s, a] = await Promise.all([
        getDestinations(),
        getFaqs(),
        getSettings(),
        getServiceAreas(),
      ]);
      if (cancelled) return;
      setDestinations(d);
      setFaqs(f);
      setSettings(s);
      setAreas(a);
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const value = useMemo(() => ({
    lang, setLang,
    currency, setCurrency,
    dark, setDark,
    destinations, faqs, settings, areas, loading,
    t: (key) => translate(key, lang),
  }), [lang, currency, dark, destinations, faqs, settings, areas, loading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
