import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'
import store from '@/vue/store'
import App from './App.vue'

const elemDiv = document.createElement('div')
elemDiv.id = 'aioseo-redirects-add-redirect-standalone'
document.body.appendChild(elemDiv)

Vue.prototype.$aioseo = window.aioseo

new Vue({
	store,
	render : h => h(App)
}).$mount('#aioseo-redirects-add-redirect-standalone')