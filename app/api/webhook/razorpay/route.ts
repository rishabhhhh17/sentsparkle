import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { fireCapiPurchase } from '@/lib/meta';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get('x-razorpay-signature') || '';
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });

  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: 'bad_signature' }, { status: 400 });
  }

  let payload: any;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const event = payload?.event;
  if (event !== 'payment.captured' && event !== 'order.paid') {
    return NextResponse.json({ ignored: event });
  }

  try {
    const payment = payload?.payload?.payment?.entity;
    const order = payload?.payload?.order?.entity ?? payment;
    const notes = order?.notes ?? payment?.notes ?? {};
    const amount = (payment?.amount ?? order?.amount ?? 0) as number;

    let items: any[] = [];
    try { items = JSON.parse(notes.items || '[]'); } catch {}
    const content_ids = items.map((i: any) => i?.sku || i?.variantId).filter(Boolean);
    const num_items = items.reduce((n: number, i: any) => n + (i?.qty || 0), 0);

    await fireCapiPurchase({
      event_id: notes.event_id || order?.id || payment?.id,
      email: notes.customer_email,
      phone: notes.customer_phone,
      value: amount / 100,
      currency: 'INR',
      content_ids,
      num_items,
      event_source_url: process.env.NEXT_PUBLIC_SITE_URL,
    });
  } catch (e: any) {
    console.error('[webhook] CAPI failed', e?.message);
  }

  return NextResponse.json({ ok: true });
}
