// @ts-nocheck
import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { projects } from '../../data/projects';
// @ts-ignore
import FlexCarousel from '../ui/FlexCarousel';
// @ts-ignore
import FoldText from '../ui/FoldText';
import { X, ExternalLink, Play } from 'lucide-react';

function ProjectOverviewModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md z-[9999]" 
      onClick={onClose}
    >
      <div 
        className="relative bg-[var(--surface)] text-[var(--ink)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-sm sm:max-w-md w-full border border-[var(--border-subtle)] flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--surface)]">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[var(--accent)]">{project.category}</span>
            <h3 className="text-base sm:text-lg font-bold font-display tracking-tight text-[var(--ink)] leading-tight">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--border-subtle)] hover:bg-[var(--accent-dim)] text-[var(--ink)] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden aspect-[9/16] max-h-[56vh] w-full">
          <video
            src={project.poster}
            autoPlay
            controls
            playsInline
            loop
            className="w-full h-full object-contain"
          />
        </div>

        {/* Action Bar */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--ink-muted)]">
            Watch full audio on Instagram:
          </span>
          <a
            href={project.permalink || project.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
            style={{
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
            }}
          >
            <span>Open Reel</span>
            <ExternalLink size={13} />
          </a>
        </div>
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
        <p className="text-[var(--ink-muted)] mt-4 text-sm sm:text-base">Tap any project to watch the reel.</p>
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
          onSelect={(_: any, item: any) => {
            if (item?.project) {
              setActiveProject(item.project);
            }
          }}
        />
      </div>

      {activeProject && (
        <ProjectOverviewModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
