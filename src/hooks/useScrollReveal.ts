import { useEffect } from 'react';

/**
 * useScrollReveal — runs ONCE on mount only.
 * Never re-runs, never cleans up the class — avoids React re-render crashes.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Mark body so CSS knows to animate
    document.documentElement.classList.add('js-animated');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -48px 0px', threshold: 0 }
    );

    // Small delay so all elements are mounted before we observe
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 50);

    // Cleanup observer only — never remove js-animated class
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []); // ← empty array: run ONCE on mount only
}
