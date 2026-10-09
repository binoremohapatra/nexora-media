import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // Base is '/' because the site uses a custom domain (nexoramediain.in)
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
