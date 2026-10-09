import React, { useState, useRef, useEffect } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { services, serviceGroups } from '../../data/services';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

function ServiceGroupItem({
  group,
  isActive,
  onHover,
  onClick,
}: {
  group: string;
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const groupServices = services.filter((s) => s.group === group);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="border-b border-[var(--border-subtle)] group/accordion"
      onMouseEnter={onHover}
    >
      <button
        type="button"
        onClick={onClick}
        className="w-full py-8 md:py-12 flex items-center justify-between text-left cursor-pointer transition-colors"
      >
        <span
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          className={cn(
            'text-4xl md:text-7xl font-semibold transition-colors duration-300',
            isActive ? 'text-[var(--accent)]' : 'text-[var(--ink)] group-hover/accordion:text-[var(--ink-muted)]'
          )}
        >
          {group}
        </span>
        <div className="md:hidden">
          <ChevronDown
            size={24}
            className={cn('transition-transform duration-300', isActive ? 'rotate-180 text-[var(--accent)]' : 'text-[var(--ink-muted)]')}
          />
        </div>
        <div className="hidden md:block">
          <ArrowRight
            size={32}
            className={cn(
              'transition-all duration-300',
              isActive ? 'opacity-100 translate-x-0 text-[var(--accent)]' : 'opacity-0 -translate-x-4 text-[var(--ink-muted)]'
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div ref={contentRef} className="pb-10 pt-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16">
              {groupServices.map((service) => (
                <div key={service.id} className="relative pl-6 md:pl-8 border-l-2 border-[var(--accent-dim)]">
                  <span className="absolute top-1.5 left-0 text-[10px] font-mono text-[var(--accent)] rotate-[-90deg] origin-top-left -translate-x-full mt-2">
                    {service.number}
                  </span>
                  <h4
                    className="text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-3 tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {service.name}
                  </h4>
                  <p className="text-[var(--ink-muted)] leading-relaxed text-base md:text-lg">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Services() {
  const [activeGroup, setActiveGroup] = useState<string>(serviceGroups[0]);

  // Determine if it's mobile to handle click vs hover
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <section id="services" aria-labelledby="services-title" className="section bg-[var(--bg)]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          <div className="lg:w-1/3 flex-shrink-0">
            <div className="sticky top-32">
              <SectionLabel className="mb-6">Capabilities</SectionLabel>
              <h2
                id="services-title"
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                }}
              >
                Systems that perform.
              </h2>
              <p className="text-[var(--ink-muted)] leading-relaxed text-lg max-w-sm mb-8 lg:mb-0">
                We craft premium content, modern identities, and strategic campaigns designed to cut through the noise and drive growth.
              </p>
            </div>
          </div>

          <div className="lg:w-2/3 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col">
              {serviceGroups.map((group) => (
                <ServiceGroupItem
                  key={group}
                  group={group}
                  isActive={activeGroup === group}
                  onHover={() => {
                    if (!isMobile) setActiveGroup(group);
                  }}
                  onClick={() => {
                    if (isMobile) {
                      setActiveGroup(activeGroup === group ? '' : group);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
