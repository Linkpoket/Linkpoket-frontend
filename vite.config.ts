import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/chunks/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name].[hash].css';
          }
          if (assetInfo.name?.match(/\.(woff2?|ttf|eot)$/)) {
            return 'assets/fonts/[name].[hash][extname]';
          }
          if (assetInfo.name?.match(/\.(png|jpe?g|gif|svg|webp|ico)$/)) {
            return 'assets/images/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query',
          ],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
