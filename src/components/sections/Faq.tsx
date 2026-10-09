import React, { useEffect, useRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../../data/faqs';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the left sticky text
      gsap.fromTo('.faq-heading-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-heading-text',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate each accordion item staggering in
      gsap.utils.toArray('.faq-card').forEach((card: any, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section id="faq" ref={containerRef} aria-labelledby="faq-title" className="section bg-[#F8F9FA] dark:bg-[var(--bg-alt)] border-t border-[var(--border-subtle)] py-20 md:py-32 overflow-hidden">
      <div className="container max-w-7xl px-6 md:px-8">
        
        {/* Bulletproof CSS Grid perfectly matched to github repo minmax layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,0.42fr)_minmax(0,1fr)] gap-12 lg:gap-[clamp(36px,6vw,82px)] items-start">
          
          {/* Left Column - Sticky Heading */}
          <div className="lg:sticky lg:top-40 faq-heading-text">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-6 h-px bg-[var(--accent)]" />
              <span className="text-[var(--accent)] font-bold tracking-[0.2em] text-xs uppercase">FAQ</span>
            </div>
            <h2 
              id="faq-title" 
              className="text-[var(--ink)] font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Questions <br className="hidden lg:block" />
              businesses <br className="hidden lg:block" />
              usually <br className="hidden lg:block" />
              ask before <br className="hidden lg:block" />
              working <br className="hidden lg:block" />
              with <br className="hidden lg:block" />
              Nexora <br className="hidden lg:block" />
              Media.
            </h2>
          </div>
          
          {/* Right Column - Accordion */}
          <div className="w-full">
            <Accordion.Root type="single" collapsible className="flex flex-col gap-4 md:gap-5 w-full">
              {faqs.map((faq) => (
                <Accordion.Item 
                  key={faq.id} 
                  value={faq.id}
                  className="faq-card w-full bg-white dark:bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[var(--accent)] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]"
                >
                  <Accordion.Header className="flex w-full">
                    <Accordion.Trigger 
                      className="group flex w-full flex-1 items-center justify-between text-left bg-transparent outline-none cursor-pointer box-border"
                      style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                    >
                      <span className="font-bold text-base md:text-xl text-[var(--ink)] tracking-tight pr-4 md:pr-6 flex-1">
                        {faq.question}
                      </span>
                      
                      {/* Custom Plus/Minus Icon */}
                      <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--accent-dim)] flex items-center justify-center text-[var(--accent)] transition-all duration-300 group-data-[state=open]:bg-[var(--accent)] group-data-[state=open]:text-white shadow-sm ml-4">
                        <Plus className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-data-[state=open]:hidden" strokeWidth={2.5} />
                        <Minus className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 hidden group-data-[state=open]:block" strokeWidth={2.5} />
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  
                  <Accordion.Content className="overflow-hidden text-[var(--ink-muted)] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div 
                      className="text-sm md:text-lg leading-relaxed box-border"
                      style={{ padding: '0 clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 2.5rem)' }}
                    >
                      {faq.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
          
        </div>
      </div>
    </section>
  );
}
