import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'

import App from './App.vue'
import TermApp from './TermApp.vue'
import store from '@/vue/store'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.config.productionTip = false

if (window.aioseo.posts) {
	window.aioseo.posts.forEach(post => {
		new Vue({
			store,
			data : {
				screen : window.aioseo.screen
			},
			render : h => h(App, {
				props : {
					post
				}
			})
		}).$mount(`#${post.columnName}-${post.id}`)
	})
}
if (window.aioseo.terms && 0 === window.aioseo.posts.length) {
	window.aioseo.terms.forEach(term => {
		new Vue({
			store,
			data : {
				screen : window.aioseo.screen
			},
			render : h => h(TermApp, {
				props : {
					term
				}
			})
		}).$mount(`#${term.columnName}-${term.id}`)
	})
}