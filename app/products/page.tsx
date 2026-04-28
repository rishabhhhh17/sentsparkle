import { Suspense } from 'react';
import { getActiveProducts } from '@/lib/products';
import ProductsClient from './products-client';

export const metadata = { title: 'Shop all eaux de parfum' };

export default function ProductsPage() {
  const products = getActiveProducts();
  return (
    <>
      <header className="bg-parchment border-b border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20">
          <p className="eyebrow text-gold">All four</p>
          <h1 className="h-display text-5xl md:text-6xl mt-3">Eaux de parfum.</h1>
          <p className="mt-4 max-w-xl text-smoke leading-relaxed">
            22% concentration, slow-blended, hand-numbered. Try a Discovery 8 ml first — it&apos;s the same juice, eight times less commitment.
          </p>
        </div>
      </header>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-5 md:px-10 py-20 text-smoke">Loading…</div>}>
        <ProductsClient products={products} />
      </Suspense>
    </>
  );
}
