import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import { elemLoaded } from '@/vue/utils/elemLoaded'

import App from './App.vue'
import store from '@/vue/store'

const loadLaDidYouKnow = () => {
	new Vue({
		store,
		render : h => h(App)
	}).$mount('#aioseo-link-assistant-education-mount')
}

if (window.aioseo && window.aioseo.currentPost && 'post' === window.aioseo.currentPost.context) {
	const linkFormat = document.getElementById('aioseo-link-assistant-education')

	if (!linkFormat) {
		elemLoaded('#aioseo-link-assistant-education', 'aioseoLaDidYouKnow')
		document.addEventListener('animationstart', function (event) {
			if ('aioseoLaDidYouKnow' === event.animationName) {
				loadLaDidYouKnow()
			}
		}, { passive: true })
	} else {
		loadLaDidYouKnow()
	}
}