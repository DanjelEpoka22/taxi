import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/adminAuth';
import { supabaseAdmin, isAdminConfigured } from '../../../../lib/supabaseAdmin';

export async function GET(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  const { data, error } = await supabaseAdmin.from('settings').select('key, value');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ settings: data });
}

export async function POST(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  const { key, value } = await request.json();
  const { error } = await supabaseAdmin.from('settings').upsert({ key, value }, { onConflict: 'key' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
