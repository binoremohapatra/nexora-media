// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ReelGalleryProps {
  images?: string[];
  tiltAngle?: number;
  className?: string;
  asBackground?: boolean;
  speed?: number;
  onItemClick?: (image: string, index: number) => void;
}

const DEFAULT_POSTS = [
  '/images/instagram/post_1.png',
  '/images/instagram/post_2.png',
  '/images/instagram/post_3.png',
  '/images/instagram/post_4.png',
  '/images/instagram/post_5.png',
  '/images/instagram/post_6.png',
  '/images/instagram/post_7.png',
  '/images/instagram/post_8.png',
  '/images/instagram/post_9.png',
  '/images/instagram/post_10.png',
  '/images/instagram/post_11.png',
  '/images/instagram/post_12.jpg',
  '/images/instagram/post_13.jpg',
  '/images/instagram/post_14.jpg',
  '/images/instagram/post_15.jpg',
  '/images/instagram/post_16.jpg',
  '/images/instagram/post_17.jpg',
  '/images/instagram/post_18.jpg',
  '/images/instagram/post_19.jpg',
  '/images/instagram/post_20.jpg',
  '/images/instagram/post_21.jpg',
  '/images/instagram/post_22.jpg',
  '/images/instagram/post_23.jpg',
  '/images/instagram/post_24.jpg',
  '/images/instagram/post_25.jpg',
  '/images/instagram/post_26.jpg',
  '/images/instagram/post_27.jpg',
  '/images/instagram/post_28.jpg',
  '/images/instagram/post_29.jpg',
  '/images/instagram/post_30.jpg',
  '/images/instagram/post_31.jpg',
  '/images/instagram/post_32.jpg',
];

export function ReelGallery({
  images = DEFAULT_POSTS,
  tiltAngle = -12,
  className = '',
  asBackground = false,
  speed = 1,
  onItemClick,
}: ReelGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  // Calculate 4 alternating columns
  const col1 = images.filter((_, i) => i % 4 === 0);
  const col2 = images.filter((_, i) => i % 4 === 1);
  const col3 = images.filter((_, i) => i % 4 === 2);
  const col4 = images.filter((_, i) => i % 4 === 3);

  // Parallax translation transforms (alternate glide directions)
  const y1 = useTransform(smoothProgress, [0, 1], [-120 * speed, 140 * speed]);
  const y2 = useTransform(smoothProgress, [0, 1], [160 * speed, -180 * speed]);
  const y3 = useTransform(smoothProgress, [0, 1], [-180 * speed, 160 * speed]);
  const y4 = useTransform(smoothProgress, [0, 1], [140 * speed, -140 * speed]);

  const columns = [
    { items: col1, y: y1 },
    { items: col2, y: y2 },
    { items: col3, y: y3 },
    { items: col4, y: y4 },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${
        asBackground ? 'absolute inset-0 pointer-events-none' : 'min-h-[600px] py-12'
      } ${className}`}
      style={{
        perspective: '1200px',
      }}
    >
      {/* Tilted glide stage */}
      <div
        className="w-[140%] -ml-[20%] flex justify-center gap-4 md:gap-6 lg:gap-8"
        style={{
          transform: `rotate(${tiltAngle}deg) scale(1.15)`,
          transformOrigin: 'center center',
          opacity: asBackground ? 0.35 : 1,
          filter: asBackground ? 'blur(0.5px)' : 'none',
        }}
      >
        {columns.map((col, colIdx) => (
          <motion.div
            key={colIdx}
            style={{ y: col.y }}
            className="flex flex-col gap-4 md:gap-6 w-[200px] sm:w-[240px] md:w-[280px] shrink-0"
          >
            {col.items.map((src, idx) => (
              <motion.div
                key={idx}
                whileHover={!asBackground ? { scale: 1.04, y: -4 } : {}}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => onItemClick && onItemClick(src, idx)}
                className={`relative rounded-2xl overflow-hidden aspect-[4/5] bg-black/40 border border-white/10 shadow-2xl transition-all duration-300 ${
                  asBackground ? '' : 'cursor-pointer group hover:border-[var(--accent)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)]'
                }`}
              >
                <img
                  src={src}
                  alt={`Nexora work ${colIdx * 8 + idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!asBackground && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] px-3 py-1 rounded-full">
                      View on Instagram
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Vignette / Fade Gradients for seamless integration */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent pointer-events-none" />
    </div>
  );
}

export default ReelGallery;
