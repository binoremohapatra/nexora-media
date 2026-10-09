import { useState, useEffect, useRef } from 'react';

interface Options {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

/**
 * Reusable IntersectionObserver hook.
 * Returns a ref to attach to the target element and whether it's visible.
 */
export function useIntersection<T extends Element>({
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.15,
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, isVisible };
}
