import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black flex flex-col overflow-hidden"
      style={{ paddingTop: '52px' }}
    >
      {/* Extremely subtle radial gradient — Apple product page style */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(41,151,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="wrap-wide flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center py-20 lg:py-28">

          {/* ─── Copy ─── */}
          <div className="flex flex-col gap-7 reveal">

            {/* Eyebrow */}
            <p className="eyebrow">Traders' Mindset · Real Futures Education</p>

            {/* Headline — Apple-scale typography */}
            <div>
              <h1 className="text-[#f5f5f7]">
                Trade the process.
                <br />
                <span className="text-apple-blue">Not the promise.</span>
              </h1>
              <p className="mt-5 text-xl md:text-2xl font-semibold text-[#a1a1a6] leading-snug tracking-tight">
                Real futures trading. Real decisions.<br className="hidden sm:block" /> Risk-first education.
              </p>
            </div>

            {/* Body */}
            <p className="text-[17px] text-[#6e6e73] leading-relaxed max-w-lg">
              Learn order flow, VWAP and disciplined execution through Robert Rother's
              documented trading process — including the losses, the difficult periods
              and the days when not trading is the right choice.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#vsl" onClick={scrollTo('vsl')} id="hero-cta-primary" className="btn-primary">
                Watch the Free Training
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#qualify" onClick={scrollTo('qualify')} id="hero-cta-secondary" className="btn-secondary">
                Explore Traders' Mindset
              </a>
            </div>

            {/* Trust */}
            <p className="text-[13px] text-[#3a3a3c] leading-relaxed">
              No income promises. Trading involves substantial risk of loss.
            </p>

            {/* Stats strip — Apple style inline */}
            <div className="flex items-center gap-8 pt-4 border-t border-[rgba(255,255,255,0.07)]">
              {[
                { n: '2.1k', l: 'Members' },
                { n: '59+', l: 'Sessions' },
                { n: 'Free', l: 'Access' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-semibold text-[#f5f5f7] tracking-tight">{s.n}</div>
                  <div className="text-xs text-[#6e6e73] mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Portrait ─── */}
          <div className="relative flex justify-center lg:justify-end reveal d3">
            <div className="relative w-72 sm:w-80 lg:w-96 xl:w-[26rem]">

              {/* Subtle glow behind portrait */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(41,151,255,0.04) 0%, transparent 70%)' }}
              />

              {/* Portrait */}
              <div className="relative rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 40px 120px rgba(0,0,0,0.7)' }}>
                <img
                  src="/robert-rother.jpg"
                  alt="Robert Rother — founder of Traders' Mindset, futures trader and educator"
                  className="w-full h-auto object-cover block"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Bottom gradient */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-48"
                  style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
                />
                {/* Caption */}
                <div className="absolute bottom-5 left-5">
                  <p className="text-[#f5f5f7] font-semibold text-sm">Robert Rother</p>
                  <p className="text-[#6e6e73] text-xs mt-0.5">Founder · Traders' Mindset</p>
                </div>
              </div>

              {/* Floating card — Bookmap */}
              <div
                className="absolute -left-5 sm:-left-8 top-10 apple-card px-4 py-3 z-10 w-44"
                aria-label="Certified Bookmap Educator"
              >
                <div className="text-[9px] text-[#6e6e73] uppercase tracking-widest font-medium mb-1">Certified</div>
                <div className="text-[#f5f5f7] text-sm font-semibold">Bookmap Educator</div>
                <div className="text-[#6e6e73] text-[11px] mt-0.5">Order Flow Specialist</div>
              </div>

              {/* Floating card — years */}
              <div
                className="absolute -right-4 sm:-right-7 bottom-24 apple-card px-4 py-3 z-10 w-36"
                aria-label="30 years trading experience"
              >
                <div className="text-2xl font-bold text-apple-blue tracking-tight">~30</div>
                <div className="text-[#6e6e73] text-xs leading-snug mt-0.5">years of trading<br/>experience</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #000)' }}
      />
    </section>
  );
}
