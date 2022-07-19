import Vue from 'vue'

import '@/vue/plugins'
import TruSeo from '@/vue/plugins/tru-seo'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import { elemLoaded } from '@/vue/utils/elemLoaded'

import App from './App.vue'
import TermApp from './TermApp.vue'
import store from '@/vue/store'

Vue.prototype.$truSeo = new TruSeo()

const loadPostsTable = (post, index) => {
	new Vue({
		store,
		data : {
			screen : window.aioseo.screen
		},
		render : h => h(App, {
			props : {
				post,
				index
			}
		})
	}).$mount(`#${post.columnName}-${post.id}`)
}

if (window.aioseo.posts) {
	window.aioseo.posts.forEach((post, index) => {
		elemLoaded(`#${post.columnName}-${post.id}`, `aioseoPostsTable-${post.id}`)
		document.addEventListener('animationstart', function (event) {
			if (`aioseoPostsTable-${post.id}` === event.animationName) {
				loadPostsTable(post, index)
			}
		}, { passive: true })
	})
}

const loadTermsTable = (term, index) => {
	new Vue({
		store,
		data : {
			screen : window.aioseo.screen
		},
		render : h => h(TermApp, {
			props : {
				term,
				index
			}
		})
	}).$mount(`#${term.columnName}-${term.id}`)
}

if (window.aioseo.terms && 0 === window.aioseo.posts.length) {
	window.aioseo.terms.forEach((term, index) => {
		elemLoaded(`#${term.columnName}-${term.id}`, `aioseoTermsTable-${term.id}`)
		document.addEventListener('animationstart', function (event) {
			if (`aioseoTermsTable-${term.id}` === event.animationName) {
				loadTermsTable(term, index)
			}
		}, { passive: true })
	})
}