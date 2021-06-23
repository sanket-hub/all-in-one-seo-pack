import upperFirst from 'lodash/upperFirst'
import store from '@/vue/store'

const isActive = slug => {
	const addon = store.state.addons.find(item => slug === item.sku)
	return addon && addon.isActive
}

const requiresUpgrade = slug => {
	const addon = store.state.addons.find(item => slug === item.sku)
	return !addon || addon.requiresUpgrade
}

const canActivate = slug => {
	const addon = store.state.addons.find(item => slug === item.sku)
	return addon && !addon.isActive
}

const currentPlans = slug => {
	const addon = store.state.addons.find(item => slug === item.sku)
	return !addon
		? null
		: addon.currentLevels
			.map(level => upperFirst(level))
			.join(', ')
}

export default {
	isActive,
	requiresUpgrade,
	canActivate,
	currentPlans
}