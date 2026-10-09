import React from 'react';


const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

const SELECTED_SERVICES = [
  'Social Media Management',
  'Content Creation',
  'Video Editing',
  'Branding & Identity',
  'Website Design & Development',
  'Meta Ads & Google Ads',
];

const year = new Date().getFullYear();

const WHATSAPP_URL = "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.";

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      aria-labelledby="footer-brand"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--border)',
        paddingTop: 'clamp(3rem, 8vw, 6rem)',
      }}
    >
      {/* Dynamic Video Backgrounds */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          src="https://assets.mixkit.co/videos/242/242-1080.mp4"
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
          src="https://assets.mixkit.co/videos/2374/2374-1080.mp4"
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

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Large wordmark */}
        <div
          className="text-[var(--ink)] opacity-[0.08] hover:text-[var(--accent)] hover:opacity-100 transition-all duration-500"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: 'clamp(2rem, 5vw, 4rem)',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          Nexora Media
        </div>

        {/* Main footer grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            marginBottom: 'clamp(2rem, 5vw, 4rem)',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 2' }}>
            <a
              href="#home"
              id="footer-brand"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="Nexora Media homepage"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                textDecoration: 'none',
              }}
            >
              <div style={{ position: 'relative', width: 28, height: 28 }}>
                <img
                  src="/images/logo.png"
                  alt="Nexora Media"
                  width={28}
                  height={28}
                  style={{ opacity: 'var(--logo-light-opacity)', position: 'absolute', transition: 'opacity 0.3s' }}
                />
                <img
                  src="/images/logo-dark.png"
                  alt=""
                  aria-hidden="true"
                  width={28}
                  height={28}
                  style={{ opacity: 'var(--logo-dark-opacity)', position: 'absolute', transition: 'opacity 0.3s' }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                }}
              >
                Nexora Media
              </span>
            </a>
            <p style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-muted)', maxWidth: '34ch', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Helping businesses grow with premium content, branding, social media, ads, video and modern digital experiences.
            </p>
            <a
              href="https://www.instagram.com/nexoramediain"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Nexora Media on Instagram"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: 'var(--fs-small)',
                color: 'var(--ink-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
            >
              <span>Ig:</span>
              @nexoramediain ↗
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: 'var(--fs-small)', fontWeight: 600, fontFamily: 'var(--font-body)', color: 'var(--ink)', marginBottom: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Quick Links
            </h3>
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    style={{
                      fontSize: 'var(--fs-small)',
                      color: 'var(--ink-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Selected Services */}
          <div>
            <h3 style={{ fontSize: 'var(--fs-small)', fontWeight: 600, fontFamily: 'var(--font-body)', color: 'var(--ink)', marginBottom: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Services
            </h3>
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SELECTED_SERVICES.map((s) => (
                <li key={s} style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-muted)' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: 'var(--fs-small)', fontWeight: 600, fontFamily: 'var(--font-body)', color: 'var(--ink)', marginBottom: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Contact
            </h3>
            <ul role="list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <a href="tel:+918882722257" style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                  +91 8882722257
                </a>
              </li>
              <li>
                <a href="mailto:teamnexoramediain@gmail.com" style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                  teamnexoramediain@gmail.com
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}>
                  WhatsApp ↗
                </a>
              </li>
              <li style={{ fontSize: 'var(--fs-small)', color: 'var(--ink-faint)' }}>Remote · India</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--border)', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <p style={{ fontSize: 'var(--fs-micro)', color: 'var(--ink-faint)', margin: 0 }}>
            © {year} Nexora Media. All rights reserved.
          </p>
          <p style={{ fontSize: 'var(--fs-micro)', color: 'var(--ink-faint)', margin: 0 }}>
            Built for premium digital growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
