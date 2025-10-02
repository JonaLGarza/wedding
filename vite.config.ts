import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(() => ({
  base: '/wedding/',
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths({
      projects: ['tsconfig.app.json'],
    }),
    visualizer({
      open: true, // opens the browser after build
      filename: 'bundle-stats.html',
      template: 'treemap', // 'treemap', 'sunburst', or 'network'
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'lucide-react'],
          utils: ['react-helmet-async', 'react-router-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild' as const,
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    force: true
  }
}));
  