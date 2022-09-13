import Vue from 'vue'

import PortalVue from 'portal-vue'

import App from './App.vue'
import store from '@/vue/store'

Vue.use(PortalVue)

const modalPortal = document.querySelector('#aioseo-modal-portal')
if (modalPortal) {
	new Vue({
		store,
		render : h => h(App)
	}).$mount('#aioseo-modal-portal')
}