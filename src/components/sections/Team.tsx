import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import HalftoneReveal from '../ui/HalftoneReveal';
import { useTheme } from '../../hooks/useTheme';

export function Team() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Real hex colors for WebGL
  const inkColor = isDark ? '#F3F0E9' : '#181817';
  const accentColor = isDark ? '#3B82F6' : '#2563EB'; // Blue accent
  const paperColor = isDark ? '#111113' : '#EEECEA';  // bg-alt matching the section bg

  return (
    <section id="team" className="section bg-[var(--bg-alt)] border-b border-[var(--border-subtle)] relative overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto flex flex-col items-center justify-center relative z-10 text-center px-6 md:px-8">
        <SectionLabel className="mb-6">Meet the Creator</SectionLabel>
        
        <h2 className="mb-12 font-display font-bold leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--ink)' }}>
          The mind behind <br className="hidden md:block"/> Nexora Media
        </h2>

        <div className="mx-auto" style={{ width: '100%', maxWidth: '800px', height: 'clamp(400px, 60vh, 600px)', position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          {/* @ts-ignore */}
          <HalftoneReveal
            src="/images/saqhib.png"
            mode="duotone"
            shape="dot"
            cellSize={8}
            angle={45}
            inkColor={inkColor}
            accentColor={accentColor}
            paperColor={paperColor}
            revealRadius={200}
            clickBurst={true}
            intro={true}
          />
        </div>
        
        <div className="mt-10 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--ink)' }}>Saqhib</h3>
          <p className="mt-2 text-lg" style={{ color: 'var(--ink-muted)' }}>
            Founder & Creative Director. Crafting premium digital experiences that stand out and speak for themselves. Hover over the image to reveal the portrait.
          </p>
        </div>
      </div>
    </section>
  );
}
