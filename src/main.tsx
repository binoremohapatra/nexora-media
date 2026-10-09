import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// This runs before React renders to prevent theme flash
const initTheme = () => {
  try {
    const stored = localStorage.getItem('nexora-theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (sysDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch (e) {
    // Ignore errors for SSR/incognito
  }
};
initTheme();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
