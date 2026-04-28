import crypto from 'node:crypto';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

const sha256 = (s: string) => crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

export type CapiPurchase = {
  event_id: string;
  event_time?: number;
  email?: string;
  phone?: string;
  value: number;
  currency?: string;
  content_ids?: string[];
  num_items?: number;
  client_user_agent?: string;
  client_ip?: string;
  fbp?: string;
  fbc?: string;
  event_source_url?: string;
};

export async function fireCapiPurchase(p: CapiPurchase) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[meta] CAPI not configured — skipping');
    return { ok: false, reason: 'not_configured' };
  }
  const body: any = {
    data: [
      {
        event_name: 'Purchase',
        event_time: p.event_time ?? Math.floor(Date.now() / 1000),
        event_id: p.event_id,
        action_source: 'website',
        event_source_url: p.event_source_url,
        user_data: {
          ...(p.email ? { em: [sha256(p.email)] } : {}),
          ...(p.phone ? { ph: [sha256(p.phone.replace(/\D/g, ''))] } : {}),
          ...(p.client_user_agent ? { client_user_agent: p.client_user_agent } : {}),
          ...(p.client_ip ? { client_ip_address: p.client_ip } : {}),
          ...(p.fbp ? { fbp: p.fbp } : {}),
          ...(p.fbc ? { fbc: p.fbc } : {}),
        },
        custom_data: {
          currency: p.currency ?? 'INR',
          value: p.value,
          content_ids: p.content_ids ?? [],
          content_type: 'product',
          num_items: p.num_items ?? 1,
        },
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };
  try {
    const r = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    const j = await r.json();
    return { ok: r.ok, response: j };
  } catch (e: any) {
    console.error('[meta] CAPI error', e?.message);
    return { ok: false, reason: 'fetch_error' };
  }
}
