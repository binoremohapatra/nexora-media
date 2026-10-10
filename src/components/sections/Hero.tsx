// @ts-nocheck
import React, { useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import DriftWall from '../ui/DriftWall';
// @ts-ignore
import DepthText from '../ui/DepthText';
import MaskedHeading from '../ui/MaskedHeading';

const WHATSAPP_URL = "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.";

const KEYWORDS = [
  'Video Editing', 'Branding', 'Reels', 'Social Media',
  'Meta Ads', 'Photography', 'Graphic Design', 'Logo Design',
  'Google Ads', 'Websites', 'SEO', 'Videography',
];

const DRIFT_ITEMS = [
  { image: '/images/instagram/post_1.png', title: 'Nexora Media' },
  { image: '/images/instagram/post_2.png', title: 'Branding & Design' },
  { image: '/images/instagram/post_3.png', title: 'Viral Reels' },
  { image: '/images/instagram/post_4.png', title: 'Commercial Edit' },
  { image: '/images/instagram/post_5.png', title: 'Storytelling' },
  { image: '/images/instagram/post_6.png', title: 'Visual Identity' },
  { image: '/images/instagram/post_7.png', title: 'Cinematography' },
  { image: '/images/instagram/post_8.png', title: 'Content Production' },
  { image: '/images/instagram/post_9.png', title: 'Motion Design' },
  { image: '/images/instagram/post_10.png', title: 'Creative Direction' },
  { image: '/images/instagram/post_11.png', title: 'Digital Campaigns' },
  { image: '/images/instagram/post_12.jpg', title: 'Social Strategy' },
  { image: '/images/instagram/post_13.jpg', title: 'Shorts & Reels' },
  { image: '/images/instagram/post_14.jpg', title: 'High Retention' },
  { image: '/images/instagram/post_15.jpg', title: 'Brand Aesthetic' },
  { image: '/images/instagram/post_16.jpg', title: 'Creator Marketing' },
  { image: '/images/instagram/post_17.jpg', title: 'Ad Creative' },
  { image: '/images/instagram/post_18.jpg', title: 'Visual Hooks' },
  { image: '/images/instagram/post_19.jpg', title: 'Brand Narrative' },
  { image: '/images/instagram/post_20.jpg', title: 'Video Production' },
  { image: '/images/instagram/post_21.jpg', title: 'Social Ads' },
  { image: '/images/instagram/post_22.jpg', title: 'Graphic Identity' },
  { image: '/images/instagram/post_23.jpg', title: 'Thumbnail Design' },
  { image: '/images/instagram/post_24.jpg', title: 'Reel Pacing' },
  { image: '/images/instagram/post_25.jpg', title: 'Motion Graphics' },
  { image: '/images/instagram/post_26.jpg', title: 'Performance Media' },
  { image: '/images/instagram/post_27.jpg', title: 'Studio Showcase' },
  { image: '/images/instagram/post_28.jpg', title: 'Visual Story' },
  { image: '/images/instagram/post_29.jpg', title: 'Viral Strategy' },
  { image: '/images/instagram/post_30.jpg', title: 'Media Scaling' },
  { image: '/images/instagram/post_31.jpg', title: 'Brand Impact' },
  { image: '/images/instagram/post_32.jpg', title: 'Production House' },
];

export function Hero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

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
      {/* Dynamic 3D DriftWall Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <DriftWall
          items={DRIFT_ITEMS}
          tileWidth={230}
          tileHeight={150}
          gap={18}
          tilt={16}
          turn={-14}
          perspective={1200}
          depth={120}
          speed={36}
          direction="up"
          variance={0.45}
          parallax={0.65}
          lift={64}
          fade={0.25}
          dim={0.45}
          overlayColor="var(--bg)"
        />
        {/* Soft vignette for crystal clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/75 via-[var(--bg)]/40 to-[var(--bg)] pointer-events-none" />
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

          <h1
            id="hero-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--ink)',
              marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
              width: '100%',
              textAlign: 'center'
            }}
          >
            {/* DepthText on 'Make them' — 3D layered orbit effect */}
            <span style={{ display: 'block', marginBottom: '0.1em' }}>
              <DepthText
                text="Make them"
                layers={28}
                depth={2.2}
                faceColor="var(--ink)"
                depthColor="#1d4ed8"
                tilt={6}
                pointerTracking={true}
                smoothing={0.12}
                perspective={900}
                autoOrbit={true}
                orbitSpeed={0.25}
                fontSize="var(--fs-display)"
                fontWeight={700}
                shadow={true}
              />
            </span>

            {/* MaskedHeading on 'Stop Scrolling.' — media-filled text mask */}
            <span style={{ display: 'block' }}>
              <MaskedHeading
                text="Stop Scrolling."
                tag="span"
                mediaType="video"
                src="/videos/drifting.mp4"
                fillScale={1.3}
                parallax={20}
                drift={14}
                brightness={1.1}
                saturation={1.2}
                reveal="rise"
                duration={1.1}
                stagger={0.1}
                trigger="mount"
                align="center"
                weight={700}
                tracking={-0.04}
                textScale={0.12}
                style={{ fontSize: 'var(--fs-display)', display: 'block', lineHeight: 1.05 }}
              />
            </span>
          </h1>

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
