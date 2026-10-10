import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { SectionLabel } from '../ui/SectionLabel';
import { SplitText } from '../ui/SplitText';
import { BlurText } from '../ui/BlurText';
import { useTheme } from '../../hooks/useTheme';
// @ts-ignore
import ParticleText from '../ui/ParticleText';

/**
 * About section — Premium animated copy.
 */
export function About() {
  const listRef = useRef(null);
  const isListInView = useInView(listRef, { once: true, margin: '-10% 0px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div className="container">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>About Nexora Media</SectionLabel>

          {/* ParticleText heading — particles form the title on scroll */}
          <div style={{ width: '100%', height: 280, margin: '1.5rem 0 0' }}>
            <ParticleText
              key={`particle-${theme}`}
              text="About Nexora Media"
              particleSize={3}
              density={5}
              color={isDark ? "#ffffff" : "#181817"}
              highlightColor="#3b82f6"
              scatter={200}
              gatherDuration={1800}
              stagger={500}
              pointerRepel={50}
              repelRadius={130}
              idleDrift={0.8}
              trigger="hover"
              fontSize="clamp(3.5rem, 8vw, 6rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow={isDark}
            />
          </div>

          <h2
            id="about-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              margin: '1rem 0 2rem',
              maxWidth: '20ch',
            }}
          >
            <SplitText text="A creative partner for brands that want to look premium and grow with confidence." delay={0.1} />
          </h2>
          
          <div style={{ fontSize: 'var(--fs-body)', color: 'var(--ink-muted)', maxWidth: '60ch', lineHeight: 1.75, marginBottom: '3.5rem' }}>
            <BlurText 
              text="Nexora Media is a creative marketing agency helping businesses grow through powerful content, strategic branding, social media marketing, advertising, and modern digital experiences. We combine creativity, strategy, and technology to help businesses establish a strong online presence and achieve measurable growth." 
              delay={0.3} 
            />
          </div>

          <div
            ref={listRef}
            role="list"
            aria-label="Nexora Media approach"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {[
              { num: '01', label: 'Clear brand positioning' },
              { num: '02', label: 'Content made for attention' },
              { num: '03', label: 'Digital experiences that convert' },
            ].map(({ num, label }, i) => (
              <motion.div
                key={num}
                role="listitem"
                initial={{ opacity: 0, x: -20 }}
                animate={isListInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-small)', color: 'var(--accent)' }} aria-hidden="true">
                  {num}
                </span>
                <strong style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.375rem)', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                  {label}
                </strong>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
