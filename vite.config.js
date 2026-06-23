import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        work: resolve(__dirname, 'work.html'),
        contact: resolve(__dirname, 'contact.html'),
        join: resolve(__dirname, 'join.html'),
      },
    },
  },
  plugins: [
    {
      name: 'clean-urls-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            const urlPath = req.url.split('?')[0].split('#')[0];
            if (urlPath && !urlPath.includes('.') && urlPath !== '/') {
              req.url = req.url.replace(urlPath, urlPath + '.html');
            }
          }
          next();
        });
      }
    }
  ]
});
