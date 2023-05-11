import { setOptions } from '@/vue/utils/options'

let skipNextPostSettingsUpdate = false

export default {
	linkDelete ({ commit, dispatch, rootState }, { postId, linkId, linksReport, postReport }) {
		const slug = linksReport ? 'links-report-inner' : postReport ? 'post-report' : 'post-settings'
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/${slug}/links/delete`))
			.send({
				postId : postId,
				linkId : linkId
			})
			.then(response => {
				if (!linksReport && !postReport) {
					if (response.body) {
						const currentPost               = rootState.currentPost
						currentPost.linkAssistant.links = response.body.links
						commit('updateState', currentPost, { root: true })
					}
					return
				}

				dispatch('getOverviewData')

				if (postReport) {
					return
				}

				if (linksReport) {
					dispatch('setLinksReportCounts')
				}
			})
	},
	linksBulk ({ commit, dispatch, rootState }, { postId, action, linkType, linkIds, linksReport, postReport }) {
		const slug = linksReport ? 'links-report-inner' : postReport ? 'post-report' : 'post-settings'
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/${slug}/links/bulk`))
			.send({
				postId   : postId,
				action   : action,
				linkType : linkType,
				linkIds  : linkIds
			})
			.then(response => {
				if (!linksReport && !postReport) {
					if (response.body) {
						const currentPost               = rootState.currentPost
						currentPost.linkAssistant.links = response.body.links
						commit('updateState', currentPost, { root: true })
					}
					return
				}

				dispatch('getOverviewData')

				if (postReport) {
					return
				}

				if (linksReport) {
					dispatch('setLinksReportCounts')
				}
			})
	},
	linksRefresh ({ commit, dispatch }, { postId, linksReport, postReport }) {
		const slug = linksReport ? 'links-report-inner' : postReport ? 'post-report' : 'post-settings'
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/${slug}/refresh`))
			.send({
				postId : postId
			}).then(() => {
				commit('updatePrioritizedPosts', {
					postId : postId
				})

				if (linksReport) {
					dispatch('setLinksReportCounts')
				}

				dispatch('pollSuggestionsScan')
				// Don't need to get the overview data here since the poll does it for us.
			}).catch((error) => {
				console.error('Couldn\'t prioritize the post for the next scan.', error)
			})
	},
	suggestionDismiss ({ commit, dispatch, rootState }, { postIndex, postId, suggestionId, linksReport, postReport }) {
		const slug = linksReport ? 'links-report-inner' : postReport ? 'post-report' : 'post-settings'
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/${slug}/suggestions/dismiss`))
			.send({
				postId       : postId || rootState.aioseo.currentPost.id,
				suggestionId : suggestionId
			})
			.then(response => {
				if (!linksReport && !postReport) {
					if (response.body) {
						const currentPost               = rootState.currentPost
						currentPost.linkAssistant.links = response.body.links
						commit('updateState', currentPost, { root: true })
					}
					return
				}

				if (postReport) {
					return
				}

				if (linksReport) {
					commit('updateLinksReportInner', {
						postIndex : postIndex,
						links     : response.body.links
					})
					dispatch('getOverviewData')
					dispatch('setLinksReportCounts')
				}
			})
	},
	suggestionsBulk ({ commit, dispatch, rootState }, { postId, action, suggestionType, suggestionRows, linksReport, postReport }) {
		const slug = linksReport ? 'links-report-inner' : postReport ? 'post-report' : 'post-settings'
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/${slug}/suggestions/bulk`))
			.send({
				postId         : postId,
				action         : action,
				suggestionType : suggestionType,
				suggestionRows : suggestionRows
			})
			.then(response => {
				if (!linksReport && !postReport) {
					if (response.body) {
						const currentPost               = rootState.currentPost
						currentPost.linkAssistant.links = response.body.links
						commit('updateState', currentPost, { root: true })
					}
					return
				}

				dispatch('getOverviewData')

				if (postReport) {
					return
				}

				if (linksReport) {
					dispatch('setLinksReportCounts')
				}
			})
	},
	fetchLinksReport ({ commit, dispatch }, { orderBy, orderDir, limit, offset, searchTerm, filter, additionalFilters }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/links-report/${filter}`))
			.send({
				orderBy,
				orderDir,
				limit,
				offset,
				searchTerm,
				additionalFilters
			})
			.then(response => {
				commit('updateLinksReport', response.body.linksReport)
				dispatch('getOverviewData')
				dispatch('setLinksReportCounts')
			})
	},
	fetchLinksReportInner ({ commit, dispatch }, { filter, additionalFilters }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/links-report-inner/${filter}`))
			.send({
				additionalFilters
			})
			.then(response => {
				commit('updateLinksReportInner', {
					postIndex : additionalFilters.postIndex,
					links     : response.body.links
				})

				dispatch('getOverviewData')
			})
	},
	fetchDomainsReport ({ commit, dispatch }, { orderBy, orderDir, limit, offset, searchTerm, filter, additionalFilters }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/domains-report/${filter}`))
			.send({
				orderBy,
				orderDir,
				limit,
				offset,
				searchTerm,
				additionalFilters
			})
			.then(response => {
				commit('updateDomainsReport', response.body.domainsReport)
				dispatch('getOverviewData')
			})
	},
	fetchDomainsReportInner ({ commit, dispatch }, { orderBy, orderDir, offset, searchTerm, filter, additionalFilters }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/domains-report-inner/${filter}`))
			.send({
				orderBy,
				orderDir,
				offset,
				searchTerm,
				additionalFilters
			})
			.then(response => {
				commit('updateDomainsReportInner', {
					domainIndex : additionalFilters.domainIndex,
					domain      : additionalFilters.domain,
					posts       : response.body.posts
				})

				dispatch('getOverviewData')
			})
	},
	fetchPostReport ({ commit }, { orderBy, orderDir, limit, offset, searchTerm, filter, additionalFilters = {} }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/post-report/${filter}`))
			.send({
				orderBy,
				orderDir,
				limit,
				offset,
				searchTerm,
				additionalFilters
			})
			.then(response => {
				if (additionalFilters.type) {
					commit('updatePostReportLinks', {
						postIndex : additionalFilters.postIndex,
						links     : response.body.links,
						type      : additionalFilters.type
					})
				}
				return response
			})
	},
	linksReportDeleteAll (context, { postId }) {
		return this._vm.$http.delete(this._vm.$links.restUrl(`link-assistant/links-report/post/${postId}`))
	},
	domainsReportBulk ({ state, dispatch }, { action, rowIndexes }) {
		const hostnames = []

		if (Array.isArray(rowIndexes)) {
			rowIndexes.forEach((index) => {
				hostnames.push(Object.keys(state.domainsReport.rows[index])[0])
			})
		} else {
			hostnames.push(Object.keys(state.domainsReport.rows[rowIndexes])[0])
		}

		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/domains-report/bulk/${action}`))
			.send({
				hostnames
			}).then(() => {
				dispatch('getOverviewData')
			})
	},
	domainsReportInnerBulk ({ state, dispatch }, { offset, searchTerm, action, domainIndex, linkIndexes }) {
		const links = []
		if (Array.isArray(linkIndexes)) {
			linkIndexes.forEach((index) => {
				const domainKey  = Object.keys(state.domainsReport.rows[domainIndex])[0]
				const postObject = state.domainsReport.rows[domainIndex][domainKey][index]
				postObject.links.forEach((link) => {
					links.push(link)
				})
			})
		} else {
			const domainKey  = Object.keys(state.domainsReport.rows[domainIndex])[0]
			const postObject = state.domainsReport.rows[domainIndex][domainKey][linkIndexes]
			postObject.links.forEach((link) => {
				links.push(link)
			})
		}

		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/domains-report-inner/bulk/${action}`))
			.send({
				searchTerm,
				links,
				offset
			}).then(() => {
				dispatch('getOverviewData')
			})
	},
	domainsReportInnerLinkUpdate ({ dispatch }, { domain, link }) {
		return this._vm.$http.put(this._vm.$links.restUrl('link-assistant/domains-report-inner/link'))
			.send({
				hostname : domain,
				link     : link
			}).then(() => {
				dispatch('getOverviewData')
			})
	},
	domainsReportInnerLinkDelete ({ dispatch }, { searchTerm, rows, postIndex, linkIndex, offset }) {
		const linkObject = rows[postIndex].links[linkIndex]
		return this._vm.$http.delete(this._vm.$links.restUrl('link-assistant/domains-report-inner/link'))
			.send({
				searchTerm,
				offset,
				link : linkObject
			}).then(() => {
				dispatch('getOverviewData')
			})
	},
	postSettingsUpdate ({ commit, rootState }, { postContent, skipNextRun }) {
		if (skipNextPostSettingsUpdate) {
			skipNextPostSettingsUpdate = false
			return
		}

		this._vm.$bus.$emit('updatingLinks', true)
		return this._vm.$http.post(this._vm.$links.restUrl('link-assistant/post-settings/update'))
			.send({
				postId      : rootState.currentPost.id,
				postContent : postContent
			})
			.then(response => {
				if (response.body) {
					const currentPost               = rootState.currentPost
					currentPost.linkAssistant.links = response.body.links

					commit('updateState', currentPost, { root: true })
					setOptions(this._vm, {
						currentPost
					})
				}

				if (skipNextRun) {
					skipNextPostSettingsUpdate = true
				}
			})
			.catch((error) => {
				console.error('Couldn\'t get updated Link Assistant data:', error)
			}).finally(() => {
				this._vm.$bus.$emit('updatingLinks', false)
			})
	},
	getMenuData ({ commit }) {
		return this._vm.$http.get(this._vm.$links.restUrl('link-assistant/data/menu'))
			.then(response => {
				if (response.body.data) {
					commit('resetState', response.body.data)
					setOptions(this._vm, {
						linkAssistant : response.body.data
					})
				}
			})
	},
	getOverviewData ({ commit }) {
		return this._vm.$http.get(this._vm.$links.restUrl('link-assistant/data/overview'))
			.then(response => {
				if (response.body.data) {
					commit('setOverviewData', response.body.data)
				}
			})
	},
	getPostData ({ commit, rootState }) {
		const postId = rootState.currentPost.id
		return this._vm.$http.get(this._vm.$links.restUrl(`link-assistant/data/post/${postId}`))
			.then(response => {
				if (response.body.data) {
					const currentPost         = rootState.currentPost
					currentPost.linkAssistant = response.body.data.currentPost.linkAssistant

					commit('updateState', currentPost, { root: true })
					commit('resetState', response.body.data)
				}
			})
	},
	triggerScan ({ commit }) {
		return this._vm.$http.get(this._vm.$links.restUrl('link-assistant/data/trigger-scan'))
			.then(response => {
				if (response.body.data) {
					commit('resetState', response.body.data)
					setOptions(this._vm, {
						linkAssistant : response.body.data
					})
				}
			})
	},
	pollSuggestionsScan ({ state, commit, dispatch }) {
		return this._vm.$http.get(this._vm.$links.restUrl('link-assistant/data/suggestions-scan-percent'))
			.then(response => {
				if (response.body && 'percent' in response.body) {
					if (state.suggestionsScan.percent !== response.body.percent) {
						// If the percentage changed, refresh the overview data.
						dispatch('getOverviewData')
					}

					commit('setSuggestionsScanPercent', response.body.percent)

					if (100 !== response.body.percent) {
						setTimeout(() => {
							dispatch('pollSuggestionsScan')
						}, 10000)
					}
				}
			})
	},
	setLinksReportCounts ({ state, commit }) {
		const counts = []
		state.linksReport.rows.forEach((row, index) => {
			counts[index] = {
				inboundInternal     : row.links.inboundInternal.totals.total,
				outboundInternal    : row.links.outboundInternal.totals.total,
				affiliate           : row.links.affiliate.totals.total,
				external            : row.links.external.totals.total,
				suggestionsInbound  : row.links.suggestionsInbound.totals.total,
				suggestionsOutbound : row.links.suggestionsOutbound.totals.total
			}
		})

		commit('setLinksReportCounts', counts)
	}
}