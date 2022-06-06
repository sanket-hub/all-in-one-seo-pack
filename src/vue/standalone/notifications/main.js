import Vue from 'vue'

import App from './App.vue'
import store from '@/vue/store'

import translate from '@/vue/plugins/translations'

const newNotifications = document.querySelector('#aioseo-menu-new-notifications')
if (newNotifications) {
	Vue.prototype.$t     = translate
	Vue.prototype.$td    = import.meta.env.VITE_TEXTDOMAIN
	Vue.prototype.$tdPro = import.meta.env.VITE_TEXTDOMAIN_PRO

	new Vue({
		store,
		render : h => h(App)
	}).$mount('#aioseo-menu-new-notifications')
}