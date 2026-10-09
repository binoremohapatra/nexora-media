import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../../types';
import PillNav from '../ui/PillNav';

const NAV_ITEMS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

interface NavigationProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Navigation({ theme, onToggleTheme }: NavigationProps) {
  const { direction, scrolled } = useScrollDirection(10);
  const [activeSection, setActiveSection] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide nav on downward scroll (only after user has scrolled)
  const isHidden = scrolled && direction === 'down' && !mobileMenuOpen;

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Custom logo element for PillNav
  const CustomLogo = (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        background: 'var(--ink)', 
        color: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontFamily: 'var(--font-display)',
        fontSize: '18px',
        lineHeight: 1
      }}
    >
      N
    </div>
  );

  return (
    <motion.header
      role="banner"
      animate={{ y: isHidden ? '-120%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        padding: '1.25rem var(--container-pad)',
        pointerEvents: 'none' // allow clicking through header wrapper
      }}
      aria-label="Primary navigation"
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          pointerEvents: 'auto' // re-enable clicks for content
        }}
      >
        {/* React Bits PillNav component */}
        <div style={{ position: 'relative' }}>
          <PillNav
            logo={CustomLogo}
            logoAlt="Nexora Media"
            items={NAV_ITEMS}
            activeHref={activeSection}
            baseColor="var(--bg-alt)"
            pillColor="var(--surface)"
            hoveredPillTextColor="var(--bg)"
            pillTextColor="var(--ink)"
            onMobileMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>

        {/* Right side actions (Theme toggle + Quote) */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="bg-[var(--bg-alt)] rounded-full border border-[var(--border-subtle)] p-1">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
          <a
            href="https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.625rem 1.25rem',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: 999,
              fontSize: 'var(--fs-small)',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.2)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
          >
            Get a Quote <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
