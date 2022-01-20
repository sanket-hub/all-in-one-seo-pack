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
import addons from '@/vue/utils/addons'
import TruSEO from '@/vue/plugins/truSEO'
import LinkAssistant from '@/vue/plugins/link-assistant'
import '@/vue/plugins/breadcrumbs'
import '@/vue/plugins/html-sitemap'

import * as constants from './constants'

import moment from 'moment'
import 'moment-timezone'

import VueScrollTo from 'vue-scrollto'

window.aioseo    = window.aioseo || {}
window.aioseoBus = window.aioseoBus || new Vue()

if ('production' === process.env.NODE_ENV) {
	const publicPath = window.aioseo.urls.publicPath || '/'
	__webpack_public_path__ = publicPath + 'dist/' + process.env.VUE_APP_VERSION + '/assets' + __webpack_public_path__ // eslint-disable-line
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
Vue.prototype.$bus              = window.aioseoBus
Vue.prototype.$constants        = constants
Vue.prototype.$http             = http
Vue.prototype.$isPro            = 'pro' === process.env.VUE_APP_VERSION.toLowerCase()
Vue.prototype.$links            = links
Vue.prototype.$moment           = moment
Vue.prototype.$numbers          = numbers
Vue.prototype.$optionsFromArray = optionsFromArray
Vue.prototype.$t                = translate
Vue.prototype.$tags             = tags
Vue.prototype.$td               = process.env.VUE_APP_TEXTDOMAIN
Vue.prototype.$tdPro            = process.env.VUE_APP_TEXTDOMAIN_PRO
Vue.prototype.$truSEO           = new TruSEO()
Vue.prototype.$linkAssistant    = new LinkAssistant()