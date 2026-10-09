import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle2, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const ACCESS_KEY = '60cc9899-4534-4f25-9763-e1108e316908';
const ENDPOINT = 'https://api.web3forms.com/submit';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again or use WhatsApp instead.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Web3Forms Hidden Fields */}
        <input type="hidden" name="access_key" value={ACCESS_KEY} />
        <input type="hidden" name="subject" value="New Nexora Media Website Inquiry" />
        <input type="hidden" name="from_name" value="Nexora Media Website" />
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="FullName" className="text-sm font-medium text-[var(--ink)]">Full Name</label>
            <input
              id="FullName"
              name="Full Name"
              type="text"
              required
              placeholder="Jane Doe"
              className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent transition-shadow text-[var(--ink)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="CompanyName" className="text-sm font-medium text-[var(--ink)]">Company Name</label>
            <input
              id="CompanyName"
              name="Company Name"
              type="text"
              required
              placeholder="Your Brand"
              className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent transition-shadow text-[var(--ink)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="EmailAddress" className="text-sm font-medium text-[var(--ink)]">Email Address</label>
            <input
              id="EmailAddress"
              name="Email Address"
              type="email"
              required
              placeholder="jane@example.com"
              className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent transition-shadow text-[var(--ink)]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="PhoneNumber" className="text-sm font-medium text-[var(--ink)]">Phone Number</label>
            <input
              id="PhoneNumber"
              name="Phone Number"
              type="tel"
              required
              placeholder="+91 0000000000"
              className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent transition-shadow text-[var(--ink)]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="ServiceRequired" className="text-sm font-medium text-[var(--ink)]">Service Required</label>
          <select
            id="ServiceRequired"
            name="Service Required"
            required
            className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent transition-shadow text-[var(--ink)] appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em',
            }}
          >
            <option value="" disabled selected hidden>Select a primary service</option>
            <option value="Social Media Management">Social Media Management</option>
            <option value="Content Creation">Content Creation</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Branding & Identity">Branding & Identity</option>
            <option value="Logo Design">Logo Design</option>
            <option value="Website Design & Development">Website Design & Development</option>
            <option value="Meta Ads">Meta Ads</option>
            <option value="Google Ads">Google Ads</option>
            <option value="SEO">SEO</option>
            <option value="Photography">Photography</option>
            <option value="Videography">Videography</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="EstimatedBudget" className="text-sm font-medium text-[var(--ink)]">Estimated Budget (Optional but helpful)</label>
          <select
            id="EstimatedBudget"
            name="Estimated Budget"
            required
            className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent transition-shadow text-[var(--ink)] appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em',
            }}
          >
            <option value="" disabled selected hidden>Select a budget range</option>
            <option value="Under ₹10,000">Under ₹10,000</option>
            <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
            <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
            <option value="₹50,000+">₹50,000+</option>
            <option value="Need guidance">Need guidance</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="Message" className="text-sm font-medium text-[var(--ink)]">Project Details</label>
          <textarea
            id="Message"
            name="Message"
            required
            rows={4}
            placeholder="Tell us about your brand, goals, and what you need help with."
            className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-transparent transition-shadow text-[var(--ink)] resize-y"
          />
        </div>

        {status === 'error' && (
          <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm rounded-[var(--radius-sm)] font-medium">
            {errorMsg}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={status === 'submitting'} 
          className="mt-2 w-full md:w-auto justify-center md:self-start min-w-[160px]"
        >
          {status === 'submitting' ? (
            <><Loader2 className="animate-spin" size={18} /> Sending...</>
          ) : (
            'Submit Inquiry'
          )}
        </Button>
      </form>

      {/* Success Dialog */}
      <Dialog.Root open={status === 'success'} onOpenChange={(open) => !open && setStatus('idle')}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[201] grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--border)] bg-[var(--bg)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-[var(--radius-xl)]">
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 size={32} />
              </div>
              <Dialog.Title className="text-2xl font-bold font-display text-[var(--ink)]">
                Message Sent
              </Dialog.Title>
              <Dialog.Description className="text-[var(--ink-muted)] mb-4">
                Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button variant="primary" className="w-full justify-center">Done</Button>
              </Dialog.Close>
            </div>
            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
