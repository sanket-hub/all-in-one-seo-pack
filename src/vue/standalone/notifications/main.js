import Vue from 'vue'

import App from './App.vue'
import store from '@/vue/store'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import translate from '@/vue/plugins/translations'

Vue.prototype.$t     = translate
Vue.prototype.$td    = process.env.VUE_APP_TEXTDOMAIN
Vue.prototype.$tdPro = process.env.VUE_APP_TEXTDOMAIN_PRO

Vue.config.productionTip = false

new Vue({
	store,
	render : h => h(App)
}).$mount('#aioseo-menu-new-notifications')