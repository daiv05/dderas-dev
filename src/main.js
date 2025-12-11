if ('serviceWorker' in navigator) {
  console.warn('Checking for old service workers to unregister...');
  try {
    const regs = await navigator.serviceWorker.getRegistrations();
    for (const reg of regs) {
      if (!reg.active?.scriptURL.includes('service-wk.js')) {
        console.warn('Unregistering old service worker:', reg);
        reg.unregister();
      }
    }
  } catch (err) {
    console.warn('Failed to check/unregister old service workers:', err);
  }
}

import { registerSW } from 'virtual:pwa-register';
import { createApp } from 'vue';

// Plugins
import { registerPlugins } from '@/plugins';

// Estilos globales
import '@/assets/styles/global.css';

// Components
import App from './App.vue';

registerSW({
  immediate: true,
});

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
