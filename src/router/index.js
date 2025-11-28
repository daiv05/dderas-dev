// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/inicio',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/me',
        name: 'Me',
        component: () => import('@/views/Me.vue'),
      },
      {
        path: '/proyectos',
        name: 'Projects',
        component: () => import('@/views/Projects.vue'),
      },
      {
        path: '/documentos-y-guias',
        name: 'Ues',
        component: () => import('@/views/Ues.vue'),
      },
      {
        path: '/tutoriales',
        name: 'Tutos',
        component: () => import('@/views/Tutos.vue'),
      },
      {
        path: '/herramientas',
        name: 'Herramientas',
        component: () => import('@/views/Herramientas.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from) => {
  // Si el path es '/' redirecciona a '/inicio'
  if (to.path === '/') {
    return { path: '/inicio' };
  }
  // Si no se encuentra la ruta redirecciona a '/inicio'
  if (!to.matched.length) {
    return { path: '/inicio' };
  }
});

export default router;
