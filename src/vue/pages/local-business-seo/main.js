import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'

import App from './App.vue'
import './blocks/BusinessInfo.js'
import './blocks/Locations.js'
import './blocks/OpeningHours.js'
import store from '@/vue/store'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

if (window.aioseo.currentPost && window.aioseo.localBusiness && document.getElementById('aioseo-location-settings-metabox')) {
	Vue.config.productionTip = false

	new Vue({
		store,
		data : {
			screenContext : 'metabox'
		},
		render : h => h(App)
	}).$mount('#aioseo-location-settings-metabox')
}