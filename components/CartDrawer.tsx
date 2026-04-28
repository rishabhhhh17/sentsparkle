'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { formatINR } from '@/lib/products';

export default function CartDrawer() {
  const { isOpen, close, lines, setQty, remove, subtotalPaise } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      <div className="absolute inset-0 bg-ink/50" onClick={close} />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[440px] bg-ivory shadow-card flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-display text-2xl">Your cart</h2>
          <button onClick={close} aria-label="Close cart" className="h-11 w-11 grid place-items-center">
            <X size={20} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
            <div className="font-display text-3xl">Nothing yet.</div>
            <p className="text-smoke max-w-xs">
              Add a Discovery 8 ml — eight millilitres is enough to change your mind about a fragrance.
            </p>
            <Link href="/products" onClick={close} className="btn-primary">
              Shop the four
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-line">
              {lines.map((l) => (
                <div key={l.variantId} className="py-5 flex gap-4">
                  <div className="relative h-24 w-20 flex-none bg-cream">
                    <Image src={l.image} alt={l.productName} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${l.productSlug}`}
                      onClick={close}
                      className="font-display text-xl block leading-tight"
                    >
                      {l.productName}
                    </Link>
                    <div className="text-smoke text-sm mt-0.5">{l.variantLabel}</div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center border border-line">
                        <button
                          aria-label="Decrease"
                          className="h-9 w-9 grid place-items-center hover:bg-cream"
                          onClick={() => setQty(l.variantId, l.qty - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button
                          aria-label="Increase"
                          className="h-9 w-9 grid place-items-center hover:bg-cream"
                          onClick={() => setQty(l.variantId, l.qty + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-sm">{formatINR(l.unitPaise * l.qty)}</div>
                    </div>
                    <button
                      onClick={() => remove(l.variantId)}
                      className="mt-2 text-xs text-smoke hover:text-ink underline-offset-4 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5 space-y-4 bg-parchment">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-display text-2xl">{formatINR(subtotalPaise())}</span>
              </div>
              <p className="text-xs text-smoke">
                Free India shipping on every order. Taxes included.
              </p>
              <Link href="/checkout" onClick={close} className="btn-primary w-full">
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
