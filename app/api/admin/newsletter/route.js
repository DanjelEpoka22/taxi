import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/adminAuth';
import { supabaseAdmin, isAdminConfigured } from '../../../../lib/supabaseAdmin';

export async function GET(request) {
  if (!requireAdmin(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!isAdminConfigured) return NextResponse.json({ error: 'supabase not configured' }, { status: 500 });
  const { data, error } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ subscribers: data });
}
