export default function ApproachSection() {
  const blocks = [
    { n: '01', t: 'Process Over Predictions', b: 'Learn how trading decisions are structured — the setup, entry logic, sizing, exit — rather than relying on unverified calls or outcome promises.' },
    { n: '02', t: 'Risk Before Reward', b: 'Every session begins with what can go wrong, not what might go right. Protecting capital is the prerequisite for staying in the market long enough to learn.' },
    { n: '03', t: 'Real Market Decisions', b: 'Study documented sessions including losses, difficult decisions and periods when not trading is the correct choice. No edited highlight reels.' },
  ];

  const creds = [
    { v: '~30', l: 'Years Trading', note: 'Verify with Robert before publishing' },
    { v: '$150M+', l: 'Institutional Capital (Asia)', note: 'Verify with Robert before publishing' },
    { v: 'Bestseller', l: 'Spiegel Author', note: 'Verify with Robert before publishing' },
    { v: 'Official', l: 'Bookmap Educator', note: null },
  ];

  return (
    <section id="approach" className="section bg-[#0a0a0a]" aria-labelledby="approach-heading">
      <div className="wrap-wide">

        {/* Header */}
        <div className="max-w-3xl mb-20 reveal">
          <p className="eyebrow mb-5">The Approach</p>
          <h2 id="approach-heading" className="text-[#f5f5f7] mb-6">
            A Different Approach<br className="hidden sm:block" /> to Trading Education.
          </h2>
          <p className="text-xl text-[#a1a1a6] leading-relaxed">
            Focus on the process behind each trade, not promises about the outcome.
          </p>
        </div>

        {/* 3 blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)] rounded-3xl overflow-hidden mb-24">
          {blocks.map((b) => (
            <div key={b.n} className={`bg-[#0a0a0a] p-10 reveal`}>
              <p className="text-[#2997ff] text-sm font-semibold mb-6">{b.n}</p>
              <h3 className="text-[#f5f5f7] text-xl font-semibold mb-4">{b.t}</h3>
              <p className="text-[#6e6e73] text-[15px] leading-relaxed">{b.b}</p>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-16">
          <p className="eyebrow mb-10 reveal">About Robert Rother</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {creds.map((c, i) => (
              <div key={c.l} className={`reveal d${i + 1}`}>
                <div className="text-2xl font-bold text-[#f5f5f7] tracking-tight mb-1">{c.v}</div>
                <div className="text-sm text-[#a1a1a6]">{c.l}</div>
                {c.note && <div className="text-[10px] text-amber-500/50 mt-1">{c.note}</div>}
              </div>
            ))}
          </div>
          <p className="mt-8 text-[11px] text-[#3a3a3c] leading-relaxed reveal">
            ⚠ Credentials marked above are source-derived. Verify with Robert before publishing.
            Historical results do not predict future outcomes.
          </p>
        </div>

      </div>
    </section>
  );
}
