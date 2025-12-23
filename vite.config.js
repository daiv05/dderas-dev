import { fileURLToPath, URL } from 'node:url';

import Shiki from '@shikijs/markdown-it';
import vue from '@vitejs/plugin-vue';
import mdAnchor from 'markdown-it-anchor';
import mdAttrs from 'markdown-it-attrs';
import mdContainer from 'markdown-it-container';
import mdToc from 'markdown-it-toc-done-right';
import Markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

const slugify = (text) => {
  return text
    .trim()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replaceAll(/[\s_]+/g, '-')
    .replaceAll(/[^\w-]/g, '')
    .replaceAll(/-+/g, '-')
    .replaceAll(/(^-)|(-$)/g, '');
};

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      template: { transformAssetUrls },
    }),
    Markdown({
      headEnabled: false,
      async markdownItSetup(md) {
        const escapeHtml = (str = '') =>
          String(str)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');

        const isInsideContainer = (tokens, idx, name) => {
          const openType = `container_${name}_open`;
          const closeType = `container_${name}_close`;
          let depth = 0;

          for (let i = idx; i >= 0; i -= 1) {
            const t = tokens[i];
            if (!t) continue;
            if (t.type === closeType) depth += 1;
            if (t.type === openType) {
              if (depth === 0) return true;
              depth -= 1;
            }
          }
          return false;
        };

        md.use(mdContainer, 'code-tabs', {
          render(tokens, idx) {
            if (tokens[idx].nesting === 1) return '<div class="md-code-tabs">\n';
            return '</div>\n';
          },
        });

        const defaultFence = md.renderer.rules.fence;
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = (token.info || '').trim();
          const lang = info.split(/\s+/)[0] || '';

          const tabMatch = info.match(/\btab\s*=\s*(?:"([^"]+)"|'([^']+)')/);
          const bracketMatch = info.match(/\[(.+?)\]/);
          const tabTitle = (tabMatch?.[1] || tabMatch?.[2] || bracketMatch?.[1] || '').trim();

          const rendered = defaultFence
            ? defaultFence(tokens, idx, options, env, self)
            : self.renderToken(tokens, idx, options);

          const ariaLabel = 'Copiar código al portapapeles';
          const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
          const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-copied" style="display: none;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

          const copyButton =
            `<button class="md-code-copy" type="button" aria-label="${ariaLabel}">` +
            `${copyIcon}${checkIcon}` +
            `</button>`;

          const block =
            `<div class="md-code-block" data-lang="${escapeHtml(lang)}">` +
            `${copyButton}` +
            `${rendered}` +
            `</div>`;

          if (isInsideContainer(tokens, idx, 'code-tabs')) {
            const title = tabTitle || (lang ? lang.toUpperCase() : 'Code');
            return `<div class="md-code-tab" data-title="${escapeHtml(title)}">${block}</div>`;
          }

          return block;
        };

        md.use(mdAnchor, {
          slugify,
          permalink: mdAnchor.permalink.linkInsideHeader({
            symbol: '#',
            placement: 'after',
            ariaHidden: false,
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
        md.use(
          await Shiki({
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
        );
      },
    }),
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
