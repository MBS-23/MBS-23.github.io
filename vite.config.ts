import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static SPA — deploys as-is to Vercel / Netlify / GitHub Pages.
// For GitHub Pages under a sub-path, set base: '/<repo-name>/'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    // Résumé PDFs live in /public and are copied verbatim — never inlined.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Three.js and Framer Motion are large and change rarely — giving them
        // their own chunks keeps the app bundle small and cacheable.
        manualChunks: {
          three: ['three'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
