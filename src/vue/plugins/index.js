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
import { getAssetUrl } from '@/vue/utils/helpers'
import addons from '@/vue/utils/addons'
import license from '@/vue/utils/license'

import * as constants from './constants'

import { DateTime } from 'luxon'

import VueScrollTo from 'vue-scrollto'
import PortalVue from 'portal-vue'

import './emoji'

window.aioseo    = window.aioseo || {}
window.aioseoBus = window.aioseoBus || new Vue()

if (import.meta.env.PROD) {
	window.__aioseoDynamicImportPreload__ = filename => {
		return `${window.aioseo.urls.publicPath || '/'}dist/${import.meta.env.VITE_VERSION}/assets/${filename}`
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

Vue.use(PortalVue)

Vue.prototype.$addons           = addons
Vue.prototype.$allowed          = allowed
Vue.prototype.$assetsPath       = window.aioseo.urls.assetsPath
Vue.prototype.$bus              = window.aioseoBus
Vue.prototype.$constants        = constants
Vue.prototype.$dateTime         = DateTime
Vue.prototype.$getAssetUrl      = getAssetUrl
Vue.prototype.$http             = http
Vue.prototype.$isPro            = 'pro' === import.meta.env.VITE_VERSION.toLowerCase()
Vue.prototype.$links            = links
Vue.prototype.$numbers          = numbers
Vue.prototype.$optionsFromArray = optionsFromArray
Vue.prototype.$t                = translate
Vue.prototype.$tags             = tags
Vue.prototype.$td               = import.meta.env.VITE_TEXTDOMAIN
Vue.prototype.$tdPro            = import.meta.env.VITE_TEXTDOMAIN_PRO
Vue.prototype.$license          = license