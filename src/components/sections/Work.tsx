import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { projects } from '../../data/projects';
import { Play } from 'lucide-react';

function getYoutubeId(url: string | undefined) {
  if (!url) return null;
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : null;
}

export function Work() {
  const getInstaEmbed = (url: string | undefined) => {
    if (!url) return '';
    let cleanUrl = url.split('?')[0];
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';
    return cleanUrl + 'embed';
  };

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="bg-[var(--bg-alt)] py-24 lg:py-32 overflow-hidden border-b border-[var(--border-subtle)] relative"
    >
      <div className="container mb-8 lg:mb-12 text-center lg:text-left relative z-10">
        <SectionLabel className="mb-4 mx-auto lg:mx-0">Selected Work</SectionLabel>
        <h2
          id="work-title"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.1 }}
        >
          Work that speaks<br className="hidden lg:block" /> for itself.
        </h2>
        <p className="text-[var(--ink-muted)] mt-4">Swipe to view our client projects.</p>
      </div>

      <div className="w-full relative px-4 lg:px-8">
        <div 
          className="flex overflow-x-auto gap-6 sm:gap-8 snap-x snap-mandatory pb-12 pt-4 hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {projects.map((project, idx) => (
            <div 
              key={project.id || idx} 
              className="relative flex-none w-[85vw] sm:w-[400px] lg:w-[450px] aspect-[4/5] sm:aspect-video rounded-2xl overflow-hidden snap-center group shadow-2xl bg-black border border-[var(--border-subtle)]"
            >
              {/* Iframes directly rendered to play client videos */}
              {project.type === 'youtube' ? (
                <iframe
                  src={`${project.embedUrl}${project.embedUrl?.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${getYoutubeId(project.embedUrl)}`}
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
              )}

              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <h3 className="text-white text-2xl font-bold">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
