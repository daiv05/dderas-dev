import { createI18n } from 'vue-i18n';

import en from '@/locales/en.js';
import es from '@/locales/es.js';

const getInitialLocale = () => {
  const stored = globalThis?.localStorage?.getItem('language');
  if (stored && ['en', 'es'].includes(stored)) {
    return stored;
  }
  return 'en';
};

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    es,
  },
});

export default i18n;
