export default {
	updateDomainsReport (state, data) {
		this._vm.$set(state, 'domainsReport', data)
	},
	updateDomainsReportInner (state, { domainIndex, domain, posts }) {
		this._vm.$set(state.domainsReport.rows[domainIndex], domain, posts)
	},
	updateLinksReport (state, data) {
		this._vm.$set(state, 'linksReport', data)
	},
	updateLinksReportInner (state, { postIndex, links }) {
		this._vm.$set(state.linksReport.rows[postIndex], 'links', links)
	},
	updatePostReportLinks (state, { links, type }) {
		this._vm.$set(state.postReport, type, links)
	},
	setPostReportLinks (state, { links }) {
		this._vm.$set(state, 'postReport', links)
	},
	updatePrioritizedPosts (state, { postId }) {
		const prioritizedPostIds = state.linksReport.prioritizedPosts
		prioritizedPostIds.push(postId)
		this._vm.$set(state.linksReport, 'prioritizedPosts', prioritizedPostIds)
	},
	resetState (state, data) {
		if (data.options) {
			this._vm.$set(state, 'options', data.options)
		}

		if (data.internalOptions) {
			this._vm.$set(state, 'internalOptions', data.internalOptions)
		}

		if (data.overview) {
			this._vm.$set(state, 'overview', data.overview)
		}

		if (data.domainsReport) {
			this._vm.$set(state, 'domainsReport', data.domainsReport)
		}

		if (data.linksReport) {
			this._vm.$set(state, 'linksReport', data.linksReport)
		}
	},
	toggleProcessingPopup (state) {
		this._vm.$set(state.suggestionsScan, 'showProcessingPopup', !state.suggestionsScan.showProcessingPopup)
	},
	setSuggestionsScanPercent (state, percent) {
		this._vm.$set(state.suggestionsScan, 'percent', percent)
	},
	setDomainsReportInnerPaginatedPage (state, { domain, page }) {
		const innerPagination   = state.domainsReport.innerPagination || {}
		innerPagination[domain] = page
		this._vm.$set(state.domainsReport, 'innerPagination', innerPagination)
	},
	setOverviewData (state, data) {
		this._vm.$set(state, 'overview', data)
	},
	resetPostReportState (state) {
		this._vm.$set(state, 'postReport', {
			inboundInternal     : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			outboundInternal    : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			affiliate           : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			external            : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			suggestionsInbound  : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			suggestionsOutbound : { rows: [], totals: { page: 1, pages: 1, total: 0 } }
		})
	},
	setLinksReportCounts (state, counts) {
		this._vm.$set(state.linksReport, 'counts', counts)
	}
}