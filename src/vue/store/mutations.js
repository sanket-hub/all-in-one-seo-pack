import { setOptions } from '@/vue/utils/options'
import schemaMutations from './mutations/schema'

export default {
	...schemaMutations,
	setPong (state, payload) {
		state.pong = payload
	},
	loading (state, payload) {
		state.loading = payload
	},
	isDirty (state, payload) {
		state.isDirty = payload
	},
	analyzer (state, payload) {
		state.analyzer = payload
	},
	analyzing (state, payload) {
		state.analyzing = payload
	},
	analyzeError (state, payload) {
		state.analyzeError = payload
	},
	toggleCard (state, slug) {
		state.settings.toggledCards[slug] = !state.settings.toggledCards[slug]
	},
	closeCard (state, slug) {
		state.settings.toggledCards[slug] = false
	},
	hideUpgradeBar (state) {
		state.settings.showUpgradeBar = false
	},
	hideSetupWizard (state) {
		state.settings.showSetupWizard = false
	},
	toggleNotifications (state) {
		state.showNotifications = !state.showNotifications

		if (!state.showNotifications) {
			state.showDismissedNotifications = false
		}
	},
	disableForceShowNotifications (state) {
		state.notifications.force = false
	},
	updateTags (state, tags) {
		state.tags = tags
	},
	updateAddon (state, addon) {
		const addons     = state.addons
		const addonIndex = addons.findIndex(a => a.sku === addon.sku)

		if (-1 !== addonIndex) {
			addons[addonIndex] = addon
			state.addons = addons
			setOptions(this._vm, {
				addons
			})
		}
	},
	updateOption (state, { groups, key, value }) {
		let options = state.options
		groups.forEach(group => {
			options = options[group]
		})
		options[key] = value
	},
	updateOptions (state, options) {
		state.options = options
	},
	updateInternalOption (state, { groups, key, value }) {
		let options = state.internalOptions
		groups.forEach(group => {
			options = options[group]
		})
		options[key] = value
	},
	toggleRadio (state, { slug, value }) {
		state.settings.toggledRadio[slug] = value
	},
	dismissAlert (state, slug) {
		state.settings.dismissedAlerts[slug] = true
	},
	changeItemsPerPage (state, { slug, value }) {
		state.settings.tablePagination[slug] = value
	},
	changeTab (state, { slug, value }) {
		state.settings.internalTabs[slug] = value
	},
	changePageSettings (state, { setting, value }) {
		state.currentPost[setting] = value
	},
	changeTabSettings (state, { setting, value }) {
		state.metaBoxTabs[setting] = value
	},
	openModal (state, value) {
		state.currentPost.modalOpen = value
	},
	toggleLinkAssistantModal (state) {
		state.currentPost.linkAssistant.modalOpen = !state.currentPost.linkAssistant.modalOpen
	},
	toggleRedirectsModal (state) {
		state.currentPost.redirects.modalOpen = !state.currentPost.redirects.modalOpen
	},
	changeGeneralPreview (state, value) {
		state.currentPost.generalMobilePrev = value
	},
	changeSocialPreview (state, value) {
		state.currentPost.socialMobilePreview = value
	},
	changeSchemaSettings (state, { schema, setting, value }) {
		state.currentPost.schema_type_options[schema][setting] = value
	},
	updateNotifications (state, payload) {
		if (payload.new.length && window.aioseoNotifications) {
			window.aioseoNotifications.newNotifications = payload.new.length
		}
		state.notifications = payload
	},
	toggleDismissedNotifications (state, payload) {
		state.showDismissedNotifications = payload
	},
	setLicense (state, payload) {
		state.license = payload
	},
	setHtaccessError (state, payload) {
		state.htaccessError = payload
	},
	updateState (state, value) {
		state.currentPost = value
	},
	updateBackups (state, backups) {
		state.backups = backups
	},
	updatePostPermalinkPath (state, slug) {
		state.currentPost.permalinkPath = slug
	},
	updatePostStatus (state, status) {
		state.currentPost.postStatus = status
	},
	updateAdditionalPages (state, pages) {
		state.options.sitemap.general.additionalPages.pages = pages
	},
	incrementInternalLinkCount (state) {
		const count = state.currentPost.options.linkFormat.internalLinkCount || 0
		state.currentPost.options.linkFormat.internalLinkCount = count + 1
	},
	disablePrimaryTermEducation (state) {
		state.currentPost.options.primaryTerm.productEducationDismissed = true
	},
	disableLinkAssistantEducation (state) {
		state.currentPost.options.linkFormat.linkAssistantDismissed = true
	},
	// Network mutations.
	updateNetworkOption (state, { groups, key, value }) {
		let options = state.networkOptions
		groups.forEach(group => {
			options = options[group]
		})
		options[key] = value
	},
	updateInternalNetworkOption (state, { groups, key, value }) {
		let options = state.internalNetworkOptions
		groups.forEach(group => {
			options = options[group]
		})
		options[key] = value
	},
	updateNetworkBackups (state, { backups, siteId }) {
		state.networkBackups[siteId] = backups
	},
	updateNetworkData (state, { key, data }) {
		state.networkData[key] = data
	},
	updateNetworkRobots (state, rules) {
		state.networkRobots.rules = rules
	},
	updateNetworkRobotsSite (state, siteId) {
		state.networkRobots.siteId = siteId
	},
	setModalState (state, { modalName, value }) {
		state.modals[modalName] = value
	},
	setOpenAiData (state, { type, suggestions, usage }) {
		state.currentPost.open_ai[type].suggestions = suggestions
		state.currentPost.open_ai[type].usage = usage
	},
	setOpenAiError (state, error) {
		state.openAiError = error
	},
	updateTitle (state, title) {
		state.currentPost.title = title

		this._vm.$bus.$emit('updateTitleKey')
	},
	updateDescription (state, description) {
		state.currentPost.description = description

		this._vm.$bus.$emit('updateDescriptionKey')
	}
}