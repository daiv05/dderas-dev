/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import router from '../router';
import pinia from '../store';

import vuetify from './vuetify';

export function registerPlugins(app) {
  app.use(vuetify).use(pinia).use(router);
}
