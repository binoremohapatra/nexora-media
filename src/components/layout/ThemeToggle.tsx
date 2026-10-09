import React from 'react';
import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../../types';
import { cn } from '../../lib/utils';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

/**
 * Accessible light/dark theme toggle button.
 * Uses aria-pressed and a visible label for screen readers.
 */
export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      id="theme-toggle"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative flex items-center justify-center w-9 h-9 rounded-full',
        'border border-[var(--border)] text-[var(--ink-muted)]',
        'hover:border-[var(--accent)] hover:text-[var(--accent)]',
        'transition-all duration-200',
        className
      )}
    >
      <Sun
        size={16}
        className={cn(
          'absolute transition-all duration-200',
          isDark ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
        )}
        aria-hidden="true"
      />
      <Moon
        size={16}
        className={cn(
          'absolute transition-all duration-200',
          isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        )}
        aria-hidden="true"
      />
    </button>
  );
}
