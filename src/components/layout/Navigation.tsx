import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import type { Theme } from '../../types';
// @ts-ignore
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
  const [activeSection, setActiveSection] = useState('#home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="20" cy="20" r="20" fill="var(--accent)" />
      <path d="M12 28V12L28 28V12" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <header
      role="banner"
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
          justifyContent: 'center', // center the single pill
          pointerEvents: 'auto'
        }}
      >
        <PillNav
          logo={CustomLogo}
          logoAlt="Nexora Media"
          items={NAV_ITEMS}
          activeHref={activeSection}
          baseColor="var(--nav-bg)" // use nav-bg which has blur
          pillColor="var(--surface)"
          hoveredPillTextColor="var(--accent)"
          pillTextColor="var(--ink)"
          onMobileMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          actions={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid var(--border-subtle)' }}>
              <div className="bg-[var(--surface)] rounded-full p-1 flex items-center justify-center">
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
                  padding: '0.5rem 1rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: 999,
                  fontSize: 'var(--fs-small)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.15s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Get a Quote <span aria-hidden="true">↗</span>
              </a>
            </div>
          }
        />
      </div>
    </header>
  );
}
