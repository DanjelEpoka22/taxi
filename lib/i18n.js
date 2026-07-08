// translations for the site. three languages: albanian (default), english, italian.
// each key maps to an object with al / en / it strings.

export const languages = [
  { code: 'al', label: 'AL', flag: '🇦🇱' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
];

export const dict = {
  nav_home: { al: 'Kryefaqja', en: 'Home', it: 'Home' },
  nav_destinations: { al: 'Destinacionet', en: 'Destinations', it: 'Destinazioni' },
  nav_pricing: { al: 'Çmimet', en: 'Pricing', it: 'Prezzi' },
  nav_reviews: { al: 'Vlerësime', en: 'Reviews', it: 'Recensioni' },
  nav_faq: { al: 'Pyetje', en: 'FAQ', it: 'FAQ' },
  nav_contact: { al: 'Kontakt', en: 'Contact', it: 'Contatto' },
  nav_book: { al: 'Rezervo Tani', en: 'Book Now', it: 'Prenota Ora' },

  hero_eyebrow: { al: 'Taxi privat · Elbasan', en: 'Private taxi · Elbasan', it: 'Taxi privato · Elbasan' },
  hero_title_1: { al: 'Nga Elbasani,', en: 'From Elbasan,', it: 'Da Elbasan,' },
  hero_title_2: { al: 'kudo që të shkosh.', en: 'wherever you go.', it: 'ovunque tu vada.' },
  hero_sub: {
    al: 'Transfertë e sigurt dhe komode drejt Aeroportit të Rinasit, Tiranës dhe çdo destinacioni tjetër. Shofer vendas, çmim i qartë që në fillim.',
    en: 'Safe and comfortable transfers to Rinas Airport, Tirana and anywhere else. Local driver, clear price from the start.',
    it: 'Trasferimenti sicuri e comodi verso l\'aeroporto di Rinas, Tirana e ovunque tu debba andare. Autista locale, prezzo chiaro fin da subito.',
  },
  hero_cta_book: { al: 'Rezervo në WhatsApp', en: 'Book on WhatsApp', it: 'Prenota su WhatsApp' },
  hero_cta_call: { al: 'Telefono Tani', en: 'Call Now', it: 'Chiama Ora' },
  hero_stat_trips: { al: 'Udhëtime', en: 'Trips', it: 'Viaggi' },
  hero_stat_rating: { al: 'Vlerësim', en: 'Rating', it: 'Valutazione' },
  hero_stat_happy: { al: 'Klientë të kënaqur', en: 'Happy customers', it: 'Clienti soddisfatti' },

  live_available: { al: 'Në Dispozicion Tani', en: 'Available Now', it: 'Disponibile Ora' },
  live_busy: { al: 'I Zënë', en: 'Busy', it: 'Occupato' },
  live_eta: { al: 'Mbërrin për', en: 'Arrives in', it: 'Arriva tra' },
  live_min: { al: 'min', en: 'min', it: 'min' },

  quick_from: { al: 'Nga', en: 'From', it: 'Da' },
  quick_to: { al: 'Në', en: 'To', it: 'A' },
  quick_date: { al: 'Data', en: 'Date', it: 'Data' },
  quick_time: { al: 'Ora', en: 'Time', it: 'Ora' },
  quick_phone: { al: 'Numri i telefonit', en: 'Phone number', it: 'Numero di telefono' },
  quick_submit: { al: 'Rezervo në WhatsApp', en: 'Book on WhatsApp', it: 'Prenota su WhatsApp' },

  booking_title: { al: 'Rezervim i Menjëhershëm', en: 'Instant Booking', it: 'Prenotazione Immediata' },
  booking_sub: {
    al: 'Plotëso formularin dhe zgjidh si do të na kontaktosh. Përgjigjemi brenda pak minutash.',
    en: 'Fill in the form and choose how to reach us. We reply within minutes.',
    it: 'Compila il modulo e scegli come contattarci. Rispondiamo in pochi minuti.'
  },
  step_1: { al: 'Marrja', en: 'Pickup', it: 'Ritiro' },
  step_2: { al: 'Destinacioni', en: 'Destination', it: 'Destinazione' },
  step_3: { al: 'Pasagjerët', en: 'Passengers', it: 'Passeggeri' },
  step_4: { al: 'Konfirmo', en: 'Confirm', it: 'Conferma' },
  field_name: { al: 'Emri', en: 'Name', it: 'Nome' },
  field_phone: { al: 'Telefoni', en: 'Phone', it: 'Telefono' },
  field_pickup: { al: 'Vendi i marrjes', en: 'Pickup location', it: 'Luogo di ritiro' },
  field_destination: { al: 'Destinacioni', en: 'Destination', it: 'Destinazione' },
  field_date: { al: 'Data', en: 'Date', it: 'Data' },
  field_time: { al: 'Ora', en: 'Time', it: 'Ora' },
  field_passengers: { al: 'Numri i pasagjerëve', en: 'Number of passengers', it: 'Numero di passeggeri' },
  field_luggage: { al: 'Bagazhe', en: 'Luggage', it: 'Bagagli' },
  field_message: { al: 'Mesazh (opsional)', en: 'Message (optional)', it: 'Messaggio (opzionale)' },
  field_child_seat: { al: 'Karrige fëmije', en: 'Child seat', it: 'Seggiolino bambino' },
  field_pet_friendly: { al: 'Pranohen kafshë shtëpiake', en: 'Pet friendly', it: 'Animali ammessi' },
  field_meet_greet: { al: 'Pritje me tabelë emri', en: 'Meet & greet with name sign', it: 'Accoglienza con cartello nome' },
  field_recurring: { al: 'Udhëtim i përsëritur (p.sh. çdo të hënë)', en: 'Recurring trip (e.g. every Monday)', it: 'Viaggio ricorrente (es. ogni lunedì)' },
  field_promo: { al: 'Kodi Promocional', en: 'Promo Code', it: 'Codice Promozionale' },
  back: { al: 'Mbrapa', en: 'Back', it: 'Indietro' },
  next: { al: 'Vazhdo', en: 'Next', it: 'Continua' },
  send_whatsapp: { al: 'Dërgo në WhatsApp', en: 'Send via WhatsApp', it: 'Invia su WhatsApp' },
  send_email: { al: 'Dërgo me Email', en: 'Send via Email', it: 'Invia via Email' },
  send_both: { al: 'Dërgo në të Dyja', en: 'Send to Both', it: 'Invia a Entrambi' },
  booking_success: { al: 'Faleminderit! Rezervimi u dërgua.', en: 'Thank you! Your booking was sent.', it: 'Grazie! La tua prenotazione è stata inviata.' },

  quote_title: { al: 'Merr Ofertë', en: 'Get a Quote', it: 'Richiedi un Preventivo' },
  quote_cta: { al: 'Merr Ofertë', en: 'Get a Quote', it: 'Richiedi Preventivo' },

  distance_title: { al: 'Kalkulatori i Distancës dhe Çmimit', en: 'Distance & Fare Calculator', it: 'Calcolatore di Distanza e Tariffa' },
  distance_km: { al: 'km', en: 'km', it: 'km' },
  distance_duration: { al: 'minuta', en: 'minutes', it: 'minuti' },
  distance_price: { al: 'Çmim orientues', en: 'Estimated price', it: 'Prezzo stimato' },
  distance_select: { al: 'Zgjidh destinacionin', en: 'Select destination', it: 'Seleziona destinazione' },

  timeline_title: { al: 'Statusi i Rezervimit', en: 'Booking Status', it: 'Stato della Prenotazione' },
  timeline_received: { al: 'Rezervimi u Mor', en: 'Booking Received', it: 'Prenotazione Ricevuta' },
  timeline_confirmed: { al: 'Shoferi Konfirmoi', en: 'Driver Confirmed', it: 'Autista Confermato' },
  timeline_on_way: { al: 'Shoferi Është Në Rrugë', en: 'Driver On The Way', it: 'Autista In Arrivo' },
  timeline_completed: { al: 'Përfunduar', en: 'Completed', it: 'Completato' },
  timeline_lookup_label: { al: 'Numri i telefonit i përdorur në rezervim', en: 'Phone number used for booking', it: 'Numero di telefono usato per la prenotazione' },
  timeline_lookup_btn: { al: 'Shiko Statusin', en: 'Check Status', it: 'Controlla Stato' },
  timeline_not_found: { al: 'Nuk u gjet asnjë rezervim aktive me këtë numër.', en: 'No active booking found for this number.', it: 'Nessuna prenotazione attiva trovata per questo numero.' },

  flight_title: { al: 'Ndjekja e Fluturimit', en: 'Flight Tracking', it: 'Monitoraggio Volo' },
  flight_number: { al: 'Numri i Fluturimit', en: 'Flight Number', it: 'Numero di Volo' },
  flight_check: { al: 'Kontrollo Fluturimin', en: 'Check Flight', it: 'Controlla Volo' },
  flight_note: {
    al: 'Nëse na jep numrin e fluturimit, shoferi e di automatikisht nëse fluturimi vonohet.',
    en: 'If you give us the flight number, the driver automatically knows if the flight is delayed.',
    it: 'Se ci fornisci il numero di volo, l\'autista saprà automaticamente se il volo è in ritardo.'
  },

  reviews_title: { al: 'Çfarë Thonë Klientët', en: 'What Customers Say', it: 'Cosa Dicono i Clienti' },
  reviews_google: { al: 'Shiko të gjitha vlerësimet në Google', en: 'See all reviews on Google', it: 'Vedi tutte le recensioni su Google' },

  destinations_title: { al: 'Destinacione të Shpeshta', en: 'Popular Destinations', it: 'Destinazioni Popolari' },
  pricing_title: { al: 'Çmimet', en: 'Pricing', it: 'Prezzi' },
  pricing_from: { al: 'Duke nisur nga', en: 'Starting from', it: 'A partire da' },
  pricing_note: {
    al: 'Çmimet janë orientuese dhe mund të ndryshojnë sipas kohës dhe kërkesës.',
    en: 'Prices are indicative and may vary depending on time and demand.',
    it: 'I prezzi sono indicativi e possono variare in base all\'orario e alla domanda.'
  },

  areas_title: { al: 'Zonat e Shërbimit', en: 'Service Areas', it: 'Aree di Servizio' },

  weather_rain_msg: { al: 'Bie shi sot — rezervo herët, kërkesa është e lartë.', en: 'It\'s raining today — book early, demand is high.', it: 'Piove oggi — prenota in anticipo, la richiesta è alta.' },

  faq_title: { al: 'Pyetje të Shpeshta', en: 'Frequently Asked Questions', it: 'Domande Frequenti' },
  faq_search_placeholder: { al: 'Kërko... p.sh. Aeroport', en: 'Search... e.g. Airport', it: 'Cerca... es. Aeroporto' },
  faq_no_results: { al: 'Nuk u gjet asnjë përgjigje. Na kontakto direkt.', en: 'No answer found. Contact us directly.', it: 'Nessuna risposta trovata. Contattaci direttamente.' },

  chat_title: { al: 'Pyet Asistentin', en: 'Ask the Assistant', it: 'Chiedi all\'Assistente' },
  chat_placeholder: { al: 'Shkruaj pyetjen tënde...', en: 'Type your question...', it: 'Scrivi la tua domanda...' },
  chat_fallback: {
    al: 'Nuk jam i sigurt për këtë, por mund të na shkruash direkt në WhatsApp dhe të përgjigjemi personalisht.',
    en: 'I\'m not sure about that, but you can message us directly on WhatsApp and we\'ll reply personally.',
    it: 'Non sono sicuro, ma puoi scriverci direttamente su WhatsApp e ti risponderemo personalmente.'
  },

  sos_title: { al: 'Nevojë për Taxi Tani?', en: 'Need a Taxi Now?', it: 'Hai Bisogno di un Taxi Ora?' },
  sos_cta: { al: 'Telefono Tani', en: 'Call Now', it: 'Chiama Ora' },

  newsletter_title: { al: 'Ofertat për Klientë të Rregullt', en: 'Offers for Regular Customers', it: 'Offerte per Clienti Abituali' },
  newsletter_placeholder: { al: 'Email-i yt', en: 'Your email', it: 'La tua email' },
  newsletter_submit: { al: 'Regjistrohu', en: 'Subscribe', it: 'Iscriviti' },
  newsletter_success: { al: 'U regjistrove me sukses!', en: 'Successfully subscribed!', it: 'Iscrizione avvenuta con successo!' },

  payment_title: { al: 'Mënyrat e Pagesës', en: 'Payment Methods', it: 'Metodi di Pagamento' },
  contact_title: { al: 'Na Kontakto', en: 'Contact Us', it: 'Contattaci' },

  footer_rights: { al: 'Të gjitha të drejtat e rezervuara.', en: 'All rights reserved.', it: 'Tutti i diritti riservati.' },
  footer_areas: {
    al: 'Duke shërbyer Elbasanin dhe rrethinat: Cërrik, Peqin, Librazhd, Gramsh dhe transfertat drejt Tiranës dhe Aeroportit të Rinasit.',
    en: 'Serving Elbasan and surroundings: Cërrik, Peqin, Librazhd, Gramsh, and transfers to Tirana and Rinas Airport.',
    it: 'Al servizio di Elbasan e dintorni: Cërrik, Peqin, Librazhd, Gramsh e trasferimenti verso Tirana e l\'aeroporto di Rinas.'
  },
};

export function t(key, lang) {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] || entry.al || key;
}
