import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/admin-auth';
import { getRazorpay } from '@/lib/razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const url = new URL(req.url);
  const count = Math.min(100, Math.max(1, Number(url.searchParams.get('count') || 50)));
  try {
    const rp = getRazorpay();
    const payments = await rp.payments.all({ count });
    const items = (payments.items || []).map((p: any) => ({
      id: p.id,
      order_id: p.order_id,
      status: p.status,
      method: p.method,
      amount: p.amount,
      currency: p.currency,
      email: p.email,
      contact: p.contact,
      created_at: p.created_at,
      notes: p.notes ?? {},
      description: p.description,
    }));
    return NextResponse.json({ items });
  } catch (e: any) {
    console.error('[admin/payments]', e?.message);
    return NextResponse.json({ error: 'razorpay_failed', message: e?.message }, { status: 500 });
  }
}
