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
        path: 'tutorials',
        name: 'Tutorials',
        redirect: (to) => {
          const locale = to.params.locale;
          return locale ? `/es/blog` : `/blog`;
        },
        meta: { seoKey: 'tutorials' },
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
  // Asegurar el scroll al tope del contenedor de contenido.
  // Evitamos el scroll del window retornando `false` y usamos una espera corta
  // para permitir que el DOM y las transiciones se asienten.
  scrollBehavior(to, from, savedPosition) {
    const mainElement = document.querySelector('.shell-main');

    // Restaurar posición en navegación del historial
    if (savedPosition) return savedPosition;

    // Desplazamiento a anclas dentro del contenedor principal
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

    // Scroll al tope del contenedor principal
    if (mainElement) {
      return new Promise((resolve) => {
        // Reset inmediato para cancelar cualquier animación residual
        mainElement.scrollTop = 0;
        // Esperar a que el layout se estabilice
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            mainElement.scrollTo({ top: 0, behavior: 'auto' });
            resolve(false); // prevenir scroll del window
          });
        });
      });
    }

    // Fallback: scroll del window
    return { top: 0 };
  },
});

router.beforeEach((to, _from) => {
  if (!to.matched.length) {
    return { path: '/' };
  }

  // Limpiar todos los ScrollTriggers antes de cambiar de ruta
  killAllScrollTriggers();
});

// Refuerzo: asegurar que tras la navegación el contenedor se resetea al tope.
router.afterEach(() => {
  const mainElement = document.querySelector('.shell-main');
  if (mainElement) {
    mainElement.scrollTop = 0;
  }
});

export default router;
