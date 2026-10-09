import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import type { Theme } from '../../types';

const NAV_LINKS = [
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

/**
 * Floating navigation bar.
 * - Hides on meaningful downward scroll, reappears on upward scroll.
 * - Background and border appear once the user has scrolled past 60px.
 * - WhatsApp "Get a Quote" CTA in nav.
 * - Mobile hamburger opens full-screen drawer.
 * - Active section tracked via IntersectionObserver.
 */
export function Navigation({ theme, onToggleTheme }: NavigationProps) {
  const { direction, scrolled } = useScrollDirection(10);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Hide nav on downward scroll (only after user has scrolled)
  const isHidden = scrolled && direction === 'down' && !mobileOpen;

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const openMenu = () => setMobileOpen(true);
  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    // Return focus to hamburger button
    setTimeout(() => menuButtonRef.current?.focus(), 50);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
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
          padding: scrolled ? '0.75rem var(--container-pad)' : '1.25rem var(--container-pad)',
          transition: 'padding 0.3s ease',
        }}
        aria-label="Primary navigation"
      >
        {/* Inner pill */}
        <div
          style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            background: scrolled ? 'var(--nav-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
            border: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
            borderRadius: 999,
            padding: scrolled ? '0.625rem 1.25rem' : '0 0',
            transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease, padding 0.35s ease',
          }}
        >
          {/* Wordmark */}
          <a
            href="#home"
            aria-label="Nexora Media — go to homepage"
            onClick={(e) => handleNavClick(e, '#home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div style={{ position: 'relative', width: 28, height: 28 }}>
              <img
                src="/images/logo.png"
                alt="Nexora Media logo"
                width={28}
                height={28}
                style={{ opacity: 'var(--logo-light-opacity)', transition: 'opacity 0.3s', position: 'absolute' }}
              />
              <img
                src="/images/logo-dark.png"
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                style={{ opacity: 'var(--logo-dark-opacity)', transition: 'opacity 0.3s', position: 'absolute' }}
              />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
                transition: 'color 0.2s',
              }}
            >
              Nexora Media
            </span>
          </a>

          {/* Desktop nav links */}
          <nav aria-label="Site sections" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ul
              role="list"
              style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', listStyle: 'none' }}
              className="hidden lg:flex"
            >
              {NAV_LINKS.map(({ href, label }) => {
                const sectionId = href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      aria-current={isActive ? 'page' : undefined}
                      style={{
                        display: 'block',
                        padding: '0.375rem 0.75rem',
                        fontSize: 'var(--fs-small)',
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? 'var(--accent)' : 'var(--ink-muted)',
                        borderRadius: 999,
                        transition: 'color 0.2s, background 0.2s',
                        textDecoration: 'none',
                      }}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Desktop actions */}
            <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '0.625rem', marginLeft: '0.5rem' }}>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
              <a
                href="https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.5rem 1.125rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: 999,
                  fontSize: 'var(--fs-small)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Get a Quote <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
              className="flex lg:hidden"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                color: 'var(--ink-muted)',
                background: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={closeMenu}
        theme={theme}
        onToggleTheme={onToggleTheme}
        navLinks={NAV_LINKS}
        activeSection={activeSection}
      />
    </>
  );
}
