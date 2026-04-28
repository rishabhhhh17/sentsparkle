import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { fireCapiPurchase } from '@/lib/meta';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      event_id,
      customer,
      items,
      total_paise,
    } = body ?? {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 });

    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const a = Buffer.from(expected);
    const b = Buffer.from(String(razorpay_signature));
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return NextResponse.json({ error: 'bad_signature' }, { status: 400 });
    }

    const value = typeof total_paise === 'number' ? total_paise / 100 : 0;
    const content_ids: string[] = Array.isArray(items)
      ? items.map((i: any) => i?.sku || i?.variantId).filter(Boolean)
      : [];
    const num_items = Array.isArray(items)
      ? items.reduce((n: number, i: any) => n + (i?.qty || 0), 0)
      : 0;

    await fireCapiPurchase({
      event_id: event_id || razorpay_order_id,
      email: customer?.email,
      phone: customer?.phone,
      value,
      currency: 'INR',
      content_ids,
      num_items,
      client_user_agent: req.headers.get('user-agent') || undefined,
      event_source_url: req.headers.get('referer') || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('[verify] error', e?.message);
    return NextResponse.json({ error: 'verify_failed' }, { status: 500 });
  }
}
