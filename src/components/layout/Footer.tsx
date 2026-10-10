import React from 'react';

const PAGES = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#faq', label: 'FAQ' },
];

const SOCIALS = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'YouTube' },
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Twitter' },
];

const LEGAL = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' },
];

const CONTACT = [
  { href: 'tel:+918882722257', label: '+91 8882722257' },
  { href: 'mailto:teamnexoramediain@gmail.com', label: 'Email Us' },
  { href: "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.", label: 'WhatsApp' },
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
        backgroundColor: 'var(--bg-alt)',
        color: 'var(--ink)',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '0 2rem', width: '100%' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4rem',
          justifyContent: 'space-between',
          marginBottom: '8rem',
        }}>
          {/* Brand Column (Left Side) */}
          <div style={{ flex: '0 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 28, height: 28, backgroundColor: 'var(--ink)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src="/images/logo.png" alt="Nexora" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', filter: 'var(--logo-invert)' }} />
                </div>
                <span style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Nexora</span>
              </div>
            </div>
            {/* Copyright */}
            <p style={{ fontSize: '0.8125rem', color: 'var(--ink-faint)', margin: 0 }}>
              © copyright Nexora {year}. All rights reserved.
            </p>
          </div>

          {/* Links Columns (Right Side) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '3rem',
            flex: '1 1 auto',
            maxWidth: '800px'
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
              <h3 style={headerStyle}>Socials</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {SOCIALS.map((link) => (
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

            {/* Column 4 */}
            <div>
              <h3 style={headerStyle}>Contact</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {CONTACT.map((link) => (
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
          opacity: 0.03, // Very subtle, premium faint look like the screenshot
          pointerEvents: 'auto',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 0.8,
          zIndex: 1,
          transition: 'opacity 0.4s ease-in-out, text-shadow 0.4s ease-in-out',
          cursor: 'default'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.08';
          e.currentTarget.style.textShadow = '0px 0px 40px var(--ink-faint)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.03';
          e.currentTarget.style.textShadow = 'none';
        }}
      >
        Nexora
      </div>
    </footer>
  );
}
