import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import store from '@/vue/store'

import translate from '@/vue/plugins/translations'

Vue.prototype.$t     = translate
Vue.prototype.$td    = import.meta.env.VITE_TEXTDOMAIN
Vue.prototype.$tdPro = import.meta.env.VITE_TEXTDOMAIN_PRO

new Vue({
	store,
	render : h => h(App)
}).$mount('#aioseo-flyout-menu')