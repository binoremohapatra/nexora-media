import React, { useState } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { ContactForm } from './ContactForm';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';

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
      className="p-2 rounded-md hover:bg-[var(--bg-alt)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-[var(--bg)]">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionLabel className="mb-6">Start a Project</SectionLabel>
              <h2 id="contact-title" className="mb-6" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)', lineHeight: 1.05 }}>
                Let's build<br />something<br />great.
              </h2>
              <p className="text-lg text-[var(--ink-muted)] mb-12 max-w-sm leading-relaxed">
                Ready to elevate your brand? Reach out for a consultation, and let's discuss how we can help you grow.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)] mb-3 font-body">Email</h3>
                <div className="flex items-center gap-3">
                  <a href="mailto:teamnexoramediain@gmail.com" className="text-lg md:text-xl font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors underline decoration-transparent hover:decoration-[var(--accent)] underline-offset-4">
                    teamnexoramediain@gmail.com
                  </a>
                  <CopyButton value="teamnexoramediain@gmail.com" label="email address" />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)] mb-3 font-body">Phone</h3>
                <div className="flex items-center gap-3">
                  <a href="tel:+918882722257" className="text-lg md:text-xl font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors underline decoration-transparent hover:decoration-[var(--accent)] underline-offset-4">
                    +91 8882722257
                  </a>
                  <CopyButton value="+918882722257" label="phone number" />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-faint)] mb-3 font-body">Quick Chat</h3>
                <a
                  href="https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
                >
                  Message on WhatsApp <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[var(--surface)] p-6 md:p-10 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 font-display text-[var(--ink)] tracking-tight">Project Inquiry</h3>
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
