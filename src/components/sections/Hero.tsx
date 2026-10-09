import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const WHATSAPP_URL = "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.";

// Marquee of service keywords for the editorial strip below hero headline
const KEYWORDS = [
  'Video Editing', 'Branding', 'Reels', 'Social Media',
  'Meta Ads', 'Photography', 'Graphic Design', 'Logo Design',
  'Google Ads', 'Websites', 'SEO', 'Videography',
];

/**
 * Hero section — the first creative statement.
 * Editorial large headline in Clash Display.
 * No fake video/showreel: no local file exists.
 * Art-directed composition with large accent numbers and staggered reveal.
 */
export function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReduced || !headlineRef.current) return;

    const lines = headlineRef.current.querySelectorAll<HTMLElement>('.hero-line');
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      lines,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.9, stagger: 0.12 }
    );

    return () => { tl.kill(); };
  }, [prefersReduced]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  const reducedItemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  const child = prefersReduced ? reducedItemVariants : itemVariants;
  const parent = prefersReduced ? {} : containerVariants;

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-title"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        paddingTop: 'clamp(7rem, 15vw, 11rem)',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Large editorial background numeral — pure decoration */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.15em',
          right: '-0.05em',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(18rem, 35vw, 42rem)',
          lineHeight: 1,
          color: 'var(--bg-alt)',
          letterSpacing: '-0.05em',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          transition: 'color 0.3s ease',
        }}
      >
        N
      </span>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
          style={{ marginBottom: '1.5rem' }}
        >
          Creative Studio · India
        </motion.p>

        {/* Main headline — clipped lines for GSAP reveal */}
        <h1
          ref={headlineRef}
          id="hero-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            color: 'var(--ink)',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            maxWidth: '14ch',
          }}
        >
          {['Make them', 'stop', 'scrolling.'].map((line, i) => (
            <span
              key={i}
              style={{ display: 'block', overflow: 'hidden' }}
            >
              <span
                className="hero-line"
                style={{
                  display: 'block',
                  opacity: prefersReduced ? 1 : 0,
                }}
              >
                {line === 'stop' ? (
                  <>
                    {line}{' '}
                    <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
                      {/* accent line */}
                    </span>
                  </>
                ) : line}
              </span>
            </span>
          ))}
        </h1>

        {/* Supporting copy + CTAs */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 680 }}
        >
          <motion.p
            variants={child}
            style={{
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--ink-muted)',
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
              maxWidth: '48ch',
            }}
          >
            Nexora Media helps cafes, restaurants, real-estate brands,
            and growing businesses grow through creative content,
            branding, social media, and modern digital experiences.
          </motion.p>

          <motion.div
            variants={child}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: 999,
                fontSize: 'var(--fs-small)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Get a Quote <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                border: '1px solid var(--border)',
                color: 'var(--ink)',
                borderRadius: 999,
                fontSize: 'var(--fs-small)',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--ink)';
              }}
            >
              Explore the Work <span aria-hidden="true">↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Service keyword strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
          }}
          aria-label="Services offered by Nexora Media"
        >
          {KEYWORDS.map((kw) => (
            <span
              key={kw}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.3rem 0.75rem',
                background: 'var(--bg-alt)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 999,
                fontSize: 'var(--fs-micro)',
                fontWeight: 500,
                color: 'var(--ink-muted)',
                letterSpacing: '0.04em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {kw}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
