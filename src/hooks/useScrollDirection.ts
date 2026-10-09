import { useState, useEffect, useRef } from 'react';

type Direction = 'up' | 'down' | null;

/**
 * Returns the scroll direction and whether the page has scrolled past a threshold.
 * Used to hide/reveal the navigation on directional scroll.
 */
export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<Direction>(null);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastScrollY.current;

        setScrolled(currentY > 60);

        if (Math.abs(diff) > threshold) {
          setDirection(diff > 0 ? 'down' : 'up');
          lastScrollY.current = currentY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { direction, scrolled };
}
