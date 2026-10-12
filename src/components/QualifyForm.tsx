import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, AlertCircle, Lock, ExternalLink } from 'lucide-react';
import { qualifyVisitor, SITE_CONFIG } from '../config';

interface FormData {
  name: string; email: string;
  experience: string; situation: string; goal: string; capital: string;
}
type Route = 'calendly' | 'skool' | null;

function OptionCard({ id, label, letter, selected, onSelect }: {
  id: string; label: string; letter: string; selected: boolean; onSelect: () => void;
}) {
  return (
    <button id={id} type="button" onClick={onSelect} role="radio" aria-checked={selected}
      className={`option-card flex items-start gap-3 ${selected ? 'option-card-selected' : ''}`}>
      <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold mt-0.5 transition-all duration-200 ${
        selected ? 'border-[#2997ff] bg-[#2997ff] text-white' : 'border-[rgba(255,255,255,0.12)] text-[#6e6e73]'
      }`} aria-hidden="true">
        {selected ? <Check className="w-3.5 h-3.5" /> : letter}
      </span>
      <span className={`leading-snug text-sm ${selected ? 'text-[#f5f5f7]' : 'text-[#a1a1a6]'}`}>{label}</span>
    </button>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}
      aria-label={`Step ${current} of ${total}`}>
      <div className="flex gap-1.5 mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
            i + 1 < current ? 'step-done' : i + 1 === current ? 'step-active' : 'step-inactive'
          }`} />
        ))}
      </div>
      <p className="text-[11px] text-[#6e6e73]">Step {current} of {total}</p>
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <span className="form-error" role="alert">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{message}
    </span>
  );
}

function CalendlyResult() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-8">
      <div className="w-14 h-14 rounded-full bg-[rgba(41,151,255,0.1)] border border-[rgba(41,151,255,0.2)] flex items-center justify-center">
        <Check className="w-7 h-7 text-[#2997ff]" />
      </div>
      <div>
        <p className="eyebrow mb-4">Next step</p>
        <h3 className="text-[#f5f5f7] text-2xl font-semibold mb-3">Your next step is a conversation.</h3>
        <p className="text-[#a1a1a6] text-sm max-w-sm mx-auto leading-relaxed">
          Based on your answers, a direct conversation may be the most useful next step.
          This is not an approval or a guarantee of any trading outcome.
        </p>
      </div>
      {SITE_CONFIG.calendlyConfigured ? (
        <a id="result-calendly-btn" href={SITE_CONFIG.calendlyUrl} target="_blank" rel="noopener noreferrer"
          className="btn-primary">Book a Conversation <ExternalLink className="w-4 h-4" /></a>
      ) : (
        <div className="w-full max-w-sm">
          <div className="apple-card p-4 text-center mb-4" style={{ borderColor: 'rgba(245,158,11,0.2)' }}>
            <div className="badge-demo mx-auto mb-2">⚠ Demo mode</div>
            <p className="text-xs text-amber-400/70 leading-relaxed">
              Set <code className="text-amber-300">calendlyUrl</code> and
              <code className="text-amber-300"> calendlyConfigured = true</code> in <code className="text-amber-300">src/config.ts</code>.
            </p>
          </div>
          <button disabled className="btn-primary w-full opacity-40 cursor-not-allowed">
            Book a Conversation (link not configured)
          </button>
        </div>
      )}
      <p className="text-[11px] text-[#3a3a3c] max-w-xs leading-relaxed">
        Trading involves substantial financial risk. No outcomes are guaranteed.
      </p>
    </div>
  );
}

