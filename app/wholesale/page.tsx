export const metadata = { title: 'Wholesale' };

export default function WholesalePage() {
  return (
    <section className="mx-auto max-w-3xl px-5 md:px-10 py-16 md:py-24">
      <p className="eyebrow text-gold">Wholesale</p>
      <h1 className="h-display text-5xl md:text-6xl mt-4">Stockists.</h1>
      <div className="mt-8 text-smoke leading-relaxed space-y-5 max-w-prose">
        <p>
          We work with a small list of retailers — twelve in India, three in the UK, two in Singapore.
          We pick by hand: what matters is whether the shop will tell our suppliers&apos; story honestly.
        </p>
        <p>
          Minimum opening order is six bottles per fragrance, in 50 ml only.
          We do not run promotions, marketplaces, or grey-market resale.
        </p>
        <p>
          To enquire, write to <a className="underline" href="mailto:trade@sentsparkle.in">trade@sentsparkle.in</a> with your shop name, your city, and a sentence about why you&apos;re asking.
        </p>
      </div>
    </section>
  );
}
