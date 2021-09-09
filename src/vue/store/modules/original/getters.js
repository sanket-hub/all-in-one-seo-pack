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
	return null === value ? '' : value
}

export default {
	isDirty : (state, getters, rootState) => {
		// We need to stringify, then parse, then stringify in order to make a clone of these options.
		const originalOptions          = JSON.stringify(JSON.parse(JSON.stringify(state.options)), replacer)
		const rootOptions              = JSON.stringify(JSON.parse(JSON.stringify(rootState.options)), replacer)
		const originalOptionsNetwork   = JSON.stringify(JSON.parse(JSON.stringify(state.options)), replacer)
		const rootOptionsNetwork       = JSON.stringify(JSON.parse(JSON.stringify(rootState.options)), replacer)
		const originalOptionsRedirects = JSON.stringify(JSON.parse(JSON.stringify(state.redirectOptions)), replacer)
		const rootOptionsRedirects     = JSON.stringify(JSON.parse(JSON.stringify(rootState.redirects.options)), replacer)
		const originalOptionsDynamic   = JSON.stringify(JSON.parse(JSON.stringify(state.dynamicOptions)), replacer)
		const rootOptionsDynamic       = JSON.stringify(JSON.parse(JSON.stringify(rootState.dynamicOptions)), replacer)
		return !(
			originalOptions === rootOptions &&
			originalOptionsNetwork === rootOptionsNetwork &&
			originalOptionsRedirects === rootOptionsRedirects &&
			originalOptionsDynamic === rootOptionsDynamic
		)
	}
}