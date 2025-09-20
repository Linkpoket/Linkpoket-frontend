import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync, readFileSync, writeFileSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    {
      name: 'copy-extension-files',
      async writeBundle() {
        // manifest.json 복사
        copyFileSync('src/extension/manifest.json', 'dist/manifest.json');

        // content script 빌드
        const contentScript = readFileSync('src/extension/content.ts', 'utf8');
        writeFileSync('dist/content.js', `// Content script\n${contentScript}`);

        // background script 빌드
        const backgroundScript = readFileSync(
          'src/extension/background.ts',
          'utf8'
        );
        writeFileSync(
          'dist/background.js',
          `// Background script\n${backgroundScript}`
        );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        web: resolve(__dirname, 'index.html'),
        extension: resolve(__dirname, 'src/extension/main-extension.tsx'),
      },
      output: {
        //파일 이름 지정
        entryFileNames: 'assets/[name].[hash].js',
        //청크 파일 이름 지정
        chunkFileNames: 'assets/chunks/[name].[hash].js',
        // 에셋 파일 분류
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
        //성능 개선 유도 manualChunks
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            '@tanstack/react-query',
          ],
          'ui-components': ['@/components/common-ui', '@/components/modal'],
        },
      },
    },
    outDir: 'dist',
    assetsDir: 'assets',
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
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
    },
  },
  assetsInclude: ['**/*.webp'],

  optimizeDeps: {
    exclude: ['@emotion/react', '@emotion/styled', '@mui/material'],
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
