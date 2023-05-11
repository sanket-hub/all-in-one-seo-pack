import '@/vue/utils/vue2.js'
import { createApp } from 'vue'

import loadPlugins from '@/vue/plugins'

import loadComponents from '@/vue/components/common'
import loadVersionedComponents from '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import store from '@/vue/store'
import startRouter from '@/vue/router'
import paths from '@/vue/pages/tools/router/paths'

let app = createApp(App)
app     = loadPlugins(app)
app     = loadComponents(app)
app     = loadVersionedComponents(app)

// If this is not an apache site, let's hide the .htaccess editor.
const router = startRouter(
	paths
		.filter(p => 'htaccess-editor' !== p.name || (window.aioseo.data.server.apache && !window.aioseo.data.isNetworkAdmin))
		.filter(p => 'bad-bot-blocker' !== p.name || (window.aioseo.internalOptions.internal.deprecatedOptions.includes('badBotBlocker') && !window.aioseo.data.isNetworkAdmin))
		.filter(p => 'debug' !== p.name || window.aioseo.data.isDev)
		.filter(p => 'system-status' !== p.name || !window.aioseo.data.isNetworkAdmin),
	app,
	store
)

// Give the router and store access to the app.
store._vm  = app
router.app = app

// Use the store and router.
app.use(store)
app.use(router)

// // Set state from the window object.
app.mount('#aioseo-app')

export default app