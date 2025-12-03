/**
 * Plugin de configuración global de GSAP
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupGSAP() {
  const scroller = document.querySelector('.shell-main');

  if (scroller) {
    ScrollTrigger.defaults({
      scroller: scroller,
    });

    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });
  }
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Verifica si un elemento ya está en el viewport
 * Útil para decidir si aplicar animación o mostrar directamente
 */
export function isElementInViewport(element, scroller = null) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const scrollerEl = scroller || getMainScroller() || globalThis;

  if (scrollerEl === globalThis) {
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (globalThis.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (globalThis.innerWidth || document.documentElement.clientWidth)
    );
  }

  const scrollerRect = scrollerEl.getBoundingClientRect();
  return rect.top >= scrollerRect.top && rect.bottom <= scrollerRect.bottom;
}

export function clearGSAPProps(elements) {
  const targets = Array.isArray(elements) ? elements : [elements];
  targets.forEach((el) => {
    if (el) {
      gsap.set(el, { clearProps: 'all' });
    }
  });
}

/**
 * Obtiene el contenedor de scroll principal
 */
export function getMainScroller() {
  return document.querySelector('.shell-main');
}

/**
 * Anima elementos cuando entran al viewport.
 * - Establece estado inicial solo si el elemento no está visible.
 * - Usa ScrollTrigger.onEnter para lanzar la animación.
 */
export function animateInOnEnter(
  targets,
  { from = {}, to = {}, trigger, scroller, start = 'top 80%', once = true }
) {
  const elems = Array.isArray(targets) ? targets : [targets];
  const scr = scroller || getMainScroller();

  elems.forEach((el) => {
    if (!el) return;
    const visible = isElementInViewport(el, scr);
    if (visible) {
      gsap.set(el, { clearProps: 'all' });
    } else {
      gsap.set(el, { ...from });
    }

    ScrollTrigger.create({
      trigger: trigger || el,
      scroller: scr,
      start,
      once,
      onEnter: () => {
        gsap.to(el, { ...to });
      },
    });
  });
}

// Refrescar automáticamente tras carga completa de la página
if (typeof globalThis !== 'undefined') {
  globalThis.addEventListener('load', () => {
    setTimeout(() => ScrollTrigger.refresh(), 50);
  });
}

export const gsapDefaults = {
  ease: 'power3.out',
  duration: 0.8,
  clearProps: 'all',
};

export const scrollTriggerDefaults = {
  start: 'top 80%',
  once: true,
};

export { gsap } from 'gsap';
export { ScrollTrigger } from 'gsap/ScrollTrigger';
