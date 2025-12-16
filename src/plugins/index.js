// Plugins
import router from '../router';
import pinia from '../store';

import i18n from './i18n';
import { initMarkdownEnhancements } from './markdownEnhancements';
import vuetify from './vuetify';

export function registerPlugins(app) {
  app.use(i18n).use(vuetify).use(pinia).use(router);
  initMarkdownEnhancements(router);
}
