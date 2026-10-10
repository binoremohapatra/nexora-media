// @ts-nocheck
import React from 'react';
import CircularGallery from '../ui/CircularGallery';
// @ts-ignore
import FoldText from '../ui/FoldText';

const IG_LINKS = [
  { image: '/images/instagram/post_1.png', link: 'https://www.instagram.com/reel/DbdWXoFqtaz/?cplk=cjc3OWwzZWJpOGdh', text: 'Cafe' },
  { image: '/images/instagram/post_2.png', link: 'https://www.instagram.com/reel/DbhxvA3q3tX/?cplk=MTE2cjR2cm44MnE5MQ==', text: 'Cafe 2' },
  { image: '/images/instagram/post_3.png', link: 'https://www.instagram.com/reel/Dbf0E9TKJnz/?obrf=cGZ4Y3hxM2k2ZDJ1', text: 'Real Estate' },
  { image: '/images/instagram/post_4.png', link: 'https://www.instagram.com/reel/DUas6bxkQcw/?xtok=eHU1eGpmcWltOG8z', text: 'GDGC' },
  { image: '/images/instagram/post_5.png', link: 'https://www.instagram.com/reel/DbkWYuyq6NK/?dlrf=ZGxsMnV6cDlveWZ6', text: 'Let him cook' },
  { image: '/images/instagram/post_6.png', link: 'https://www.instagram.com/reel/DdqUQCyONRy/?obrf=MWg3dTl2OXIwNnltZw==', text: 'Momo making' },
  { image: '/images/instagram/post_7.png', link: 'https://www.instagram.com/reel/DeJQ9gtOVwz/?dlrf=MTBwb25iMjJiZzZ6Ng==', text: 'Fried momo' },
  { image: '/images/instagram/post_8.png', link: 'https://www.instagram.com/reel/Ddx_FzaKGrE/?cplk=MXZ1MGZtdXgwcHFicw==', text: 'Nexora BTS' },
  { image: '/images/instagram/post_9.png', link: 'https://www.instagram.com/reel/DdOCR-0uEao/?srtk=NXFka3p0Y3pqa3Rq', text: 'Welcome to Bhansaghar' },
  { image: '/images/instagram/post_10.png', link: 'https://www.instagram.com/reel/Dd3N8vrO3N8/?rpxt=MWlsb3hmZHEzcG02cQ==', text: 'All of them' },
  { image: '/images/instagram/post_11.png', link: 'https://www.instagram.com/reel/DbdFnkKKTQ9/?obrf=NnF3Mm04NGgydzRr', text: 'YT Client work' }
];

export function InstagramReels() {
  const handleItemClick = (index: number) => {
    if (index >= 0 && index < IG_LINKS.length) {
      window.open(IG_LINKS[index].link, '_blank');
    } else {
      window.open('https://www.instagram.com/nexoramediain.in/', '_blank');
    }
  };

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
        <p className="text-[var(--ink-muted)] mt-4 text-lg">Swipe through and click to watch our latest content.</p>
      </div>

      <div className="w-full h-[400px] md:h-[600px] relative cursor-pointer">
        <CircularGallery
          items={IG_LINKS}
          bend={3} // Restored circular (cylindrical) layout
          textColor="var(--ink)"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          onClick={handleItemClick}
        />
      </div>
    </section>
  );
}
