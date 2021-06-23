import Vue from 'vue'
import merge from 'lodash/merge'

export const getOptions = () => new Promise(resolve => {
	if (window.aioseo.options) {
		return resolve(setOptions({
			internalOptions : window.aioseo.internalOptions,
			options         : window.aioseo.options,
			networkOptions  : window.aioseo.networkOptions,
			settings        : window.aioseo.settings,
			notifications   : window.aioseo.notifications,
			addons          : window.aioseo.addons,
			license         : window.aioseo.license,
			currentPost     : window.aioseo.currentPost,
			helpPanel       : window.aioseo.helpPanel,
			tags            : window.aioseo.tags,
			plugins         : window.aioseo.plugins,
			redirects       : window.aioseo.redirects
		}))
	}
})

export const setOptions = ({
	internalOptions,
	options,
	networkOptions,
	settings,
	notifications,
	addons,
	license,
	currentPost,
	helpPanel,
	tags,
	plugins,
	backups,
	redirects
}) => {
	internalOptions = merge({ ...window.aioseo.internalOptions }, { ...internalOptions })
	options         = merge({ ...window.aioseo.options }, { ...options })
	networkOptions  = merge({ ...window.aioseo.networkOptions }, { ...networkOptions })
	settings        = merge({ ...window.aioseo.settings }, { ...settings })
	notifications   = merge({ ...window.aioseo.notifications }, { ...notifications })
	addons          = merge([ ...window.aioseo.addons ], [ ...(addons || []) ])
	backups         = merge([ ...window.aioseo.backups ], [ ...(backups || []) ])
	license         = merge({ ...window.aioseo.license }, { ...license })
	currentPost     = merge({ ...window.aioseo.currentPost }, { ...currentPost })
	helpPanel       = merge({ ...window.aioseo.helpPanel }, { ...helpPanel })
	tags            = merge({ ...window.aioseo.tags }, { ...tags })
	plugins         = merge({ ...window.aioseo.plugins }, { ...plugins })
	redirects       = merge({ ...window.aioseo.redirects }, { ...redirects })

	const aioseo = {
		translations : {},
		publicPath   : '/',
		...window.aioseo,
		internalOptions,
		options,
		networkOptions,
		settings,
		notifications,
		addons,
		license,
		currentPost,
		helpPanel,
		plugins,
		redirects
	}

	window.aioseo         = aioseo
	Vue.prototype.$aioseo = aioseo

	return {
		internalOptions,
		options,
		networkOptions,
		settings,
		notifications,
		addons,
		license,
		currentPost,
		helpPanel,
		tags,
		plugins,
		backups,
		redirects
	}
}

export const optionsFromArray = (option, array) => {
	let newOption = option
	const index   = array.pop()
	array.forEach(o => {
		newOption = newOption[o]
	})

	return {
		option : newOption,
		index
	}
}