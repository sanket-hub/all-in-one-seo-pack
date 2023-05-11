import superagent from 'superagent'
import translate from './translations'
import emitter from 'tiny-emitter/instance'

import VueClipboard from './vue-clipboard'

import { allowed } from '@/vue/utils/AIOSEO_VERSION'
import links from '@/vue/utils/links'
import { optionsFromArray } from '@/vue/utils/options'
import numbers from '@/vue/utils/numbers'
import tags from '@/vue/utils/tags'
import { getAssetUrl } from '@/vue/utils/helpers'
import addons from '@/vue/utils/addons'
import license from '@/vue/utils/license'

import * as constants from './constants'

import VueScrollTo from 'vue-scrollto'

import './emoji'

window.aioseo    = window.aioseo || {}
window.aioseoBus = window.aioseoBus || {
	$on   : (...args) => emitter.on(...args),
	$once : (...args) => emitter.once(...args),
	$off  : (...args) => emitter.off(...args),
	$emit : (...args) => emitter.emit(...args)
}

if (import.meta.env.PROD) {
	window.__aioseoDynamicImportPreload__ = filename => {
		return `${window.aioseo.urls.publicPath || '/'}dist/${import.meta.env.VITE_VERSION}/assets/${filename}`
	}
}

export default app => {
	// Set up a redirect here.
	const http = superagent.agent()
		.set('X-WP-Nonce', window.aioseo.nonce)
		.use(req => {
			req.on('response', response => {
				if (401 === response.status) {
					console.error(response)
				} else if (403 === response.status) {
					console.error(response)
				}
			})
		})

	app.use(VueClipboard)

	app.use(VueScrollTo, {
		container  : 'body',
		duration   : 1000,
		easing     : 'ease-in-out',
		offset     : 0,
		force      : true,
		cancelable : true,
		onStart    : false,
		onDone     : false,
		onCancel   : false,
		x          : false,
		y          : true
	})

	app.config.globalProperties.$assetsPath       = window.aioseo.urls.assetsPath
	app.config.globalProperties.$constants        = constants
	app.config.globalProperties.$getAssetUrl      = getAssetUrl
	app.config.globalProperties.$isPro            = 'pro' === import.meta.env.VITE_VERSION.toLowerCase()
	app.config.globalProperties.$numbers          = numbers
	app.config.globalProperties.$optionsFromArray = optionsFromArray
	app.config.globalProperties.$tags             = tags
	app.config.globalProperties.$td               = import.meta.env.VITE_TEXTDOMAIN
	app.config.globalProperties.$tdPro            = import.meta.env.VITE_TEXTDOMAIN_PRO

	// Vue 2 compatibility mode.
	app.$aioseo   = app.config.globalProperties.$aioseo  = window.aioseo
	app.$addons   = app.config.globalProperties.$addons  = addons
	app.$allowed  = app.config.globalProperties.$allowed = allowed
	app.$bus      = app.config.globalProperties.$bus     = window.aioseoBus
	app.$http     = app.config.globalProperties.$http    = http
	app.$license  = app.config.globalProperties.$license = license
	app.$links    = app.config.globalProperties.$links   = links
	app.$t        = app.config.globalProperties.$t       = translate

	return app
}