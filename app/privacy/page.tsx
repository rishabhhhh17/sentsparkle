export const metadata = { title: 'Privacy' };

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 md:px-10 py-16 md:py-24">
      <p className="eyebrow text-gold">Privacy</p>
      <h1 className="h-display text-5xl md:text-6xl mt-4">What we keep, briefly.</h1>
      <div className="mt-10 space-y-6 text-smoke leading-relaxed max-w-prose">
        <p>
          When you place an order we keep your name, email, phone, and shipping address — for as long as the
          tax authority requires. We don&apos;t sell or rent customer data, ever.
        </p>
        <p>
          We use Razorpay to process payments. Card numbers and CVVs are not stored on our servers — Razorpay handles them under PCI-DSS.
        </p>
        <p>
          We use Meta Pixel and the Conversions API to measure ad performance. Where possible, identifiers are hashed before they leave our servers.
        </p>
        <p>
          To request deletion of your data, write to <a className="underline" href="mailto:privacy@sentsparkle.in">privacy@sentsparkle.in</a> from the email address used to place the order.
        </p>
      </div>
    </section>
  );
}
