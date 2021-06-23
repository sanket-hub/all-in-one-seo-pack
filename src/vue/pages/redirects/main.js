import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'

import App from './App.vue'
import store from '@/vue/store'
import startRouter from '@/vue/router'
import paths from '@/vue/pages/redirects/router/paths'

// Sync router with store.
import { sync } from 'vuex-router-sync'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

// We need to do a manual check for licensed users here, though this could change after runtime.
const isUnlicensed = 'pro' !== process.env.VUE_APP_VERSION.toLowerCase() || !window.aioseo.license.isActive

const router = startRouter(
	paths
		.filter(p => !p.name || 'redirects' === p.name || !isUnlicensed)
		.filter(p => 'logs-404' !== p.name || (window.aioseo.redirects && window.aioseo.redirects.options.logs.log404.enabled))
		.filter(p => 'logs' !== p.name || (window.aioseo.redirects && window.aioseo.redirects.options.logs.redirects.enabled && 'server' !== window.aioseo.redirects.options.main.method))
)

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

// Set state from the window object.
new Vue({
	router,
	store,
	render : h => h(App)
}).$mount('#aioseo-app')