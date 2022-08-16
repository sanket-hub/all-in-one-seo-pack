import store from '@/vue/store'
import { getJsonValue } from '@/vue/utils/json'

const getFeatures = (type = '') => {
	let allFeatures = getJsonValue(store.state.internalOptions.internal.license.features, [])
	if (type) {
		allFeatures = allFeatures[type] || []
	}

	return allFeatures
}

const hasAddonFeature = (slug, feature) => {
	const addonFeatures = getFeatures('addons')
	for (const addon in addonFeatures) {
		if (slug === addon && -1 !== addonFeatures[addon].indexOf(feature)) {
			return true
		}
	}

	return false
}

export default {
	getFeatures,
	hasAddonFeature
}