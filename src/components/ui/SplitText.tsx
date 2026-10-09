import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDuration?: number;
  by?: 'word' | 'character';
}

export function SplitText({ 
  text, 
  className = '', 
  delay = 0,
  staggerDuration = 0.04,
  by = 'word'
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  
  const items = by === 'word' ? text.split(' ') : text.split('');

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: by === 'word' ? '0.25em' : '0' }}>
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0, rotateZ: 4 }}
            animate={isInView ? { y: 0, opacity: 1, rotateZ: 0 } : { y: '100%', opacity: 0, rotateZ: 4 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * staggerDuration,
            }}
          >
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
