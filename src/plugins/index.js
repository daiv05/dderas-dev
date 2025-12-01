/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import router from '../router';
import pinia from '../store';

import i18n from './i18n';
import vuetify from './vuetify';

export function registerPlugins(app) {
  app.use(i18n).use(vuetify).use(pinia).use(router);
}
