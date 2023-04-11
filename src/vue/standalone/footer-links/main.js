import Vue from 'vue'

import '@/vue/plugins'
import App from './App.vue'

import translate from '@/vue/plugins/translations'

Vue.prototype.$t     = translate
Vue.prototype.$td    = import.meta.env.VITE_TEXTDOMAIN
Vue.prototype.$tdPro = import.meta.env.VITE_TEXTDOMAIN_PRO

new Vue({
	render : h => h(App)
}).$mount('#aioseo-footer-links')