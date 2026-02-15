import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        public: resolve(__dirname, 'public.html'),
      },
    },
  },
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
