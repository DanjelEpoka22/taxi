'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const TABS = ['bookings', 'destinations', 'faqs', 'settings', 'newsletter'];

async function api(path, options) {
  const res = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
  });
  if (res.status === 401) {
    window.location.href = '/admin/login';
    return null;
  }
  return res.json();
}

function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const data = await api('/api/admin/bookings');
    if (data) setBookings(data.bookings || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function setStatus(id, status) {
    await api('/api/admin/bookings', { method: 'PATCH', body: JSON.stringify({ id, status }) });
    load();
  }

  if (loading) return <p className="text-sm text-[#8996AC]">Duke ngarkuar...</p>;
  if (bookings.length === 0) return <p className="text-sm text-[#8996AC]">Ende asnjë rezervim.</p>;

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="rounded-lg border border-[#243149] bg-[#121A2C] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-sm">
            <p className="font-semibold">{b.name || '—'} · {b.phone}</p>
            <p className="text-[#8996AC]">{b.pickup} → {b.destination} · {b.date || ''} {b.time || ''}</p>
          </div>
          <select
            value={b.status || 'pending'}
            onChange={(e) => setStatus(b.id, e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#172038] border border-[#243149] text-sm"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="on_the_way">On The Way</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
}

function DestinationsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ slug: '', name_al: '', name_en: '', name_it: '', distance_km: '', duration_min: '', price_eur: '', featured: false });

  const load = useCallback(async () => {
    const data = await api('/api/admin/destinations');
    if (data) setItems(data.destinations || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function update(id, fields) {
    await api('/api/admin/destinations', { method: 'PATCH', body: JSON.stringify({ id, ...fields }) });
    load();
  }

  async function add() {
    await api('/api/admin/destinations', { method: 'POST', body: JSON.stringify({
      ...newItem,
      distance_km: Number(newItem.distance_km) || 0,
      duration_min: Number(newItem.duration_min) || 0,
      price_eur: Number(newItem.price_eur) || 0,
    }) });
    setNewItem({ slug: '', name_al: '', name_en: '', name_it: '', distance_km: '', duration_min: '', price_eur: '', featured: false });
    load();
  }

  async function remove(id) {
    await api(`/api/admin/destinations?id=${id}`, { method: 'DELETE' });
    load();
  }

  if (loading) return <p className="text-sm text-[#8996AC]">Duke ngarkuar...</p>;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {items.map((d) => (
          <div key={d.id} className="rounded-lg border border-[#243149] bg-[#121A2C] p-4 grid sm:grid-cols-6 gap-2 items-center text-sm">
            <input defaultValue={d.name_al} onBlur={(e) => update(d.id, { name_al: e.target.value })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149] sm:col-span-2" />
            <input defaultValue={d.distance_km} type="number" onBlur={(e) => update(d.id, { distance_km: Number(e.target.value) })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149]" />
            <input defaultValue={d.duration_min} type="number" onBlur={(e) => update(d.id, { duration_min: Number(e.target.value) })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149]" />
            <input defaultValue={d.price_eur} type="number" onBlur={(e) => update(d.id, { price_eur: Number(e.target.value) })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149]" />
            <button onClick={() => remove(d.id)} className="text-[#E5484D] text-xs font-semibold">Fshi</button>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-dashed border-[#243149] p-4">
        <p className="text-xs font-semibold text-[#8996AC] mb-2">Shto destinacion të ri</p>
        <div className="grid sm:grid-cols-4 gap-2">
          <input placeholder="slug" value={newItem.slug} onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149] text-sm" />
          <input placeholder="Emri (AL)" value={newItem.name_al} onChange={(e) => setNewItem({ ...newItem, name_al: e.target.value })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149] text-sm" />
          <input placeholder="km" type="number" value={newItem.distance_km} onChange={(e) => setNewItem({ ...newItem, distance_km: e.target.value })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149] text-sm" />
          <input placeholder="€" type="number" value={newItem.price_eur} onChange={(e) => setNewItem({ ...newItem, price_eur: e.target.value })} className="px-2 py-1.5 rounded bg-[#172038] border border-[#243149] text-sm" />
        </div>
        <button onClick={add} className="mt-3 px-4 py-2 rounded-lg bg-[#2DD4BF] text-[#0B1120] font-bold text-sm">Shto</button>
      </div>
    </div>
  );
}

function FaqsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const data = await api('/api/admin/faqs');
    if (data) setItems(data.faqs || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function update(id, fields) {
    await api('/api/admin/faqs', { method: 'PATCH', body: JSON.stringify({ id, ...fields }) });
  }

  async function remove(id) {
    await api(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
    load();
  }

  if (loading) return <p className="text-sm text-[#8996AC]">Duke ngarkuar...</p>;

  return (
    <div className="space-y-3">
      {items.map((f) => (
        <div key={f.id} className="rounded-lg border border-[#243149] bg-[#121A2C] p-4">
          <input defaultValue={f.q_al} onBlur={(e) => update(f.id, { q_al: e.target.value })} className="w-full px-2 py-1.5 mb-2 rounded bg-[#172038] border border-[#243149] font-semibold" />
          <textarea defaultValue={f.a_al} onBlur={(e) => update(f.id, { a_al: e.target.value })} rows={2} className="w-full px-2 py-1.5 rounded bg-[#172038] border border-[#243149]" />
          <button onClick={() => remove(f.id)} className="mt-2 text-[#E5484D] text-xs font-semibold">Fshi</button>
        </div>
      ))}
    </div>
  );
}

function SettingsTab() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const data = await api('/api/admin/settings');
    if (data) {
      const map = {};
      (data.settings || []).forEach((s) => { map[s.key] = s.value; });
      setSettings(map);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function saveKey(key, value) {
    await api('/api/admin/settings', { method: 'POST', body: JSON.stringify({ key, value }) });
    setSettings((s) => ({ ...s, [key]: value }));
  }

  if (loading) return <p className="text-sm text-[#8996AC]">Duke ngarkuar...</p>;

  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="text-xs font-semibold text-[#8996AC]">Statusi</label>
        <select
          defaultValue={settings.live_status || 'available'}
          onChange={(e) => saveKey('live_status', e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-[#172038] border border-[#243149]"
        >
          <option value="available">Në Dispozicion</option>
          <option value="busy">I Zënë</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-semibold text-[#8996AC]">Koha e mbërritjes (min)</label>
        <input
          type="number"
          defaultValue={settings.driver_eta_min || 15}
          onBlur={(e) => saveKey('driver_eta_min', Number(e.target.value))}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-[#172038] border border-[#243149]"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-[#8996AC]">Numri i WhatsApp (vetëm shifra, me kod vendi)</label>
        <input
          defaultValue={settings.whatsapp_number || ''}
          onBlur={(e) => saveKey('whatsapp_number', e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-[#172038] border border-[#243149]"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-[#8996AC]">Numri i telefonit (për buton telefono)</label>
        <input
          defaultValue={settings.phone_number || ''}
          onBlur={(e) => saveKey('phone_number', e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-[#172038] border border-[#243149]"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-[#8996AC]">Numri i udhëtimeve</label>
        <input
          type="number"
          defaultValue={settings.trips_count || 7800}
          onBlur={(e) => saveKey('trips_count', Number(e.target.value))}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-[#172038] border border-[#243149]"
        />
      </div>
    </div>
  );
}

function NewsletterTab() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/api/admin/newsletter').then((data) => {
      if (data) setSubs(data.subscribers || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-sm text-[#8996AC]">Duke ngarkuar...</p>;
  if (subs.length === 0) return <p className="text-sm text-[#8996AC]">Ende asnjë regjistrim.</p>;

  return (
    <div className="space-y-2">
      {subs.map((s) => (
        <div key={s.id} className="rounded-lg border border-[#243149] bg-[#121A2C] px-4 py-2.5 text-sm font-mono">{s.email}</div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState('bookings');

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#EAF0F6]">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-xl">Paneli i Administratorit</h1>
          <button onClick={logout} className="text-sm text-[#8996AC] font-semibold">Dil</button>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-none">
          {TABS.map((tb) => (
            <button
              key={tb}
              onClick={() => setTab(tb)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${tab === tb ? 'bg-[#2DD4BF] text-[#0B1120]' : 'border border-[#243149] text-[#8996AC]'}`}
            >
              {tb}
            </button>
          ))}
        </div>

        {tab === 'bookings' && <BookingsTab />}
        {tab === 'destinations' && <DestinationsTab />}
        {tab === 'faqs' && <FaqsTab />}
        {tab === 'settings' && <SettingsTab />}
        {tab === 'newsletter' && <NewsletterTab />}
      </div>
    </div>
  );
}
