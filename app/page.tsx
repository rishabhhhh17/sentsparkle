import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Marquee from '@/components/Marquee';

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const hero = featured[0];

  return (
    <>
      {/* HERO */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 pt-10 md:pt-16 pb-14 md:pb-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 fade-up">
            <p className="eyebrow text-gold">Bombay · Est. 2024</p>
            <h1 className="h-display text-5xl md:text-7xl mt-5">
              Eaux de parfum<br />that catch the light.
            </h1>
            <p className="mt-6 text-smoke max-w-lg leading-relaxed">
              Four signatures, each slow-blended for six weeks before bottling.
              22% concentration, hand-numbered glass, and sourcing notes you can read on the back of every box.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/products" className="btn-primary">Shop the four</Link>
              <Link href="/products" className="btn-ghost">Try a Discovery 8 ml — ₹890</Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-smoke text-sm">
              <span>★★★★★</span>
              <span>4.9 avg from 700+ wearers</span>
            </div>
          </div>
          <div className="md:col-span-6 fade-up">
            <div className="relative aspect-[4/5] md:aspect-[5/6] bg-cream">
              {hero && (
                <Image
                  src={hero.images[0]}
                  alt={hero.name}
                  fill
                  priority
                  sizes="(min-width:768px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute left-4 bottom-4 bg-ivory/95 backdrop-blur px-4 py-3 max-w-[60%]">
                <p className="eyebrow text-gold">{hero?.family}</p>
                <p className="font-display text-2xl mt-1">{hero?.name}</p>
                <p className="text-smoke text-xs mt-1 line-clamp-1">{hero?.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          'Free India shipping',
          '8 ml Discoveries · ₹890',
          'Hand-numbered glass',
          '22% concentration · true eau de parfum',
          'Slow-blended in Bombay',
        ]}
      />

      {/* SOCIAL PROOF */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-y-8">
          <Stat number="4" label="Eaux de parfum" />
          <Stat number="22%" label="Perfume concentration" />
          <Stat number="6 wks" label="Slow-blended" />
          <Stat number="700+" label="Wearers since launch" />
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="shop" className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-gold">The four</p>
              <h2 className="h-display text-4xl md:text-5xl mt-3">A small house, on purpose.</h2>
            </div>
            <Link href="/products" className="hidden md:inline-flex eyebrow text-ink hover:text-gold">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/products" className="btn-primary">Shop all four</Link>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] bg-ivory">
              <Image src="/images/rose-velours.jpg" alt="Rose Velours bottle on cream silk" fill className="object-cover" sizes="(min-width:768px) 40vw, 100vw" />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow text-gold">The house</p>
            <h2 className="h-display text-4xl md:text-5xl mt-3">
              We make four perfumes.<br />That&apos;s the whole brief.
            </h2>
            <p className="mt-6 text-smoke leading-relaxed max-w-xl">
              No seasonal extensions, no celebrity collabs, no body mists or hair perfumes or deodorants.
              Four eaux de parfum, made well, by a studio of three in a flat in Lower Parel.
              We blend in small batches — 240 bottles per pour — and let each one rest for six weeks before it ships.
            </p>
            <div className="mt-8">
              <Link href="/about" className="btn-ghost">Read our notes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto max-w-4xl px-5 md:px-10 py-24 text-center">
          <p className="eyebrow text-gold">Start small</p>
          <h2 className="h-display text-4xl md:text-6xl mt-4">
            Eight millilitres is enough<br />to change your mind.
          </h2>
          <p className="mt-6 text-stone max-w-xl mx-auto">
            Every signature is available as a Discovery 8 ml — full concentration, the same juice as the 50 ml, in a refillable spray.
            ₹890 each, free shipping.
          </p>
          <div className="mt-8">
            <Link href="/products" className="inline-flex items-center justify-center bg-ivory text-ink eyebrow px-8 py-4 hover:bg-rose hover:text-ink transition-colors">
              Shop Discovery sprays
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl">{number}</div>
      <div className="eyebrow text-smoke mt-2">{label}</div>
    </div>
  );
}
