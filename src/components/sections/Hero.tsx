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
      {/* Background Video Showreel */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        {/* We use an online cinematic placeholder so it's not blank, but it's positioned behind a heavy overlay */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
          poster="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop"
        >
          {/* If the user uploads videos/showreel.mp4 to public/, it will load that! */}
          <source src="/videos/showreel.mp4" type="video/mp4" />
          {/* Temporary cinematic stock video for "maza" (excitement) */}
          <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=2543e49e25e9ddceb0709bcf72c1c73ec542dcfa&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Gradient overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-[var(--bg)]/30 backdrop-blur-[2px]" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
          style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}
        >
          Creative Studio · India
        </motion.p>

        {/* Main headline */}
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
              color: 'var(--ink)',
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
              maxWidth: '48ch',
            }}
          >
            Nexora Media helps businesses grow through creative content,
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
                background: 'var(--surface)',
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
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 999,
                fontSize: 'var(--fs-micro)',
                fontWeight: 500,
                color: 'var(--ink)',
                letterSpacing: '0.04em',
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
