import '@/vue/utils/vue2.js'
import { createApp } from 'vue'

import loadPlugins from '@/vue/plugins'

import loadComponents from '@/vue/components/common'

import store from '@/vue/store'
import App from './App.vue'

const elemDiv = document.createElement('div')
elemDiv.id    = 'aioseo-redirects-add-redirect-standalone'
document.body.appendChild(elemDiv)

let app = createApp(App)
app     = loadPlugins(app)
app     = loadComponents(app)

app.use(store)
store._vm = app

app.config.globalProperties.$aioseo = window.aioseo

app.mount('#aioseo-redirects-add-redirect-standalone')