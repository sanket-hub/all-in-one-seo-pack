import Vue from 'vue'
import '@/vue/plugins'
import TruSeo from '@/vue/plugins/tru-seo'
import '@/vue/components/common'
import store from '@/vue/store'
import initSettingsBar from './settings-bar'
import initWatcher from './watcher'
import Modal from './Modal.vue'

import PortalVue from 'portal-vue'
import PortalApp from '../modal-portal/App.vue'

Vue.prototype.$truSeo = new TruSeo()

/**
 * Mount our Modal to render the SEO Settings.
 *
 * @returns {void}
 */
const mountPostSettings = () => {
	new Vue({
		store,
		data : {
			tableContext  : window.aioseo.currentPost.context,
			screenContext : 'sidebar'
		},
		render : h => h(Modal)
	}).$mount('#aioseo-app-modal > div')
}

/**
 * Mount our portal modal.
 *
 * @returns {void}
 */
const mountPortalModal = () => {
	Vue.use(PortalVue)

	const modalPortal = document.querySelector('#aioseo-modal-portal')
	if (modalPortal) {
		new Vue({
			store,
			render : h => h(PortalApp)
		}).$mount('#aioseo-modal-portal')
	}
}

/**
 * Init the Divi integration.
 *
 * @returns {void}.
 */
const init = () => {
	// Init the settings bar.
	initSettingsBar()

	// Mount our Vue components in the Divi modal.
	mountPostSettings()
	mountPortalModal()

	// Initialize the editor data watcher.
	initWatcher()
}

window.addEventListener('message', function (event) {
	if ('et_builder_api_ready' === event.data.eventType) {
		init()
	}
})