import { watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useAppStore } from '@/store/app';

export function useLocaleNavigation() {
  const router = useRouter();
  const route = useRoute();
  const appStore = useAppStore();
  const { locale } = useI18n();

  const supportedLanguages = new Set(['en', 'es']);

  const getLocaleFromPath = (path) => {
    const seg = (path || '/').split('/')[1];
    return seg === 'es' ? 'es' : 'en';
  };

  const withLocalePath = (path) => {
    const p = path.startsWith('/') ? path : `/${path}`;
    const pathToAdd = p === '/' ? '' : p;
    return appStore.language === 'es' ? `/es${pathToAdd}` : p;
  };

  const applyLanguage = (lang) => {
    locale.value = lang;
    document.documentElement.setAttribute('lang', lang);
  };

  const initializeLanguage = () => {
    const lang = getLocaleFromPath(route.path);
    appStore.language = lang;
    applyLanguage(lang);
  };

  const setupWatchers = (onLanguageChange) => {
    watch(
      () => appStore.language,
      async (lang) => {
        applyLanguage(lang);

        const currentPath = route.path;
        const basePath = currentPath.replace(/^\/es(?=\/|$)/, '') || '/';
        const target = withLocalePath(basePath);

        if (target !== currentPath) {
          router.replace(target);
        }

        if (onLanguageChange) {
          await nextTick();
          onLanguageChange();
        }
      }
    );

    watch(
      () => route.path,
      (p) => {
        const lang = getLocaleFromPath(p);
        if (supportedLanguages.has(lang) && lang !== appStore.language) {
          appStore.language = lang;
        }
      }
    );
  };

  return {
    withLocalePath,
    initializeLanguage,
    setupWatchers,
    applyLanguage,
  };
}
