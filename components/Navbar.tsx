'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-store';
import { ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { open, count } = useCart();
  const [n, setN] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const u = useCart.subscribe(() => setN(useCart.getState().count()));
    setN(count());
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => { u(); window.removeEventListener('scroll', onScroll); };
  }, [count]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled ? 'bg-ivory/95 border-line backdrop-blur' : 'bg-ivory border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <button
          className="md:hidden -ml-1 h-11 w-11 grid place-items-center text-ink"
          aria-label="Open menu"
          onClick={() => setMobile(true)}
        >
          <Menu size={20} />
        </button>

        <nav className="hidden md:flex items-center gap-8 eyebrow">
          <Link href="/products" className="hover:text-ink text-smoke transition-colors">Shop</Link>
          <Link href="/products" className="hover:text-ink text-smoke transition-colors">Discovery Set</Link>
          <Link href="/about" className="hover:text-ink text-smoke transition-colors">The House</Link>
        </nav>

        <Link href="/" className="font-display text-2xl md:text-3xl tracking-wide text-ink">
          SentSparkle
        </Link>

        <div className="flex items-center gap-2 md:gap-5">
          <Link href="/products" className="hidden sm:inline-flex btn-primary !py-2 !px-4 !min-h-[36px] text-[0.68rem]">
            Shop now
          </Link>
          <button
            onClick={open}
            aria-label="Open cart"
            className="relative h-11 w-11 grid place-items-center text-ink"
          >
            <ShoppingBag size={20} />
            {n > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-ink text-ivory text-[10px] font-medium rounded-full h-5 w-5 grid place-items-center">
                {n}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobile && (
        <div className="fixed inset-0 z-50 bg-ivory md:hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <span className="font-display text-2xl">SentSparkle</span>
            <button
              className="h-11 w-11 grid place-items-center"
              aria-label="Close menu"
              onClick={() => setMobile(false)}
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-6 gap-2">
            {[
              ['Shop all', '/products'],
              ['The House', '/about'],
              ['Wholesale', '/wholesale'],
              ['Shipping', '/shipping'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobile(false)}
                className="font-display text-3xl py-3 border-b border-line"
              >
                {label}
              </Link>
            ))}
            <Link href="/products" onClick={() => setMobile(false)} className="btn-primary mt-6 w-full">
              Shop now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
