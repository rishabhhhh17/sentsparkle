'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-ink text-ivory mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-display text-3xl">SentSparkle</div>
          <p className="mt-4 max-w-md text-stone leading-relaxed">
            Slow-blended eaux de parfum from a small studio in Bombay.
            Four signatures. No sub-brands, no seasonal extensions, no shortcuts.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim().length > 3) setDone(true);
            }}
            className="mt-8 max-w-md"
          >
            <label className="eyebrow text-stone">New-bar drops, twice a year</label>
            <div className="mt-3 flex border-b border-stone/40">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.in"
                className="flex-1 bg-transparent py-3 text-ivory placeholder:text-stone/60 focus:outline-none"
              />
              <button type="submit" className="eyebrow text-ivory hover:text-rose px-2">
                {done ? 'Thank you' : 'Subscribe'}
              </button>
            </div>
            {done && (
              <p className="mt-3 text-stone text-xs">
                We&apos;ll be in touch with new-bar drops. No spam, no daily mail.
              </p>
            )}
          </form>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          <FooterCol
            title="Shop"
            links={[
              ['All Eaux de Parfum', '/products'],
              ['Discovery 8 ml', '/products'],
            ]}
          />
          <FooterCol
            title="The House"
            links={[
              ['About', '/about'],
              ['Wholesale', '/wholesale'],
              ['Contact', '/contact'],
            ]}
          />
          <FooterCol
            title="Help"
            links={[
              ['Shipping & returns', '/shipping'],
              ['Privacy', '/privacy'],
              ['Terms', '/terms'],
            ]}
          />
        </div>
      </div>

      <div className="border-t border-stone/15">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-5 text-center">
          <p className="text-sm text-ivory">
            Use code{' '}
            <span className="font-mono font-semibold tracking-wider text-rose">WELCOME15</span>{' '}
            for <span className="font-semibold">15% off</span> your first order.
          </p>
        </div>
      </div>

      <div className="border-t border-stone/15">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-stone text-xs">
            © {new Date().getFullYear()} SentSparkle Parfums Pvt. Ltd. — Bombay, India.
          </p>
          <p className="text-stone text-xs">Eaux de parfum, hand-numbered. 22% concentration. Made in India.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="eyebrow text-stone">{title}</div>
      <ul className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-ivory/90 hover:text-rose transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
