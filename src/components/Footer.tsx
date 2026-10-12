import { SITE_CONFIG } from '../config';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TwitchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
    </svg>
  );
}

function SkoolIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
  );
}

export default function Footer() {
  const socials = [
    { label: 'Instagram', href: SITE_CONFIG.social.instagram, Icon: InstagramIcon },
    { label: 'X / Twitter', href: SITE_CONFIG.social.x, Icon: TwitterXIcon },
    { label: 'Twitch', href: SITE_CONFIG.social.twitch, Icon: TwitchIcon },
    { label: 'Skool Community', href: SITE_CONFIG.social.skool, Icon: SkoolIcon },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-[rgba(255,255,255,0.06)]" aria-label="Site footer">
      <div className="wrap-wide py-16">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-14">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-[#f5f5f7] font-semibold text-[15px] tracking-tight mb-2">Traders' Mindset</p>
            <p className="text-[13px] text-[#6e6e73] leading-relaxed">
              Risk-first futures trading education by Robert Rother.
              Real decisions. Documented process. No promises.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col sm:flex-row gap-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3a3a3c] mb-4">Resources</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Free Training', href: '#vsl' },
                  { label: 'The Approach', href: '#approach' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'FAQ', href: '#faq' },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href}
                      onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="text-[13px] text-[#6e6e73] hover:text-[#a1a1a6] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3a3a3c] mb-4">Legal</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Risk Disclosure', href: '#risk' },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[13px] text-[#6e6e73] hover:text-[#a1a1a6] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3a3a3c] mb-4">Connect</p>
            <div className="flex items-center gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-[#6e6e73] hover:text-[#f5f5f7] hover:border-[rgba(255,255,255,0.15)] transition-all">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Risk disclosure */}
        <div id="risk" className="border-t border-[rgba(255,255,255,0.05)] pt-10 mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#3a3a3c] mb-4">Risk Disclosure</p>
          <p className="text-[11px] text-[#3a3a3c] leading-relaxed max-w-4xl">
            Trading financial instruments including futures carries a substantial risk of loss and is not suitable for all investors.
            Past performance is not indicative of future results. Nothing on this website or in the Traders' Mindset community constitutes
            financial advice, investment advice, trading advice, or any other type of advice. Robert Rother is not a registered
            investment adviser, broker-dealer, financial analyst, financial bank, securities broker, or commodity broker.
            Content is provided for educational purposes only. You should consult with a qualified and authorised financial professional
            before making any trading or investment decisions.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#3a3a3c]">
            © {new Date().getFullYear()} Traders' Mindset · Robert Rother. All rights reserved.
          </p>
          <p className="text-[10px] text-[#2a2a2a]">
            ⚠ Demo build — not live. Replace placeholder content before publishing.
          </p>
        </div>

      </div>
    </footer>
  );
}
