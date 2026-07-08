// fallback data. the site reads from supabase first; if supabase is not
// configured yet, or a table is empty, these defaults are used instead so
// the site is never blank or broken.

export const DEFAULT_DESTINATIONS = [
  { slug: 'rinas-airport', name_al: 'Aeroporti i Rinasit', name_en: 'Rinas Airport', name_it: 'Aeroporto di Rinas', distance_km: 65, duration_min: 55, price_eur: 40, featured: true },
  { slug: 'tirana', name_al: 'Tiranë (qendër)', name_en: 'Tirana (city center)', name_it: 'Tirana (centro)', distance_km: 54, duration_min: 45, price_eur: 35, featured: true },
  { slug: 'durres', name_al: 'Durrës', name_en: 'Durrës', name_it: 'Durazzo', distance_km: 76, duration_min: 60, price_eur: 45, featured: true },
  { slug: 'cerrik', name_al: 'Cërrik', name_en: 'Cërrik', name_it: 'Cërrik', distance_km: 15, duration_min: 15, price_eur: 10, featured: false },
  { slug: 'peqin', name_al: 'Peqin', name_en: 'Peqin', name_it: 'Peqin', distance_km: 20, duration_min: 20, price_eur: 12, featured: false },
  { slug: 'librazhd', name_al: 'Librazhd', name_en: 'Librazhd', name_it: 'Librazhd', distance_km: 30, duration_min: 30, price_eur: 15, featured: false },
  { slug: 'gramsh', name_al: 'Gramsh', name_en: 'Gramsh', name_it: 'Gramsh', distance_km: 45, duration_min: 50, price_eur: 20, featured: false },
  { slug: 'pogradec', name_al: 'Pogradec', name_en: 'Pogradec', name_it: 'Pogradec', distance_km: 65, duration_min: 70, price_eur: 30, featured: false },
  { slug: 'berat', name_al: 'Berat', name_en: 'Berat', name_it: 'Berat', distance_km: 60, duration_min: 65, price_eur: 30, featured: true },
];

export const DEFAULT_FAQS = [
  {
    q_al: 'Sa kushton transferta për në Aeroportin e Rinasit?',
    q_en: 'How much does a transfer to Rinas Airport cost?',
    q_it: 'Quanto costa un trasferimento all\'aeroporto di Rinas?',
    a_al: 'Transferta nga Elbasani në Aeroportin e Rinasit fillon nga 40€, në varësi të orës dhe numrit të pasagjerëve. Çmimi konfirmohet përpara nisjes.',
    a_en: 'A transfer from Elbasan to Rinas Airport starts from 40€, depending on time and number of passengers. The price is confirmed before departure.',
    a_it: 'Un trasferimento da Elbasan all\'aeroporto di Rinas parte da 40€, a seconda dell\'orario e del numero di passeggeri. Il prezzo viene confermato prima della partenza.',
    keywords: ['aeroport', 'airport', 'rinas', 'aeroporto', 'çmim', 'price', 'prezzo']
  },
  {
    q_al: 'A pranoni pagesë me kartë?',
    q_en: 'Do you accept card payment?',
    q_it: 'Accettate pagamenti con carta?',
    a_al: 'Po, pranojmë pagesë cash, me kartë dhe transfertë bankare.',
    a_en: 'Yes, we accept cash, card payment and bank transfer.',
    a_it: 'Sì, accettiamo contanti, carta e bonifico bancario.',
    keywords: ['kartë', 'card', 'carta', 'pagesë', 'payment', 'pagamento', 'cash']
  },
  {
    q_al: 'Sa kohë përpara duhet të rezervoj?',
    q_en: 'How far in advance should I book?',
    q_it: 'Con quanto anticipo devo prenotare?',
    a_al: 'Për transferta aeroporti rekomandojmë rezervim të paktën 3 orë përpara. Për brenda qytetit, pranojmë edhe rezervime të menjëhershme.',
    a_en: 'For airport transfers we recommend booking at least 3 hours in advance. For trips within the city, we also accept instant bookings.',
    a_it: 'Per i trasferimenti aeroportuali consigliamo di prenotare almeno 3 ore prima. Per i viaggi in città, accettiamo anche prenotazioni immediate.',
    keywords: ['rezervo', 'book', 'prenota', 'kohë', 'time', 'anticipo']
  },
  {
    q_al: 'A ka karrige për fëmijë?',
    q_en: 'Do you have a child seat?',
    q_it: 'Avete un seggiolino per bambini?',
    a_al: 'Po, karrigia për fëmijë ofrohet me kërkesë paraprake — thjesht zgjidhe opsionin gjatë rezervimit.',
    a_en: 'Yes, a child seat is available on request — just select the option during booking.',
    a_it: 'Sì, il seggiolino per bambini è disponibile su richiesta: seleziona semplicemente l\'opzione durante la prenotazione.',
    keywords: ['fëmijë', 'child', 'bambino', 'seat', 'karrige']
  },
  {
    q_al: 'A merrni klientë edhe jashtë Elbasanit?',
    q_en: 'Do you also pick up clients outside Elbasan?',
    q_it: 'Prendete clienti anche fuori Elbasan?',
    a_al: 'Po, mbulojmë Elbasanin dhe zonat përreth: Cërrik, Peqin, Librazhd, Gramsh, si dhe transferta drejt Tiranës, Durrësit dhe Aeroportit.',
    a_en: 'Yes, we cover Elbasan and the surrounding areas: Cërrik, Peqin, Librazhd, Gramsh, plus transfers to Tirana, Durrës and the Airport.',
    a_it: 'Sì, copriamo Elbasan e le zone circostanti: Cërrik, Peqin, Librazhd, Gramsh, oltre ai trasferimenti verso Tirana, Durazzo e l\'aeroporto.',
    keywords: ['zonë', 'area', 'zona', 'rreth', 'surrounding']
  },
  {
    q_al: 'Çfarë ndodh nëse fluturimi im vonohet?',
    q_en: 'What happens if my flight is delayed?',
    q_it: 'Cosa succede se il mio volo è in ritardo?',
    a_al: 'Nëse na jep numrin e fluturimit gjatë rezervimit, ne ndjekim orarin dhe përshtatim kohën e pritjes automatikisht, pa kosto shtesë.',
    a_en: 'If you give us your flight number during booking, we track the schedule and adjust the pickup time automatically, at no extra cost.',
    a_it: 'Se ci fornisci il numero di volo durante la prenotazione, monitoriamo l\'orario e adattiamo automaticamente l\'orario di ritiro, senza costi aggiuntivi.',
    keywords: ['fluturim', 'flight', 'volo', 'vonesë', 'delay', 'ritardo']
  },
];

