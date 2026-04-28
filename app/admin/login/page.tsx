'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    const r = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    setBusy(false);
    if (r.ok) router.push('/admin');
    else setErr('Wrong password.');
  };

  return (
    <section className="mx-auto max-w-md px-5 py-24">
      <p className="eyebrow text-gold">Admin</p>
      <h1 className="h-display text-4xl mt-3">Sign in.</h1>
      <form onSubmit={submit} className="mt-10 space-y-6">
        <label className="block">
          <span className="eyebrow text-smoke">Password</span>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="input-field"
            autoComplete="current-password"
            required
          />
        </label>
        {err && <p className="text-ember text-sm">{err}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  );
}
