import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'multi-spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();

          if (req.url.startsWith('/public')) {
            req.url = '/public.html';
          }

          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@modules': '/src/modules',
      '@services': '/src/services',
      '@utils': '/src/utils',
      '#types': '/src/types',
    },
  },
});
