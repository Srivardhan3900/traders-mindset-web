import { useEffect, useRef, useState, useCallback, Component } from 'react';
import type { ReactNode } from 'react';
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

// ── Error Boundary ───────────────────────────────────────────
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) { console.warn('[ErrorBoundary]', error.message); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ── Background Music ─────────────────────────────────────────
// targetVolume: 0.5 normally, 0 while VSL is playing
function BackgroundMusic({ targetVolume }: { targetVolume: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userMuted, setUserMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Start playback on first user interaction (browser autoplay policy)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.loop = true;

    const tryPlay = () => {
      if (started) return;
      audio.play().then(() => setStarted(true)).catch(() => {});
    };

    tryPlay();
    const events = ['click', 'keydown', 'touchstart', 'scroll'] as const;
    events.forEach((e) => document.addEventListener(e, tryPlay, { once: true, passive: true }));
    return () => events.forEach((e) => document.removeEventListener(e, tryPlay));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth volume fade when targetVolume changes (duck on VSL play, restore on pause)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || userMuted) return;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

    const target = targetVolume;
    const animate = () => {
      if (!audioRef.current) return;
      const current = audioRef.current.volume;
      const diff = target - current;
      if (Math.abs(diff) < 0.01) { audioRef.current.volume = target; return; }
      audioRef.current.volume = Math.min(1, Math.max(0, current + diff * 0.1));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [targetVolume, userMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !userMuted;
    setUserMuted(next);
    audio.volume = next ? 0 : targetVolume;
    if (!started) audio.play().then(() => setStarted(true)).catch(() => {});
  };

  const isSilent = userMuted || targetVolume === 0;

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" preload="none" />
      <button
        id="music-toggle"
        onClick={toggleMute}
        aria-label={userMuted ? 'Unmute background music' : 'Mute background music'}
        title={targetVolume === 0 && !userMuted ? 'Music paused during video' : userMuted ? 'Unmute music' : 'Mute music'}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: 'rgba(20,20,20,0.85)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isSilent ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.12)'}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          color: isSilent ? '#3a3a3c' : '#a1a1a6',
          opacity: targetVolume === 0 && !userMuted ? 0.35 : 1,
        }}
      >
        {isSilent ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18zM18 13.06V6.75l-4.5 1.8v4.95l4.5 4.5V13.06zM9 9.69 6.75 10.59V18.6L9 17.7V9.69zM9.75 8.94V4.5L18 2.25v3.75L9.75 8.94z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .659.122z"/>
          </svg>
        )}
      </button>
    </>
  );
}

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  useScrollReveal();
  const [bgVolume, setBgVolume] = useState(0.5);

  const handleVideoPlaying = useCallback(() => setBgVolume(0),   []);
  const handleVideoPaused  = useCallback(() => setBgVolume(0.5), []);
  const handleVideoEnded   = useCallback(() => setBgVolume(0.5), []);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7]">
      <BackgroundMusic targetVolume={bgVolume} />
      <Nav />
      <main id="main-content">
        <Hero />
        <ErrorBoundary>
          <VSLSection
            onVideoPlaying={handleVideoPlaying}
            onVideoPaused={handleVideoPaused}
            onVideoEnded={handleVideoEnded}
          />
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
