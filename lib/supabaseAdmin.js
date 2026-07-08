import { createClient } from '@supabase/supabase-js';

// SERVER ONLY. never import this file from a component marked "use client".
// it uses the service role key, which bypasses row level security, so it
// must never reach the browser.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = url && serviceKey ? createClient(url, serviceKey, {
  auth: { persistSession: false }
}) : null;

export const isAdminConfigured = Boolean(url && serviceKey);
