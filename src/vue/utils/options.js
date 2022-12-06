import Vue from 'vue'
import { merge } from 'lodash-es'

export const getOptions = () => new Promise(resolve => {
	if (window.aioseo.options) {
		return resolve(setOptions({
			internalOptions        : window.aioseo.internalOptions,
			options                : window.aioseo.options,
			dynamicOptions         : window.aioseo.dynamicOptions,
			internalNetworkOptions : window.aioseo.internalNetworkOptions,
			networkOptions         : window.aioseo.networkOptions,
			settings               : window.aioseo.settings,
			notifications          : window.aioseo.notifications,
			addons                 : window.aioseo.addons,
			license                : window.aioseo.license,
			currentPost            : window.aioseo.currentPost,
			helpPanel              : window.aioseo.helpPanel,
			tags                   : window.aioseo.tags,
			plugins                : window.aioseo.plugins,
			redirects              : window.aioseo.redirects,
			linkAssistant          : window.aioseo.linkAssistant,
			indexNow               : window.aioseo.indexNow,
			schema                 : window.aioseo.schema
		}))
	}
})

export const setOptions = ({
	internalOptions,
	options,
	dynamicOptions,
	internalNetworkOptions,
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
	redirects,
	linkAssistant,
	indexNow,
	schema,
	// These are the posts/terms for our AIOSEO Details column.
	posts,
	terms
}) => {
	internalOptions        = merge({ ...window.aioseo.internalOptions }, { ...internalOptions })
	options                = merge({ ...window.aioseo.options }, { ...options })
	dynamicOptions         = merge({ ...window.aioseo.dynamicOptions }, { ...dynamicOptions })
	internalNetworkOptions = merge({ ...window.aioseo.internalNetworkOptions }, { ...internalNetworkOptions })
	networkOptions         = merge({ ...window.aioseo.networkOptions }, { ...networkOptions })
	settings               = merge({ ...window.aioseo.settings }, { ...settings })
	notifications          = merge({ ...window.aioseo.notifications }, { ...notifications })
	addons                 = merge([ ...window.aioseo.addons ], [ ...(addons || []) ])
	backups                = merge([ ...window.aioseo.backups ], [ ...(backups || []) ])
	license                = merge({ ...window.aioseo.license }, { ...license })
	currentPost            = merge({ ...window.aioseo.currentPost }, { ...currentPost })
	helpPanel              = merge({ ...window.aioseo.helpPanel }, { ...helpPanel })
	tags                   = merge({ ...window.aioseo.tags }, { ...tags })
	plugins                = merge({ ...window.aioseo.plugins }, { ...plugins })
	redirects              = merge({ ...window.aioseo.redirects }, { ...redirects })
	linkAssistant          = merge({ ...window.aioseo.linkAssistant }, { ...linkAssistant })
	indexNow               = merge({ ...window.aioseo.indexNow }, { ...indexNow })
	schema                 = merge({ ...window.aioseo.schema }, { ...schema })
	posts                  = merge([ ...window.aioseo?.posts || [] ], [ ...(posts || []) ])
	terms                  = merge([ ...window.aioseo?.terms || [] ], [ ...(terms || []) ])

	const aioseo = {
		translations : {},
		publicPath   : '/',
		...window.aioseo,
		internalOptions,
		options,
		dynamicOptions,
		internalNetworkOptions,
		networkOptions,
		settings,
		notifications,
		addons,
		license,
		currentPost,
		helpPanel,
		plugins,
		redirects,
		linkAssistant,
		indexNow,
		schema,
		posts,
		terms
	}

	window.aioseo         = aioseo
	Vue.prototype.$aioseo = aioseo

	return {
		internalOptions,
		options,
		dynamicOptions,
		internalNetworkOptions,
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
		redirects,
		linkAssistant,
		indexNow,
		schema,
		posts,
		terms
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