// Plugins
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import mdAnchor from 'markdown-it-anchor';
import mdAttrs from 'markdown-it-attrs';
import mdToc from 'markdown-it-toc-done-right';
import Markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities

/**
 * Función para generar slugs seguros a partir de texto con caracteres especiales
 * - Maneja acentos (á, é, í, ó, ú, etc.)
 * - Convierte espacios a guiones
 * - Elimina caracteres especiales
 * - Convierte a minúsculas
 */
const slugify = (text) => {
  return (
    text
      .trim()
      // Normalizar caracteres acentuados
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Convertir a minúsculas
      .toLowerCase()
      // Reemplazar espacios y guiones bajos por guiones
      .replace(/[\s_]+/g, '-')
      // Eliminar caracteres especiales (mantener solo letras, números y guiones)
      .replace(/[^\w-]/g, '')
      // Eliminar guiones duplicados
      .replace(/-+/g, '-')
      // Remover guiones al inicio y final
      .replace(/^-|-$/g, '')
  );
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // Permitir que Vite trate archivos Markdown como componentes Vue
      include: [/\.vue$/, /\.md$/],
      template: { transformAssetUrls },
    }),
    // Transformar `.md` a componentes Vue en dev/build
    Markdown({
      headEnabled: false,
      markdownItSetup(md) {
        md.use(mdAnchor, {
          slugify,
          permalink: mdAnchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'after',
            ariaHidden: true,
            class: 'md-anchor',
          }),
        });
        md.use(mdAttrs);
        md.use(mdToc, {
          placeholder: '\\[toc\\]',
          listType: 'ul',
          containerClass: 'md-toc',
          slugify,
        });
      },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    vuetify({
      autoImport: true,
    }),
    VitePWA({
      injectRegister: 'auto',
      includeAssets: ['images/*.png', '/favicon.ico'],
      registerType: 'autoUpdate',
      filename: 'service-wk.js',
      manifest: {
        name: 'deras.dev',
        short_name: 'deras.dev',
        start_url: '/',
        display: 'standalone',
        description:
          'Platform built to share knowledge and experiences about web development and technology.',
        lang: 'en',
        dir: 'auto',
        theme_color: '#000000',
        background_color: '#000000',
        orientation: 'landscape',
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
            form_factor: 'wide',
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
            short_name: 'Projects',
            url: '/projects',
            description: 'Featured software projects by deras-dev',
            icons: [
              {
                src: '/icons/pwa/pwa-96x96.png',
                sizes: '96x96',
              },
            ],
          },
          {
            name: 'Resources',
            short_name: 'Resources',
            url: '/resources',
            description: 'Shared university resources and docs',
            icons: [
              {
                src: '/icons/pwa/pwa-96x96.png',
                sizes: '96x96',
              },
            ],
          },
          {
            name: 'Blog',
            short_name: 'Blog',
            url: '/blog',
            description: 'Technical articles and posts',
            icons: [
              {
                src: '/icons/pwa/pwa-96x96.png',
                sizes: '96x96',
              },
            ],
          },
        ],
      },
      workbox: {
        navigateFallback: null,
        globPatterns: ['**/*.{js,css,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/deras\.dev\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'deras-dev-pages',
            },
          },
        ],
      },
      devOptions: {
        sourcemap: true,
        globPatterns: ['**/*.{js,css,ico,png,svg}'],
        // enabled: true,
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
