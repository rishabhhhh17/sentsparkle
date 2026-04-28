import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getActiveProducts, getProductBySlug, getRelatedProducts } from '@/lib/products';
import PdpClient from './pdp-client';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams() {
  return getActiveProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProductBySlug(params.slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.tagline}`, description: p.description };
}

export default function PdpPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.slug, 3);

  return (
    <>
      <nav className="mx-auto max-w-7xl px-5 md:px-10 pt-6 eyebrow text-smoke">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2 opacity-50">/</span>
        <Link href="/products" className="hover:text-ink">Eaux de parfum</Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="relative aspect-[4/5] bg-cream">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(min-width:768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {product.images.slice(0, 2).map((src, i) => (
              <div key={i} className="relative aspect-square bg-cream">
                <Image src={src} alt={`${product.name} view ${i + 1}`} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <PdpClient product={product} />
        </div>
      </section>

      {/* notes & story */}
      <section className="bg-parchment">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <p className="eyebrow text-gold">The notes</p>
            <h2 className="h-display text-3xl md:text-4xl mt-3">A composition in three acts.</h2>
            <div className="mt-8 space-y-7">
              <NoteRow label="Top" notes={product.notes.top} />
              <NoteRow label="Heart" notes={product.notes.heart} />
              <NoteRow label="Base" notes={product.notes.base} />
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
              <Spec label="Longevity" value={product.longevity} />
              <Spec label="Sillage" value={product.sillage} />
            </div>
          </div>
          <div className="md:col-span-6">
            <p className="eyebrow text-gold">The story</p>
            <h2 className="h-display text-3xl md:text-4xl mt-3">{product.tagline}</h2>
            <p className="mt-6 text-smoke leading-relaxed">{product.story}</p>
            <ul className="mt-8 space-y-3 text-ink">
              {product.highlights.map((h) => (
                <li key={h} className="pl-5 relative leading-relaxed">
                  <span className="absolute left-0 top-2 h-1 w-1 bg-gold rounded-full" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24">
          <div className="mb-10">
            <p className="eyebrow text-gold">The other three</p>
            <h2 className="h-display text-3xl md:text-4xl mt-3">If you like {product.name}, try…</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}

function NoteRow({ label, notes }: { label: string; notes: string[] }) {
  return (
    <div>
      <div className="eyebrow text-gold">{label}</div>
      <div className="mt-2 font-display text-2xl text-ink leading-snug">{notes.join(' · ')}</div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="eyebrow text-smoke">{label}</div>
      <div className="mt-1 font-display text-xl">{value}</div>
    </div>
  );
}
