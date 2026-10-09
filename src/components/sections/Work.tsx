import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../ui/SectionLabel';
import { projects } from '../../data/projects';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function getYoutubeId(url: string | undefined) {
  if (!url) return null;
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : null;
}

function VideoCard({ project }: { project: typeof projects[0] }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-generate YouTube poster
  const ytId = project.type === 'youtube' ? getYoutubeId(project.embedUrl) : null;
  const autoPoster = project.poster || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null);

  // Format Instagram embed URL
  const getInstaEmbed = (url: string | undefined) => {
    if (!url) return '';
    let cleanUrl = url.split('?')[0]; 
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';
    return cleanUrl + 'embed';
  };

  return (
    <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] h-full flex-shrink-0 flex flex-col gap-4 group">
      <div className="relative w-full aspect-[4/5] md:aspect-video rounded-[var(--radius-lg)] overflow-hidden bg-[var(--surface)] border border-[var(--border-subtle)] shadow-sm">
        
        {project.type === 'youtube' ? (
          isPlaying ? (
            <iframe
              src={`${project.embedUrl}${project.embedUrl?.includes('?') ? '&' : '?'}autoplay=1`}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[var(--bg-alt)] group-hover:bg-[var(--surface)] transition-colors duration-300 overflow-hidden cursor-pointer" onClick={() => setIsPlaying(true)}>
              {autoPoster ? (
                <img 
                  src={autoPoster} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
                />
              ) : null}
              <button
                className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--accent)] text-white flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-xl"
                aria-label={`Play ${project.title}`}
              >
                <Play size={28} fill="currentColor" className="ml-1 md:ml-1.5" />
              </button>
            </div>
          )
        ) : (
          /* Instagram - just render the iframe directly */
          <div className="absolute inset-0 w-full h-full bg-[var(--surface)]">
            <iframe 
              src={getInstaEmbed(project.embedUrl || project.permalink)} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              allowTransparency 
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ background: 'white' }}
            />
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

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const scrollElement = scrollRef.current;
      const totalWidth = scrollElement?.scrollWidth || 0;
      const viewportWidth = window.innerWidth;
      
      const xDistance = -(totalWidth - viewportWidth + 64);

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
          <div className="hidden lg:block w-[10vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
