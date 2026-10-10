import React, { useEffect, useRef, useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { projects } from '../../data/projects';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

function getYoutubeId(url: string | undefined) {
  if (!url) return null;
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : null;
}

export function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getInstaEmbed = (url: string | undefined) => {
    if (!url) return '';
    let cleanUrl = url.split('?')[0];
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';
    return cleanUrl + 'embed';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      
      const scrollCenter = container.scrollLeft + container.clientWidth / 2;
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      Array.from(container.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const childCenter = el.offsetLeft + el.clientWidth / 2;
        const distance = Math.abs(scrollCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      
      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Trigger once on mount
      setTimeout(handleScroll, 100);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    if (children[index]) {
      const el = children[index];
      const scrollPosition = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="bg-[var(--bg-alt)] py-24 lg:py-32 overflow-hidden border-b border-[var(--border-subtle)] relative"
    >
      <div className="container mb-8 lg:mb-12 text-center relative z-10">
        <SectionLabel className="mb-4 mx-auto">Selected Work</SectionLabel>
        <h2
          id="work-title"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.1 }}
        >
          Work that speaks<br className="hidden lg:block" /> for itself.
        </h2>
        <p className="text-[var(--ink-muted)] mt-4">Scroll to explore. Video plays when centered.</p>
      </div>

      <div className="w-full relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar items-center"
          style={{ 
            paddingLeft: '50vw', 
            paddingRight: '50vw',
            scrollBehavior: 'smooth'
          }}
        >
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            const ytId = project.type === 'youtube' ? getYoutubeId(project.embedUrl) : null;
            const fallbackPoster = project.poster || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '');

            return (
              <motion.div 
                key={project.id || idx} 
                className="relative flex-none snap-center group cursor-pointer"
                style={{
                  width: 'min(85vw, 450px)',
                  marginLeft: idx === 0 ? 'calc(-1 * min(42.5vw, 225px))' : '1.5rem',
                  marginRight: idx === projects.length - 1 ? 'calc(-1 * min(42.5vw, 225px))' : '1.5rem',
                }}
                animate={{
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? 'grayscale(0%)' : 'grayscale(60%)',
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => !isActive && scrollTo(idx)}
              >
                <div className="w-full aspect-[4/5] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-[var(--border-subtle)] relative">
                  
                  {isActive ? (
                    project.type === 'youtube' ? (
                      <iframe
                        src={`${project.embedUrl}${project.embedUrl?.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0`}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full object-cover pointer-events-auto"
                      />
                    ) : (
                      <iframe
                        src={getInstaEmbed(project.embedUrl || project.permalink)}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency
                        allowFullScreen
                        className="w-full h-full bg-white pointer-events-auto scale-105"
                      />
                    )
                  ) : (
                    <div className="w-full h-full relative">
                      <img src={fallbackPoster} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                          <Play size={24} className="ml-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay for text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`} />
                  
                  <div className={`absolute bottom-0 left-0 right-0 p-6 pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                    <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-2">
                      {project.category}
                    </p>
                    <h3 className="text-white text-2xl font-bold">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
