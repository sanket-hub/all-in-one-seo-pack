import Vue from 'vue'

import '@/vue/plugins'
import '@/vue/components/common'
import { elemLoaded } from '@/vue/utils/elemLoaded'
import { shouldShowMetaBox } from '@/vue/plugins/truSEO/components/helpers'

import App from './App.vue'
import store from '@/vue/store'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import './blockEditor'

Vue.config.productionTip = false

if (shouldShowMetaBox() && window.aioseo && window.aioseo.currentPost && 'post' === window.aioseo.currentPost.context) {
	const metaBox = document.getElementById('aioseo-limit-modified-date')

	if (!metaBox) {
		elemLoaded('#aioseo-limit-modified-date', 'aioseoLimitModifiedDate')
		document.addEventListener('animationstart', function (event) {
			if ('aioseoLimitModifiedDate' === event.animationName) {
				new Vue({
					store,
					render : h => h(App)
				}).$mount('#aioseo-limit-modified-date')
			}
		}, { passive: true })
	} else {
		new Vue({
			store,
			render : h => h(App)
		}).$mount('#aioseo-limit-modified-date')
	}
}