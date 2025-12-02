/**
 * Plugin de configuración global de GSAP
 * Configura ScrollTrigger para trabajar con el scroll personalizado de la app
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Configura GSAP con el scroller personalizado
 * Debe ser llamado después de que el DOM esté montado
 */
export function setupGSAP() {
  const scroller = document.querySelector('.shell-main');

  if (scroller) {
    // Configurar ScrollTrigger para usar el contenedor de scroll personalizado
    ScrollTrigger.defaults({
      scroller: scroller,
    });

    // Configuración adicional
    ScrollTrigger.config({
      // Sincronizar con el scroller personalizado
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });
  }
}

/**
 * Limpia todos los ScrollTriggers activos
 * Útil antes de cambiar de ruta
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refresca todos los ScrollTriggers
 * Útil después de cambios en el DOM
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Obtiene el contenedor de scroll principal
 */
export function getMainScroller() {
  return document.querySelector('.shell-main');
}

/**
 * Configuración común de animación GSAP
 * Evita duplicar opciones en cada componente
 */
export const gsapDefaults = {
  ease: 'power3.out',
  duration: 0.8,
  clearProps: 'all', // Limpia propiedades inline después de la animación
};

/**
 * Configuración común de ScrollTrigger
 */
export const scrollTriggerDefaults = {
  start: 'top 80%',
  once: true,
};

export { gsap, ScrollTrigger };
