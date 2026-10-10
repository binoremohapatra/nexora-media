// @ts-nocheck
import React from 'react';
import CircularGallery from '../ui/CircularGallery';
// @ts-ignore
import FoldText from '../ui/FoldText';

const imageModules = import.meta.glob('/public/images/instagram/*.{png,jpg,jpeg}', { eager: true });

const items = Object.keys(imageModules).slice(0, 16).map(key => {
  const url = key.replace('/public', '');
  return {
    image: url,
    text: ''
  };
});

export function InstagramReels() {
  return (
    <section className="bg-[var(--bg-alt)] py-20 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="container mb-12 text-center relative z-10">
        <h2
          className="sr-only"
        >
          Trending on Instagram.
        </h2>
        <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FoldText
            text="Trending on"
            splitBy="char"
            hinge="top"
            duration={0.5}
            stagger={0.025}
            ease="power3.out"
            perspective={700}
            trigger="scroll"
            fontSize="clamp(2.2rem, 5vw, 4rem)"
            fontWeight={700}
            color="var(--ink)"
          />
          <FoldText
            text="Instagram."
            splitBy="char"
            hinge="top"
            duration={0.5}
            stagger={0.025}
            ease="power3.out"
            perspective={700}
            trigger="scroll"
            fontSize="clamp(2.2rem, 5vw, 4rem)"
            fontWeight={700}
            color="var(--ink)"
          />
        </div>
        <p className="text-[var(--ink-muted)] mt-4 text-lg">Swipe through our latest content.</p>
      </div>

      <div className="w-full h-[400px] md:h-[600px] relative cursor-pointer">
        <CircularGallery
          items={items}
          bend={3} // Restored circular (cylindrical) layout
          textColor="var(--ink)"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          onClick={() => window.open('https://www.instagram.com/nexoramediain.in/', '_blank')}
        />
      </div>
    </section>
  );
}
