import Vue from 'vue'
import Router from 'vue-router'
import { getOptions } from '@/vue/utils/options'
import store from '@/vue/store'
import merge from 'lodash/merge'
import { __ } from '@wordpress/i18n'

const td = process.env.VUE_APP_TEXTDOMAIN

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
const nextFactory = (context, middleware, index) => {
	const subsequentMiddleware = middleware[index]
	// If no subsequent Middleware exists,
	// the default `next()` callback is returned.
	if (!subsequentMiddleware) {
		return context.next
	}

	return (...parameters) => {
		// Run the default Vue Router `next()` callback first.
		context.next(...parameters)
		// Then run the subsequent Middleware with a new
		// `nextMiddleware()` callback.
		const nextMiddleware = nextFactory(context, middleware, index + 1)
		subsequentMiddleware({ ...context, next: nextMiddleware })
	}
}

export default paths => {
	Vue.use(Router)

	const router = new Router({
		base   : `wp-admin/admin.php?page=aioseo-${window.aioseo.page}`,
		routes : paths,
		scrollBehavior (to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition
			}
			if (to.hash) {
				return { selector: to.hash }
			}
			return { x: 0, y: 0 }
		}
	})

	router.beforeEach(async (to, from, next) => {
		if (!store.state.loaded) {
			const {
				internalOptions,
				options,
				dynamicOptions,
				networkOptions,
				settings,
				notifications,
				helpPanel,
				addons,
				tags,
				license,
				backups,
				redirects,
				linkAssistant,
				indexNow
			} = await getOptions(router.app.$http)
			router.app.$set(store.state, 'redirects', merge({ ...store.state.redirects }, { ...redirects }))
			router.app.$set(store.state, 'linkAssistant', merge({ ...store.state.linkAssistant }, { ...linkAssistant }))
			router.app.$set(store.state, 'index-now', merge({ ...store.state['index-now'] }, { ...indexNow }))
			router.app.$set(store.state, 'internalOptions', merge({ ...store.state.internalOptions }, { ...internalOptions }))
			router.app.$set(store.state, 'options', merge({ ...store.state.options }, { ...options }))
			router.app.$set(store.state, 'dynamicOptions', merge({ ...store.state.dynamicOptions }, { ...dynamicOptions }))
			router.app.$set(store.state, 'networkOptions', merge({ ...store.state.networkOptions }, { ...networkOptions }))
			router.app.$set(store.state, 'settings', merge({ ...store.state.settings }, { ...settings }))
			router.app.$set(store.state, 'notifications', merge({ ...store.state.notifications }, { ...notifications }))
			router.app.$set(store.state, 'helpPanel', merge({ ...store.state.helpPanel }, { ...helpPanel }))
			router.app.$set(store.state, 'addons', merge([ ...store.state.addons ], [ ...addons ]))
			router.app.$set(store.state, 'backups', merge([ ...store.state.backups ], [ ...backups ]))
			router.app.$set(store.state, 'tags', merge({ ...store.state.tags }, { ...tags }))
			router.app.$set(store.state, 'license', merge({ ...store.state.license }, { ...license }))
			router.app.$set(store.state, 'loaded', true)

			// We clone the state as it is right now so we can compare for changes later.
			store.commit('original/setOriginalOptions', JSON.parse(JSON.stringify(store.state.options)))
			store.commit('original/setOriginalDynamicOptions', JSON.parse(JSON.stringify(store.state.dynamicOptions)))
			store.commit('original/setOriginalNetworkOptions', JSON.parse(JSON.stringify(store.state.networkOptions)))

			if (store.state.redirects && store.state.redirects.options) {
				store.commit('original/setOriginalRedirectOptions', JSON.parse(JSON.stringify(store.state.redirects.options)))
			}

			if (store.state['index-now'] && store.state['index-now'].options) {
				store.commit('original/setOriginalIndexNowOptions', JSON.parse(JSON.stringify(store.state['index-now'].options)))
			}

			window.addEventListener('beforeunload', event => {
				if (!store.getters['original/isDirty']) {
					return undefined
				}

				const message = __('Are you sure you want to leave? you have unsaved changes!', td);
				(event || window.event).returnValue = message
				return message
			})

			// Make sure the API is available.
			store.dispatch('ping')
		}

		const access = to.meta.access

		if (!router.app.$allowed(access)) {
			return to.meta.home !== from.name ? router.replace({ name: to.meta.home }) : null
		}

		if (to.meta.middleware) {
			const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [ to.meta.middleware ]

			const context = {
				from,
				next,
				router,
				to
			}
			const nextMiddleware = nextFactory(context, middleware, 1)

			return middleware[0]({ ...context, next: nextMiddleware })
		}

		// Reset state here.
		store.commit('redirects/resetPageNumbers')

		return next()
	})

	return router
}