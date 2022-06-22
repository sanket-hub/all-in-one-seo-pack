import Vue from 'vue'

import '@/vue/plugins'
import TruSeo from '@/vue/plugins/tru-seo'
import '@/vue/plugins/link-assistant'
import '@/vue/plugins/redirects'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import './registerScoreToggler'
import store from '@/vue/store'
import { elemLoaded } from '@/vue/utils/elemLoaded'
import { shouldShowMetaBox } from '@/vue/plugins/tru-seo/components'
import loadTruSeo from '@/vue/standalone/post-settings/loadTruSeo'

// Local Business.
import AppLocalBusiness from '../local-business-seo/App.vue'

Vue.prototype.$truSeo = new TruSeo()

if (window.aioseo.currentPost) {
	const currentContext = window.aioseo.currentPost.context
	const node = document.querySelector(`#aioseo-${currentContext}-settings-metabox`)
	if (node && shouldShowMetaBox()) {
		if (!window.wp.blockEditor && window.wp.blocks && window.wp.oldEditor) {
			window.wp.blockEditor = window.wp.editor
		}

		new Vue({
			store,
			data : {
				tableContext  : currentContext,
				screenContext : 'metabox'
			},
			render : h => h(App)
		}).$mount(`#aioseo-${currentContext}-settings-metabox`)

		if ('post' === currentContext) {
			const sidebar = document.getElementById('aioseo-post-settings-sidebar-vue')
			if (!sidebar) {
				elemLoaded('#aioseo-post-settings-sidebar-vue', 'aioseoSidebarVisible')
				document.addEventListener('animationstart', function (event) {
					if ('aioseoSidebarVisible' === event.animationName) {
						new Vue({
							store,
							data : {
								tableContext  : 'post',
								screenContext : 'sidebar'
							},
							render : h => h(App)
						}).$mount('#aioseo-post-settings-sidebar-vue')
					}
				}, { passive: true })
			} else {
				new Vue({
					store,
					data : {
						tableContext  : 'post',
						screenContext : 'sidebar'
					},
					render : h => h(App)
				}).$mount('#aioseo-post-settings-sidebar-vue')
			}
		}
	}
}

window.addEventListener('load', loadTruSeo)

if (window.aioseo.currentPost && window.aioseo.localBusiness && document.getElementById('aioseo-location-settings-metabox')) {
	new Vue({
		store,
		data : {
			screenContext : 'metabox'
		},
		render : h => h(AppLocalBusiness)
	}).$mount('#aioseo-location-settings-metabox')
}