export default function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items];
  return (
    <div className="bg-ink text-ivory overflow-hidden border-y border-graphite">
      <div className="marquee-track py-3">
        {repeated.map((t, i) => (
          <span key={i} className="eyebrow text-stone mx-8 whitespace-nowrap">
            {t} <span className="mx-6 opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
