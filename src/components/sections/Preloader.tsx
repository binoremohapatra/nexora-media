import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const SESSION_KEY = 'nexora-preloader-shown';

/**
 * Minimal cinematic logo reveal preloader.
 * Skipped if already shown this session or if reduced motion is preferred.
 * Total visible duration: ~1.0s
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);

    if (alreadyShown || prefersReduced) {
      // Skip immediately
      onDone();
      return;
    }

    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, '1');

    const timer = setTimeout(() => {
      setVisible(false);
      // onDone is called once exit animation completes (via onExitComplete)
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (prefersReduced) return null;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg)',
          }}
          role="status"
          aria-label="Nexora Media loading"
          aria-live="polite"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            {/* Logo images — both in DOM, CSS opacity driven by theme */}
            <div style={{ position: 'relative', width: 48, height: 48 }}>
              <img
                src="/images/logo.png"
                alt="Nexora Media"
                width={48}
                height={48}
                style={{ opacity: 'var(--logo-light-opacity)', transition: 'opacity 0.3s' }}
              />
              <img
                src="/images/logo-dark.png"
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 'var(--logo-dark-opacity)',
                  transition: 'opacity 0.3s',
                }}
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1.125rem',
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}
            >
              Nexora Media
            </motion.span>
            {/* Thin accent line */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                width: 40,
                height: 2,
                background: 'var(--accent)',
                borderRadius: 2,
                transformOrigin: 'left',
              }}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
