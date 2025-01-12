import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/RBAC-UI-Based-Project-/', // Must match your repository name
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});