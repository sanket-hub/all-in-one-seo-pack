import '@/vue/utils/vue2.js'
import { createApp } from 'vue'

import loadPlugins from '@/vue/plugins'

import loadComponents from '@/vue/components/common'
import loadVersionedComponents from '@/vue/components/AIOSEO_VERSION'

import { elemLoaded } from '@/vue/utils/elemLoaded'

import App from './App.vue'
import store from '@/vue/store'

const loadLaDidYouKnow = () => {
	let app = createApp(App)
	app     = loadPlugins(app)
	app     = loadComponents(app)
	app     = loadVersionedComponents(app)

	app.use(store)
	store._vm = app

	app.mount('#aioseo-link-assistant-education-mount')
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