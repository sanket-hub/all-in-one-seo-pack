import { createRouter, createWebHashHistory } from 'vue-router'
import { getOptions } from '@/vue/utils/options'
import { merge } from 'lodash-es'
import { __ } from '@wordpress/i18n'
import { sync } from 'vuex-router-sync'

const td = import.meta.env.VITE_TEXTDOMAIN

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

	return () => {
		// Run the subsequent Middleware with a new `nextMiddleware()` callback.
		const nextMiddleware = nextFactory(context, middleware, index + 1)

		subsequentMiddleware({ ...context, next: nextMiddleware })
	}
}

export default (paths, app, store) => {
	const router = createRouter({
		history : createWebHashHistory(`wp-admin/admin.php?page=aioseo-${window.aioseo.page}`),
		routes  : paths,
		scrollBehavior (to, from, savedPosition) {
			if (savedPosition) {
				return savedPosition
			}
			if (to.hash) {
				return { selector: to.hash }
			}
			return { left: 0, top: 0 }
		}
	})

	router.beforeEach(async (to, from, next) => {
		if (!store.state.loaded) {
			const {
				internalOptions,
				options,
				dynamicOptions,
				internalNetworkOptions,
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
				indexNow,
				searchStatistics,
				integrations
			} = await getOptions(app)

			store.state.redirects            = merge({ ...store.state.redirects }, { ...redirects })
			store.state.wpcode               = merge({ ...store.state.wpcode }, { ...integrations.wpcode })
			store.state.linkAssistant        = merge({ ...store.state.linkAssistant }, { ...linkAssistant })
			store.state['index-now']         = merge({ ...store.state['index-now'] }, { ...indexNow })
			store.state['search-statistics'] = merge({ ...store.state['search-statistics'] }, { ...searchStatistics })
			store.state.internalOptions      = merge({ ...store.state.internalOptions }, { ...internalOptions })
			store.state.options              = merge({ ...store.state.options }, { ...options })
			store.state.dynamicOptions       = merge({ ...store.state.dynamicOptions }, { ...dynamicOptions })
			store.state.settings             = merge({ ...store.state.settings }, { ...settings })
			store.state.notifications        = merge({ ...store.state.notifications }, { ...notifications })
			store.state.helpPanel            = merge({ ...store.state.helpPanel }, { ...helpPanel })
			store.state.addons               = merge([ ...store.state.addons ], [ ...addons ])
			store.state.backups              = merge([ ...store.state.backups ], [ ...backups ])
			store.state.tags                 = merge({ ...store.state.tags }, { ...tags })
			store.state.license              = merge({ ...store.state.license }, { ...license })
			store.state.loaded               = true

			// Network.
			store.state.internalNetworkOptions = merge({ ...store.state.internalNetworkOptions }, { ...internalNetworkOptions })
			store.state.networkOptions         = merge({ ...store.state.networkOptions }, { ...networkOptions })
			store.state.networkBackups         = merge({ ...store.state.networkBackups }, { ...window.aioseo.data.network?.backups })
			store.state.networkData            = merge({ ...store.state.networkData }, {
				sites       : window.aioseo.data.network?.sites,
				activeSites : window.aioseo.data.network?.activeSites
			})

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
				app,
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

	sync(store, router)

	return router
}