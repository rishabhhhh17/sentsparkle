export const metadata = { title: 'Shipping & returns' };

export default function ShippingPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 md:px-10 py-16 md:py-24">
      <p className="eyebrow text-gold">Shipping &amp; returns</p>
      <h1 className="h-display text-5xl md:text-6xl mt-4">Plain and short.</h1>
      <div className="mt-10 space-y-10 text-smoke leading-relaxed max-w-prose">
        <Block title="Shipping (India)">
          Free shipping across India on every order. We dispatch from Bombay in 2 working days via Bluedart. Email
          {' '}<a href="mailto:hello@sentsparkle.in" className="underline">hello@sentsparkle.in</a>{' '}
          with your order ID for tracking.
        </Block>
        <Block title="Shipping (international)">
          We ship to the UK, Singapore, and the UAE. Standard ₹2,400, delivered in 7–10 working days.
          Customer is responsible for any import duty.
        </Block>
        <Block title="Returns">
          Sealed bottles can be returned within 14 days for a full refund — write to us with your order ID and we&apos;ll arrange a courier pickup.
          Discovery 8 ml sprays are non-returnable once opened.
        </Block>
        <Block title="Damaged on arrival">
          If a bottle arrives damaged, send us a photo within 48 hours of delivery and we&apos;ll replace it on the next dispatch — no return required.
        </Block>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <p className="mt-3">{children}</p>
    </div>
  );
}
