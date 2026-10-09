import React from 'react';
import { CircularCarousel } from '../ui/CircularCarousel';

const INSTAGRAM_LINKS = [
  "https://www.instagram.com/nexoramediain.in/reel/Dbpf-6bqkAi/",
  "https://www.instagram.com/nexoramediain.in/p/Dd-2D-yKAdQ/",
  "https://www.instagram.com/nexoramediain.in/reel/Ddx_FzaKGrE/",
  "https://www.instagram.com/nexoramediain.in/p/DdY6cgNK_A0/",
  "https://www.instagram.com/nexoramediain.in/reel/DdJDV5iq-VF/",
  "https://www.instagram.com/nexoramediain.in/p/DcyJFxkq0Zh/",
  "https://www.instagram.com/nexoramediain.in/p/Dcnj9o7qQKS/",
  "https://www.instagram.com/nexoramediain.in/p/DckuNgqo_ZM/",
  "https://www.instagram.com/nexoramediain.in/p/DciLBtRKWGa/",
  "https://www.instagram.com/nexoramediain.in/p/Dcfc102quAO/",
  "https://www.instagram.com/nexoramediain.in/reel/Dcc8OdwqdIc/",
  "https://www.instagram.com/nexoramediain.in/reel/DcaWLpvqkjA/",
  "https://www.instagram.com/nexoramediain.in/reel/DcXynLLKftb/",
  "https://www.instagram.com/nexoramediain.in/p/DcVbcUlI0P1/",
  "https://www.instagram.com/nexoramediain.in/p/DcQFBHYo52s/",
  "https://www.instagram.com/nexoramediain.in/p/DcK6qBVI_2i/",
  "https://www.instagram.com/nexoramediain.in/p/DcISQMnIyD0/",
  "https://www.instagram.com/nexoramediain.in/p/DbnCJ6MGYXx/",
  "https://www.instagram.com/nexoramediain.in/p/Dbk8ToyqYNl/",
  "https://www.instagram.com/nexoramediain.in/p/DbfL0jyGeak/",
  "https://www.instagram.com/nexoramediain.in/p/DbaWfTXmR_9/",
  "https://www.instagram.com/nexoramediain.in/reel/DbVqe_zKqBh/"
];

// Use the actual Instagram thumbnails we downloaded via Microlink API
const items = INSTAGRAM_LINKS.map((url, index) => {
  const isReel = url.includes('/reel/');
  return {
    src: `/images/instagram/${index + 1}.jpg?v=2`,
    alt: `Nexora Media Instagram ${isReel ? 'Reel' : 'Post'} ${index + 1}`,
    title: isReel ? 'Reel' : 'Post',
    subtitle: 'Instagram',
    url: url
  };
});

export function InstagramReels() {
  const handleItemClick = (item: any) => {
    window.open(item.url, '_blank');
  };

  return (
    <section className="bg-[var(--bg-alt)] py-20 overflow-hidden border-b border-[var(--border-subtle)]">
      <div className="container mb-12 text-center relative z-10">
        <h2
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)' }}
        >
          Trending on Instagram.
        </h2>
        <p className="text-[var(--ink-muted)] mt-4 text-lg">Swipe through our latest content. Click to view on Instagram.</p>
      </div>

      <div style={{ width: '100%', height: '560px', position: 'relative' }}>
        <CircularCarousel
          items={items}
          preset="cylinder"
          intro="rise"
          cardWidth={280}
          aspectRatio={1.0} // Square ratio to prevent letterboxing for uploaded screenshots
          speed={14}
          captions={true}
          onItemClick={handleItemClick}
        />
      </div>
    </section>
  );
}
