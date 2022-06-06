/* globals seedprod_app */
import Vue from 'vue'

import '@/vue/plugins'
import TruSEO from '@/vue/plugins/truSEO'
import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import initWatcher from './watcher'

import App from '@/vue/standalone/post-settings/App.vue'
import store from '@/vue/store'

import { maybeUpdatePost as updatePostData } from '@/vue/plugins/truSEO/components'

Vue.prototype.$truSEO = new TruSEO()

/**
 * Mount our Component inside the SEO tab.
 *
 * @returns {void}
 */
const mountComponent = () => {
	// Check whether the route to SEO tab is active. If so, render our Vue component.
	seedprod_app.$watch('$route.name', (newVal) => {
		if ('setup_settings_seo' === newVal) {
			new Vue({
				store,
				data : {
					tableContext  : window.aioseo.currentPost.context,
					screenContext : 'metabox'
				},
				mounted : () => {
					setTimeout(updatePostData)
				},
				render : h => h(App)
			}).$mount('#seedprod-preview-wrapper .seedprod-settings-page-wrapper')
		}
	},
	{
		immediate : true
	})
}

/**
 * Replace the data-href attribute to load our styles.
 *
 * @returns {void}
 */
const fixStyleTag = () => {
	const style = document.getElementById('aioseo-seedprod-common-css')
	if (style) {
		style.setAttribute('href', style.getAttribute('data-href'))
	}
}

/**
 * Init the SeedProd integration.
 *
 * @returns {void}
 */
const init = () => {
	// Mount our Vue component in the SEO tab.
	mountComponent()

	// Fix the link tag to load our styles.
	fixStyleTag()

	// Initialize the editor data watcher.
	initWatcher()
}

document.addEventListener('DOMContentLoaded', () => {
	if (seedprod_app && seedprod_app._isMounted) {
		init()
	}
})