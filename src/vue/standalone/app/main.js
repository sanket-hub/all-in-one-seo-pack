import Vue from 'vue'

import App from './App.vue'

if (document.getElementById('aioseo-admin')) {
	new Vue({
		render : h => h(App)
	}).$mount('#aioseo-admin')
}