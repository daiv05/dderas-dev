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
      includeAssets: ['fonts/*.ttf', 'images/*.png', '/favicon.ico'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'dderas-dev',
        short_name: 'dderas-dev',
        start_url: '/',
        display: 'standalone',
        description:
          'Plataforma creada para compartir conocimiento y experiencias sobre desarrollo web y tecnología en general.',
        lang: 'es',
        dir: 'auto',
        theme_color: '#000000',
        background_color: '#000000',
        orientation: 'any',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'https://dderas.vercel.app/screenshots/inicio.png',
            sizes: '1881x844',
            type: 'image/png',
            description: 'Página de inicio',
          },
          {
            src: 'https://dderas.vercel.app/screenshots/mis-proyectos.png',
            sizes: '1882x844',
            type: 'image/png',
            description: 'Mis Proyectos',
          },
          {
            src: 'https://dderas.vercel.app/screenshots/repositorio-ues.png',
            sizes: '1881x844',
            type: 'image/png',
            description: 'Carpeta compartida de la UES',
          },
          {
            src: 'https://dderas.vercel.app/screenshots/tutoriales.png',
            sizes: '1884x843',
            type: 'image/png',
            description: 'Tutoriales y guias',
          },
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: 'Proyectos',
            url: '/proyectos',
            description: 'Proyectos realizados por dderas-dev',
          },
          {
            name: 'Universidad',
            url: '/documentos-y-guias',
            description: 'Documentos y guías de la universidad',
          },
          {
            name: 'Tutoriales',
            url: '/tutoriales',
            description: 'Tutoriales de desarrollo web y tecnología en general',
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
