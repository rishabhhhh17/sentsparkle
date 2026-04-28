export const metadata = { title: 'Terms' };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 md:px-10 py-16 md:py-24">
      <p className="eyebrow text-gold">Terms</p>
      <h1 className="h-display text-5xl md:text-6xl mt-4">The fine print.</h1>
      <div className="mt-10 space-y-6 text-smoke leading-relaxed max-w-prose">
        <p>
          By placing an order with SentSparkle Parfums Pvt. Ltd. you agree that the price displayed at checkout is the final price, taxes included.
        </p>
        <p>
          Our perfumes are 22% concentration eaux de parfum. They contain alcohol denat. and natural absolutes —
          a small percentage of wearers may experience irritation. Patch-test the discovery spray before applying generously.
        </p>
        <p>
          Promotional emails and SMS are opt-in only. You can unsubscribe at any time from the link at the foot of any email.
        </p>
        <p>
          Any disputes are subject to the courts of Mumbai, India.
        </p>
      </div>
    </section>
  );
}
