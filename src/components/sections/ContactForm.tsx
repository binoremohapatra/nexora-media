import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowUpRight, Check, CheckCircle2, Loader2, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { cn } from '../../lib/utils';

// Web3Forms access keys are public by design. In the Web3Forms dashboard,
// restrict this key to nexoramediain.in so nobody else can use it.
const ACCESS_KEY = '60cc9899-4534-4f25-9763-e1108e316908';
const ENDPOINT = 'https://api.web3forms.com/submit';
const WHATSAPP_URL =
  "https://wa.me/918882722257?text=Hi%20Nexora%20Media,%20I'm%20interested%20in%20your%20services.";

const SERVICES = [
  'Video Editing',
  'Graphic Design',
  'Social Media Management',
  'Content Creation',
  'Branding & Identity',
  'Logo Design',
  'Website Design & Development',
  'Meta Ads',
  'Google Ads',
  'SEO',
  'Photography',
  'Videography',
];

const BUDGETS = ['Under ₹10,000', '₹10,000–₹25,000', '₹25,000–₹50,000', '₹50,000+', 'Not sure yet'];

const MESSAGE_LIMIT = 600;

type Status = 'idle' | 'submitting' | 'success' | 'error';

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Field({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex w-full flex-col gap-2', className)}>{children}</div>;
}

function Chip({
  label,
  selected,
  onToggle,
  role,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  role: 'checkbox' | 'radio';
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onToggle}
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-medium',
        'transition-colors duration-200 motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
        selected
          ? 'border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--ink)]'
          : 'border-[var(--border)] bg-transparent text-[var(--ink-muted)] hover:border-[var(--ink-muted)] hover:text-[var(--ink)]'
      )}
    >
      {selected && <Check size={14} strokeWidth={3} className="text-[var(--accent)]" />}
      {label}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Form                                                                */
