// @ts-nocheck
import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { projects } from '../../data/projects';
// @ts-ignore
import FlexCarousel from '../ui/FlexCarousel';
// @ts-ignore
import FoldText from '../ui/FoldText';
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
  
  const isYouTube = project.type === 'youtube';

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-xl" 
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl cursor-pointer"
        style={{ zIndex: 10000, backgroundColor: '#ffffff', color: '#000000', border: 'none' }}
        aria-label="Close video"
      >
        <X size={24} strokeWidth={3} />
      </button>

      <div 
        className={`relative bg-black rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 border border-white/10 ${isYouTube ? 'w-full max-w-5xl aspect-video' : 'w-[90vw] max-w-[420px] aspect-[9/16]'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {isYouTube ? (
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
      project: p,
      aspect: p.type === 'youtube' ? 16 / 9 : 9 / 16
    };
  });

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
          className="sr-only"
        >
          Work that speaks for itself.
        </h2>
        <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FoldText
            text="Work that speaks"
            splitBy="char"
            hinge="top"
            duration={0.55}
            stagger={0.03}
            ease="power3.out"
            perspective={800}
            trigger="scroll"
            fontSize="clamp(2.5rem, 5.5vw, 4.5rem)"
            fontWeight={700}
            color="var(--ink)"
          />
          <FoldText
            text="for itself."
            splitBy="char"
            hinge="top"
            duration={0.55}
            stagger={0.03}
            ease="power3.out"
            perspective={800}
            trigger="scroll"
            fontSize="clamp(2.5rem, 5.5vw, 4.5rem)"
            fontWeight={700}
            color="var(--ink)"
          />
        </div>
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
          autoplay={true}
          interval={10}
          onSelect={(_: any, item: any) => setActiveProject(item.project)}
        />
      </div>

      {activeProject && (
        <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
