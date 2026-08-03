import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        tiles: resolve(import.meta.dirname, 'services/plakakia/index.html'),
        painting: resolve(import.meta.dirname, 'services/elaiokhromatismoi/index.html'),
        plumbing: resolve(import.meta.dirname, 'services/ydraulika/index.html'),
        demolition: resolve(import.meta.dirname, 'services/apoxiloseis/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        terms: resolve(import.meta.dirname, 'terms/index.html')
      }
    }
  }
});
