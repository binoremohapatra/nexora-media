import { useState, useEffect, useCallback } from 'react';
import type { Theme } from '../types';

const STORAGE_KEY = 'nexora-theme';
const THEME_CHANGE_EVENT = 'nexora-theme-change';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored ?? getSystemTheme();
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Synchronize across multiple components and tabs
  useEffect(() => {
    const handleCustomChange = (e: any) => {
      if (e?.detail && (e.detail === 'dark' || e.detail === 'light')) {
        setThemeState(e.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
        setThemeState(e.newValue as Theme);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleCustomChange);
    window.addEventListener('storage', handleStorageChange);

    // Fallback mutation observer
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') as Theme | null;
      if (current && (current === 'dark' || current === 'light')) {
        setThemeState(prev => (prev !== current ? current : prev));
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleCustomChange);
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  // Listen for system preference changes (only if user hasn't overridden)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const next: Theme = e.matches ? 'dark' : 'light';
        setThemeState(next);
      }
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}

