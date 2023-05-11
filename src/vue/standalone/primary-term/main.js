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
import './classicEditor'

/**
 * Loads the primary term app.
 *
 * @param {string} element The element to load the app into.
 * @returns {void}
 */
const loadPrimaryTermApp = (element) => {
	if (!element) {
		return
	}

	const taxonomy = element.getAttribute('taxonomy')

	let app = createApp(App, { taxonomy })
	app     = loadPlugins(app)
	app     = loadComponents(app)
	app     = loadVersionedComponents(app)

	store._vm  = app
	app.use(store)
	app.mount(element)
}

if (shouldShowMetaBox() && window.aioseo && window.aioseo.currentPost && 'post' === window.aioseo.currentPost.context) {
	const metaBox = document.getElementsByClassName('aioseo-primary-term-app')
	Array.prototype.forEach.call(metaBox, element => loadPrimaryTermApp(element))

	elemLoaded('.aioseo-primary-term-app', 'aioseoPrimaryTerm')
	document.addEventListener('animationstart', function (event) {
		if ('aioseoPrimaryTerm' === event.animationName) {
			loadPrimaryTermApp(event.target)
		}
	}, { passive: true })
}