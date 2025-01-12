import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/RBAC-UI-Based-Project-/', // Add this - should match your repository name
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  css: {
    postcss: './postcss.config.js'
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  }
});