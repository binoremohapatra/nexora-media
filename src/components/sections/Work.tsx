import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../ui/SectionLabel';
import { projects } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Play, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function VideoCard({ project }: { project: typeof projects[0] }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-full flex-shrink-0 flex flex-col gap-4 group">
      <div className="relative w-full aspect-[4/5] md:aspect-video rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border border-[var(--border-subtle)] shadow-sm">
        {isPlaying ? (
          project.type === 'youtube' ? (
            <iframe
              src={`${project.embedUrl}&autoplay=1`}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[var(--surface)]">
              {/* Instagram fallback for now - proper embed.js requires more complex setup */}
              <div className="text-center p-6">
                <p className="text-[var(--ink)] mb-4 font-display text-lg">View on Instagram</p>
                <a 
                  href={project.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[var(--accent)] text-white rounded-full text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Open Reel <ArrowUpRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          )
        ) : (
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[var(--bg-alt)] group-hover:bg-[var(--surface)] transition-colors duration-300 overflow-hidden cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* If we have a poster, render it as background */}
            {project.poster ? (
              <img 
                src={project.poster} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
              />
            ) : null}
            
            <button
              className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--accent)] text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl"
              aria-label={`Play ${project.title}`}
            >
              <Play size={28} fill="currentColor" className="ml-1 md:ml-1.5" />
            </button>
            {!project.poster && <span className="relative z-10 text-[var(--ink-muted)] mt-4 text-sm font-medium">Click to play</span>}
          </div>
        )}
      </div>
      
      <div className="flex flex-col mt-2">
        <span className="text-[var(--accent)] text-xs font-bold tracking-wider uppercase mb-1">
          {project.category}
        </span>
        <h3 className="text-2xl font-bold text-[var(--ink)] font-display tracking-tight">
          {project.title}
        </h3>
      </div>
    </div>
  );
}

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !scrollRef.current) return;

    // Check if we're on desktop
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const scrollElement = scrollRef.current;
      const totalWidth = scrollElement?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      
      // Calculate how far to scroll to see the last item
      const xDistance = -(totalWidth - viewportWidth + 64); // 64px padding

      gsap.to(scrollElement, {
        x: xDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section 
      id="work" 
      ref={containerRef}
      aria-labelledby="work-title" 
      className="bg-[var(--bg-alt)] py-24 lg:h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden border-b border-[var(--border-subtle)]"
    >
      <div className="container mb-8 lg:mb-12">
        <SectionLabel className="mb-4">Selected Work</SectionLabel>
        <h2 
          id="work-title" 
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.1 }}
        >
          Work that speaks<br />for itself.
        </h2>
      </div>
      
      {/* Scrollable track */}
      <div 
        className="w-full overflow-x-auto lg:overflow-x-visible no-scrollbar pb-8 lg:pb-0"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        <div 
          ref={scrollRef}
          className="flex gap-6 lg:gap-12 px-[var(--container-pad)] lg:w-max"
        >
          {projects.map((project) => (
            <VideoCard key={project.id} project={project} />
          ))}
          {/* Spacer for end of scroll on desktop */}
          <div className="hidden lg:block w-[10vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
