import { setOptions } from '@/vue/utils/options'
import { __ } from '@wordpress/i18n'

const td = process.env.VUE_APP_TEXTDOMAIN

let cachedCurrentPost = null

const prepareCachedCurrentPost = (currentPost) => {
	const ignore = [ 'modalOpen', 'seo_score', 'page_analysis' ]
	const copy   = JSON.parse(JSON.stringify(currentPost))

	ignore.forEach((property) => {
		delete copy[property]
	})

	return JSON.stringify(copy)
}

const clearLicenseNotices = () => {
	const addLicenseKey1 = document.querySelector('.aioseo-submenu-highlight.red')
	if (addLicenseKey1) {
		addLicenseKey1.remove()
	}

	const addLicenseKey2 = document.querySelector('#wp-admin-bar-aioseo-pro-license')
	if (addLicenseKey2) {
		addLicenseKey2.remove()
	}
}

const clearNotificationNotices = notifications => {
	const notificationCount = document.querySelector('.aioseo-menu-notification-counter')
	if (notificationCount) {
		if (notifications.active.length) {
			notificationCount.innerText = notifications.active.length
		} else {
			notificationCount.remove()
			const notificationIndicator = document.querySelector('#wp-admin-bar-aioseo-notifications')
			if (notificationIndicator) {
				notificationIndicator.remove()
			}

			// Remove from the sidebar too
			const sidebarNotificationsLink      = document.querySelector('#toplevel_page_aioseo .wp-first-item')
			const sidebarNotificationsLinkPulse = document.querySelector('#toplevel_page_aioseo .wp-first-item .aioseo-menu-notification-indicator')
			if (sidebarNotificationsLink && sidebarNotificationsLink.contains(sidebarNotificationsLinkPulse)) {
				sidebarNotificationsLink.remove()
			}
		}
	}
}

