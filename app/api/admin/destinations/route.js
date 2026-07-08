import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/adminAuth';
import { supabaseAdmin, isAdminConfigured } from '../../../../lib/supabaseAdmin';

export async function GET(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  const { data, error } = await supabaseAdmin.from('destinations').select('*').order('distance_km');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ destinations: data });
}

export async function POST(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  const body = await request.json();
  const { error } = await supabaseAdmin.from('destinations').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  const { id, ...fields } = await request.json();
  const { error } = await supabaseAdmin.from('destinations').update(fields).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const { error } = await supabaseAdmin.from('destinations').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
