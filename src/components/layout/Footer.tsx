import React from 'react';

const PAGES = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'About' },
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Careers' },
  { href: '#', label: 'Press' },
  { href: '#', label: 'Blog' },
  { href: '#', label: 'Changelog' },
  { href: '#', label: 'Roadmap' },
  { href: '#', label: 'Pricing' },
  { href: '#', label: 'FAQ' },
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
  { href: '#', label: 'Best Place to Market' },
  { href: '#', label: 'AI Tools' },
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
        backgroundColor: 'var(--bg-alt)',
        color: 'var(--ink)',
        paddingTop: '6rem',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        fontFamily: 'var(--font-body)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10, padding: '0 2rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'space-between',
          marginBottom: '5rem',
        }}>
          {/* Columns 1-5 container */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
            gap: '2rem',
            flex: '1 1 auto' 
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

          {/* Brand Column */}
          <div style={{ flex: '0 1 300px', minWidth: '250px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 32, backgroundColor: 'var(--ink)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src="/images/logo.png" alt="Nexora" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', filter: 'var(--logo-invert)' }} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>Nexora</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Beautiful UI components and templates for modern web applications. Built with React and Tailwind CSS.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* YouTube (Red) */}
              <a href="#" style={{ color: '#ff0000' }} aria-label="YouTube"
                 onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                 onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.072 0 12 0 12s0 3.928.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* WhatsApp (Green) */}
              <a href="https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services." style={{ color: '#25d366' }} aria-label="WhatsApp"
                 onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                 onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.383 0 0 5.383 0 12.032c0 2.658.857 5.11 2.316 7.152L.429 24l5.004-1.87a11.96 11.96 0 0 0 6.598 1.933c6.649 0 12.032-5.383 12.032-12.032S18.679 0 12.031 0zm6.554 17.202c-.27.764-1.573 1.455-2.181 1.542-.572.083-1.309.18-3.791-.849-2.981-1.233-4.887-4.295-5.034-4.492-.148-.198-1.196-1.597-1.196-3.044 0-1.448.752-2.164 1.018-2.457.265-.292.573-.365.765-.365.191 0 .382.001.548.009.18.009.421-.069.658.5.245.592.836 2.046.909 2.193.074.148.123.32.025.518-.098.197-.148.32-.296.493-.147.172-.314.382-.444.512-.147.147-.302.308-.135.594.167.287.742 1.226 1.596 1.988 1.101.985 2.016 1.291 2.312 1.439.296.147.468.122.641-.075.172-.197.74-8.865.938-1.161.196-.296.393-.247.663-.147.27.098 1.706.804 1.999.951.294.148.49.222.563.344.073.123.073.716-.197 1.48z"/></svg>
              </a>
              {/* Instagram (Pink/Orange Gradient Stroke) */}
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
        <div style={{ height: '1px', backgroundColor: 'var(--border)', width: '100%', marginBottom: '3rem' }} />

        {/* Copyright */}
        <div style={{ textAlign: 'center', paddingBottom: '16rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--ink-faint)', margin: 0 }}>
            © {year} Nexora Media. All rights reserved.
          </p>
        </div>
      </div>

      {/* GIANT BACKGROUND TEXT */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-12%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(14rem, 30vw, 40rem)',
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          color: 'var(--bg-alt)',
          textShadow: '0px 0px 40px rgba(0, 102, 255, 0.4), 0px 0px 80px rgba(0, 102, 255, 0.15)',
          WebkitTextStroke: '2px rgba(0, 102, 255, 0.2)',
          opacity: 0.8,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 0.8,
          zIndex: 0,
        }}
      >
        Nexora
      </div>
    </footer>
  );
}
