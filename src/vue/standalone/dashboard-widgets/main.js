import Vue from 'vue'

import '@/vue/plugins'
import '@/vue/components/common'

import SeoSetup from './SeoSetup.vue'
import Overview from './Overview.vue'

import store from '@/vue/store'

import { elemLoaded } from '@/vue/utils/elemLoaded'
import camelCase from 'lodash/camelCase'

Vue.config.productionTip = false

const dashboardWidgetsMap = [
	{ id: 'aioseo-seo-setup-app', component: SeoSetup },
	{ id: 'aioseo-overview-app', component: Overview }
]

const loadDashboardWidget = (widget) => {
	new Vue({
		store,
		render : h => h(widget.component)
	}).$mount('#' + widget.id)
}

dashboardWidgetsMap.forEach(widget => {
	if (!document.getElementById(widget.id)) {
		elemLoaded('#' + widget.id, camelCase(widget.id))
		document.addEventListener('animationstart', function (event) {
			if (camelCase(widget.id) === event.animationName) {
				loadDashboardWidget(widget)
			}
		}, { passive: true })
	} else {
		loadDashboardWidget(widget)
	}
})