import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'

import App from './App.vue'
import store from '@/vue/store'
import startRouter from '@/vue/router'
import paths from '@/vue/pages/search-appearance/router/paths'

// Sync router with store.
import { sync } from 'vuex-router-sync'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

const router = startRouter(paths)

// Sync store with router
sync(store, router)

Vue.config.productionTip = false

// Set state from the window object.
new Vue({
	router,
	store,
	render : h => h(App)
}).$mount('#aioseo-app')