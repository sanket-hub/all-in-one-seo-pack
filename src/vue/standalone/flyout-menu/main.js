import '@/vue/utils/vue2.js'
import { createApp } from 'vue'

import loadPlugins from '@/vue/plugins'

import loadComponents from '@/vue/components/common'
import loadVersionedComponents from '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import store from '@/vue/store'

let app = createApp(App)
app     = loadPlugins(app)
app     = loadComponents(app)
app     = loadVersionedComponents(app)

// Give the store access to the app.
store._vm = app

// Use the store.
app.use(store)

app.mount('#aioseo-flyout-menu')