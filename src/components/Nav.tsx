import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../config';

const navLinks = [
  { label: 'Approach', href: '#approach' },
  { label: 'Training', href: '#vsl' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Community', href: SITE_CONFIG.skoolUrl, external: true },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const go = (href: string, external?: boolean) => {
    setMobileOpen(false);
    if (external) { window.open(href, '_blank', 'noopener noreferrer'); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Desktop / Tablet nav ── */}
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(0,0,0,0.85)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.07)]'
            : 'bg-transparent'
        }`}
      >
        <div className="wrap-wide">
          <div className="flex items-center justify-between h-[52px]">

            {/* Wordmark */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Traders' Mindset — scroll to top"
              className="text-[#f5f5f7] text-[15px] font-semibold tracking-tight hover:text-white transition-colors"
            >
              Traders' Mindset
            </button>

            {/* Desktop links — Apple center nav style */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => go(link.href, link.external)}
                  className="text-[13px] text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors duration-150 tracking-tight"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => go('#vsl')}
                className="btn-primary h-8 px-4 text-[13px]"
              >
                Watch Training
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 text-[#a1a1a6] hover:text-[#f5f5f7] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-black flex flex-col md:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '52px' }}
      >
        <div className="wrap py-8 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => go(link.href, link.external)}
              className="w-full text-left py-4 text-[#a1a1a6] hover:text-[#f5f5f7] text-xl font-medium transition-colors border-b border-[rgba(255,255,255,0.07)] last:border-0"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-6">
            <button onClick={() => go('#vsl')} className="btn-primary w-full">
              Watch the Training
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
