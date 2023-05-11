import '@/vue/utils/vue2.js'
import { createApp } from 'vue'

import loadPlugins from '@/vue/plugins'

import loadComponents from '@/vue/components/common'
import loadVersionedComponents from '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import store from '@/vue/store'
import startRouter from '@/vue/router'
import paths from '@/vue/pages/search-appearance/router/paths'

let app = createApp(App)
app     = loadPlugins(app)
app     = loadComponents(app)
app     = loadVersionedComponents(app)

const router = startRouter(paths, app, store)

// Give the router and store access to the app.
store._vm  = app
router.app = app

// Use the store and router.
app.use(store)
app.use(router)

// // Set state from the window object.
app.mount('#aioseo-app')

export default app