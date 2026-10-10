// @ts-nocheck
import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { Copy, Check, ArrowRight, Mail, Phone, MessageCircle } from 'lucide-react';
// @ts-ignore
import SplitTextGSAP from '../ui/SplitTextGSAP';

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="p-2 rounded-md hover:bg-[var(--accent-dim)] text-[var(--ink-muted)] hover:text-[var(--accent)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      title="Copy to clipboard"
    >
      {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container max-w-4xl relative z-10 flex flex-col items-center text-center">
        <SectionLabel className="mb-6">Get in Touch</SectionLabel>

        <h2 id="contact-title" className="mb-6 font-display font-bold leading-[1.05] tracking-tight sr-only" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--ink)' }}>
          Let's build something amazing together.
        </h2>
        {/* SplitTextGSAP animated headline */}
        <div aria-hidden="true" className="mb-12 md:mb-16">
          {/* @ts-ignore */}
          <SplitTextGSAP
            text="Let's build something"
            tag="span"
            className="block font-display font-bold tracking-tight"
            delay={40}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50, rotateX: -30 } as any}
            to={{ opacity: 1, y: 0, rotateX: 0 } as any}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="center"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--ink)', display: 'block', lineHeight: 1.3 } as any}
          />
          {/* @ts-ignore */}
          <SplitTextGSAP
            text="amazing together."
            tag="span"
            className="block font-display font-bold tracking-tight pb-2"
            delay={40}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50, rotateX: -30 } as any}
            to={{ opacity: 1, y: 0, rotateX: 0 } as any}
            threshold={0.1}
            rootMargin="-80px"
            textAlign="center"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--accent)', display: 'block', lineHeight: 1.3 } as any}
          />
        </div>

        <p className="text-lg md:text-xl max-w-2xl leading-relaxed mb-16" style={{ color: 'var(--ink-muted)' }}>
          Whether you have a specific project in mind or just want to explore possibilities, we're ready to elevate your brand.
        </p>

        <div className="flex flex-col sm:flex-row w-full max-w-3xl justify-center" style={{ gap: '2rem', marginBottom: '4rem' }}>
          {/* Email Card */}
          <div className="group relative flex flex-col items-center flex-1 transition-all duration-300 hover:-translate-y-2 border" style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: 'var(--surface)', borderColor: 'var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ width: '3.5rem', height: '3.5rem', marginBottom: '1.25rem', backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}>
              <Mail size={24} strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] mb-2 font-body" style={{ color: 'var(--ink-faint)' }}>Email Us</h3>
            <div className="flex items-center gap-2">
              <a href="mailto:teamnexoramediain@gmail.com" className="text-base sm:text-lg font-medium transition-colors hover:underline underline-offset-4" style={{ color: 'var(--ink)' }}>
                teamnexoramediain@gmail.com
              </a>
              <CopyButton value="teamnexoramediain@gmail.com" label="email address" />
            </div>
          </div>

          {/* Phone Card */}
          <div className="group relative flex flex-col items-center flex-1 transition-all duration-300 hover:-translate-y-2 border" style={{ padding: '2.5rem', borderRadius: '1.5rem', backgroundColor: 'var(--surface)', borderColor: 'var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{ width: '3.5rem', height: '3.5rem', marginBottom: '1.25rem', backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}>
              <Phone size={24} strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.1em] mb-2 font-body" style={{ color: 'var(--ink-faint)' }}>Call Us</h3>
            <div className="flex items-center gap-2">
              <a href="tel:+918882722257" className="text-base sm:text-lg font-medium transition-colors hover:underline underline-offset-4" style={{ color: 'var(--ink)' }}>
                +91 8882722257
              </a>
              <CopyButton value="+918882722257" label="phone number" />
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="flex flex-col items-center w-full" style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          <a
            href="https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
            style={{
              padding: 'clamp(0.9rem, 1.8vw, 1.5rem) clamp(1.5rem, 3.5vw, 3.5rem)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.35rem)',
              gap: 'clamp(0.6rem, 1.2vw, 1rem)',
              minWidth: 'clamp(260px, 30vw, 380px)',
              maxWidth: '92vw',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              boxShadow: '0 20px 40px -10px var(--accent-dim)',
            }}
          >
            <MessageCircle
              strokeWidth={2.2}
              style={{
                width: 'clamp(20px, 2.2vw, 28px)',
                height: 'clamp(20px, 2.2vw, 28px)',
                flexShrink: 0
              }}
            />
            <span className="whitespace-nowrap">Start a chat on WhatsApp</span>
            <ArrowRight
              strokeWidth={2.2}
              className="transition-transform duration-300 group-hover:translate-x-2"
              style={{
                width: 'clamp(18px, 2vw, 24px)',
                height: 'clamp(18px, 2vw, 24px)',
                flexShrink: 0
              }}
            />
          </a>
          <p
            className="font-medium text-center"
            style={{
              color: 'var(--ink-muted)',
              fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
              marginTop: 'clamp(0.75rem, 1.5vw, 1.5rem)'
            }}
          >
            We usually reply within a few minutes.
          </p>
        </div>

      </div>
    </section>
  );
}