export const DEFAULT_SETTINGS = {
  live_status: 'available', // 'available' | 'busy'
  driver_eta_min: 15,
  trips_count: 7800,
  happy_percent: 98,
  rating: 4.9,
  whatsapp_number: '355691234567', // replace with the real number, digits only, country code without +
  phone_number: '+355691234567',
  email: 'info@taxielbasan.al',
  google_reviews_url: 'https://www.google.com/maps',
  google_maps_embed_url: 'https://www.google.com/maps?q=Elbasan,+Albania&output=embed',
  base_currency: 'EUR',
  eur_to_all_rate: 100,
};

export const PROMO_CODES = {
  SUMMER10: 0.10,
  RINAS5: 0.05,
};

export const SERVICE_AREAS = [
  { name_al: 'Elbasan (qytet)', name_en: 'Elbasan (city)', name_it: 'Elbasan (città)', info_al: 'Zona kryesore e shërbimit, çmimet brenda qytetit fillojnë nga 5€.', info_en: 'Main service area, in-city prices start from 5€.', info_it: 'Area di servizio principale, i prezzi in città partono da 5€.' },
  { name_al: 'Cërrik', name_en: 'Cërrik', name_it: 'Cërrik', info_al: '15 km nga Elbasani, rreth 15 minuta rrugë.', info_en: '15 km from Elbasan, about 15 minutes drive.', info_it: '15 km da Elbasan, circa 15 minuti di auto.' },
  { name_al: 'Peqin', name_en: 'Peqin', name_it: 'Peqin', info_al: '20 km nga Elbasani, rreth 20 minuta rrugë.', info_en: '20 km from Elbasan, about 20 minutes drive.', info_it: '20 km da Elbasan, circa 20 minuti di auto.' },
  { name_al: 'Librazhd', name_en: 'Librazhd', name_it: 'Librazhd', info_al: '30 km nga Elbasani, rreth 30 minuta rrugë.', info_en: '30 km from Elbasan, about 30 minutes drive.', info_it: '30 km da Elbasan, circa 30 minuti di auto.' },
];
