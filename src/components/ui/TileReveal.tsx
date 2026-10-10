// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface TileRevealProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  images?: string[];
  className?: string;
  ctaText?: string;
  ctaUrl?: string;
}

const DEFAULT_TILES = [
  { src: '/images/instagram/post_1.png', xInit: -220, yInit: -140, rotate: -16, scale: 0.85 },
  { src: '/images/instagram/post_2.png', xInit: 220, yInit: -160, rotate: 14, scale: 0.9 },
  { src: '/images/instagram/post_3.png', xInit: -280, yInit: 140, rotate: 12, scale: 0.85 },
  { src: '/images/instagram/post_4.png', xInit: 260, yInit: 150, rotate: -12, scale: 0.9 },
  { src: '/images/instagram/post_5.png', xInit: -380, yInit: 10, rotate: -8, scale: 0.8 },
  { src: '/images/instagram/post_6.png', xInit: 380, yInit: -10, rotate: 16, scale: 0.8 },
];

export function TileReveal({
  title = "Built to Stop Scrolling.",
  subtitle = "High-retention reels, viral edits, and premium brand storytelling engineered to capture attention and scale businesses.",
  tag = "PERFORMANCE DRIVEN",
  images = DEFAULT_TILES.map(t => t.src),
  className = "",
  ctaText = "Start a Project",
  ctaUrl = "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.",
}: TileRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const textOpacity = useTransform(smoothProgress, [0.35, 0.95], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.35, 0.95], [0.92, 1]);
  const textY = useTransform(smoothProgress, [0.35, 0.95], [30, 0]);

  const flyProgress = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[650px] md:min-h-[750px] flex items-center justify-center overflow-hidden py-20 ${className}`}
    >
      {/* Dynamic Floating Tiles that fly in on scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {DEFAULT_TILES.map((tile, i) => {
          const imgSrc = images[i % images.length] || tile.src;

          const x = useTransform(flyProgress, [0, 1], [tile.xInit * 1.8, tile.xInit * 1.05]);
          const y = useTransform(flyProgress, [0, 1], [tile.yInit * 1.8, tile.yInit * 1.05]);
          const rot = useTransform(flyProgress, [0, 1], [tile.rotate * 1.6, tile.rotate]);
          const opacity = useTransform(flyProgress, [0, 0.25, 1], [0, 0.6, 0.85]);

          return (
            <motion.div
              key={i}
              style={{
                x,
                y,
                rotate: rot,
                opacity,
                scale: tile.scale,
              }}
              className="absolute w-[150px] sm:w-[190px] md:w-[230px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/40 backdrop-blur-sm pointer-events-auto cursor-pointer hover:border-[var(--accent)] hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://www.instagram.com/nexoramediain.in/', '_blank')}
            >
              <img
                src={imgSrc}
                alt={`Tile ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          );
        })}
      </div>

      {/* Central Revealed Content */}
      <motion.div
        style={{
          opacity: textOpacity,
          scale: textScale,
          y: textY,
        }}
        className="relative z-10 max-w-2xl mx-auto px-6 text-center backdrop-blur-md bg-[var(--bg)]/85 p-8 md:p-12 rounded-3xl border border-[var(--border-subtle)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        {tag && (
          <span className="inline-block text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-5">
            {tag}
          </span>
        )}

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--ink)',
          }}
          className="mb-4"
        >
          {title}
        </h2>

        <p className="text-[var(--ink-muted)] text-base md:text-lg mb-8 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white font-medium text-sm hover:brightness-110 shadow-[0_0_25px_var(--accent-glow)] transition-all transform hover:-translate-y-0.5"
          >
            {ctaText} ↗
          </a>
          <a
            href="https://www.instagram.com/nexoramediain.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-subtle)] text-[var(--ink)] font-medium text-sm hover:bg-[var(--surface-hover)] transition-all"
          >
            Instagram Reels ↗
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default TileReveal;
