import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const base =
  'inline-flex items-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-3';

const variants = {
  primary:
    'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] active:scale-[0.97]',
  secondary:
    'border border-[var(--border)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] bg-transparent active:scale-[0.97]',
  ghost:
    'text-[var(--ink-muted)] hover:text-[var(--ink)] underline-offset-4 hover:underline',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  target,
  rel,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (as === 'a' && href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
