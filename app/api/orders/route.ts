import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { getRazorpay } from '@/lib/razorpay';
import { getProductById, getVariant } from '@/lib/products';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ItemIn = { productId: string; variantId: string; qty: number };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items: ItemIn[] = body?.items ?? [];
    const customer = body?.customer ?? {};
    const shipping = body?.shipping ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'empty_cart' }, { status: 400 });
    }
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json({ error: 'missing_customer' }, { status: 400 });
    }
    if (!shipping?.line1 || !shipping?.city || !shipping?.state || !shipping?.pincode) {
      return NextResponse.json({ error: 'missing_shipping' }, { status: 400 });
    }

    // Server-price the cart — never trust client.
    let amount_paise = 0;
    const priced_items = items.map((it) => {
      const product = getProductById(it.productId);
      const variant = getVariant(it.productId, it.variantId);
      if (!product || !variant) throw new Error('invalid_item');
      const qty = Math.max(1, Math.min(99, Math.floor(it.qty || 1)));
      const line_paise = variant.price_paise * qty;
      amount_paise += line_paise;
      return {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        variantId: variant.id,
        variantLabel: variant.label,
        unit_paise: variant.price_paise,
        qty,
        line_paise,
        sku: variant.sku,
      };
    });

    if (amount_paise <= 0) {
      return NextResponse.json({ error: 'zero_amount' }, { status: 400 });
    }

    const event_id = crypto.randomUUID();
    const receipt = `ss_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amount_paise,
      currency: 'INR',
      receipt,
      notes: {
        event_id,
        customer_name: String(customer.name).slice(0, 120),
        customer_email: String(customer.email).slice(0, 200),
        customer_phone: String(customer.phone).slice(0, 30),
        shipping: JSON.stringify(shipping).slice(0, 1500),
        items: JSON.stringify(priced_items).slice(0, 4500),
      },
    });

    return NextResponse.json({
      razorpay_order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      event_id,
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (e: any) {
    console.error('[orders] error', e?.message);
    return NextResponse.json({ error: 'order_failed', message: e?.message }, { status: 500 });
  }
}
