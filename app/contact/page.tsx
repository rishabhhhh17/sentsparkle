export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 md:px-10 py-16 md:py-24">
      <p className="eyebrow text-gold">Contact</p>
      <h1 className="h-display text-5xl md:text-6xl mt-4">Write to us.</h1>
      <div className="mt-8 text-smoke leading-relaxed space-y-5 max-w-prose">
        <p>
          For order tracking, returns, gifting, or wholesale enquiries, write to{' '}
          <a className="underline" href="mailto:hello@sentsparkle.in">hello@sentsparkle.in</a> with your order ID.
          We answer in 24 working hours, Monday to Friday.
        </p>
        <p>
          Studio visits are by appointment only. We&apos;re a small team and bottle days are quiet days.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow text-smoke">Email</div>
          <a className="font-display text-2xl mt-2 block" href="mailto:hello@sentsparkle.in">hello@sentsparkle.in</a>
        </div>
        <div>
          <div className="eyebrow text-smoke">Studio</div>
          <p className="font-display text-2xl mt-2">
            Lower Parel,<br />Mumbai 400013, India.
          </p>
        </div>
      </div>
    </section>
  );
}
