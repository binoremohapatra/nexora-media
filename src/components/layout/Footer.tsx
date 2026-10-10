import React from 'react';

const PAGES = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
  { href: '#careers', label: 'Careers' },
  { href: '#press', label: 'Press' },
  { href: '#blog', label: 'Blog' },
  { href: '#changelog', label: 'Changelog' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

const LEGAL = [
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Cookie Policy' },
  { href: '#', label: 'Refund Policy' },
  { href: '#', label: 'Acceptable Use' },
  { href: '#', label: 'GDPR' },
  { href: '#', label: 'Licenses' },
];

const COMPONENTS = [
  { href: '#', label: 'Buttons' },
  { href: '#', label: 'Cards' },
  { href: '#', label: 'Navigation' },
  { href: '#', label: 'Forms' },
  { href: '#', label: 'Modals' },
  { href: '#', label: 'Tables' },
  { href: '#', label: 'Alerts' },
  { href: '#', label: 'Badges' },
  { href: '#', label: 'Avatars' },
  { href: '#', label: 'Tooltips' },
];

const RESOURCES = [
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Tutorials' },
  { href: '#', label: 'Examples' },
  { href: '#', label: 'Templates' },
  { href: '#', label: 'Guides' },
  { href: '#', label: 'API Reference' },
  { href: '#', label: 'Community' },
  { href: '#', label: 'Support' },
];

const MARKETING = [
  { href: '#', label: 'Best Place to Market AI Tools' },
  { href: '#', label: 'Product Hunt Launch' },
  { href: '#', label: 'Indie Hackers' },
  { href: '#', label: 'Hacker News' },
  { href: '#', label: 'Twitter Marketing' },
  { href: '#', label: 'Reddit Communities' },
  { href: '#', label: 'Discord Servers' },
];

const year = new Date().getFullYear();

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle = {
    fontSize: '0.8125rem',
    color: 'var(--ink-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    marginBottom: '0.875rem',
    display: 'block'
  };

  const headerStyle = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--ink)',
    marginBottom: '1.5rem',
  };

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--border)',
        paddingTop: 'clamp(3rem, 8vw, 6rem)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Dynamic Video Backgrounds */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/videos/footer-light.mp4"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 'var(--logo-light-opacity)',
            transition: 'opacity 0.7s ease-in-out',
          }}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/videos/footer-dark.mp4"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 'var(--logo-dark-opacity)',
            transition: 'opacity 0.7s ease-in-out',
          }}
        />
        {/* Overlay to ensure text readability */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-alt)', opacity: 0.8 }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 2rem', width: '100%' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4rem',
          justifyContent: 'space-between',
          marginBottom: '5rem',
        }}>
          {/* Links Columns (Left Side) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
            gap: '2rem',
            flex: '1 1 auto',
            maxWidth: '900px'
          }}>
            {/* Column 1 */}
            <div>
              <h3 style={headerStyle}>Pages</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {PAGES.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(e) => handleNavClick(e, link.href)} style={linkStyle}
                       onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                       onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 style={headerStyle}>Legal</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {LEGAL.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={linkStyle}
                       onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                       onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 style={headerStyle}>Components</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {COMPONENTS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={linkStyle}
                       onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                       onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 style={headerStyle}>Resources</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {RESOURCES.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={linkStyle}
                       onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                       onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <h3 style={headerStyle}>Marketing</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {MARKETING.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} style={linkStyle}
                       onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                       onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brand Column (Right Side) */}
          <div style={{ flex: '0 1 300px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: 32, height: 32, backgroundColor: 'var(--ink)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/images/logo.png" alt="Nexora" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', filter: 'var(--logo-invert)' }} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Nexora</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Beautiful UI components and templates for modern web applications. Built with React and Tailwind CSS.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* LinkedIn (Blue) */}
              <a href="#" style={{ color: '#0077b5' }} aria-label="LinkedIn"
                 onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                 onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* Twitter (Light Blue) */}
              <a href="#" style={{ color: '#1da1f2' }} aria-label="Twitter"
                 onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                 onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              {/* Slack (Multi-color SVG approximation) */}
              <a href="#" style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', width: '24px', height: '24px' }} aria-label="Slack"
                 onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                 onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#36C5F0"/>
                  <path d="M5 15h6v3c0 1.66-1.34 3-3 3s-3-1.34-3-3v-3z" fill="#2EB67D"/>
                  <path d="M9 5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z" fill="#E01E5A"/>
                  <path d="M9 5v6H6c-1.66 0-3-1.34-3-3s1.34-3 3-3h3z" fill="#ECB22E"/>
                  <path d="M19 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" fill="#E01E5A"/>
                  <path d="M19 9h-6V6c0-1.66 1.34-3 3-3s3 1.34 3 3v3z" fill="#36C5F0"/>
                  <path d="M15 19c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" fill="#2EB67D"/>
                  <path d="M15 19v-6h3c1.66 0 3 1.34 3 3s-1.34 3-3 3h-3z" fill="#ECB22E"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--border)', width: '100%', marginBottom: '3rem' }} />

        {/* Copyright */}
        <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-faint)', margin: 0 }}>
            © {year} Nexora Media. All rights reserved.
          </p>
        </div>
      </div>

      {/* GIANT BACKGROUND TEXT (Responsive VW based so it shows fully on all screens) */}
      <div 
        style={{
          width: '100%',
          textAlign: 'center',
          fontSize: '18vw', // Uses viewport width to perfectly fit edge-to-edge
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          color: 'var(--ink)',
          opacity: 0.05, // Very subtle, premium faint look like the screenshot
          pointerEvents: 'auto',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 0.8,
          zIndex: 1,
          transition: 'color 0.4s ease-in-out, opacity 0.4s ease-in-out',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--ink)';
          e.currentTarget.style.opacity = '0.05';
        }}
      >
        Nexora
      </div>
    </footer>
  );
}
