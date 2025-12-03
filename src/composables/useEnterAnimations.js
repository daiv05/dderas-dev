import { ref } from 'vue';

import {
  gsap,
  ScrollTrigger,
  getMainScroller,
  gsapDefaults,
  animateInOnEnter,
} from '@/plugins/gsap';

export function useEnterAnimations() {
  const label = ref(null);
  const titleEl = ref(null);
  const descriptionEl = ref(null);

  let panelRefs = [];
  let ctx;

  const setPanelRef = (el) => {
    const target = el?.$el ?? el;
    if (target && !panelRefs.includes(target)) {
      panelRefs.push(target);
    }
  };

  const resetPanelRefs = () => {
    panelRefs = [];
  };

  const setupEnterAnimations = ({
    headerStart = 'top 80%',
    panelsStart = 'top 80%',
    headerTrigger,
    panelsTrigger,
  } = {}) => {
    const scroller = getMainScroller();
    const headerTargets = [label.value, titleEl.value, descriptionEl.value].filter(Boolean);
    const panels = panelRefs.filter(Boolean);

    ctx = gsap.context(() => {
      if (headerTargets.length) {
        animateInOnEnter(headerTargets, {
          from: { opacity: 0, y: 24 },
          to: { ...gsapDefaults, opacity: 1, y: 0 },
          trigger: headerTrigger ?? titleEl.value,
          scroller,
          start: headerStart,
          once: true,
        });
      }

      if (panels.length) {
        animateInOnEnter(panels, {
          from: { opacity: 0, y: 30 },
          to: { ...gsapDefaults, opacity: 1, y: 0 },
          trigger: panelsTrigger,
          scroller,
          start: panelsStart,
          once: true,
        });
      }
    });

    setTimeout(() => ScrollTrigger.refresh(), 100);
  };

  const cleanupEnterAnimations = () => {
    ctx?.revert();
    resetPanelRefs();
  };

  return {
    label,
    titleEl,
    descriptionEl,
    setPanelRef,
    resetPanelRefs,
    setupEnterAnimations,
    cleanupEnterAnimations,
  };
}