export default {
	ping ({ commit }) {
		this._vm.$http.get(this._vm.$links.restUrl('ping'))
			.catch(() => {
				commit('setPong', false)
			})
	},
	toggleCard ({ commit, state }, { slug, shouldSave }) {
		commit('toggleCard', slug)
		setOptions({
			options  : state.options,
			settings : state.settings
		})

		if (shouldSave) {
			this._vm.$http.post(this._vm.$links.restUrl('settings/toggle-card'))
				.send({
					card : slug
				})
				.then(() => {})
		}
	},
	toggleRadio ({ commit, state }, { slug, value }) {
		commit('toggleRadio', { slug, value })
		setOptions({
			options  : state.options,
			settings : state.settings
		})
		this._vm.$http.post(this._vm.$links.restUrl('settings/toggle-radio'))
			.send({
				radio : slug,
				value : value
			})
			.then(() => {})
	},
	changeTab ({ commit, state }, { slug, value }) {
		commit('changeTab', { slug, value })
		setOptions({
			options  : state.options,
			settings : state.settings
		})
	},
	changePageSettings ({ commit, state }, { setting, value }) {
		commit('changePageSettings', { setting, value })
		setOptions({
			currentPost : state.currentPost
		})
		return this._vm.$http.post(this._vm.$links.restUrl('post'))
			.send(state.currentPost)
			.then(() => {})
	},
	changeTabSettings ({ commit, state }, { setting, value }) {
		commit('changeTabSettings', { setting, value })
		setOptions({
			currentPost : state.currentPost
		})
	},
	openModal ({ commit }, value) {
		commit('openModal', value)
	},
	changeGeneralPreview ({ commit, state }, value) {
		commit('changeGeneralPreview', value)
		setOptions({
			currentPost : state.currentPost
		})
	},
	changeSocialPreview ({ commit, state }, value) {
		commit('changeSocialPreview', value)
		setOptions({
			currentPost : state.currentPost
		})
	},
	changeSchemaSettings ({ commit, state }, { schema, setting, value }) {
		commit('changeSchemaSettings', { schema, setting, value })
		setOptions({
			currentPost : state.currentPost
		})
		return this._vm.$http.post(this._vm.$links.restUrl('post'))
			.send(state.currentPost)
			.then(() => {})
	},
	getConnectUrl (context, { key, wizard }) {
		return this._vm.$http.post(this._vm.$links.restUrl('connect-url'))
			.send({
				licenseKey : key.trim(),
				wizard
			})
	},
	processConnect ({ rootState }, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('connect-pro'))
			.send({
				downloadUrl : payload.file,
				token       : payload.token,
				wizard      : payload.wizard ? JSON.stringify(rootState.wizard) : null
			})
	},
	saveConnectToken ({ commit, state }, token) {
		commit('updateInternalOption', { groups: [ 'internal', 'siteAnalysis' ], key: 'connectToken', value: token })
		setOptions({
			options : state.options
		})
		return this._vm.$http.post(this._vm.$links.restUrl('connect'))
			.send({
				token
			})
	},
	runSiteAnalyzer ({ commit }, payload = {}) {
		commit('analyzer', 'competitor-site')
		return this._vm.$http.post(this._vm.$links.restUrl('analyze'))
			.send({
				url     : payload.url,
				refresh : payload.refresh
			})
			.then(response => {
				if (payload.url) {
					commit('updateInternalOption', { groups: [ 'internal', 'siteAnalysis' ], key: 'competitors', value: response.body })
					commit('analyzing', false)
					return response
				}

				commit('updateInternalOption', { groups: [ 'internal', 'siteAnalysis' ], key: 'score', value: response.body.score })
				commit('updateInternalOption', { groups: [ 'internal', 'siteAnalysis' ], key: 'results', value: JSON.stringify(response.body.results) })
				commit('analyzing', false)
			})
			.catch(error => {
				commit('analyzing', false)
				let message = __('We couldn\'t connect to the site, please try again later.', td)
				if (error.response.body.response && error.response.body.response.error) {
					message = error.response.body.response.error
				}

				commit('analyzeError', message)
			})
	},
	runHeadlineAnalyzer ({ commit }, payload = {}) {
		commit('analyzer', 'headline')
		return this._vm.$http.post(this._vm.$links.restUrl('analyze_headline'))
			.send({
				headline            : payload.headline,
				shouldStoreHeadline : payload.shouldStoreHeadline
			})
			.then(response => {
				commit('updateInternalOption', { groups: [ 'internal', 'headlineAnalysis' ], key: 'headlines', value: response.body })
				commit('analyzing', false)
			})
			.catch(error => {
				commit('analyzing', false)
				let message = __('We couldn\'t analyze your title, please try again later.', td)
				if (error.response.body && error.response.body.message) {
					message = error.response.body.message
				}

				commit('analyzeError', message)
			})
	},
	deleteCompetitorSite ({ commit }, url) {
		return this._vm.$http.post(this._vm.$links.restUrl('analyze/delete-site'))
			.send({
				url
			})
			.then(response => {
				commit('updateInternalOption', { groups: [ 'internal', 'siteAnalysis' ], key: 'competitors', value: response.body })
				commit('analyzing', false)
			})
	},
	deleteHeadline ({ commit }, headline) {
		return this._vm.$http.post(`${this._vm.$aioseo.urls.restUrl}aioseo/v1/analyze_headline/delete/`)
			.send({
				headline
			})
			.then(response => {
				commit('updateInternalOption', { groups: [ 'internal', 'siteAnalysis' ], key: 'headlines', value: response.body })
				commit('analyzing', false)
			})
	},
	activate ({ commit }, key) {
		return this._vm.$http.post(this._vm.$links.restUrl('activate'))
			.send({
				licenseKey : key.trim()
			})
			.then(response => {
				commit('updateNotifications', response.body.notifications)
				commit('updateOption', { groups: [ 'general' ], key: 'licenseKey', value: key })
				if (response.body.licenseData) {
					Object.keys(response.body.licenseData).forEach(key => {
						commit('updateInternalOption', { groups: [ 'internal', 'license' ], key, value: response.body.licenseData[key] })
					})
					commit('setLicense', response.body.license)

					clearLicenseNotices()
					clearNotificationNotices(response.body.notifications)
				}

				return response
			})
			.then(response => {
				this._vm.$nextTick(() => {
					setOptions({
						license : response.body.license
					})
				})
			})
	},
	deactivate ({ commit }) {
		return this._vm.$http.post(this._vm.$links.restUrl('deactivate'))
			.send({})
			.then(response => {
				commit('updateNotifications', response.body.notifications)
				commit('updateOption', { groups: [ 'general' ], key: 'licenseKey', value: null })
				if (response.body.licenseData) {
					Object.keys(response.body.licenseData).forEach(key => {
						commit('updateInternalOption', { groups: [ 'internal', 'license' ], key, value: response.body.licenseData[key] })
					})
					commit('setLicense', response.body.license)

					this._vm.$aioseo.isUnlicensed = true
				}

				return response
			})
			.then(response => {
				this._vm.$nextTick(() => {
					setOptions({
						license : response.body.license
					})
				})
			})
	},
	hideUpgradeBar ({ commit, state }) {
		commit('hideUpgradeBar')
		setOptions({
			options  : state.options,
			settings : state.settings
		})
		return this._vm.$http.post(this._vm.$links.restUrl('settings/hide-upgrade-bar'))
			.send({})
			.then(() => {})
	},
	hideSetupWizard ({ commit, state }) {
		commit('hideSetupWizard')
		setOptions({
			options  : state.options,
			settings : state.settings
		})
		return this._vm.$http.post(this._vm.$links.restUrl('settings/hide-setup-wizard'))
			.send({})
			.then(() => {})
	},
	saveChanges ({ state, commit }) {
		setOptions({
			redirects      : state.redirects,
			options        : state.options,
			dynamicOptions : state.dynamicOptions,
			settings       : state.settings,
			indexNow       : state['index-now']
		})

		const options = {
			options        : state.options,
			dynamicOptions : state.dynamicOptions,
			network        : this._vm.$aioseo.data.network
		}

		switch (this._vm.$aioseo.page) {
			case 'redirects': {
				options.redirectOptions = state.redirects.options
				break
			}
			case 'link-assistant': {
				options.linkAssistantOptions = state.linkAssistant.options
				break
			}
			case 'settings': {
				options.indexNowOptions = state['index-now'].options
				break
			}
			default:
				break
		}
		return this._vm.$http.post(this._vm.$links.restUrl('options'))
			.send(options)
			.then(response => {
				commit('updateNotifications', response.body.notifications)
				commit('original/setOriginalOptions', JSON.parse(JSON.stringify(state.options)), { root: true })
				commit('original/setOriginalDynamicOptions', JSON.parse(JSON.stringify(state.dynamicOptions)), { root: true })

				if (state.redirects && state.redirects.options) {
					commit('original/setOriginalRedirectOptions', JSON.parse(JSON.stringify(state.redirects.options)), { root: true })
				}

				if (state['index-now'] && state['index-now'].options) {
					commit('original/setOriginalIndexNowOptions', JSON.parse(JSON.stringify(state['index-now'].options)), { root: true })
				}

				if (response.body.redirection) {
					if ('reload' === response.body.redirection) {
						window.location.reload()
					} else {
						window.location.href = response.body.redirection
					}
				}

				return response
			})
	},
	saveHtaccess ({ commit }) {
		return this._vm.$http.post(this._vm.$links.restUrl('htaccess'))
			.send({
				htaccess : this._vm.$aioseo.data.htaccess
			})
			.then(() => {})
			.catch(error => {
				commit('setHtaccessError', error.response.body.message)
			})
	},
	saveCurrentPost ({ commit }, payload) {
		commit('updateState', payload)
		setOptions({
			currentPost : payload
		})
		return this._vm.$http.post(this._vm.$links.restUrl('post'))
			.send(payload)
			.then(() => {})
			.catch((error) => {
				console.error(`Unable to update the post data: ${error}`)
			})
	},
	installPlugins ({ state, commit }, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('plugins/install'))
			.send(payload)
			.then(response => {
				if (!response.body.success) {
					throw new Error(response.body.message)
				}

				Object.keys(response.body.completed).forEach(sku => {
					const basename = response.body.completed[sku]
					const addon    = state.addons.find(item => sku === item.sku)
					if (addon) {
						addon.basename = basename
						commit('updateAddon', addon)
					}
				})

				return response
			})
	},
	upgradePlugins ({ state, commit }, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('plugins/upgrade'))
			.send(payload)
			.then(response => {
				if (!response.body.success) {
					throw new Error(response.body.message)
				}

				Object.keys(response.body.completed).forEach(sku => {
					const basename = response.body.completed[sku].basename
					const addon    = state.addons.find(item => sku === item.sku)
					if (addon) {
						addon.basename = basename
						commit('updateAddon', addon)
					}
				})

				return response
			})
	},
	deactivatePlugins (context, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('plugins/deactivate'))
			.send(payload)
			.then(response => {
				return response
			})
	},
	getObjects (context, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('objects'))
			.send(payload)
			.then(response => {
				if (!response.body.success) {
					throw new Error(response.body.message)
				}

				return response
			})
	},
	dismissNotifications ({ commit, state }, payload) {
		const reversed            = payload.reverse()
		const activeNotifications = state.notifications.active
		reversed.forEach(slug => {
			const notificationIndex = activeNotifications.findIndex(n => n.slug === slug)
			if (-1 !== notificationIndex) {
				this._vm.$delete(activeNotifications, notificationIndex)
			}
		})
		this._vm.$set(state.notifications, 'active', activeNotifications)

		return this._vm.$http.post(this._vm.$links.restUrl('notifications/dismiss'))
			.send(payload)
			.then(response => {
				commit('updateNotifications', response.body.notifications)
				if (!response.body.success) {
					throw new Error(response.body.message)
				}

				clearNotificationNotices(response.body.notifications)
			})
	},
	processButtonAction ({ commit }, action) {
		return this._vm.$http.post(this._vm.$links.restUrl(`${action}`))
			.send({
				network : this._vm.$aioseo.data.network
			})
			.then(response => {
				commit('updateNotifications', response.body.notifications)
				if (!response.body.success) {
					throw new Error(response.body.message)
				}
			})
	},
	resetSettings (context, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('reset-settings'))
			.send({
				settings : payload
			})
	},
	clearLog (context, log) {
		return this._vm.$http.post(this._vm.$links.restUrl('clear-log'))
			.send({
				log
			})
			.then(response => {
				this._vm.$aioseo.data.logSizes[log] = response.body.logSize
			})
	},
	emailDebugInfo (context, emailAddress) {
		return this._vm.$http.post(this._vm.$links.restUrl('email-debug-info'))
			.send({
				email : emailAddress
			})
	},
	updateState ({ commit }, value) {
		commit('updateState', value)
		setOptions({
			currentPost : value
		})
	},
	updateKeyphrases ({ state }, payload) {
		setOptions({
			currentPost : state.currentPost
		})
		return this._vm.$http.post(this._vm.$links.restUrl('keyphrases'))
			.send(payload)
			.then(() => {})
			.catch((error) => {
				console.error(`Unable to update the keyphrases: ${error}`)
			})
	},
	isDirty ({ commit }, value) {
		commit('isDirty', value)
	},
	getTags ({ commit }) {
		return this._vm.$http.get(this._vm.$links.restUrl('tags'))
			.then(response => {
				commit('updateTags', response.body.tags)
				setOptions({
					tags : response.body.tags
				})
			})
	},
	uploadFile ({ commit }, { file, filename }) {
		return this._vm.$http.post(this._vm.$links.restUrl('settings/import'))
			.attach('file', file, filename)
			.then(response => {
				if (response.body.license) {
					commit('setLicense', response.body.license)
					clearLicenseNotices()
				}
				setOptions({
					options : response.body.options
				})
			})
	},
	exportSettings (context, { settings, postOptions }) {
		return this._vm.$http.post(this._vm.$links.restUrl('settings/export'))
			.send({
				settings,
				postOptions
			})
	},
	createBackup ({ commit }) {
		return this._vm.$http.post(this._vm.$links.restUrl('backup'))
			.then(response => {
				commit('updateBackups', response.body.backups)
			})
	},
	restoreBackup ({ commit }, backup) {
		return this._vm.$http.post(this._vm.$links.restUrl('backup/restore'))
			.send({
				backup
			})
			.then(response => {
				if (response.body.license) {
					commit('setLicense', response.body.license)
					clearLicenseNotices()
				}
				commit('updateBackups', response.body.backups)
				setOptions({
					options         : response.body.options,
					internalOptions : response.body.internalOptions
				})
			})
	},
	deleteBackup ({ commit }, backup) {
		return this._vm.$http.delete(this._vm.$links.restUrl('backup'))
			.send({
				backup
			})
			.then(response => {
				commit('updateBackups', response.body.backups)
			})
	},
	importPlugins (context, plugins) {
		return this._vm.$http.post(this._vm.$links.restUrl('settings/import-plugins'))
			.send({
				plugins
			})
	},
	savePostState ({ state, dispatch }) {
		// In some contexts, the state might not have loaded fully and still be an Observer object.
		if (!state || !state.currentPost || !Object.keys(state.currentPost).length) {
			return
		}

		// Cache a stringified version the state.currentPost so we don't have a reference of the original state anymore.
		if (null === cachedCurrentPost) {
			cachedCurrentPost = prepareCachedCurrentPost(state.currentPost)
		}

		// If the currentPost changed, emit a global event.
		if (cachedCurrentPost !== prepareCachedCurrentPost(state.currentPost)) {
			this._vm.$bus.$emit('postSettingsUpdated')
		}

		dispatch('updateState', state.currentPost)
		const postField = document.querySelector('#aioseo-post-settings')
		if (postField) {
			postField.value = JSON.stringify(state.currentPost)
		}
		if ('term' === state.currentPost.context) {
			const termField = document.querySelector('#aioseo-term-settings')
			if (termField) {
				termField.value = JSON.stringify(state.currentPost)
			}
		}
	},
	doTask (context, actionName) {
		return this._vm.$http.post(this._vm.$links.restUrl('settings/do-task')).send({
			action : actionName
		}).then((response) => {
			if (!response || !response.statusCode || 400 === response.statusCode) {
				return Promise.reject(new Error(`Task ${actionName} could not be completed.`))
			}
		})
	}
}