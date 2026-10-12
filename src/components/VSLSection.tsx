import { useEffect, useRef, useState, useCallback } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '../config';

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface VSLSectionProps {
  onVideoEnded: () => void;
}

// ─── Isolated YouTube container ──────────────────────────────
// The iframe is rendered OUTSIDE React's DOM tree to avoid
// React's removeChild reconciliation conflicts with the YT API.
function YouTubePlayer({
  videoId,
  startSeconds,
  onEnded,
}: {
  videoId: string;
  startSeconds: number;
  onEnded: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Create a standalone div OUTSIDE React to host the player
    const playerHost = document.createElement('div');
    playerHost.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    mount.appendChild(playerHost);

    const createPlayer = () => {
      if (!window.YT?.Player) return;
      playerRef.current = new window.YT.Player(playerHost, {
        videoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          fs: 1,
          iv_load_policy: 3,
          color: 'white',
          start: startSeconds,
        },
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              onEndedRef.current();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        createPlayer();
      };
    }

    // Cleanup: destroy player then manually remove the host div
    return () => {
      try { playerRef.current?.destroy(); } catch { /* ignore */ }
      try { if (mount.contains(playerHost)) mount.removeChild(playerHost); } catch { /* ignore */ }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-label="Traders' Mindset free training video"
    />
  );
}

// ─── VSL Section ─────────────────────────────────────────────
export default function VSLSection({ onVideoEnded }: VSLSectionProps) {
  const [videoEnded, setVideoEnded] = useState(false);

  const handleEnded = useCallback(() => {
    setVideoEnded(true);
    onVideoEnded();
  }, [onVideoEnded]);

  const scrollToForm = () => {
    document.getElementById('qualify')?.scrollIntoView({ behavior: 'smooth' });
    if (!videoEnded) { setVideoEnded(true); onVideoEnded(); }
  };

  return (
    <section id="vsl" className="section bg-black" aria-labelledby="vsl-heading">
      <div className="wrap">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <p className="eyebrow mb-5">Free Training</p>
          <h2 id="vsl-heading" className="text-[#f5f5f7] mb-5">
            Before You Trade,<br className="hidden sm:block" /> Understand the Process.
          </h2>
          <p className="text-lg text-[#a1a1a6] max-w-xl mx-auto leading-relaxed">
            Watch the training to understand the Traders&apos; Mindset approach before deciding
            whether the community is right for you.
          </p>
        </div>

        {/* Video */}
        <div className="reveal d2">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
              background: '#0a0a0a',
            }}
          >
            <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
              <YouTubePlayer
                videoId={SITE_CONFIG.youtubeVideoId}
                startSeconds={SITE_CONFIG.youtubeStartSeconds}
                onEnded={handleEnded}
              />
            </div>
          </div>

          {/* Caption */}
          <p className="mt-5 text-center text-[13px] text-[#6e6e73] flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            Educational content only — not personalised financial advice. Trading involves substantial risk.
          </p>
        </div>

        {/* Post-video CTA */}
        <div
          className={`mt-12 transition-all duration-700 ease-out ${
            videoEnded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
          aria-live="polite"
        >
          <div className="apple-card p-10 text-center">
            <h3 className="text-[#f5f5f7] text-xl font-semibold mb-3">Ready to find your next step?</h3>
            <p className="text-[#6e6e73] text-sm mb-7 max-w-sm mx-auto">
              Answer a few questions so we can point you to the most relevant resource.
            </p>
            <button id="vsl-continue-btn" onClick={scrollToForm} className="btn-primary">
              Continue to the questions
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Always-visible skip */}
        {!videoEnded && (
          <div className="mt-8 text-center">
            <button
              id="vsl-skip-btn"
              onClick={scrollToForm}
              className="text-[13px] text-[#3a3a3c] hover:text-[#6e6e73] underline underline-offset-2 transition-colors"
            >
              Skip to the questions
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
