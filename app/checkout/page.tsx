'use client';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-store';
import { formatINR } from '@/lib/products';

declare global {
  interface Window {
    Razorpay?: any;
    fbq?: (...a: any[]) => void;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotalPaise, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    line1: '', line2: '', city: '', state: '', pincode: '',
  });

  const subtotal = subtotalPaise();
  const itemsCount = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function' && lines.length > 0) {
      window.fbq('track', 'InitiateCheckout', {
        value: subtotal / 100,
        currency: 'INR',
        num_items: itemsCount,
        content_ids: lines.map((l) => l.variantId),
      });
    }
  }, [lines, subtotal, itemsCount]);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const allFilled =
    form.name && /^\S+@\S+\.\S+$/.test(form.email) &&
    /^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '')) &&
    form.line1 && form.city && form.state && /^\d{6}$/.test(form.pincode);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!allFilled || lines.length === 0) {
      setError('Please complete every field above.');
      return;
    }
    setSubmitting(true);
    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((l) => ({ productId: l.productId, variantId: l.variantId, qty: l.qty })),
          customer: { name: form.name, email: form.email, phone: form.phone },
          shipping: {
            line1: form.line1, line2: form.line2, city: form.city,
            state: form.state, pincode: form.pincode, country: 'IN',
          },
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order?.message || order?.error || 'Order failed');

      const items_for_capi = lines.map((l) => ({
        sku: l.variantId, productId: l.productId, variantId: l.variantId, qty: l.qty,
      }));

      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        order_id: order.razorpay_order_id,
        name: 'SentSparkle',
        description: 'Eau de parfum',
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#1B1A17' },
        handler: async (resp: any) => {
          // Stash payload for the thank-you page Pixel fire (event_id-deduped)
          try {
            sessionStorage.setItem(
              `ss_purchase_${resp.razorpay_order_id}`,
              JSON.stringify({
                event_id: order.event_id,
                value: order.amount / 100,
                currency: 'INR',
                num_items: itemsCount,
                content_ids: items_for_capi.map((i) => i.sku),
                customer: { name: form.name, email: form.email, phone: form.phone },
                items: lines,
                total_paise: order.amount,
                payment_id: resp.razorpay_payment_id,
              }),
            );
          } catch {}

          await fetch('/api/orders/verify', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
              event_id: order.event_id,
              customer: { email: form.email, phone: form.phone },
              items: items_for_capi,
              total_paise: order.amount,
            }),
          }).catch(() => {});

          clear();
          router.push(`/order-confirmation/${resp.razorpay_order_id}?p=${resp.razorpay_payment_id}`);
        },
        modal: {
          ondismiss: () => setSubmitting(false),
        },
      });
      rzp.open();
    } catch (e: any) {
      setError(e?.message || 'Could not start payment.');
      setSubmitting(false);
    }
  };

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-5 md:px-10 py-24 text-center">
        <p className="eyebrow text-gold">Empty cart</p>
        <h1 className="h-display text-4xl mt-3">Your bag is empty.</h1>
        <p className="mt-4 text-smoke">Pick a Discovery 8 ml — it&apos;s the easiest way to start.</p>
        <Link href="/products" className="btn-primary mt-8 inline-flex">Shop the four</Link>
      </section>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <p className="eyebrow text-gold">Checkout</p>
          <h1 className="h-display text-4xl md:text-5xl mt-3">Almost yours.</h1>

          <form onSubmit={submit} className="mt-10 space-y-10">
            <fieldset className="space-y-4">
              <legend className="eyebrow text-smoke mb-3">Contact</legend>
              <Field label="Full name" value={form.name} onChange={onChange('name')} autoComplete="name" />
              <Field label="Email" type="email" value={form.email} onChange={onChange('email')} autoComplete="email" />
              <Field label="Phone (10-digit Indian number)" value={form.phone} onChange={onChange('phone')} autoComplete="tel" />
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="eyebrow text-smoke mb-3">Shipping address</legend>
              <Field label="Address line 1" value={form.line1} onChange={onChange('line1')} autoComplete="address-line1" />
              <Field label="Address line 2 (optional)" value={form.line2} onChange={onChange('line2')} autoComplete="address-line2" required={false} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" value={form.city} onChange={onChange('city')} autoComplete="address-level2" />
                <Field label="State" value={form.state} onChange={onChange('state')} autoComplete="address-level1" />
              </div>
              <Field label="Pincode" value={form.pincode} onChange={onChange('pincode')} autoComplete="postal-code" />
            </fieldset>

            {error && <p className="text-ember text-sm">{error}</p>}

            <button type="submit" disabled={submitting || !allFilled} className="btn-primary w-full">
              {submitting ? 'Opening Razorpay…' : `Pay ${formatINR(subtotal)}`}
            </button>
            <p className="text-xs text-smoke">
              You&apos;ll be redirected to Razorpay to pay securely. Your card data never touches our servers.
            </p>
          </form>
        </div>

        <aside className="md:col-span-5">
          <div className="bg-parchment p-6 sticky top-24">
            <p className="eyebrow text-gold">Order summary</p>
            <ul className="mt-5 divide-y divide-line">
              {lines.map((l) => (
                <li key={l.variantId} className="py-4 flex gap-4">
                  <div className="relative h-20 w-16 flex-none bg-cream">
                    <Image src={l.image} alt={l.productName} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg leading-tight">{l.productName}</div>
                    <div className="text-smoke text-xs mt-0.5">{l.variantLabel} · qty {l.qty}</div>
                  </div>
                  <div className="text-sm">{formatINR(l.unitPaise * l.qty)}</div>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-line space-y-2">
              <Row label="Subtotal" value={formatINR(subtotal)} />
              <Row label="Shipping" value="Free" />
              <Row label="Total" value={formatINR(subtotal)} bold />
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({
  label, type = 'text', value, onChange, autoComplete, required = true,
}: {
  label: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-smoke">{label}</span>
      <input
        type={type} value={value} onChange={onChange} autoComplete={autoComplete} required={required}
        className="input-field"
      />
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? 'eyebrow text-ink' : 'eyebrow text-smoke'}>{label}</span>
      <span className={bold ? 'font-display text-2xl' : 'text-sm'}>{value}</span>
    </div>
  );
}
