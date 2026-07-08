import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/adminAuth';
import { supabaseAdmin, isAdminConfigured } from '../../../../lib/supabaseAdmin';

export async function GET(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data });
}

export async function PATCH(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });

  const { id, status } = await request.json();
  const { error } = await supabaseAdmin.from('bookings').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
