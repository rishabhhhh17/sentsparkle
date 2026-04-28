import Image from 'next/image';
import Link from 'next/link';

export const metadata = { title: 'The House' };

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <p className="eyebrow text-gold">The house</p>
          <h1 className="h-display text-5xl md:text-7xl mt-4">A small studio in Bombay.</h1>
          <div className="mt-8 max-w-prose text-smoke leading-relaxed space-y-5">
            <p>
              SentSparkle is a perfume house of three — a perfumer, a sourcer, and a glassmaker — working out of a flat in Lower Parel, Bombay.
              We make four eaux de parfum. That&apos;s it. Not four collections, not four flankers. Four perfumes.
            </p>
            <p>
              Every fragrance is built around a single anchor note we&apos;ve found and stayed loyal to:
              Hojai oud, Kannauj rose, Kashmiri saffron, Western-Ghats birch tar.
              We pay our suppliers in full on the day we order, and we put their names on the back of every box.
            </p>
            <p>
              We blend in batches of 240 bottles and let each one rest for six weeks before bottling.
              Six weeks isn&apos;t magic — it&apos;s how long it takes the alcohol, the absolute, and the trace synthetics
              to stop talking past each other and start talking together.
            </p>
            <p>
              We aren&apos;t mass. We won&apos;t be everywhere. The point of a small house is staying small enough to keep blending by hand.
            </p>
          </div>
          <div className="mt-10">
            <Link href="/products" className="btn-primary">Shop the four</Link>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] bg-cream">
            <Image src="/images/velour-or.jpg" alt="Velour Or bottle" fill className="object-cover" sizes="(min-width:768px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="bg-parchment">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 grid md:grid-cols-3 gap-10">
          {[
            ['22%', 'Perfume concentration — a true eau de parfum, not an EdT in disguise.'],
            ['6 weeks', 'Macération time. Every batch rests before it bottles.'],
            ['240', 'Bottles per pour. We don&rsquo;t scale past that, on purpose.'],
          ].map(([n, l]) => (
            <div key={n}>
              <div className="font-display text-5xl">{n}</div>
              <p className="mt-3 text-smoke leading-relaxed" dangerouslySetInnerHTML={{ __html: l }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
