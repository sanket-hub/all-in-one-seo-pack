import { setOptions } from '@/vue/utils/options'

let skipNextPostSettingsUpdate = false

export default {
	linkDelete ({ commit, dispatch, rootState }, { postIndex, postId, linkId, linksReport, postReport }) {
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

				if (postReport) {
					commit('setPostReportLinks', {
						links : { ...response.body.links }
					})
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
	linksBulk ({ commit, dispatch, rootState }, { postIndex, postId, action, linkType, linkIds, linksReport, postReport }) {
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

				if (postReport) {
					commit('setPostReportLinks', {
						links : { ...response.body.links }
					})
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
	linksRefresh ({ commit, dispatch }, { postIndex, postId, linksReport, postReport }) {
		const slug = linksReport ? 'links-report-inner' : postReport ? 'post-report' : 'post-settings'
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/${slug}/refresh`))
			.send({
				postId : postId
			}).then((response) => {
				commit('updatePrioritizedPosts', {
					postId : postId
				})

				if (postReport) {
					commit('setPostReportLinks', {
						links : { ...response.body.links }
					})
				}

				if (linksReport) {
					commit('updateLinksReportInner', {
						postIndex : postIndex,
						links     : response.body.links
					})
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
					commit('setPostReportLinks', {
						links : { ...response.body.links }
					})
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
	suggestionsBulk ({ commit, dispatch, rootState }, { postIndex, postId, action, suggestionType, suggestionRows, linksReport, postReport }) {
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

				if (postReport) {
					commit('setPostReportLinks', {
						links : { ...response.body.links }
					})
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
	linksReportPaginate ({ commit, dispatch }, { page, selectedFilters, searchTerm }) {
		const mainFilter = selectedFilters.mainFilter ? selectedFilters.mainFilter : 'all'
		const termId     = selectedFilters.term ? selectedFilters.term : 0

		let filter = mainFilter
		if (mainFilter && termId) {
			filter = mainFilter + '&' + termId
		}

		// eslint-disable-next-line one-var
		let url = this._vm.$links.restUrl(`link-assistant/links-report/paginate/${filter}/${page}`)
		if (searchTerm) {
			searchTerm = encodeURIComponent(searchTerm)
			url = this._vm.$links.restUrl(`link-assistant/links-report/paginate/${filter}/${page}/${searchTerm}`)
		}

		return this._vm.$http.post(url)
			.then(response => {
				commit('updateLinksReport', response.body.linksReport)
				dispatch('getOverviewData')
				dispatch('setLinksReportCounts')
			})
	},
	linksReportSearch ({ commit, dispatch }, { searchTerm, page }) {
		searchTerm = encodeURIComponent(searchTerm)
		return this._vm.$http.get(this._vm.$links.restUrl(`link-assistant/links-report/search/${searchTerm}/${page}`))
			.then(response => {
				commit('updateLinksReport', response.body.linksReport)
				dispatch('getOverviewData')
				dispatch('setLinksReportCounts')
			})
	},
	linksReportFilter ({ state, commit, dispatch }, { slug }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/links-report/${slug}`))
			.send({
				searchTerm : state.searchTerm
			}).then(response => {
				commit('updateLinksReport', response.body.linksReport)
				dispatch('getOverviewData')
				dispatch('setLinksReportCounts')
			})
	},
	linksReportAdditionalFilter ({ commit, dispatch }, { selectedFilters }) {
		const mainFilter = selectedFilters.mainFilter ? selectedFilters.mainFilter : ''
		const termId     = selectedFilters.term ? selectedFilters.term : 0

		let slug = mainFilter
		if (mainFilter && termId) {
			slug = mainFilter + '&' + termId
		}

		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/links-report/${slug}`))
			.then(response => {
				commit('updateLinksReport', response.body.linksReport)
				dispatch('getOverviewData')
				dispatch('setLinksReportCounts')
			})
	},
	linksReportDeleteAll ({ state, commit, dispatch }, { postId, selectedFilters, searchTerm }) {
		const mainFilter = selectedFilters.mainFilter ? selectedFilters.mainFilter : ''
		const termId     = selectedFilters.term ? selectedFilters.term : 0

		return this._vm.$http.delete(this._vm.$links.restUrl(`link-assistant/links-report/post/${postId}`))
			.send({
				currentPage : state.linksReport.totals.page,
				searchTerm  : searchTerm,
				filter      : mainFilter,
				termId      : termId
			})
			.then(response => {
				commit('updateLinksReport', response.body.linksReport)
				dispatch('getOverviewData')
				dispatch('setLinksReportCounts')
			})
	},
	domainsReportPaginate ({ commit, dispatch }, { page, searchTerm }) {
		let url = this._vm.$links.restUrl(`link-assistant/domains-report/paginate/${page}`)
		if (searchTerm) {
			searchTerm = encodeURIComponent(searchTerm)
			url = this._vm.$links.restUrl(`link-assistant/domains-report/paginate/${page}/${searchTerm}`)
		}
		return this._vm.$http.post(url)
			.then(response => {
				commit('updateDomainsReport', response.body.domainsReport)
				dispatch('getOverviewData')
			})
	},
	domainsReportBulk ({ state, commit, dispatch }, { action, searchTerm, rowIndexes }) {
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
				currentPage : state.domainsReport.totals.page,
				searchTerm  : searchTerm,
				hostnames   : hostnames
			}).then(response => {
				commit('updateDomainsReport', response.body.domainsReport)
				dispatch('getOverviewData')
			})
	},
	domainsReportSearch ({ commit, dispatch }, { searchTerm, page }) {
		searchTerm = encodeURIComponent(searchTerm)
		return this._vm.$http.get(this._vm.$links.restUrl(`link-assistant/domains-report/search/${searchTerm}/${page}`))
			.then(response => {
				commit('updateDomainsReport', response.body.domainsReport)
				dispatch('getOverviewData')
			})
	},
	domainsReportInnerPaginate ({ commit, dispatch }, { domainIndex, domain, page }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/domains-report-inner/paginate/${domain}/${page}`))
			.then(response => {
				commit('updateDomainsReportInner', {
					domainIndex,
					domain,
					posts : response.body.posts
				})

				dispatch('getOverviewData')
			})
	},
	domainsReportInnerBulk ({ state, commit, dispatch }, { searchTerm, action, domainIndex, linkIndexes }) {
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
				searchTerm  : searchTerm,
				currentPage : state.domainsReport.totals.page,
				links       : links
			}).then(response => {
				commit('updateDomainsReport', response.body.domainsReport)
				dispatch('getOverviewData')
			})
	},
	domainsReportInnerLinkUpdate ({ commit, dispatch }, { domainIndex, domain, link }) {
		return this._vm.$http.put(this._vm.$links.restUrl('link-assistant/domains-report-inner/link'))
			.send({
				hostname : domain,
				link     : link
			}).then(response => {
				commit('updateDomainsReportInner', {
					domainIndex,
					domain,
					posts : response.body.posts
				})

				dispatch('getOverviewData')
			})
	},
	domainsReportInnerLinkDelete ({ state, commit, dispatch }, { searchTerm, rows, postIndex, linkIndex }) {
		const linkObject = rows[postIndex].links[linkIndex]
		return this._vm.$http.delete(this._vm.$links.restUrl('link-assistant/domains-report-inner/link'))
			.send({
				searchTerm  : searchTerm,
				currentPage : state.domainsReport.totals.page,
				link        : linkObject
			}).then(response => {
				commit('updateDomainsReport', response.body.domainsReport)
				dispatch('getOverviewData')
			})
	},
	postReportInitial (context, postId) {
		return this._vm.$http.get(this._vm.$links.restUrl(`link-assistant/post-report/${postId}`))
			.then(response => {
				return response
			})
	},
	postReportPaginate ({ commit }, { postId, postIndex, page, type }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`link-assistant/post-report/paginate/${page}`))
			.send({
				postId : postId,
				type   : type
			}).then(response => {
				commit('updatePostReportLinks', {
					postIndex : postIndex,
					links     : response.body.links,
					type      : type
				})
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
					setOptions({
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
					setOptions({
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
					setOptions({
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