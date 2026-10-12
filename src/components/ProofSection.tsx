// ⚠️ Demo testimonials — NOT real customers. Replace before launch.
const DEMOS = [
  { id: 'd1', q: "The trade review archive is the most honest trading education I've found. Seeing losses documented alongside wins changed how I think about risk.", who: 'Demo Participant A' },
  { id: 'd2', q: "Robert explains every decision: why he took the trade, why he didn't. The process-first approach is completely different from signal services.", who: 'Demo Participant B' },
  { id: 'd3', q: "The Bookmap sessions helped me understand order flow in a way no book had. I still lose trades — but I understand them better now.", who: 'Demo Participant C' },
];

export default function ProofSection() {
  return (
    <section id="proof" className="section bg-black" aria-labelledby="proof-heading">
      <div className="wrap-wide">

        {/* Header */}
        <div className="max-w-3xl mb-20 reveal">
          <p className="eyebrow mb-5">Community</p>
          <h2 id="proof-heading" className="text-[#f5f5f7] mb-5">
            See the Process for Yourself.
          </h2>
          <p className="text-xl text-[#a1a1a6] leading-relaxed">
            59 curated trade review sessions, live Bookmap analysis and a 4-day prop firm
            course — all inside the free community.
          </p>
        </div>

        {/* Stats — Apple-style large numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)] rounded-3xl overflow-hidden mb-24 reveal">
          {[
            { v: '2.1k', l: 'Community members' },
            { v: '59+', l: 'Sessions archived' },
            { v: '2', l: 'Free courses' },
            { v: 'Free', l: 'Community access' },
          ].map((s) => (
            <div key={s.l} className="bg-black p-10 text-center">
              <div className="text-4xl font-bold text-[#f5f5f7] tracking-tight">{s.v}</div>
              <div className="text-sm text-[#6e6e73] mt-2">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Demo testimonials */}
        <div className="mb-6 reveal">
          <div className="badge-demo mb-8">⚠ Demo placeholders — replace before launch</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMOS.map((t, i) => (
              <div key={t.id} className={`apple-card p-7 flex flex-col gap-4 reveal d${i + 1}`}
                style={{ borderColor: 'rgba(245,158,11,0.12)', borderStyle: 'dashed' }}>
                <div className="badge-demo self-start text-[9px]">FICTIONAL DEMO — NOT A REAL CUSTOMER</div>
                <p className="text-sm text-[#a1a1a6] leading-relaxed italic flex-1">"{t.q}"</p>
                <div className="border-t border-[rgba(255,255,255,0.06)] pt-4">
                  <p className="text-xs text-[#6e6e73]">{t.who}</p>
                  <p className="text-[10px] text-amber-500/50 mt-0.5">Placeholder — not a real testimonial</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="apple-card p-5 reveal" style={{ borderColor: 'rgba(245,158,11,0.15)', borderStyle: 'dashed' }}>
          <p className="text-xs text-amber-400/60 leading-relaxed">
            <strong className="text-amber-400/80">Action required before launch:</strong> Replace all three cards with
            verified, approved community member testimonials. Obtain written permission for each quote.
          </p>
        </div>

      </div>
    </section>
  );
}
