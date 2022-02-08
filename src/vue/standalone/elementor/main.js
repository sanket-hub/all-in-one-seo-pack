import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'
import initWatcher from './watcher'
import initIntroduction from './introduction'

import App from '@/vue/pages/post-settings/App.vue'
import store from '@/vue/store'

/**
 * Add to the body a class to identify the Elementor color schema.
 *
 * @returns {void}
 */
const addBodyClass = () => {
	let theme = window.elementor.getPreferences('ui_theme') || 'auto'
	if ('auto' === theme) {
		theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}

	// Remove the class if was already added.
	document.body.classList.forEach(className => {
		if (className.startsWith('aioseo-elementor-')) {
			document.body.classList.remove(className)
		}
	})

	document.body.classList.add('aioseo-elementor-' + theme)
}

/**
 * Mount our Component inside the Elementor tab.
 *
 * @returns {void}
 */
const mountComponent = () => {
	// Check whether the route to our tab is active. If so, render our Vue component.
	window.$e.routes.on('run:after', function (component, route) {
		addBodyClass()

		// Initialize our Vue component.
		if ('panel/page-settings/aioseo' === route) {
			new Vue({
				store,
				data : {
					tableContext  : window.aioseo.currentPost.context,
					screenContext : 'sidebar'
				},
				render : h => h(App)
			}).$mount('#elementor-panel-page-settings-controls')

			document.getElementById('elementor-panel-page-settings').classList.add('edit-post-sidebar', 'aioseo-elementor-panel')
		}
	})
}

/**
 * Add the All In One shortcut to the Elementor Page Settings.
 *
 * @returns {void}
 */
const addMenuShortcut = () => {
	const menu = window.elementor.modules.layouts.panel.pages.menu.Menu
	const theme = window.elementor.getPreferences('ui_theme')
	menu.addItem({
		name     : 'aioseo',
		icon     : 'aioseo aioseo-element-menu-icon aioseo-element-menu-icon-' + theme,
		title    : process.env.VUE_APP_NAME,
		type     : 'page',
		callback : () => {
			try {
				window.$e.routes.run('panel/page-settings/aioseo')
			} catch (error) {
				// The AIOSEO tab is only available if the page settings have been visited.
				window.$e.routes.run('panel/page-settings/settings')
				window.$e.routes.run('panel/page-settings/aioseo')
			}
		}
	}, 'more')
}

/**
 * Init the Elementor integration.
 *
 * @returns {void}
 */
const init = () => {
	// Add a shurtcut on the Elementor Page Settings.
	addMenuShortcut()

	// Mount our Vue component in the Elementor tab.
	mountComponent()

	// Initialize the introduction.
	initIntroduction()

	// Initialize the editor data watcher.
	initWatcher()
}

(function ($) {
	$(window).on('elementor:init', () => {
		window.elementor.on('panel:init', () => {
			setTimeout(init)
		})
	})
})(window.jQuery)