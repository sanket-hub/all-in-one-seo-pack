import Vue from 'vue'

import '@/vue/plugins'

import '@/vue/components/common'
import '@/vue/components/AIOSEO_VERSION'

import App from './App.vue'
import store from '@/vue/store'

import { elemLoaded } from '@/vue/utils/elemLoaded'

const insertRequiredElements = () => {
	const form = document.getElementById('your-profile')
	if (!form) {
		return
	}
	// Add our tab bar and hidden form field.
	const targetElement = document.createElement('div')
	targetElement.id    = 'aioseo-user-profile-tab'

	const hiddenInputElement = document.createElement('input')
	hiddenInputElement.id    = 'aioseo-user-social-profiles'
	hiddenInputElement.name  = 'aioseo-user-social-profiles'
	hiddenInputElement.type  = 'hidden'

	form.prepend(hiddenInputElement)
	form.prepend(targetElement)
}

const mountApp = () => {
	new Vue({
		store,
		render : h => h(App)
	}).$mount('#aioseo-user-profile-tab')
}

elemLoaded('#your-profile', 'profilePageLoaded')
document.addEventListener('animationstart', function (event) {
	if ('profilePageLoaded' !== event.animationName) {
		return
	}

	insertRequiredElements()
	mountApp()
})