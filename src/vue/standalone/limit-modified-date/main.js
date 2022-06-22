import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import { elemLoaded } from '@/vue/utils/elemLoaded'
import { shouldShowMetaBox } from '@/vue/plugins/tru-seo/components/helpers'

import App from './App.vue'
import store from '@/vue/store'

import './blockEditor'

const loadLimitModifiedDate = () => {
	new Vue({
		store,
		render : h => h(App)
	}).$mount('#aioseo-limit-modified-date')
}

if (shouldShowMetaBox() && window.aioseo && window.aioseo.currentPost && 'post' === window.aioseo.currentPost.context) {
	const metaBox = document.getElementById('aioseo-limit-modified-date')

	if (!metaBox) {
		elemLoaded('#aioseo-limit-modified-date', 'aioseoLimitModifiedDate')
		document.addEventListener('animationstart', function (event) {
			if ('aioseoLimitModifiedDate' === event.animationName) {
				loadLimitModifiedDate()
			}
		}, { passive: true })
	} else {
		loadLimitModifiedDate()
	}
}