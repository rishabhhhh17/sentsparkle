import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 md:px-10 py-24 md:py-32 text-center">
      <p className="eyebrow text-gold">404</p>
      <h1 className="h-display text-6xl md:text-8xl mt-4">Lost the scent.</h1>
      <p className="mt-6 text-smoke leading-relaxed">
        We couldn&apos;t find that page. The fragrance may have moved, or the link may be old.
      </p>
      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/products" className="btn-ghost">Shop the four</Link>
      </div>
    </section>
  );
}
