import React from 'react';

const PAGES = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#faq', label: 'FAQ' },
];

const SERVICES = [
  { href: '#', label: 'Social Media Management' },
  { href: '#', label: 'Content Creation' },
  { href: '#', label: 'Video Editing' },
  { href: '#', label: 'Branding & Identity' },
  { href: '#', label: 'Website Design' },
];

const LEGAL = [
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Cookie Policy' },
  { href: '#', label: 'Refund Policy' },
];

const CONTACT = [
  { href: 'tel:+918882722257', label: '+91 8882722257' },
  { href: 'mailto:teamnexoramediain@gmail.com', label: 'Email Us' },
  { href: "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.", label: 'WhatsApp' },
  { href: '#', label: 'Remote · India' },
];

const year = new Date().getFullYear();

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle = {
    fontSize: '0.875rem',
    color: 'var(--ink-muted)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    marginBottom: '0.875rem',
    display: 'block'
  };

  const headerStyle = {
    fontSize: '0.9375rem',
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
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        fontFamily: 'var(--font-body)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
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
            <h3 style={headerStyle}>Services</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {SERVICES.map((link) => (
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

          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2', maxWidth: '320px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 32, backgroundColor: 'var(--ink)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/images/logo.png" alt="Nexora" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', filter: 'var(--logo-invert)' }} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Nexora</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Premium creative agency specializing in modern digital experiences. Built with passion and creativity.
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
              <a href="https://www.instagram.com/nexoramediain" style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', width: '24px', height: '24px' }} aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                     onMouseEnter={(e) => (e.currentTarget.style.stroke = '#c13584')}
                     onMouseLeave={(e) => (e.currentTarget.style.stroke = '#e1306c')}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'var(--border)', width: '100%', marginBottom: '2rem' }} />

        {/* Copyright */}
        <div style={{ textAlign: 'center', paddingBottom: '3rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-faint)', margin: 0 }}>
            © {year} Nexora. All rights reserved.
          </p>
        </div>
      </div>

      {/* GIANT BACKGROUND TEXT */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(12rem, 28vw, 35rem)',
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          color: 'var(--ink)',
          opacity: 0.03, // Very faint
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 0.8,
          zIndex: 1,
        }}
      >
        Nexora
      </div>
    </footer>
  );
}
