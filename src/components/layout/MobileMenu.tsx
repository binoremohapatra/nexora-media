import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import type { Theme } from '../../types';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  navLinks: { href: string; label: string }[];
  activeSection: string;
}

/**
 * Full-screen mobile navigation drawer.
 * Focus trap: first focusable element receives focus on open.
 * Escape key and backdrop click close the menu.
 * Focus returns to trigger on close (trigger ref passed from Navigation).
 */
export function MobileMenu({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  navLinks,
  activeSection,
}: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Focus first link when menu opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => firstLinkRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Trap Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    // Small delay to let menu close before scroll
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
            }}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.nav
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(85vw, 360px)',
              zIndex: 201,
              background: 'var(--bg)',
              borderLeft: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
            }}
          >
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', color: 'var(--ink)' }}>
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  color: 'var(--ink-muted)',
                  cursor: 'pointer',
                  background: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
              {navLinks.map(({ href, label }, i) => {
                const sectionId = href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(href);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      style={{
                        display: 'block',
                        padding: '0.75rem 0',
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        color: isActive ? 'var(--accent)' : 'var(--ink)',
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'color 0.2s',
                      }}
                    >
                      {label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* Footer actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>
              <a
                href="https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem 1.5rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: 999,
                  fontWeight: 500,
                  fontSize: 'var(--fs-small)',
                  textAlign: 'center',
                  transition: 'background 0.2s',
                }}
              >
                Get a Quote ↗
              </a>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--fs-micro)', color: 'var(--ink-faint)' }}>
                  Switch theme
                </span>
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
