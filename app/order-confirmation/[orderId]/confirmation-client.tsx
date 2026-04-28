'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatINR } from '@/lib/products';

declare global { interface Window { fbq?: (...a: any[]) => void } }

type Stash = {
  event_id: string;
  value: number;
  currency: string;
  num_items: number;
  content_ids: string[];
  customer: { name: string; email: string; phone: string };
  items: Array<{
    productId: string; variantId: string; productName: string; variantLabel: string;
    unitPaise: number; qty: number; image: string;
  }>;
  total_paise: number;
  payment_id?: string;
};

export default function ConfirmationClient({ orderId }: { orderId: string }) {
  const sp = useSearchParams();
  const paymentId = sp.get('p') || undefined;
  const [data, setData] = useState<Stash | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    let parsed: Stash | null = null;
    try {
      const raw = sessionStorage.getItem(`ss_purchase_${orderId}`);
      if (raw) parsed = JSON.parse(raw);
    } catch {}
    if (parsed) {
      setData(parsed);
      if (!fired.current && typeof window.fbq === 'function') {
        fired.current = true;
        window.fbq('track', 'Purchase', {
          value: parsed.value,
          currency: parsed.currency,
          content_ids: parsed.content_ids,
          content_type: 'product',
          num_items: parsed.num_items,
        }, { eventID: parsed.event_id });
      }
    }
  }, [orderId]);

  return (
    <section className="mx-auto max-w-4xl px-5 md:px-10 py-16 md:py-24">
      <div className="text-center">
        <p className="eyebrow text-gold">Payment received</p>
        <h1 className="h-display text-5xl md:text-6xl mt-4">Thank you.</h1>
        <p className="mt-4 text-smoke max-w-xl mx-auto">
          Save this page or screenshot it — your order ID is your reference.
          We&apos;ll dispatch from Bombay in 2 working days.
        </p>
      </div>

      <div className="mt-10 bg-parchment p-6 md:p-8 grid md:grid-cols-2 gap-6">
        <DataRow label="Order ID" value={orderId} />
        {paymentId && <DataRow label="Payment ID" value={paymentId} />}
        {data?.customer?.name && <DataRow label="Name" value={data.customer.name} />}
        {data?.customer?.email && <DataRow label="Email" value={data.customer.email} />}
      </div>

      {data?.items?.length ? (
        <div className="mt-10">
          <p className="eyebrow text-smoke">Items</p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {data.items.map((l) => (
              <li key={l.variantId} className="py-5 flex gap-4 items-center">
                <div className="relative h-20 w-16 flex-none bg-cream">
                  <Image src={l.image} alt={l.productName} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-xl leading-tight">{l.productName}</div>
                  <div className="text-smoke text-xs">{l.variantLabel} · qty {l.qty}</div>
                </div>
                <div className="text-sm">{formatINR(l.unitPaise * l.qty)}</div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-baseline mt-6">
            <span className="eyebrow">Total paid</span>
            <span className="font-display text-3xl">{formatINR(data.total_paise)}</span>
          </div>
        </div>
      ) : (
        <p className="mt-10 text-smoke text-center text-sm">
          (Order detail is held only in your browser. If you refresh on a new device, ask us at <a className="underline" href="mailto:hello@sentsparkle.in">hello@sentsparkle.in</a> with your order ID.)
        </p>
      )}

      <div className="mt-12 bg-cream p-8 grid md:grid-cols-3 gap-8 text-center">
        <Step n={1} title="We blend & number">Your bottle is hand-numbered against your order.</Step>
        <Step n={2} title="Dispatch in 2 days">From our studio in Lower Parel, Bombay.</Step>
        <Step n={3} title="Tracking">
          Email <a href="mailto:hello@sentsparkle.in" className="underline">hello@sentsparkle.in</a> with your order ID for tracking.
        </Step>
      </div>

      <div className="mt-12 text-center">
        <Link href="/products" className="btn-ghost">Continue shopping</Link>
      </div>
    </section>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow text-smoke">{label}</div>
      <div className="font-display text-xl mt-1 break-all">{value}</div>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-display text-3xl text-gold">0{n}</div>
      <div className="font-display text-xl mt-2">{title}</div>
      <div className="text-smoke text-sm mt-2">{children}</div>
    </div>
  );
}
