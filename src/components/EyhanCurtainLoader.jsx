import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function EyhanCurtainLoader({ brand }) {
  const location = useLocation();
  const [stage, setStage] = useState('idle'); // 'idle' | 'closed' | 'opening'
  const isFirstMount = useRef(true);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Only trigger when switching routes, not on initial load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (location.pathname === prevPathname.current) {
      return;
    }
    prevPathname.current = location.pathname;

    // Phase 1: Velvet Noir curtains glide inwards
    setStage('closed');

    // Smoothly reset scroll position while curtain is shut
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 280);

    // Phase 2: Hold emblem briefly then part the curtains
    const openTimer = setTimeout(() => {
      setStage('opening');
    }, 550);

    // Phase 3: Transition fully finished, return to idle
    const idleTimer = setTimeout(() => {
      setStage('idle');
    }, 1050);

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
      className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
    >
      {/* Left Velvet Noir Curtain Panel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#080c10] border-r border-eyhan-gold/40 shadow-[20px_0_50px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isFullyClosed ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Subtle Silk / Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-eyhan-surface/30" />
      </div>

      {/* Right Velvet Noir Curtain Panel */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#080c10] border-l border-eyhan-gold/40 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isFullyClosed ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Subtle Silk / Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-eyhan-surface/30" />
      </div>

      {/* Center Grand Monogram & Brand Crest */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-300 ${
          isFullyClosed ? 'opacity-100 scale-100 delay-150' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative flex flex-col items-center text-center px-6">
          {/* Imperial Crest Monogram */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-eyhan-gold flex items-center justify-center font-serif text-xl sm:text-2xl text-eyhan-gold mb-3 sm:mb-4 shadow-[0_0_35px_rgba(212,175,55,0.4)] bg-[#101720]">
            {brand?.name ? brand.name.charAt(0) : 'E'}
          </div>

          {/* Luxury Brand Title */}
          <h2 className="font-sans text-lg sm:text-2xl font-bold tracking-[0.28em] text-white uppercase mb-1">
            {brand?.name || 'E-YHAN'}
          </h2>

          {/* Symmetrical Gold Line Divider */}
          <div className="flex items-center gap-3 my-1.5 sm:my-2">
            <span className="w-8 sm:w-12 h-px bg-eyhan-gold/70" />
            <span className="w-1.5 h-1.5 rotate-45 bg-eyhan-gold" />
            <span className="w-8 sm:w-12 h-px bg-eyhan-gold/70" />
          </div>

          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.34em] text-eyhan-gold font-sans font-medium">
            Resort &amp; Private Reserve
          </span>
        </div>
      </div>
    </div>
  );
}

EyhanCurtainLoader.propTypes = {
  brand: PropTypes.object,
};
