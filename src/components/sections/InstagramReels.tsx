import React from 'react';
import CircularGallery from '../ui/CircularGallery';

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

// 1.jpg, 4.jpg, 13.jpg, 21.jpg, 22.jpg were identical fallback thumbnails that caused duplicates in the UI.
const EXCLUDED_INDICES = [3, 12, 20, 21]; // 0-based indices for 4, 13, 21, 22

// Use the actual Instagram thumbnails we downloaded via Microlink API
const items = INSTAGRAM_LINKS
  .map((url, index) => ({ url, index }))
  .filter(({ index }) => !EXCLUDED_INDICES.includes(index))
  .map(({ url, index }) => {
    return {
      image: `/images/instagram/${index + 1}.jpg?v=2`,
      text: url.includes('/reel/') ? 'Reel' : 'Post'
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

      <div className="w-full h-[400px] md:h-[600px] relative">
        <CircularGallery
          items={items}
          bend={0} // User requested to remove the wavy effect
          textColor="var(--ink)"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </section>
  );
}
