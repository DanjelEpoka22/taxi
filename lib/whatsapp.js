// builds a wa.me deep link with a prefilled message. no backend needed,
// works on desktop (opens whatsapp web) and mobile (opens the app).

export function buildWhatsAppLink(phoneDigitsOnly, message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneDigitsOnly}?text=${encoded}`;
}

export function buildBookingMessage({ name, phone, pickup, destination, date, time, passengers, luggage, message, childSeat, petFriendly, meetGreet, recurring, lang }) {
  const lines = [];
  const labels = {
    al: { hello: 'Përshëndetje! Dua të rezervoj një taksi.', from: 'Nisja', to: 'Destinacioni', when: 'Data/Ora', who: 'Pasagjerë', bags: 'Bagazhe', name: 'Emri', phone: 'Telefoni', note: 'Shënim', extras: 'Shtesa' },
    en: { hello: 'Hello! I would like to book a taxi.', from: 'Pickup', to: 'Destination', when: 'Date/Time', who: 'Passengers', bags: 'Luggage', name: 'Name', phone: 'Phone', note: 'Note', extras: 'Extras' },
    it: { hello: 'Ciao! Vorrei prenotare un taxi.', from: 'Ritiro', to: 'Destinazione', when: 'Data/Ora', who: 'Passeggeri', bags: 'Bagagli', name: 'Nome', phone: 'Telefono', note: 'Nota', extras: 'Extra' },
  };
  const l = labels[lang] || labels.al;

  lines.push(l.hello);
  if (name) lines.push(`${l.name}: ${name}`);
  if (pickup) lines.push(`${l.from}: ${pickup}`);
  if (destination) lines.push(`${l.to}: ${destination}`);
  if (date || time) lines.push(`${l.when}: ${date || ''} ${time || ''}`.trim());
  if (passengers) lines.push(`${l.who}: ${passengers}`);
  if (luggage) lines.push(`${l.bags}: ${luggage}`);
  if (phone) lines.push(`${l.phone}: ${phone}`);

  const extras = [];
  if (childSeat) extras.push('child seat');
  if (petFriendly) extras.push('pet friendly');
  if (meetGreet) extras.push('meet & greet');
  if (recurring) extras.push('recurring booking');
  if (extras.length) lines.push(`${l.extras}: ${extras.join(', ')}`);

  if (message) lines.push(`${l.note}: ${message}`);

  return lines.join('\n');
}
