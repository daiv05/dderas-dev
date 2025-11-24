/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Estilos globales
import '@/assets/styles/global.css'

// Components
import App from './App.vue'
import AnimateOnVisible from './components/AnimateOnVisible.vue'
import { registerSW } from 'virtual:pwa-register'

registerSW({
    immediate: true
})

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.component('AnimateOnVisible', AnimateOnVisible)

registerPlugins(app)

app.mount('#app')
