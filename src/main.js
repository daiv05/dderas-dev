if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => {
      if (!reg.active?.scriptURL.includes('service-wk.js')) {
        reg.unregister();
      }
    });
  });
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
