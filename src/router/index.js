// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { seoKey: 'home' },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/Me.vue'),
        meta: { seoKey: 'me' },
      },
      {
        path: '/projects',
        name: 'Projects',
        component: () => import('@/views/Projects.vue'),
        meta: { seoKey: 'projects' },
      },
      {
        path: '/resources',
        name: 'Resources',
        component: () => import('@/views/Ues.vue'),
        meta: { seoKey: 'ues' },
      },
      {
        path: '/tutorials',
        name: 'Tutorials',
        component: () => import('@/views/Tutos.vue'),
        meta: { seoKey: 'tutorials' },
      },
      {
        path: '/tools',
        name: 'Tools',
        component: () => import('@/views/Herramientas.vue'),
        meta: { seoKey: 'tools' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Scroll del contenedor principal con overflow
    const mainElement = document.querySelector('.shell-main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, _from) => {
  if (!to.matched.length) {
    return { path: '/' };
  }
});

export default router;
