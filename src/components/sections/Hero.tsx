import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const WHATSAPP_URL = "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.";

const KEYWORDS = [
  'Video Editing', 'Branding', 'Reels', 'Social Media',
  'Meta Ads', 'Photography', 'Graphic Design', 'Logo Design',
  'Google Ads', 'Websites', 'SEO', 'Videography',
];

export function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Keep empty or remove if not needed, GSAP logic removed
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
        justifyContent: 'center', // Changed to center vertically
        alignItems: 'center', // Changed to center horizontally
        paddingBottom: 'clamp(3rem, 8vw, 6rem)',
        paddingTop: 'clamp(7rem, 15vw, 11rem)',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Cinematic Theme Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[var(--bg)]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'var(--hero-video-filter)',
            opacity: 'var(--hero-video-opacity)',
            transition: 'filter 0.5s ease, opacity 0.5s ease'
          }}
        >
          <source src="https://videos.pexels.com/video-files/3129977/3129977-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/40 via-transparent to-[var(--bg)] pointer-events-none" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
          style={{ marginBottom: '1.5rem', background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid var(--border-subtle)' }}
        >
          Creative Studio · India
        </motion.p>

        {/* Main headline */}
        <motion.h1
          id="hero-title"
          variants={parent}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--fs-display)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--ink)',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            maxWidth: '16ch',
          }}
        >
          {['Make them', 'stop scrolling.'].map((line, i) => (
            <span
              key={i}
              style={{ display: 'block', overflow: 'hidden' }}
            >
              <motion.span
                variants={child}
                style={{
                  display: 'block',
                  color: line.includes('stop') ? 'var(--accent)' : 'var(--ink)'
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Supporting copy + CTAs */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
            and growing businesses dominate through premium content,
            branding, social media, and modern digital experiences.
          </motion.p>

          <motion.div
            variants={child}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: 999,
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Start a Project <span aria-hidden="true">↗</span>
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
                padding: '1rem 2rem',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--ink)',
                borderRadius: 999,
                fontSize: '1rem',
                fontWeight: 600,
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
            justifyContent: 'center',
            gap: '0.75rem',
            paddingTop: '1.5rem',
            maxWidth: '800px'
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
                padding: '0.5rem 1rem',
                background: 'var(--bg-alt)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 999,
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--ink-muted)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--ink-muted)';
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
