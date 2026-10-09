import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'motion/react';
import { wrap } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MarqueeProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const prefersReduced = useReducedMotion();

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    if (prefersReduced) return;
    
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 flex whitespace-nowrap flex-nowrap leading-none tracking-[-0.02em]">
      <motion.div
        className="flex whitespace-nowrap flex-nowrap font-display uppercase font-semibold text-6xl md:text-8xl lg:text-[10rem] text-[var(--border)] gap-8 px-4"
        style={{ x }}
      >
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="py-12 md:py-24 bg-[var(--bg)] border-y border-[var(--border-subtle)] overflow-hidden select-none" aria-hidden="true">
      <ParallaxText baseVelocity={-2}>Creative Studio — India — Premium Quality —</ParallaxText>
      <ParallaxText baseVelocity={2}>Content Creation — Video Editing — Design —</ParallaxText>
    </section>
  );
}
