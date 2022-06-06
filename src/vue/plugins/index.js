import Vue from 'vue'
import superagent from 'superagent'
import translate from './translations'

import { MdButton, MdTabs, MdTooltip } from 'vue-material/dist/components'

import VueClipboard from './vue-clipboard'

import { allowed } from '@/vue/utils/AIOSEO_VERSION'
import links from '@/vue/utils/links'
import { optionsFromArray } from '@/vue/utils/options'
import numbers from '@/vue/utils/numbers'
import tags from '@/vue/utils/tags'
import { getImgUrl } from '@/vue/utils/helpers'
import addons from '@/vue/utils/addons'

import * as constants from './constants'

import moment from 'moment'
import 'moment-timezone'

import VueScrollTo from 'vue-scrollto'

window.aioseo    = window.aioseo || {}
window.aioseoBus = window.aioseoBus || new Vue()

// Fix for https://github.com/jy0529/vite-plugin-dynamic-publicpath/issues/13
window.__VITE_PRELOAD__ = undefined

if (import.meta.env.PROD) {
	const publicPath = window.aioseo.urls.publicPath || '/'
	window.__aioseo_dynamic_handler__ = importer => {
		return `${publicPath}dist/${import.meta.env.VITE_VERSION}/assets/${importer.replace('./', '')}`
	}
	window.__aioseo_dynamic_preload__ = preloads => {
		return preloads.map(preload => {
			return `${publicPath}dist/${import.meta.env.VITE_VERSION}/assets/${preload}`
		})
	}
}

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

Vue.use(MdButton)
Vue.use(MdTabs)
Vue.use(MdTooltip)

Vue.use(VueClipboard)

Vue.use(VueScrollTo, {
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

Vue.prototype.$addons           = addons
Vue.prototype.$allowed          = allowed
Vue.prototype.$assetsPath       = window.aioseo.urls.assetsPath
Vue.prototype.$bus              = window.aioseoBus
Vue.prototype.$constants        = constants
Vue.prototype.$getImgUrl        = getImgUrl
Vue.prototype.$http             = http
Vue.prototype.$isPro            = 'pro' === import.meta.env.VITE_VERSION.toLowerCase()
Vue.prototype.$links            = links
Vue.prototype.$moment           = moment
Vue.prototype.$numbers          = numbers
Vue.prototype.$optionsFromArray = optionsFromArray
Vue.prototype.$t                = translate
Vue.prototype.$tags             = tags
Vue.prototype.$td               = import.meta.env.VITE_TEXTDOMAIN
Vue.prototype.$tdPro            = import.meta.env.VITE_TEXTDOMAIN_PRO