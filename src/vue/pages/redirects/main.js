import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import store from '@/vue/store'
import startRouter from '@/vue/router'
import paths from '@/vue/pages/redirects/router/paths'

// Sync router with store.
import { sync } from 'vuex-router-sync'

const filteredPaths = paths
	.filter(p => !p.name || ('undefined' !== typeof p.meta && window.aioseo.user.capabilities[p.meta.access]))

filteredPaths[0].redirect = filteredPaths[1].path

const router = startRouter(filteredPaths)

// Sync store with router
sync(store, router)

// Set state from the window object.
new Vue({
	router,
	store,
	render : h => h(App)
}).$mount('#aioseo-app')