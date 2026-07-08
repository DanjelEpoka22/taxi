'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin');
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'gabim, provo përsëri');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-[#EAF0F6] px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-[#243149] bg-[#121A2C] p-8">
        <h1 className="font-bold text-xl mb-1">Paneli i Administratorit</h1>
        <p className="text-sm text-[#8996AC] mb-6">Taxi Luli</p>
        <label className="text-xs font-semibold text-[#8996AC]">Fjalëkalimi</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          className="mt-1 w-full px-3 py-2.5 rounded-lg bg-[#172038] border border-[#243149] mb-4"
        />
        {error && <p className="text-sm text-[#E5484D] mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-[#2DD4BF] text-[#0B1120] font-bold disabled:opacity-50"
        >
          {loading ? '...' : 'Hyr'}
        </button>
      </form>
    </div>
  );
}
