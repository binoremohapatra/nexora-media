import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../ui/SectionLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: 'Discover', desc: 'We understand your business, audience, goals, competitors and current digital presence.' },
  { label: 'Define', desc: 'We create a strategy, content direction, timeline and conversion path before production starts.' },
  { label: 'Create', desc: 'We craft visuals, pages, reels, campaigns and brand assets with a premium creative system.' },
  { label: 'Refine', desc: 'We publish, test, optimize and make sure every experience works smoothly across devices.' },
  { label: 'Deliver', desc: 'We review performance, improve the creative direction and help your brand scale steadily.' }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    // Only apply sticky stacking on desktop
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        // Only animate scaling for cards that aren't the last one
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            scrollTrigger: {
              trigger: card,
              start: "top 12%",
              end: "bottom -100%",
              scrub: true,
              invalidateOnRefresh: true,
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="process" ref={containerRef} aria-labelledby="process-title" className="section bg-[var(--bg)] relative">
      <div className="container max-w-5xl">
        <div className="mb-16 md:mb-24">
          <SectionLabel className="mb-6">The Process</SectionLabel>
          <h2 id="process-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.1 }}>
            How we build premium brands.
          </h2>
        </div>
        
        <div className="flex flex-col gap-8 md:gap-16">
          {steps.map((step, i) => (
            <div 
              key={i} 
              ref={(el) => { cardsRef.current[i] = el; }}
              className="md:sticky p-8 md:p-12 lg:p-16 rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border-subtle)] flex flex-col md:flex-row gap-6 md:gap-12 items-start shadow-sm origin-top"
              style={{ 
                top: `calc(12% + ${i * 2}rem)`,
                zIndex: i,
              }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-[var(--bg-alt)] border border-[var(--border-subtle)] rounded-full flex items-center justify-center">
                <span className="text-[var(--accent)] font-mono font-bold text-xl md:text-2xl">0{i+1}</span>
              </div>
              <div className="flex-1 mt-2">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--ink)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                  {step.label}
                </h3>
                <p className="text-[var(--ink-muted)] text-lg md:text-xl leading-relaxed max-w-3xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
