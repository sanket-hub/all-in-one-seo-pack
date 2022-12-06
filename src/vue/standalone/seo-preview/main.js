import Vue from 'vue'
import App from './App.vue'
import translate from '@/vue/plugins/translations'
import { MdButton, MdTabs } from 'vue-material/dist/components'

Vue.use(MdButton)
Vue.use(MdTabs)

Vue.prototype.$t = translate
Vue.prototype.$td = import.meta.env.VITE_TEXTDOMAIN
Vue.prototype.$aioseo = window.aioseo

const elemDiv = document.createElement('div')
elemDiv.id = 'aioseo-seo-preview-standalone'
document.body.appendChild(elemDiv)

new Vue({
	render : h => h(App)
}).$mount(`#${elemDiv.id}`)