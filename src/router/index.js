// Composables
import { createRouter, createWebHistory } from 'vue-router';

import { killAllScrollTriggers } from '@/plugins/gsap';

const routes = [
  {
    path: '/:locale(es)?',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { seoKey: 'home' },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/Me.vue'),
        meta: { seoKey: 'me' },
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/Projects.vue'),
        meta: { seoKey: 'projects' },
      },
      {
        path: 'resources',
        name: 'Resources',
        component: () => import('@/views/Ues.vue'),
        meta: { seoKey: 'ues' },
      },
      {
        path: 'tools',
        name: 'Tools',
        component: () => import('@/views/Herramientas.vue'),
        meta: { seoKey: 'tools' },
      },
    ],
  },
  {
    path: '/:locale(es)?',
    component: () => import('@/layouts/blog/BlogLayout.vue'),
    children: [
      {
        path: 'blog',
        name: 'BlogIndex',
        component: () => import('@/views/Blog.vue'),
        meta: { seoKey: 'blog' },
      },
      {
        path: 'blog/:slug',
        name: 'BlogPost',
        component: () => import('@/views/Blog.vue'),
        meta: { seoKey: 'blog' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const scroller = document.querySelector('.shell-main') || document.querySelector('.blog-main');

    // IMPORTANT: hashes (anchors) should win over browser/router scroll restoration.
    // Otherwise the browser jumps to the anchor and then Vue Router restores the previous position.
    if (to.hash && scroller) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          const target = document.querySelector(to.hash);
          if (target) {
            const scrollerRect = scroller.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();
            const y = targetRect.top - scrollerRect.top + scroller.scrollTop;
            scroller.scrollTo({ top: Math.max(0, y), behavior: 'auto' });
          }
          resolve(false);
        });
      });
    }

    if (savedPosition) return savedPosition;

    if (scroller) {
      return new Promise((resolve) => {
        scroller.scrollTop = 0;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scroller.scrollTo({ top: 0, behavior: 'auto' });
            resolve(false);
          });
        });
      });
    }

    return { top: 0 };
  },
});

router.beforeEach((to, _from) => {
  if (!to.matched.length) {
    return { path: '/' };
  }
  killAllScrollTriggers();
});

export default router;
