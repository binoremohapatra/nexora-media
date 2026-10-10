import React, { useEffect, useRef } from 'react';

const QUICK_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

const SERVICES = [
  { href: '#', label: 'Social Media Management' },
  { href: '#', label: 'Content Creation' },
  { href: '#', label: 'Video Editing' },
  { href: '#', label: 'Branding & Identity' },
  { href: '#', label: 'Website Design & Development' },
  { href: '#', label: 'Meta Ads & Google Ads' },
];

const WHATSAPP_URL = "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.";

const CONTACT = [
  { href: 'tel:+918882722257', label: '+91 8882722257' },
  { href: 'mailto:teamnexoramediain@gmail.com', label: 'teamnexoramediain@gmail.com' },
  { href: WHATSAPP_URL, label: 'WhatsApp ↗' },
  { href: '#', label: 'Remote · India' },
];

const year = new Date().getFullYear();

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const videoLightRef = useRef<HTMLVideoElement>(null);
  const videoDarkRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        videoLightRef.current?.play().catch(() => { });
        videoDarkRef.current?.play().catch(() => { });
      } else {
        videoLightRef.current?.pause();
        videoDarkRef.current?.pause();
      }
    }, { threshold: 0.05 });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

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
    marginBottom: '1rem',
    display: 'block'
  };

  const headerStyle = {
    fontSize: '0.875rem',
    fontWeight: 700,
    color: 'var(--ink)',
    marginBottom: '1.5rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em'
  };

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--border)',
        paddingTop: 'clamp(4rem, 8vw, 6rem)',
        fontFamily: 'var(--font-body)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Dynamic Video Backgrounds */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <video
          ref={videoLightRef}
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
          ref={videoDarkRef}
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
          {/* Brand Column (Left Side) */}
          <div style={{ flex: '0 1 320px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', width: 28, height: 28 }}>
                <img
                  src="/images/logo.png"
                  alt="Nexora Media"
                  style={{ opacity: 'var(--logo-light-opacity)', position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.3s' }}
                />
                <img
                  src="/images/logo-dark.png"
                  alt=""
                  aria-hidden="true"
                  style={{ opacity: 'var(--logo-dark-opacity)', position: 'absolute', width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.3s' }}
                />
              </div>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                Nexora Media
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--ink-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Helping businesses grow with premium content, branding, social media, ads, video and modern digital experiences.
            </p>

            {/* Insta Link Text */}
            <a
              href="https://www.instagram.com/nexoramediain"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: 'var(--ink-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                marginBottom: '1.5rem'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
            >
              Ig: @nexoramediain ↗
            </a>

            {/* Social SVGs: YouTube, WhatsApp, Instagram */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
              {/* YouTube (Red) */}
              <a href="#" style={{ color: '#ff0000' }} aria-label="YouTube"
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.072 0 12 0 12s0 3.928.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              {/* WhatsApp (Green) */}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#25d366' }} aria-label="WhatsApp"
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.383 0 0 5.383 0 12.032c0 2.658.857 5.11 2.316 7.152L.429 24l5.004-1.87a11.96 11.96 0 0 0 6.598 1.933c6.649 0 12.032-5.383 12.032-12.032S18.679 0 12.031 0zm6.554 17.202c-.27.764-1.573 1.455-2.181 1.542-.572.083-1.309.18-3.791-.849-2.981-1.233-4.887-4.295-5.034-4.492-.148-.198-1.196-1.597-1.196-3.044 0-1.448.752-2.164 1.018-2.457.265-.292.573-.365.765-.365.191 0 .382.001.548.009.18.009.421-.069.658.5.245.592.836 2.046.909 2.193.074.148.123.32.025.518-.098.197-.148.32-.296.493-.147.172-.314.382-.444.512-.147.147-.302.308-.135.594.167.287.742 1.226 1.596 1.988 1.101.985 2.016 1.291 2.312 1.439.296.147.468.122.641-.075.172-.197.74-8.865.938-1.161.196-.296.393-.247.663-.147.27.098 1.706.804 1.999.951.294.148.49.222.563.344.073.123.073.716-.197 1.48z" /></svg>
              </a>
              {/* Instagram (Pink/Orange Gradient Stroke) */}
              <a href="https://www.instagram.com/nexoramediain" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', width: '24px', height: '24px' }} aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  onMouseEnter={(e) => (e.currentTarget.style.stroke = '#c13584')}
                  onMouseLeave={(e) => (e.currentTarget.style.stroke = '#e1306c')}>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns (Right Side) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '3rem',
            flex: '1 1 auto',
            maxWidth: '600px'
          }}>
            {/* Column 1 */}
            <div>
              <h3 style={headerStyle}>QUICK LINKS</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {QUICK_LINKS.map((link) => (
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
              <h3 style={headerStyle}>SERVICES</h3>
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
              <h3 style={headerStyle}>CONTACT</h3>
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

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', paddingBottom: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', margin: 0 }}>
            © {year} Nexora Media. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', margin: 0 }}>
            Built for premium digital growth.
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
          opacity: 0.03, // Very subtle, premium faint look like the screenshot
          pointerEvents: 'auto',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          lineHeight: 0.75,
          zIndex: 1,
          transition: 'color 0.4s ease-in-out, opacity 0.4s ease-in-out',
          cursor: 'default',
          marginBottom: '-2%'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--ink)';
          e.currentTarget.style.opacity = '0.03';
        }}
      >
        Nexora
      </div>
    </footer>
  );
}
