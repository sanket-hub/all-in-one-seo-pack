// https://vuex.vuejs.org/en/modules.html

const requireModule = require.context('.', true, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
	if ('./index.js' === fileName) return

	// Replace ./ and .js
	const path = fileName.replace(/(\.\/|\.js)/g, '')
	let [ moduleName, imported ] = path.split('/')

	// This is needed so that the namespace can be accessed in camelcase.
	// If not, the getters won't be linked to the correct state.
	if ('link-assistant' === moduleName) {
		moduleName = 'linkAssistant'
	}

	if (!modules[moduleName]) {
		modules[moduleName] = {
			namespaced : true
		}
	}

	modules[moduleName][imported] = requireModule(fileName).default
})

export default modules