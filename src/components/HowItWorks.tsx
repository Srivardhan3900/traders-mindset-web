import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config';

const steps = [
  {
    n: '01',
    t: 'Watch the Free Training',
    b: 'Start with the free training video to understand the Traders\u2019 Mindset approach: risk-first execution, order flow and VWAP before any entry decision.',
    cta: { label: 'Watch the Training', href: '#vsl', external: false },
  },
  {
    n: '02',
    t: 'Explore the Community',
    b: "Explore the free Traders\u2019 Mindset community, trading-review archive and educational resources at your own pace.",
    cta: { label: 'Join the Community', href: SITE_CONFIG.skoolUrl, external: true },
  },
  {
    n: '03',
    t: 'Identify Your Next Step',
    b: 'Use the short qualification form to identify which resource — free community or a direct conversation — is the most appropriate next step for where you are.',
    cta: { label: 'Find Your Next Step', href: '#qualify', external: false },
  },
];

export default function HowItWorks() {
  const go = (href: string, external: boolean) => {
    if (external) { window.open(href, '_blank', 'noopener noreferrer'); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="section bg-[#0a0a0a]" aria-labelledby="how-heading">
      <div className="wrap-wide">

        <div className="max-w-3xl mb-20 reveal">
          <p className="eyebrow mb-5">How It Works</p>
          <h2 id="how-heading" className="text-[#f5f5f7]">
            Three Simple Steps.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-px bg-[rgba(255,255,255,0.06)] rounded-3xl overflow-hidden">
          {steps.map((s, i) => (
            <div key={s.n} className={`flex-1 bg-[#0a0a0a] p-10 flex flex-col gap-6 reveal d${i + 1}`}>
              <p className="text-[#2997ff] text-sm font-semibold">{s.n}</p>
              <div>
                <h3 className="text-[#f5f5f7] text-xl font-semibold mb-3">{s.t}</h3>
                <p className="text-[#6e6e73] text-[15px] leading-relaxed">{s.b}</p>
              </div>
              <div className="mt-auto pt-2">
                <button
                  onClick={() => go(s.cta.href, s.cta.external)}
                  className="btn-text"
                  aria-label={s.cta.label}
                >
                  {s.cta.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
