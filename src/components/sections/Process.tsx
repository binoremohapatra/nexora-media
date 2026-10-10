import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTheme } from '../../hooks/useTheme';
import { SpotlightCard } from '../ui/SpotlightCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import SplitTextGSAP from '../ui/SplitTextGSAP';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: 'Discovery', eyebrow: 'STEP 1', desc: 'We dive deep to understand your business, audience, goals, competitors and current digital presence.' },
  { label: 'Planning', eyebrow: 'STEP 2', desc: 'We create a strategy, content direction, timeline and conversion path before production starts.' },
  { label: 'Design & Create', eyebrow: 'STEP 3', desc: 'We craft visuals, pages, reels, campaigns and brand assets with a premium creative system.' },
  { label: 'Refine & Test', eyebrow: 'STEP 4', desc: 'We publish, heavily test, optimize, and ensure every single experience works buttery-smooth across all devices.' },
  { label: 'Launch & Scale', eyebrow: 'STEP 5', desc: 'We review performance, improve the creative direction, and help your brand scale aggressively and steadily.' }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  // Real hex colors for WarpText canvas rasterizer (CSS vars won't resolve)
  const warpColor = isDark ? '#FFFFFF' : '#181817';
  
  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the vertical line growing
      gsap.fromTo('.timeline-line-fill', 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 50%',
            end: 'bottom 70%',
            scrub: true,
          }
        }
      );

      // Animate each node
      gsap.utils.toArray('.step-node').forEach((node: any) => {
        gsap.fromTo(node,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animate each card
      gsap.utils.toArray('.step-card').forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="process" ref={containerRef} aria-labelledby="process-title" className="section bg-[var(--bg)] relative overflow-hidden py-20 md:py-32">
      <div className="container max-w-7xl relative z-10 px-6 md:px-8">
        
        {/* Bulletproof CSS Grid perfectly matched to github repo minmax layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,0.42fr)_minmax(0,1fr)] gap-12 lg:gap-[clamp(36px,6vw,82px)] items-start">
          
          {/* Left Column - Sticky Heading */}
          <div className="lg:sticky lg:top-40">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-6 h-px bg-[var(--accent)]" />
              <span className="text-[var(--accent)] font-bold tracking-[0.2em] text-xs uppercase">Our Process</span>
            </div>
            <h2 id="process-title" className="sr-only">
              A simple, premium workflow from idea to launch and growth.
            </h2>
            {/* SplitText animated heading — theme-aware colors */}
            <div aria-hidden="true" className="py-4">
              {['A simple,', 'premium', 'workflow', 'from idea', 'to launch', 'and growth.'].map((line, i) => (
                // @ts-ignore
                <SplitTextGSAP
                  key={line}
                  text={line}
                  tag="div"
                  className="font-display font-bold tracking-tight leading-[1.15] block"
                  delay={30}
                  duration={0.9}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 60, rotateX: -20 }}
                  to={{ opacity: 1, y: 0, rotateX: 0 }}
                  threshold={0.1}
                  rootMargin="-40px"
                  textAlign="left"
                  style={{
                    fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                    color: isDark ? '#ffffff' : '#0f0f0f',
                    display: 'block',
                    lineHeight: 1.15
                  } as any}
                />
              ))}
            </div>
          </div>
          
          {/* Right Column - Timeline */}
          <div className="relative timeline-container w-full">
            {/* Vertical Line Background (matches center of 4rem node) */}
            <div className="absolute left-[1.75rem] md:left-[2rem] top-8 bottom-8 w-px bg-[var(--border-subtle)] -translate-x-1/2 hidden sm:block z-0" />
            
            {/* Vertical Line Animated Fill */}
            <div className="absolute left-[1.75rem] md:left-[2rem] top-8 bottom-8 w-px bg-[var(--accent)] -translate-x-1/2 hidden sm:block z-0 timeline-line-fill origin-top" />
            
            <div className="flex flex-col gap-8 md:gap-10 relative z-10 w-full">
              {steps.map((step, i) => (
                <div key={i} className="grid grid-cols-[3.5rem_minmax(0,1fr)] md:grid-cols-[4rem_minmax(0,1fr)] gap-5 md:gap-8 items-start relative group">
                  
                  {/* Timeline Node */}
                  <div className="step-node w-14 h-14 md:w-16 md:h-16 shrink-0 bg-[var(--accent)] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_30px_var(--accent-dim)] relative z-10">
                    0{i+1}
                  </div>
                  
                  {/* Card */}
                  <SpotlightCard 
                    className="step-card bg-white dark:bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl md:rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative group-hover:border-[var(--accent-dim)] group-hover:shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] group-hover:-translate-y-1 transition-all duration-500 box-border"
                    style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}
                    spotlightColor="rgba(37, 99, 235, 0.08)"
                  >
                    
                    {/* Card Eyebrow */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-6 h-px bg-[var(--ink-muted)] opacity-50" />
                      <span className="text-[var(--ink-muted)] font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">{step.eyebrow}</span>
                    </div>
                    
                    {/* Card Title */}
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--ink)] mb-3 md:mb-4" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                      {step.label}
                    </h3>
                    
                    {/* Card Description */}
                    <p className="text-[var(--ink-muted)] text-sm md:text-base lg:text-lg leading-relaxed relative z-10">
                      {step.desc}
                    </p>
                  </SpotlightCard>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
