# SentSparkle — sentsparkle.in

A small Bombay perfume house. Four eaux de parfum. Production-ready Next.js 14 D2C site.

## Stack
- **Next.js 14** (App Router) on Vercel
- **Tailwind CSS** with hand-tuned design tokens (Cormorant Garamond + Inter)
- **Zustand** cart with `localStorage` persistence
- **Razorpay** for checkout (server-priced, signature-verified)
- **Meta Pixel** + **Conversions API** with `event_id` deduplication
- **JWT-cookie admin** that reads payments live from Razorpay

There is **no database**. Orders live in Razorpay; the catalogue lives in
[`lib/products.ts`](lib/products.ts). Stock counts in the catalogue are display-only.

## Run locally

```bash
cp .env.local.example .env.local   # fill in real keys (test mode is fine)
npm install
npm run dev                        # http://localhost:3000
```

## Build

```bash
npm run build && npm run start
```

## Routes

| Route                                 | What it does                                         |
| ------------------------------------- | ---------------------------------------------------- |
| `/`                                   | Homepage                                             |
| `/products`                           | Listing + family filter                              |
| `/products/[slug]`                    | PDP (prerendered for all 4 slugs)                    |
| `/checkout`                           | Razorpay form + modal                                |
| `/order-confirmation/[orderId]`       | Thank-you page · fires Pixel `Purchase`              |
| `/admin/login`                        | Admin password form                                  |
| `/admin`                              | Payments dashboard (live from Razorpay)              |
| `GET  /api/products`                  | Returns active catalogue                             |
| `GET  /api/products/[slug]`           | Returns one product                                  |
| `POST /api/orders`                    | Server-prices cart, creates Razorpay order           |
| `POST /api/orders/verify`             | HMAC-verifies signature, fires CAPI `Purchase`       |
| `POST /api/webhook/razorpay`          | Server-side CAPI fallback (deduped by `event_id`)    |
| `GET  /api/admin/payments`            | Lists payments via Razorpay API (admin-gated)        |
| `POST /api/admin/auth`                | Sign in (sets JWT cookie)                            |
| `DELETE /api/admin/auth`              | Sign out                                             |

## Environment variables

See [`.env.local.example`](./.env.local.example). Add **every** key to Vercel
under both Production and Preview.

| Key                              | Purpose                                          |
| -------------------------------- | ------------------------------------------------ |
| `RAZORPAY_KEY_ID`                | Server-side Razorpay key                         |
| `RAZORPAY_KEY_SECRET`            | Server-side secret (HMAC verify)                 |
| `RAZORPAY_WEBHOOK_SECRET`        | Webhook signing secret                           |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`    | Same key id, exposed to the checkout modal       |
| `NEXT_PUBLIC_META_PIXEL_ID`      | Meta Pixel ID                                    |
| `META_ACCESS_TOKEN`              | CAPI long-lived token                            |
| `META_TEST_EVENT_CODE`           | Optional, only while validating in Events Manager|
| `ADMIN_PASSWORD`                 | Single admin password                            |
| `ADMIN_SESSION_SECRET`           | 32+ random chars · `openssl rand -hex 32`        |
| `NEXT_PUBLIC_SITE_URL`           | `https://sentsparkle.in`                         |

## Deploy to Vercel

1. Push to GitHub (this repo).
2. Open <https://vercel.com/new>, import the repo.
3. Paste **every** key from `.env.local.example` into the Vercel project
   (Production *and* Preview).
4. After the first deploy: **Domains → Add → `sentsparkle.in`**.
5. In **Razorpay Dashboard → Webhooks**, add `https://sentsparkle.in/api/webhook/razorpay`
   with events `payment.captured` and `order.paid`. Use `RAZORPAY_WEBHOOK_SECRET`.
6. In **Meta Events Manager**, validate the Pixel + CAPI on
   `https://sentsparkle.in/order-confirmation/*` while `META_TEST_EVENT_CODE` is set,
   then unset it.

## Notes for the operator

- Source-of-truth note: there is no DB. If you sell 240 bottles of Velour Or, the
  catalogue stock count in `lib/products.ts` will *not* update — Razorpay holds
  the sale truth, full stop.
- Email/SMS are not wired. The thank-you page tells customers to screenshot, and
  the shipping page tells them to email `hello@sentsparkle.in` for tracking. Don't
  promise anything else without a transactional email provider.
- Product photography in `public/images/` is from the source PDF; the bottle
  labels in the photographs are blank/abstract.
