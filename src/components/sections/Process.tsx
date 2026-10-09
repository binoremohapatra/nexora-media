import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../ui/SectionLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { SpotlightCard } from '../ui/SpotlightCard';
import { SplitText } from '../ui/SplitText';
import { Compass, PenTool, Sparkles, Sliders, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Compass, label: 'Discover', desc: 'We dive deep to understand your business, audience, goals, competitors, and current digital presence.' },
  { icon: PenTool, label: 'Define', desc: 'We create a solid strategy, content direction, timeline, and conversion path before production even starts.' },
  { icon: Sparkles, label: 'Create', desc: 'We craft visuals, pages, reels, campaigns, and brand assets using our premium creative system.' },
  { icon: Sliders, label: 'Refine', desc: 'We publish, heavily test, optimize, and ensure every single experience works buttery-smooth across all devices.' },
  { icon: Rocket, label: 'Deliver', desc: 'We review performance, improve the creative direction, and help your brand scale aggressively and steadily.' }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
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
    <section id="process" ref={containerRef} aria-labelledby="process-title" className="section bg-[var(--bg)] relative overflow-hidden">
      <div className="container max-w-5xl relative z-10">
        <div className="mb-16 md:mb-24">
          <SectionLabel className="mb-6">The Process</SectionLabel>
          <h2 id="process-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.1 }}>
            <SplitText text="How we build premium brands." delay={0.2} />
          </h2>
        </div>
        
        <div className="flex flex-col gap-8 md:gap-16">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <SpotlightCard
                key={i}
                ref={(el: HTMLDivElement | null) => { cardsRef.current[i] = el; }}
                className="md:sticky p-8 md:p-12 lg:p-16 rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border-subtle)] shadow-xl origin-top overflow-hidden"
                style={{ 
                  top: `calc(12% + ${i * 2}rem)`,
                  zIndex: i,
                }}
              >
                {/* Huge Background Number Watermark */}
                <div 
                  className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 text-[12rem] md:text-[20rem] font-black leading-none pointer-events-none select-none z-0"
                  style={{ 
                    color: 'var(--ink)', 
                    opacity: 0.03,
                    fontFamily: 'var(--font-display)' 
                  }}
                >
                  0{i+1}
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start pointer-events-none">
                  {/* Icon Container - Glassmorphic Gradient */}
                  <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-gradient-to-br from-[var(--accent-dim)] to-transparent border border-[var(--border-subtle)] rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner">
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-[var(--accent)]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 mt-2">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[var(--accent)] font-mono font-bold text-lg md:text-xl">0{i+1} //</span>
                      <h3 className="text-3xl md:text-5xl font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                        {step.label}
                      </h3>
                    </div>
                    <p className="text-[var(--ink-muted)] text-lg md:text-2xl leading-relaxed max-w-2xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
