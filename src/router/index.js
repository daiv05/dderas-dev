// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/home',
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
  { path: '/inicio', redirect: '/home' },
  { path: '/me', redirect: '/about' },
  { path: '/proyectos', redirect: '/projects' },
  { path: '/documentos-y-guias', redirect: '/resources' },
  { path: '/tutoriales', redirect: '/tutorials' },
  { path: '/herramientas', redirect: '/tools' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from) => {
  // Si el path es '/' redirecciona a '/home'
  if (to.path === '/') {
    return { path: '/home' };
  }
  // Si no se encuentra la ruta redirecciona a '/home'
  if (!to.matched.length) {
    return { path: '/home' };
  }
});

export default router;
