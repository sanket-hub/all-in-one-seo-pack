import '@/vue/utils/vue2.js'
import { createApp } from 'vue'

import App from './App.vue'
import store from '@/vue/store'

import translate from '@/vue/plugins/translations'

const newNotifications = document.querySelector('#aioseo-menu-new-notifications')
if (newNotifications) {
	const app = createApp(App)

	app.use(store)

	app.config.globalProperties.$t     = translate
	app.config.globalProperties.$td    = import.meta.env.VITE_TEXTDOMAIN
	app.config.globalProperties.$tdPro = import.meta.env.VITE_TEXTDOMAIN_PRO

	app.mount('#aioseo-menu-new-notifications')
}