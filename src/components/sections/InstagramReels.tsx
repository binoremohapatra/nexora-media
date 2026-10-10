import React from 'react';
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
    <section className="bg-[var(--bg-alt)] py-20 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="container mb-12 text-center relative z-10">
        <h2
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)' }}
        >
          Trending on Instagram.
        </h2>
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
