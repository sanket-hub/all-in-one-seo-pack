import Vue from 'vue'

import '@/vue/plugins'
import '@/vue/components/common'

import App from './App.vue'
import store from '@/vue/store'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

Vue.config.productionTip = false

/**
 * Mount the Alert component inside each tab of the SEO settings from Divi.
 *
 * @returns {void}
 */
const mountAlert = () => {
	const tabs = document.querySelectorAll('#wrap-seo .et-tab-content')
	for (let i = 0; i < tabs.length; i++) {
		// Create an element to render the App.
		const element = document.createElement('div')
		element.setAttribute('id', `aioseo-divi-seo-admin-notice-container-${i}`)

		// Insert the element before the first child of the tab content.
		tabs[i].insertBefore(element, tabs[i].firstChild)

		// Mount the App inside this element.
		new Vue({
			store,
			render : h => h(App)
		}).$mount(`#${element.getAttribute('id')}`)
	}
}

/**
 * Disable all the Divi input fields from their interface.
 *
 * @returns {void}
 */
const disableDiviSeoInputs = () => {
	const textInputs = document.querySelectorAll('#wrap-seo input[type="text"], #wrap-seo textarea')
	for (let i = 0; i < textInputs.length; i++) {
		textInputs[i].style.pointerEvents = 'none'
		textInputs[i].setAttribute('readonly', true)
	}

	const selectInputs = document.querySelectorAll('#wrap-seo select')
	for (let i = 0; i < selectInputs.length; i++) {
		selectInputs[i].style.pointerEvents = 'none'
		selectInputs[i].setAttribute('disabled', true)
	}

	const toggleInputs = document.querySelectorAll('#wrap-seo .et-checkbox')
	for (let i = 0; i < toggleInputs.length; i++) {
		toggleInputs[i].setAttribute('disabled', true)
		toggleInputs[i].nextElementSibling.style.pointerEvents = 'none'
	}
}

/**
 * Changes the SEO tab link to redirect to our Search Appearance page.
 *
 * @returns {void}
 */
const changeTabLink = () => {
	const url = window.aioseo.urls.aio.searchAppearance
	const tabLink = document.querySelector('a[href="#wrap-seo"]')
	if (!url || !tabLink) {
		return
	}

	// Clone the element to remove all event listeners.
	const newTabLink = tabLink.cloneNode(true)
	newTabLink.setAttribute('href', url)
	tabLink.parentNode.replaceChild(newTabLink, tabLink)
}

// Trigger after the whole window loaded.
window.addEventListener('load', () => {
	// Mount our Alert component.
	mountAlert()

	// Disable the Divi SEO inputs.
	disableDiviSeoInputs()

	// Change the SEO tab link to redirect to our page.
	changeTabLink()
})