function SkoolResult() {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-8">
      <div className="w-14 h-14 rounded-full bg-[rgba(41,151,255,0.1)] border border-[rgba(41,151,255,0.2)] flex items-center justify-center">
        <Check className="w-7 h-7 text-[#2997ff]" />
      </div>
      <div>
        <p className="eyebrow mb-4">Your next step</p>
        <h3 className="text-[#f5f5f7] text-2xl font-semibold mb-3">Your next step is Traders' Mindset.</h3>
        <p className="text-[#a1a1a6] text-sm max-w-sm mx-auto leading-relaxed">
          Explore the free community, educational resources and documented trading sessions.
          Start with the 'Start Here' course and the trade review archive.
        </p>
      </div>
      <a id="result-skool-btn" href={SITE_CONFIG.skoolUrl} target="_blank" rel="noopener noreferrer"
        className="btn-primary">Enter the Free Community <ExternalLink className="w-4 h-4" /></a>
      <p className="text-[11px] text-[#3a3a3c] max-w-xs leading-relaxed">
        Trading involves substantial financial risk. Community is currently presented as free.
      </p>
    </div>
  );
}

export default function QualifyForm() {
  const [step, setStep] = useState(1);
  const TOTAL = 3;
  const [form, setForm] = useState<FormData>({ name: '', email: '', experience: '', situation: '', goal: '', capital: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [route, setRoute] = useState<Route>(null);

  const validate = (s: number) => {
    const e: Partial<FormData> = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Please enter your full name.';
      if (!form.email.trim()) e.email = 'Please enter your email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    }
    if (s === 2 && !form.experience) e.experience = 'Please select an option.';
    if (s === 3) {
      if (!form.situation) e.situation = 'Please select an option.';
      if (!form.goal) e.goal = 'Please select a goal.';
      if (!form.capital) e.capital = 'Please select a range.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    if (step < TOTAL) { setStep(step + 1); return; }
    setRoute(qualifyVisitor(form.goal, form.capital));
  };

  const set = <K extends keyof FormData>(k: K, v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: undefined }));
  };

  if (route) {
    return (
      <section id="qualify" className="section bg-[#0a0a0a]" aria-labelledby="qualify-heading">
        <div className="wrap">
          <div className="max-w-lg mx-auto">
            <div className="apple-card p-10 reveal">
              {route === 'calendly' ? <CalendlyResult /> : <SkoolResult />}
            </div>
            <p className="mt-4 text-center text-[11px] text-[#3a3a3c]">
              Demo mode — no details have been saved or transmitted.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="qualify" className="section bg-[#0a0a0a]" aria-labelledby="qualify-heading">
      <div className="wrap">
        <div className="text-center mb-14 reveal">
          <p className="eyebrow mb-5">Find Your Next Step</p>
          <h2 id="qualify-heading" className="text-[#f5f5f7] mb-5">Find Your Next Step</h2>
          <p className="text-lg text-[#a1a1a6] max-w-xl mx-auto leading-relaxed">
            Tell us where you are in your trading journey so we can direct you to the most relevant next step.
          </p>
        </div>

        <div className="max-w-lg mx-auto reveal d2">
          <div className="apple-card p-8 md:p-10">
            <ProgressBar current={step} total={TOTAL} />

            <div className="mt-8">
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h3 className="text-[#f5f5f7] text-base font-semibold mb-6">Your details</h3>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label htmlFor="field-name" className="form-label">Full name *</label>
                      <input id="field-name" type="text" autoComplete="name"
                        className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                        placeholder="Your full name" value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        aria-required="true" aria-invalid={!!errors.name} />
                      {errors.name && <FieldError message={errors.name} />}
                    </div>
                    <div>
                      <label htmlFor="field-email" className="form-label">Email address *</label>
                      <input id="field-email" type="email" autoComplete="email"
                        className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                        placeholder="you@email.com" value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        aria-required="true" aria-invalid={!!errors.email} />
                      {errors.email && <FieldError message={errors.email} />}
                    </div>
                    <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#111] border border-[rgba(255,255,255,0.06)]">
                      <Lock className="w-3.5 h-3.5 text-[#3a3a3c] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-[#3a3a3c] leading-relaxed">
                        We never ask for brokerage credentials, account passwords or bank details.
                        <span className="block mt-1 text-amber-500/60 font-medium">Demo mode — data is not transmitted.</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h3 className="text-[#f5f5f7] text-base font-semibold mb-2">Where are you in your trading journey?</h3>
                  <p className="text-xs text-[#6e6e73] mb-6">Select the option that fits you best.</p>
                  <div role="radiogroup" className="flex flex-col gap-2.5">
                    {[
                      { v: 'A', l: "I'm a beginner and haven't traded live yet." },
                      { v: 'B', l: "I'm learning and practising my trading strategy." },
                      { v: 'C', l: 'I trade live but struggle with consistency and discipline.' },
                      { v: 'D', l: "I'm experienced and want to improve my execution and process." },
                    ].map(o => <OptionCard key={o.v} id={`exp-${o.v}`} letter={o.v} label={o.l}
                      selected={form.experience === o.v} onSelect={() => set('experience', o.v)} />)}
                  </div>
                  {errors.experience && <FieldError message={errors.experience} />}
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-[#f5f5f7] text-base font-semibold mb-2">What best describes your current situation?</h3>
                    <div role="radiogroup" className="flex flex-col gap-2.5 mt-4">
                      {[
                        { v: 'A', l: "I'm starting from zero and need a clear learning path." },
                        { v: 'B', l: "I understand some concepts but haven't built a consistent routine." },
                        { v: 'C', l: 'I trade live but struggle with execution, risk or emotional decisions.' },
                        { v: 'D', l: 'I have trading experience and want to refine a professional process.' },
                      ].map(o => <OptionCard key={o.v} id={`sit-${o.v}`} letter={o.v} label={o.l}
                        selected={form.situation === o.v} onSelect={() => set('situation', o.v)} />)}
                    </div>
                    {errors.situation && <FieldError message={errors.situation} />}
                  </div>

                  <div>
                    <h3 className="text-[#f5f5f7] text-base font-semibold mb-2">What do you want to achieve over the next 6–12 months?</h3>
                    <div role="radiogroup" className="flex flex-col gap-2.5 mt-4">
                      {[
                        { v: 'A', l: 'Understand the market and develop a structured trading process.' },
                        { v: 'B', l: 'Improve my risk management and follow my rules more consistently.' },
                        { v: 'C', l: 'Work towards becoming a professional trader.' },
                        { v: 'D', l: 'Refine my existing process and work towards professional-level execution.' },
                      ].map(o => <OptionCard key={o.v} id={`goal-${o.v}`} letter={o.v} label={o.l}
                        selected={form.goal === o.v} onSelect={() => set('goal', o.v)} />)}
                    </div>
                    {errors.goal && <FieldError message={errors.goal} />}
                  </div>

                  <div>
                    <h3 className="text-[#f5f5f7] text-base font-semibold mb-1">What trading or education capital have you set aside?</h3>
                    <p className="text-xs text-[#6e6e73] mb-4 leading-relaxed">
                      Money you can afford to allocate to trading education or trading — not funds needed for living expenses.
                      Not a requirement to join the free community.
                    </p>
                    <div role="radiogroup" className="flex flex-col gap-2.5">
                      {[
                        { v: 'A', l: 'Under $500' },
                        { v: 'B', l: '$500–$2,999' },
                        { v: 'C', l: '$3,000 or more' },
                        { v: 'D', l: 'Prefer not to disclose' },
                      ].map(o => <OptionCard key={o.v} id={`cap-${o.v}`} letter={o.v} label={o.l}
                        selected={form.capital === o.v} onSelect={() => set('capital', o.v)} />)}
                    </div>
                    {errors.capital && <FieldError message={errors.capital} />}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className={`flex items-center mt-8 pt-6 border-t border-[rgba(255,255,255,0.07)] ${step > 1 ? 'justify-between' : 'justify-end'}`}>
              {step > 1 && (
                <button id="form-back-btn" type="button" onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 text-[13px] text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button id={step === TOTAL ? 'form-submit-btn' : 'form-next-btn'} type="button"
                onClick={next} className="btn-primary">
                {step === TOTAL ? 'See my next step' : 'Continue'}
                {step < TOTAL ? <ChevronRight className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
