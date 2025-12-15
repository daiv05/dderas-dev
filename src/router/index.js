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
    const mainElement = document.querySelector('.shell-main');
    if (savedPosition) return savedPosition;
    if (to.hash && mainElement) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          const target = document.querySelector(to.hash);
          if (target) {
            const y = target.offsetTop || 0;
            mainElement.scrollTo({ top: y, behavior: 'auto' });
          }
          resolve(false);
        });
      });
    }

    if (mainElement) {
      return new Promise((resolve) => {
        mainElement.scrollTop = 0;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            mainElement.scrollTo({ top: 0, behavior: 'auto' });
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

router.afterEach(() => {
  const mainElement = document.querySelector('.shell-main');
  if (mainElement) {
    mainElement.scrollTop = 0;
  }
});

export default router;
