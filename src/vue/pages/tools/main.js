import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import store from '@/vue/store'
import startRouter from '@/vue/router'
import paths from '@/vue/pages/tools/router/paths'

// Sync router with store.
import { sync } from 'vuex-router-sync'

// If this is not an apache site, let's hide the .htaccess editor.

const router = startRouter(
	paths
		.filter(p => 'htaccess-editor' !== p.name || (window.aioseo.data.server.apache && !window.aioseo.data.isNetworkAdmin))
		.filter(p => 'bad-bot-blocker' !== p.name || (window.aioseo.internalOptions.internal.deprecatedOptions.includes('badBotBlocker') && !window.aioseo.data.isNetworkAdmin))
		.filter(p => 'debug' !== p.name || window.aioseo.data.isDev)
		.filter(p => 'system-status' !== p.name || !window.aioseo.data.isNetworkAdmin)
)

// Sync store with router
sync(store, router)

// Set state from the window object.
new Vue({
	router,
	store,
	render : h => h(App)
}).$mount('#aioseo-app')