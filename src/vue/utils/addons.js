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

const userCanActivate = slug => {
	const addon = store.state.addons.find(item => slug === item.sku)
	return addon && addon.installed && !addon.isActive && addon.canActivate
}

const userCanInstall = slug => {
	const addon = store.state.addons.find(item => slug === item.sku)
	return addon && !addon.installed && addon.canInstall
}

const userCanInstallOrActivate = slug => {
	return userCanInstall(slug) || userCanActivate(slug)
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
	currentPlans,
	userCanActivate,
	userCanInstall,
	userCanInstallOrActivate
}