import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    id: 'faq-1',
    q: 'What is Traders\u2019 Mindset?',
    a: "Traders' Mindset is a trading education community founded by Robert Rother. It documents his actual futures trading process — including order flow analysis, VWAP, Bookmap and risk-first decision making. The community is currently free to join.",
  },
  {
    id: 'faq-2',
    q: 'Is this a signal service or copy-trading platform?',
    a: 'No. This is educational content. The community documents the decision-making process behind trades — not instructions to copy specific trades. Nothing here constitutes financial advice or a recommendation to trade any specific instrument.',
  },
  {
    id: 'faq-3',
    q: 'Do I need trading capital to benefit from the content?',
    a: "No. The educational content, trade reviews and process documentation are available in the free community regardless of your capital. Futures trading requires capital to trade live, but you do not need trading capital to join the community and study the content.",
  },
  {
    id: 'faq-4',
    q: 'What trading instruments are covered?',
    a: 'The community focuses on futures markets, specifically using order flow analysis, VWAP, volume profiles and Bookmap tools. The content is not specific to equities, forex or crypto.',
  },
  {
    id: 'faq-5',
    q: 'What qualifications does Robert Rother hold?',
    a: "Robert is an official Bookmap Certified Educator and has approximately 30 years of trading experience. He managed institutional capital in Asia. He is also the author of a Spiegel bestselling book. Please verify these credentials before relying on them for marketing purposes.",
  },
  {
    id: 'faq-6',
    q: 'Can I get a refund?',
    a: "The community is currently presented as free to join. Paid products or programmes, if offered in future, would have their own refund terms communicated clearly at the point of purchase.",
  },
  {
    id: 'faq-7',
    q: 'Will watching the content guarantee I become a profitable trader?',
    a: 'No. Trading involves substantial risk of loss. Most retail traders lose money. Educational content can improve process and understanding, but cannot guarantee profitable outcomes. Past results documented in the community do not predict future performance.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => setOpen(prev => prev === id ? null : id);

  return (
    <section id="faq" className="section bg-black" aria-labelledby="faq-heading">
      <div className="wrap">

        <div className="text-center mb-16 reveal">
          <p className="eyebrow mb-5">FAQ</p>
          <h2 id="faq-heading" className="text-[#f5f5f7]">Frequently asked<br className="hidden sm:block" /> questions.</h2>
        </div>

        <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.06)] reveal">
          {FAQS.map((f) => (
            <div key={f.id}>
              <button
                id={f.id}
                onClick={() => toggle(f.id)}
                aria-expanded={open === f.id}
                aria-controls={`${f.id}-body`}
                className="flex items-center justify-between w-full py-6 text-left group"
              >
                <span className={`text-base font-medium leading-snug pr-8 transition-colors ${
                  open === f.id ? 'text-[#f5f5f7]' : 'text-[#a1a1a6] group-hover:text-[#f5f5f7]'
                }`}>
                  {f.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                  open === f.id
                    ? 'bg-[rgba(41,151,255,0.15)] text-[#2997ff]'
                    : 'bg-[#1a1a1a] text-[#6e6e73] group-hover:text-[#a1a1a6]'
                }`}>
                  {open === f.id ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </span>
              </button>

              <div
                id={`${f.id}-body`}
                role="region"
                aria-labelledby={f.id}
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: open === f.id ? '400px' : '0',
                  opacity: open === f.id ? 1 : 0,
                }}
              >
                <p className="text-[15px] text-[#6e6e73] leading-relaxed pb-7 max-w-2xl">{f.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
