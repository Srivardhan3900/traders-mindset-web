import { useEffect, useRef, useState, Component, ReactNode } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import VSLSection from './components/VSLSection';
import QualifyForm from './components/QualifyForm';
import ApproachSection from './components/ApproachSection';
import ProofSection from './components/ProofSection';
import HowItWorks from './components/HowItWorks';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

// ── Error Boundary — prevents any single component from blanking the page ──
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { console.warn('[ErrorBoundary]', error.message); }
  render() {
    if (this.state.hasError) return null; // silently hide broken section
    return this.props.children;
  }
}


// ── Background Music Player ──────────────────────────────────
function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  // Auto-play on first user interaction (browser policy)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;

    const tryPlay = () => {
      if (started) return;
      audio.play()
        .then(() => { setPlaying(true); setStarted(true); })
        .catch(() => {
          // Blocked by browser — silently ignore; button will appear
        });
    };

    // Try immediate autoplay first
    tryPlay();

    // Also try on first interaction anywhere on the page
    const events = ['click', 'keydown', 'touchstart', 'scroll'];
    events.forEach((e) => document.addEventListener(e, tryPlay, { once: true, passive: true }));

    return () => {
      events.forEach((e) => document.removeEventListener(e, tryPlay));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);

    // If audio never started (e.g. blocked), start it now
    if (!started) {
      audio.play().then(() => { setPlaying(true); setStarted(true); }).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" preload="none" />

      {/* Floating music toggle — bottom-right corner */}
      <button
        id="music-toggle"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute background music' : 'Mute background music'}
        title={muted ? 'Unmute music' : 'Mute music'}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: 'rgba(20,20,20,0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          color: muted ? '#3a3a3c' : '#a1a1a6',
        }}
      >
        {/* Music note icon */}
        {muted || !playing ? (
          /* Muted / stopped */
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06L6.09 7.15 6 7.2V20h.75l3.75-1.5V11.31l4.5-1.8V14.4l3.88 3.88a.75.75 0 1 0 1.06-1.06L3.53 2.47zM9 9.69l-2.25.9V18.6l2.25-.9V9.69zM18 5.25l-7.5 3V4.5L18 2.25v3z"/>
          </svg>
        ) : (
          /* Playing */
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M9 3l-6 2.4V18h.75L7.5 16.5V7.8l6-2.4V18h.75l3.75-1.5V3L9 3z"/>
            <path d="M16.5 6l-6-2.4v9.75l6-2.4V6z" opacity="0.6"/>
          </svg>
        )}
      </button>
    </>
  );
}

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  const [_videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">
      <BackgroundMusic />
      <Nav />
      <main id="main-content">
        <Hero />
        <ErrorBoundary>
          <VSLSection onVideoEnded={() => setVideoEnded(true)} />
        </ErrorBoundary>
        <QualifyForm />
        <ApproachSection />
        <ProofSection />
        <HowItWorks />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
