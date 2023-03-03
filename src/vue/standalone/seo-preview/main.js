import Vue from 'vue'
import App from './App.vue'
import translate from '@/vue/plugins/translations'
import { MdButton, MdTabs } from 'vue-material/dist/components'

Vue.use(MdButton)
Vue.use(MdTabs)

Vue.prototype.$t = translate
Vue.prototype.$td = import.meta.env.VITE_TEXTDOMAIN
Vue.prototype.$aioseo = window.aioseoSeoPreview

const elemDiv = document.createElement('div')

// If building for production.
if (false !== import.meta.env.PROD) {
	const elemShadowWrapper = document.createElement('div')
	const elemShadowRoot = elemShadowWrapper.attachShadow({ mode: 'open' })
	const elemDir = document.createElement('div')

	elemShadowWrapper.setAttribute('class', 'aioseo-seo-preview-shadow-wrapper')
	elemShadowWrapper.setAttribute('style', 'margin:0;padding:0;border:0')
	elemDir.setAttribute('dir', document?.dir || 'ltr')
	elemDir.setAttribute('style', 'margin:0;padding:0;border:0')
	elemShadowRoot.appendChild(elemDir)
	elemDir.appendChild(elemDiv)

	document.body.appendChild(elemShadowWrapper)
} else {
	document.body.appendChild(elemDiv)
}

new Vue({
	render : h => h(App)
}).$mount(elemDiv)