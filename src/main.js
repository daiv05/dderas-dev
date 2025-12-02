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
