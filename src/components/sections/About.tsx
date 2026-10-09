import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';

/**
 * About section — Phase 3 will fully implement.
 * Original copy preserved exactly.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="section"
      style={{ background: 'var(--bg-alt)' }}
    >
      <div className="container">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>About Nexora Media</SectionLabel>
          <h2
            id="about-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              margin: '1.5rem 0 2rem',
              maxWidth: '20ch',
            }}
          >
            A creative partner for brands that want to look premium and grow with confidence.
          </h2>
          <p style={{ fontSize: 'var(--fs-body)', color: 'var(--ink-muted)', maxWidth: '60ch', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Nexora Media is a creative marketing agency helping businesses grow through powerful content,
            strategic branding, social media marketing, advertising, and modern digital experiences.
            We combine creativity, strategy, and technology to help businesses establish a strong online
            presence and achieve measurable growth.
          </p>
          <div
            role="list"
            aria-label="Nexora Media approach"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {[
              { num: '01', label: 'Clear brand positioning' },
              { num: '02', label: 'Content made for attention' },
              { num: '03', label: 'Digital experiences that convert' },
            ].map(({ num, label }) => (
              <div
                key={num}
                role="listitem"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--fs-small)', color: 'var(--accent)' }} aria-hidden="true">
                  {num}
                </span>
                <strong style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.1rem, 2vw, 1.375rem)', color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                  {label}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
