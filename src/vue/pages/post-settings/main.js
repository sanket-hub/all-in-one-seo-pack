import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'

import App from './App.vue'
import './registerScoreToggler'
import store from '@/vue/store'
import { elemLoaded } from '@/vue/utils/elemLoaded'
import { shouldShowMetaBox } from '@/vue/plugins/truSEO/components'
import loadTruSeo from '@/vue/pages/post-settings/loadTruSeo'

// Local Business.
import AppLocalBusiness from '../local-business-seo/App.vue'
import '../local-business-seo/blocks/BusinessInfo.js'
import '../local-business-seo/blocks/Locations.js'
import '../local-business-seo/blocks/OpeningHours.js'
import '../local-business-seo/blocks/LocationCategories.js'
import '../local-business-seo/blocks/LocationMap.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

if (window.aioseo.currentPost) {
	Vue.config.productionTip = false

	const currentContext = window.aioseo.currentPost.context
	const node = document.querySelector(`#aioseo-${currentContext}-settings-metabox`)
	if (node && shouldShowMetaBox()) {
		if (!window.wp.blockEditor && window.wp.blocks && window.wp.oldEditor) {
			window.wp.blockEditor = window.editor
		}

		new Vue({
			store,
			data : {
				tableContext  : currentContext,
				screenContext : 'metabox'
			},
			render : h => h(App, {
				props : {
					restUrl : window.aioseo.urls.restUrl
				}
			})
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
	Vue.config.productionTip = false

	new Vue({
		store,
		data : {
			screenContext : 'metabox'
		},
		render : h => h(AppLocalBusiness)
	}).$mount('#aioseo-location-settings-metabox')
}