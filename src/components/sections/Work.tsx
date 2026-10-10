import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { projects } from '../../data/projects';
// @ts-ignore
import FlexCarousel from '../ui/FlexCarousel';
import { X, Play } from 'lucide-react';

function getYoutubeId(url: string | undefined) {
  if (!url) return null;
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : null;
}

function VideoModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const getInstaEmbed = (url: string | undefined) => {
    if (!url) return '';
    let cleanUrl = url.split('?')[0];
    if (!cleanUrl.endsWith('/')) cleanUrl += '/';
    return cleanUrl + 'embed';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl" style={{ zIndex: 200 }}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        style={{ zIndex: 210 }}
        aria-label="Close video"
      >
        <X size={24} strokeWidth={2.5} />
      </button>

      <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        {project.type === 'youtube' ? (
          <iframe
            src={`${project.embedUrl}${project.embedUrl?.includes('?') ? '&' : '?'}autoplay=1`}
            title={project.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
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
            className="w-full h-full bg-white"
          />
        )}
      </div>
    </div>
  );
}

export function Work() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  // Map projects to FlexCarousel expected item format
  const carouselItems = projects.map(p => {
    const ytId = p.type === 'youtube' ? getYoutubeId(p.embedUrl) : null;
    const poster = p.poster || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : 'https://images.unsplash.com/photo-1604854574958-59047362c165?w=1200&q=80&auto=format&fit=max');

    return {
      src: poster,
      alt: p.title,
      title: p.title,
      subtitle: p.category,
      project: p
    };
  });

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
        <p className="text-[var(--ink-muted)] mt-4">Click any project to play the reel.</p>
      </div>

      {/* 3D Liquid WebGL Carousel */}
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <FlexCarousel
          items={carouselItems}
          preset="liquid"
          intro="rise"
          cardHeight={0.6}
          gap={32}
          squeeze={0.15}
          focusOnClick={true}
          captions={true}
          onSelect={(_: any, item: any) => setActiveProject(item.project)}
        />
      </div>

      {activeProject && (
        <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
