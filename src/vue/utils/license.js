import Vue from 'vue'
import store from '@/vue/store'
import { getJsonValue } from '@/vue/utils/json'

const getFeatures = (type = '') => {
	const features  = Vue.prototype.$aioseo.data.isNetworkAdmin
		? store.state.internalNetworkOptions.internal.license.features
		: store.state.internalOptions.internal.license.features
	let allFeatures = getJsonValue(features, [])
	if (type) {
		allFeatures = allFeatures[type] || []
	}

	return allFeatures
}

const hasCoreFeature = (sectionSlug, feature) => {
	const features = getFeatures('core')
	for (const section in features) {
		if (sectionSlug === section && features[section].includes(feature)) {
			return true
		}
	}

	return false
}

const hasAddonFeature = (slug, feature) => {
	const addonFeatures = getFeatures('addons')
	for (const addon in addonFeatures) {
		if (slug === addon && addonFeatures[addon].includes(feature)) {
			return true
		}
	}

	return false
}

export default {
	getFeatures,
	hasAddonFeature,
	hasCoreFeature
}