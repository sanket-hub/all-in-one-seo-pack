import '@/vue/utils/vue2.js'
import { createApp } from 'vue'

import loadPlugins from '@/vue/plugins'

import loadComponents from '@/vue/components/common'
import loadVersionedComponents from '@/vue/components/AIOSEO_VERSION'

import { elemLoaded } from '@/vue/utils/elemLoaded'
import { shouldShowMetaBox } from '@/vue/plugins/tru-seo/components/helpers'

import App from './App.vue'
import store from '@/vue/store'

import './blockEditor'

const loadLimitModifiedDate = () => {
	let app = createApp(App)
	app     = loadPlugins(app)
	app     = loadComponents(app)
	app     = loadVersionedComponents(app)

	store._vm  = app
	app.use(store)

	app.mount('#aioseo-limit-modified-date')
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