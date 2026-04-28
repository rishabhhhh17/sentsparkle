'use client';
import { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const FAMILIES: { key: Product['family'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'woody', label: 'Woody' },
  { key: 'oriental', label: 'Oriental' },
  { key: 'floral', label: 'Floral' },
  { key: 'smoky', label: 'Smoky' },
];

export default function ProductsClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const family = sp.get('family') ?? 'all';

  const filtered = useMemo(() => {
    if (family === 'all') return products;
    return products.filter((p) => p.family === family);
  }, [family, products]);

  const setFamily = (f: string) => {
    const next = new URLSearchParams(sp.toString());
    if (f === 'all') next.delete('family');
    else next.set('family', f);
    router.push(`/products${next.toString() ? `?${next}` : ''}`, { scroll: false });
  };

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-12">
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {FAMILIES.map((f) => (
            <button
              key={f.key}
              onClick={() => setFamily(f.key)}
              className={`eyebrow px-4 py-2 border transition-colors ${
                family === f.key ? 'bg-ink text-ivory border-ink' : 'border-line text-smoke hover:text-ink hover:border-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-smoke py-16 text-center">No fragrances in this family yet — check back next quarter.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
