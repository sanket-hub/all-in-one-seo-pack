import { setOptions } from '@/vue/utils/options'

export default {
	setPong (state, payload) {
		this._vm.$set(state, 'pong', payload)
	},
	loading (state, payload) {
		this._vm.$set(state, 'loading', payload)
	},
	isDirty (state, payload) {
		this._vm.$set(state, 'isDirty', payload)
	},
	analyzer (state, payload) {
		this._vm.$set(state, 'analyzer', payload)
	},
	analyzing (state, payload) {
		this._vm.$set(state, 'analyzing', payload)
	},
	analyzeError (state, payload) {
		this._vm.$set(state, 'analyzeError', payload)
	},
	toggleCard (state, slug) {
		this._vm.$set(state.settings.toggledCards, slug, !state.settings.toggledCards[slug])
	},
	closeCard (state, slug) {
		this._vm.$set(state.settings.toggledCards, slug, false)
	},
	hideUpgradeBar (state) {
		this._vm.$set(state.settings, 'showUpgradeBar', false)
	},
	hideSetupWizard (state) {
		this._vm.$set(state.settings, 'showSetupWizard', false)
	},
	toggleNotifications (state) {
		this._vm.$set(state, 'showNotifications', !state.showNotifications)

		if (!state.showNotifications) {
			this._vm.$set(state, 'showDismissedNotifications', false)
		}
	},
	updateTags (state, tags) {
		this._vm.$set(state, 'tags', tags)
	},
	updateAddon (state, addon) {
		const addons     = state.addons
		const addonIndex = addons.findIndex(a => a.sku === addon.sku)

		if (-1 !== addonIndex) {
			addons[addonIndex] = addon
			this._vm.$set(state, 'addons', addons)
			setOptions({
				addons : addons
			})
		}
	},
	updateOption (state, { groups, key, value }) {
		let options = state.options
		groups.forEach(group => {
			options = options[group]
		})
		this._vm.$set(options, key, value)
	},
	updateOptions (state, options) {
		this._vm.$set(state, 'options', options)
	},
	updateInternalOption (state, { groups, key, value }) {
		let options = state.internalOptions
		groups.forEach(group => {
			options = options[group]
		})
		this._vm.$set(options, key, value)
	},
	toggleRadio (state, { slug, value }) {
		this._vm.$set(state.settings.toggledRadio, slug, value)
	},
	changeTab (state, { slug, value }) {
		this._vm.$set(state.settings.internalTabs, slug, value)
	},
	changePageSettings (state, { setting, value }) {
		this._vm.$set(state.currentPost, setting, value)
	},
	changeTabSettings (state, { setting, value }) {
		this._vm.$set(state.currentPost.tabs, setting, value)
	},
	openModal (state, value) {
		this._vm.$set(state.currentPost, 'modalOpen', value)
	},
	toggleLinkAssistantModal (state) {
		this._vm.$set(state.currentPost.linkAssistant, 'modalOpen', !state.currentPost.linkAssistant.modalOpen)
	},
	toggleRedirectsModal (state) {
		this._vm.$set(state.currentPost.redirects, 'modalOpen', !state.currentPost.redirects.modalOpen)
	},
	changeGeneralPreview (state, value) {
		this._vm.$set(state.currentPost, 'generalMobilePrev', value)
	},
	changeSocialPreview (state, value) {
		this._vm.$set(state.currentPost, 'socialMobilePreview', value)
	},
	changeSchemaSettings (state, { schema, setting, value }) {
		this._vm.$set(state.currentPost.schema_type_options[schema], setting, value)
	},
	updateNotifications (state, payload) {
		if (payload.new.length && window.aioseoNotifications) {
			this._vm.$set(window.aioseoNotifications, 'newNotifications', payload.new.length)
		}
		this._vm.$set(state, 'notifications', payload)
	},
	toggleDismissedNotifications (state, payload) {
		this._vm.$set(state, 'showDismissedNotifications', payload)
	},
	setLicense (state, payload) {
		this._vm.$set(state, 'license', payload)
	},
	setHtaccessError (state, payload) {
		this._vm.$set(state, 'htaccessError', payload)
	},
	updateState (state, value) {
		this._vm.$set(state, 'currentPost', value)
	},
	updateBackups (state, backups) {
		this._vm.$set(state, 'backups', backups)
	},
	updatePostPermalinkPath (state, slug) {
		this._vm.$set(state.currentPost, 'permalinkPath', slug)
	},
	updatePostStatus (state, status) {
		this._vm.$set(state.currentPost, 'postStatus', status)
	}
}