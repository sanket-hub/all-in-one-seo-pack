import { decodeHTMLEntities } from '@/vue/utils/helpers'

const replacer = (key, value) => {
	if ('licenseKey' === key) {
		value = ''
	}

	if ('rules' === key && Array.isArray(value)) {
		value.forEach((rule, index) => {
			const r = JSON.parse(rule)
			if (null === r.userAgent && 'allow' === r.rule && null === r.directoryPath) {
				value.splice(index, 1)
			}
		})
	}

	if ('separator' === key) {
		value = decodeHTMLEntities(value)
	}

	return null === value ? '' : value
}

export default {
	isDirty : (state, getters, rootState) => {
		// We need to stringify, then parse, then stringify in order to make a clone of these options.
		const normalize = object => {
			if (!object) {
				return {}
			}

			return JSON.stringify(JSON.parse(JSON.stringify(object)), replacer)
		}

		const originalOptions          = normalize(state.options)
		const rootOptions              = normalize(rootState.options)
		const originalOptionsNetwork   = normalize(state.options)
		const rootOptionsNetwork       = normalize(rootState.options)
		const originalOptionsRedirects = normalize(state.redirectOptions)
		const rootOptionsRedirects     = normalize(rootState.redirects.options)
		const originalOptionsIndexNow  = normalize(state.indexNowOptions)
		const rootOptionsIndexNow      = normalize(rootState['index-now'].options)
		const originalOptionsDynamic   = normalize(state.dynamicOptions)
		const rootOptionsDynamic       = normalize(rootState.dynamicOptions)

		return !(
			originalOptions === rootOptions &&
			originalOptionsNetwork === rootOptionsNetwork &&
			originalOptionsRedirects === rootOptionsRedirects &&
			originalOptionsDynamic === rootOptionsDynamic &&
			originalOptionsIndexNow === rootOptionsIndexNow
		)
	}
}