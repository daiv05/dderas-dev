// Plugins
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true,
    }),
    VitePWA({
      includeAssets: ['images/*.png', '/favicon.ico'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'deras-dev',
        short_name: 'deras-dev',
        start_url: '/',
        display: 'standalone',
        description:
          'Platform built to share knowledge and experiences about web development and technology.',
        lang: 'en',
        dir: 'auto',
        theme_color: '#000000',
        background_color: '#000000',
        orientation: 'any',
        icons: [
          {
            src: '/icons/pwa/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/pwa/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/pwa/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'https://deras.dev/screenshots/inicio.png',
            sizes: '1881x844',
            type: 'image/png',
            description: 'Home page',
          },
          {
            src: 'https://deras.dev/screenshots/mis-proyectos.png',
            sizes: '1882x844',
            type: 'image/png',
            description: 'Projects overview',
          },
          {
            src: 'https://deras.dev/screenshots/repositorio-ues.png',
            sizes: '1881x844',
            type: 'image/png',
            description: 'UES shared repository',
          },
          {
            src: 'https://deras.dev/screenshots/tutoriales.png',
            sizes: '1884x843',
            type: 'image/png',
            description: 'Tutorials and guides',
          },
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: 'Projects',
            url: '/projects',
            description: 'Featured software projects by deras-dev',
          },
          {
            name: 'Resources',
            url: '/resources',
            description: 'Shared university resources and docs',
          },
          {
            name: 'Tutorials',
            url: '/tutorials',
            description: 'Development tutorials and notes',
          },
        ],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
  publicDir: 'public',
});