/* ------------------------------------------------------------------ */

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [servicesError, setServicesError] = useState('');

  const toggleService = (service: string) => {
    setServicesError('');
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (services.length === 0) {
      setServicesError('Pick at least one service so we know where to start.');
      document.getElementById('services-group')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(ENDPOINT, { method: 'POST', body: formData });
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        form.reset();
        setServices([]);
        setBudget('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'The form could not be sent. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('No connection. Check your internet and try again, or message us on WhatsApp.');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <>
      <form onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-10">
        {/* Web3Forms hidden fields */}
        <input type="hidden" name="access_key" value={ACCESS_KEY} />
        <input type="hidden" name="subject" value="New Nexora Media website inquiry" />
        <input type="hidden" name="from_name" value="Nexora Media Website" />
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

        {/* Chip selections are sent as hidden fields */}
        <input type="hidden" name="Service Required" value={services.join(', ')} />
        <input type="hidden" name="Estimated Budget" value={budget || 'Not specified'} />

        {/* ---- About you ---- */}
        <fieldset className="flex flex-col gap-6 border-0 p-0">
          <legend className="mb-6 font-display text-xl font-semibold text-[var(--ink)]">
            About you
          </legend>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field>
              <Label htmlFor="FullName">Your name</Label>
              <Input
                id="FullName"
                name="Full Name"
                type="text"
                autoComplete="name"
                required
                placeholder="Aman Sharma"
              />
            </Field>
            <Field>
              <Label htmlFor="CompanyName">Brand or business</Label>
              <Input
                id="CompanyName"
                name="Company Name"
                type="text"
                autoComplete="organization"
                required
                placeholder="Brew & Co. Café"
              />
            </Field>
            <Field>
              <Label htmlFor="EmailAddress">Email</Label>
              <Input
                id="EmailAddress"
                name="Email Address"
                type="email"
                autoComplete="email"
                required
                placeholder="aman@brewandco.in"
              />
            </Field>
            <Field>
              <Label htmlFor="PhoneNumber">Phone / WhatsApp</Label>
              <Input
                id="PhoneNumber"
                name="Phone Number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                pattern="[+0-9 ()\-]{10,16}"
                title="Enter a valid phone number, for example +91 98765 43210"
                placeholder="+91 98765 43210"
              />
            </Field>
          </div>
        </fieldset>

        {/* ---- What you need ---- */}
        <fieldset className="flex flex-col gap-8 border-0 p-0">
          <legend className="mb-6 font-display text-xl font-semibold text-[var(--ink)]">
            What you need
          </legend>

          <Field>
            <span id="services-label" className="text-sm font-medium text-[var(--ink)]">
              Services <span className="font-normal text-[var(--ink-muted)]">(pick one or more)</span>
            </span>
            <div
              id="services-group"
              role="group"
              aria-labelledby="services-label"
              aria-describedby={servicesError ? 'services-error' : undefined}
              className="flex flex-wrap gap-2"
            >
              {SERVICES.map((service) => (
                <Chip
                  key={service}
                  role="checkbox"
                  label={service}
                  selected={services.includes(service)}
                  onToggle={() => toggleService(service)}
                />
              ))}
            </div>
            <FieldError id="services-error" message={servicesError} />
          </Field>

          <Field>
            <span id="budget-label" className="text-sm font-medium text-[var(--ink)]">
              Budget <span className="font-normal text-[var(--ink-muted)]">(optional)</span>
            </span>
            <div
              role="radiogroup"
              aria-labelledby="budget-label"
              className="flex flex-wrap gap-2"
            >
              {BUDGETS.map((option) => (
                <Chip
                  key={option}
                  role="radio"
                  label={option}
                  selected={budget === option}
                  onToggle={() => setBudget(budget === option ? '' : option)}
                />
              ))}
            </div>
          </Field>

          <Field>
            <div className="flex items-baseline justify-between">
              <Label htmlFor="Message">Tell us about the project</Label>
              <span
                className={cn(
                  'text-xs tabular-nums',
                  message.length > MESSAGE_LIMIT - 40
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-[var(--ink-muted)]'
                )}
              >
                {message.length}/{MESSAGE_LIMIT}
              </span>
            </div>
            <Textarea
              id="Message"
              name="Message"
              required
              rows={5}
              maxLength={MESSAGE_LIMIT}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What are you making, who is it for, and when do you need it?"
            />
          </Field>
        </fieldset>

        {/* ---- Submit ---- */}
        <div className="flex flex-col gap-4">
          {status === 'error' && (
            <div
              role="alert"
              className="rounded-[var(--radius-sm)] border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
            >
              <p className="font-medium">{errorMsg}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block underline underline-offset-4"
              >
                Message us on WhatsApp instead
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-8',
              'bg-[var(--ink)] text-[var(--bg)] font-medium',
              'transition-[transform,opacity] duration-200 motion-reduce:transition-none',
              'hover:opacity-90 active:scale-[0.99]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
              'disabled:cursor-not-allowed disabled:opacity-60'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin motion-reduce:animate-none" />
                Sending…
              </>
            ) : (
              <>
                Send inquiry
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </>
            )}
          </button>

          <p className="text-center text-sm text-[var(--ink-muted)]">
            We reply within 24 hours. Prefer chatting?{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--ink)] underline underline-offset-4"
            >
              Open WhatsApp
            </a>
          </p>
        </div>
      </form>

      {/* ---- Success dialog ---- */}
      <Dialog.Root
        open={status === 'success'}
        onOpenChange={(open) => !open && setStatus('idle')}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--bg)] p-8 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent)]">
                <CheckCircle2 size={32} />
              </div>
              <Dialog.Title className="font-display text-2xl font-bold text-[var(--ink)]">
                Inquiry received
              </Dialog.Title>
              <Dialog.Description className="text-[var(--ink-muted)]">
                Thanks for reaching out. We will review your project and reply within 24 hours on
                the email or number you shared.
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button variant="primary" className="mt-2 w-full justify-center">
                  Close
                </Button>
              </Dialog.Close>
            </div>
            <Dialog.Close
              className="absolute right-4 top-4 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}