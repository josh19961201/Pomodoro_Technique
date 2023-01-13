/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins 沒有檔名預設會找plugins資料夾內的index
import { registerPlugins } from '@/plugins'

// PWA
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh () {},
  onOfflineReady () {}
})

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
