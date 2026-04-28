'use client';
import { useEffect, useState } from 'react';
import { Product, formatINR } from '@/lib/products';
import { useCart } from '@/lib/cart-store';

declare global { interface Window { fbq?: (...a: any[]) => void } }

export default function PdpClient({ product }: { product: Product }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[1]?.id ?? product.variants[0].id);
  const variant = product.variants.find((v) => v.id === variantId)!;
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_ids: [variant.sku],
        content_name: product.name,
        content_type: 'product',
        value: variant.price_paise / 100,
        currency: 'INR',
      });
    }
  }, [product.name, variant.sku, variant.price_paise]);

  const handleAdd = () => {
    setAdding(true);
    add({
      productId: product.id,
      variantId: variant.id,
      productSlug: product.slug,
      productName: product.name,
      variantLabel: variant.label,
      unitPaise: variant.price_paise,
      image: product.images[1] ?? product.images[0],
    });
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', {
        content_ids: [variant.sku],
        content_name: product.name,
        content_type: 'product',
        value: variant.price_paise / 100,
        currency: 'INR',
      });
    }
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <div>
      <p className="eyebrow text-gold">{product.family} · eau de parfum</p>
      <h1 className="h-display text-4xl md:text-5xl mt-3">{product.name}</h1>
      <p className="mt-3 text-smoke">{product.tagline}</p>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-display text-3xl">{formatINR(variant.price_paise)}</span>
        {variant.compare_at_paise && (
          <span className="text-stone line-through text-sm">{formatINR(variant.compare_at_paise)}</span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm">
        <span>★★★★★</span>
        <span className="text-smoke">{product.rating} · {product.rating_count} reviews</span>
      </div>

      <div className="mt-8">
        <div className="eyebrow text-smoke mb-3">Choose size</div>
        <div className="grid grid-cols-3 gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariantId(v.id)}
              className={`px-3 py-3 border text-left transition-colors ${
                variantId === v.id ? 'bg-ink text-ivory border-ink' : 'border-line hover:border-ink'
              }`}
            >
              <div className="font-display text-lg leading-tight">{v.label}</div>
              <div className={`text-xs mt-1 ${variantId === v.id ? 'text-stone' : 'text-smoke'}`}>
                {formatINR(v.price_paise)}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={adding}
        className="btn-primary w-full mt-6"
      >
        {adding ? 'Added to cart' : 'Add to cart'}
      </button>

      <p className="mt-4 text-xs text-smoke">
        Free India shipping. Hand-numbered, dispatched in 2 working days from Bombay.
      </p>

      <div className="mt-10 border-t border-line pt-8 space-y-4 text-smoke leading-relaxed">
        <p>{product.description}</p>
      </div>
    </div>
  );
}
