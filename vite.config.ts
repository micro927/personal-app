import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@modules': '/src/modules',
      '@utils': '/src/utils',
      '#types': '/src/types',
    },
  },
});
