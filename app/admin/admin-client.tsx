'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatINR } from '@/lib/products';

type Payment = {
  id: string;
  order_id: string;
  status: string;
  method?: string;
  amount: number;
  currency: string;
  email?: string;
  contact?: string;
  created_at: number;
  notes: Record<string, any>;
};

export default function AdminClient() {
  const router = useRouter();
  const [items, setItems] = useState<Payment[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true); setErr(null);
    try {
      const r = await fetch('/api/admin/payments?count=100', { cache: 'no-store' });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.message || 'Could not load.');
      setItems(j.items);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const signOut = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const captured = items?.filter((p) => p.status === 'captured') ?? [];
  const totalPaise = captured.reduce((s, p) => s + p.amount, 0);

  return (
    <section className="mx-auto max-w-7xl px-5 md:px-10 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="eyebrow text-gold">Admin</p>
          <h1 className="h-display text-4xl mt-2">Razorpay payments</h1>
          <p className="text-smoke text-sm mt-1">Pulled live from Razorpay. Refresh to update.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="btn-ghost !py-2 !px-4 text-[0.7rem]" disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button onClick={signOut} className="btn-ghost !py-2 !px-4 text-[0.7rem]">Sign out</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10 max-w-3xl">
        <Stat label="Captured" value={String(captured.length)} />
        <Stat label="Revenue" value={formatINR(totalPaise)} />
        <Stat label="Total events" value={String(items?.length ?? 0)} />
      </div>

      {err && <p className="text-ember text-sm mt-6">{err}</p>}

      <div className="mt-10 overflow-x-auto border border-line">
        <table className="min-w-full text-sm">
          <thead className="bg-parchment">
            <tr className="text-left">
              <Th>Created</Th>
              <Th>Status</Th>
              <Th>Customer</Th>
              <Th>Items</Th>
              <Th>Amount</Th>
              <Th>Method</Th>
              <Th>Payment ID</Th>
              <Th>Order ID</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {(items ?? []).map((p) => {
              let lines: any[] = [];
              try { lines = JSON.parse(p.notes?.items || '[]'); } catch {}
              return (
                <tr key={p.id} className="align-top">
                  <Td>{new Date(p.created_at * 1000).toLocaleString('en-IN')}</Td>
                  <Td>
                    <span className={`px-2 py-0.5 text-xs ${
                      p.status === 'captured' ? 'bg-ink text-ivory' :
                      p.status === 'failed' ? 'bg-ember/10 text-ember' :
                      'bg-cream text-ink'
                    }`}>{p.status}</span>
                  </Td>
                  <Td>
                    <div className="font-medium">{p.notes?.customer_name || '—'}</div>
                    <div className="text-smoke text-xs">{p.email || p.notes?.customer_email}</div>
                    <div className="text-smoke text-xs">{p.contact || p.notes?.customer_phone}</div>
                  </Td>
                  <Td>
                    <ul className="space-y-0.5">
                      {lines.map((l: any, i: number) => (
                        <li key={i} className="text-xs">{l?.qty}× {l?.name} <span className="text-smoke">{l?.variantLabel}</span></li>
                      ))}
                    </ul>
                  </Td>
                  <Td className="font-medium">{formatINR(p.amount)}</Td>
                  <Td>{p.method ?? '—'}</Td>
                  <Td className="font-mono text-xs">{p.id}</Td>
                  <Td className="font-mono text-xs">{p.order_id}</Td>
                </tr>
              );
            })}
            {(items?.length ?? 0) === 0 && !loading && (
              <tr><td colSpan={8} className="text-center text-smoke py-12">No payments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="eyebrow text-smoke px-4 py-3">{children}</th>;
}
function Td({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-parchment p-5">
      <div className="eyebrow text-smoke">{label}</div>
      <div className="font-display text-3xl mt-1">{value}</div>
    </div>
  );
}
