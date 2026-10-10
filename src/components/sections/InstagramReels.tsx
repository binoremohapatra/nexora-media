// @ts-nocheck
import React from 'react';
import { ReelGallery } from '../ui/ReelGallery';
import { TileReveal } from '../ui/TileReveal';
import CircularGallery from '../ui/CircularGallery';

const imageModules = import.meta.glob('/public/images/instagram/*.{png,jpg,jpeg}', { eager: true });

const items = Object.keys(imageModules).map(key => {
  const url = key.replace('/public', '');
  return {
    image: url,
    text: ''
  };
});

export function InstagramReels() {
  return (
    <section className="relative bg-[var(--bg-alt)] overflow-hidden border-b border-[var(--border-subtle)]">
      {/* 1. Tilted Reel Gallery: Gliding reels of images as you scroll */}
      <div className="relative pt-20 pb-12 overflow-hidden">
        <div className="container mb-10 text-center relative z-10">
          <span className="inline-block text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 mb-4">
            VIRAL CONTENT REELS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--ink)'
            }}
          >
            Tilted Reel Showcase.
          </h2>
          <p className="text-[var(--ink-muted)] mt-3 text-lg max-w-xl mx-auto">
            Tilted reels of real production photography and creator edits that glide as you scroll.
          </p>
        </div>

        {/* Tilted glide gallery with our authentic brand photos */}
        <ReelGallery
          tiltAngle={-11}
          speed={1.2}
          onItemClick={() => window.open('https://www.instagram.com/nexoramediain.in/', '_blank')}
        />
      </div>

      {/* 2. Tile Reveal: Image tiles fly in on scroll to reveal the headline & CTA */}
      <div className="border-t border-[var(--border-subtle)]">
        <TileReveal
          tag="NEXORA MEDIA CREATIVE"
          title="Make Them Stop Scrolling."
          subtitle="From high-retention short form videos to complete visual identities, we create media that converts audience attention into actual business growth."
          ctaText="Start Your Project"
          ctaUrl="https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services."
        />
      </div>

      {/* 3. Circular 3D Carousel */}
      <div className="border-t border-[var(--border-subtle)] py-16 bg-[var(--bg)]">
        <div className="container mb-8 text-center">
          <p className="text-xs uppercase font-mono tracking-widest text-[var(--ink-muted)] mb-2">
            Interactive Cylinder
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            Trending on Instagram.
          </h3>
          <p className="text-[var(--ink-muted)] mt-2 text-sm">Swipe or drag through our feed.</p>
        </div>

        <div className="w-full h-[400px] md:h-[550px] relative cursor-pointer">
          <CircularGallery
            items={items}
            bend={3}
            textColor="var(--ink)"
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
            onClick={() => window.open('https://www.instagram.com/nexoramediain.in/', '_blank')}
          />
        </div>
      </div>
    </section>
  );
}

export default InstagramReels;
