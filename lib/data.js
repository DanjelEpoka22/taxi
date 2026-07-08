import { supabase } from './supabaseClient';
import { DEFAULT_DESTINATIONS, DEFAULT_FAQS, DEFAULT_SETTINGS, SERVICE_AREAS } from './defaults';

export async function getDestinations() {
  if (!supabase) return DEFAULT_DESTINATIONS;
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('distance_km', { ascending: true });
  if (error || !data || data.length === 0) return DEFAULT_DESTINATIONS;
  return data;
}

export async function getFaqs() {
  if (!supabase) return DEFAULT_FAQS;
  const { data, error } = await supabase.from('faqs').select('*').order('id', { ascending: true });
  if (error || !data || data.length === 0) return DEFAULT_FAQS;
  return data;
}

export async function getSettings() {
  if (!supabase) return DEFAULT_SETTINGS;
  const { data, error } = await supabase.from('settings').select('key, value');
  if (error || !data || data.length === 0) return DEFAULT_SETTINGS;
  const merged = { ...DEFAULT_SETTINGS };
  for (const row of data) {
    merged[row.key] = row.value;
  }
  return merged;
}

export async function getServiceAreas() {
  return SERVICE_AREAS;
}

export async function submitBooking(booking) {
  if (!supabase) return { ok: true, stored: false };
  const { error } = await supabase.from('bookings').insert([booking]);
  if (error) {
    console.error('booking insert failed', error.message);
    return { ok: false, stored: false, error: error.message };
  }
  return { ok: true, stored: true };
}

export async function subscribeNewsletter(email) {
  if (!supabase) return { ok: true, stored: false };
  const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);
  if (error) {
    // duplicate email is not really a failure from the user's point of view
    if (error.code === '23505') return { ok: true, stored: true };
    console.error('newsletter insert failed', error.message);
    return { ok: false, stored: false, error: error.message };
  }
  return { ok: true, stored: true };
}

export async function lookupBookingByPhone(phone) {
  if (!supabase) return null;
  // uses the get_booking_status() function (see supabase/schema.sql) which
  // only ever returns a status and a timestamp, never other customers' data
  const { data, error } = await supabase.rpc('get_booking_status', { phone_input: phone });
  if (error || !data || data.length === 0) return null;
  return data[0];
}
