import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if the env vars are not set yet, we export null and every data hook
// falls back to the static defaults in lib/defaults.js. this means the
// site works immediately after deploy, even before supabase is connected.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(url && anonKey);
