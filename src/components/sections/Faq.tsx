import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { faqs } from '../../data/faqs';
import { cn } from '../../lib/utils';

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-[var(--bg-alt)] border-t border-[var(--border-subtle)]">
      <div className="container max-w-4xl">
        <div className="text-center mb-16 md:mb-24">
          <SectionLabel className="mb-6">Common Questions</SectionLabel>
          <h2 id="faq-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)' }}>
            Everything you need to know.
          </h2>
        </div>
        
        <Accordion.Root type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <Accordion.Item 
              key={faq.id} 
              value={faq.id}
              className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[var(--accent)]"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="group flex flex-1 items-center justify-between p-6 md:p-8 text-left bg-transparent outline-none cursor-pointer">
                  <span className="font-semibold text-lg md:text-xl text-[var(--ink)] font-display tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className="text-[var(--ink-muted)] transition-transform duration-300 ease-out group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--accent)]" 
                    aria-hidden="true" 
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden text-[var(--ink-muted)] data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-base md:text-lg leading-relaxed max-w-3xl">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
