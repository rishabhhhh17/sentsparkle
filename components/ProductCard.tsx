'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product, getMinVariantPaise, formatINR } from '@/lib/products';
import { useCart } from '@/lib/cart-store';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const min = getMinVariantPaise(product);
  const discovery = product.variants.find((v) => v.ml === 8) ?? product.variants[0];

  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="relative block bg-cream overflow-hidden">
        <div className="aspect-[4/5] relative">
          <Image
            src={product.images[1] ?? product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width:1024px) 24vw, (min-width:640px) 45vw, 90vw"
            className="object-cover product-card-img"
          />
        </div>
        <button
          aria-label={`Quick add ${product.name} discovery`}
          onClick={(e) => {
            e.preventDefault();
            add({
              productId: product.id,
              variantId: discovery.id,
              productSlug: product.slug,
              productName: product.name,
              variantLabel: discovery.label,
              unitPaise: discovery.price_paise,
              image: product.images[1] ?? product.images[0],
            });
          }}
          className="absolute right-3 bottom-3 bg-ivory text-ink h-11 w-11 grid place-items-center shadow-soft opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus size={18} />
        </button>
      </Link>

      <div className="pt-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-xl leading-tight">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="eyebrow text-smoke mt-1.5">{product.family} · eau de parfum</p>
        </div>
        <div className="text-right">
          <div className="text-sm">from {formatINR(min)}</div>
        </div>
      </div>
      <p className="text-smoke text-sm mt-2 line-clamp-1">{product.tagline}</p>
    </article>
  );
}
