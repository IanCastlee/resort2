import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

/**
 * EyhanCurtainLoader
 * Ultra-luxury theater/hotel split-curtain transition loader.
 * Plays an elegant opening reveal on initial site mount / refresh,
 * and glides closed and open smoothly during route changes.
 */
export default function EyhanCurtainLoader({ brand }) {
  const location = useLocation();
  // 'closed' on first load so user gets the grand entrance reveal
  const [stage, setStage] = useState('closed'); // 'closed' | 'opening' | 'idle'
  const isFirstMount = useRef(true);
  const prevPathname = useRef(location.pathname);

  // Initial site load / refresh grand entrance
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;

      // Hold the illuminated crest briefly, then part the curtains
      const openTimer = setTimeout(() => {
        setStage('opening');
      }, 700);

      const idleTimer = setTimeout(() => {
        setStage('idle');
      }, 1450);

      return () => {
        clearTimeout(openTimer);
        clearTimeout(idleTimer);
      };
    }
  }, []);

  // Route change curtain transitions
  useEffect(() => {
    // Skip if pathname didn't change or if it's still the initial mount cycle
    if (location.pathname === prevPathname.current) {
      return;
    }
    prevPathname.current = location.pathname;

    // Phase 1: Curtains glide inwards to close
    setStage('closed');

    // Smoothly reset scroll position while curtain is fully shut
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 280);

    // Phase 2: Hold emblem briefly, then part the curtains
    const openTimer = setTimeout(() => {
      setStage('opening');
    }, 600);

    // Phase 3: Transition fully finished, unmount loader
    const idleTimer = setTimeout(() => {
      setStage('idle');
    }, 1250);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(openTimer);
      clearTimeout(idleTimer);
    };
  }, [location.pathname]);

  if (stage === 'idle') return null;

  const isFullyClosed = stage === 'closed';

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[250] overflow-hidden ${
        isFullyClosed ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Left Velvet Noir Curtain Panel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#080c10] border-r border-eyhan-gold/40 shadow-[25px_0_60px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isFullyClosed ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Subtle Silk Sheen Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#0e141c]/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-eyhan-gold/60 to-transparent" />
      </div>

      {/* Right Velvet Noir Curtain Panel */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#080c10] border-l border-eyhan-gold/40 shadow-[-25px_0_60px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isFullyClosed ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Subtle Silk Sheen Gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-[#0e141c]/50 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-eyhan-gold/60 to-transparent" />
      </div>

      {/* Center Grand Monogram & Brand Crest */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-400 ease-out ${
          isFullyClosed ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col items-center text-center px-6">
          {/* Imperial Crest Monogram with Golden Pulse */}
          <div className="relative mb-3 sm:mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-eyhan-gold flex items-center justify-center font-serif text-2xl sm:text-3xl text-eyhan-gold shadow-[0_0_40px_rgba(212,175,55,0.45)] bg-[#101720]">
              {brand?.name ? brand.name.charAt(0) : 'E'}
            </div>
            {/* Outer delicate ring */}
            <div className="absolute -inset-1.5 rounded-full border border-eyhan-gold/30 animate-pulse pointer-events-none" />
          </div>

          {/* Luxury Brand Title */}
          <h2 className="font-sans text-xl sm:text-3xl font-bold tracking-[0.32em] text-white uppercase mb-1 drop-shadow-lg">
            {brand?.name || 'E-YHAN'}
          </h2>

          {/* Symmetrical Gold Line Divider with Diamond */}
          <div className="flex items-center gap-3 my-2 sm:my-2.5">
            <span className="w-10 sm:w-16 h-px bg-eyhan-gold/70" />
            <span className="w-1.5 h-1.5 rotate-45 bg-eyhan-gold" />
            <span className="w-10 sm:w-16 h-px bg-eyhan-gold/70" />
          </div>

          <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.36em] text-eyhan-gold font-sans font-medium mb-4">
            Resort &amp; Private Reserve
          </span>

          {/* Subtle Golden Shimmer Loading Line */}
          <div className="w-32 sm:w-44 h-0.5 bg-white/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-eyhan-gold to-transparent w-full animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

EyhanCurtainLoader.propTypes = {
  brand: PropTypes.shape({
    name: PropTypes.string,
  }),
};
