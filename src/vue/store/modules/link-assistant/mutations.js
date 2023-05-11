export default {
	updateDomainsReport (state, data) {
		state.domainsReport = data
	},
	updateDomainsReportInner (state, { domainIndex, domain, posts }) {
		state.domainsReport.rows[domainIndex][domain] = posts
	},
	updateLinksReport (state, data) {
		state.linksReport = data
	},
	updateLinksReportInner (state, { postIndex, links }) {
		if ('undefined' === typeof postIndex) {
			return
		}
		state.linksReport.rows[postIndex].links = links
	},
	updatePostReportLinks (state, { links, type }) {
		state.postReport[type] = links
	},
	setPostReportLinks (state, { links }) {
		state.postReport = links
	},
	updatePrioritizedPosts (state, { postId }) {
		const prioritizedPostIds = state.linksReport.prioritizedPosts
		prioritizedPostIds.push(postId)
		state.linksReport.prioritizedPosts = prioritizedPostIds
	},
	resetState (state, data) {
		if (data.options) {
			state.options = data.options
		}

		if (data.internalOptions) {
			state.internalOptions = data.internalOptions
		}

		if (data.overview) {
			state.overview = data.overview
		}

		if (data.domainsReport) {
			state.domainsReport = data.domainsReport
		}

		if (data.linksReport) {
			state.linksReport = data.linksReport
		}
	},
	toggleProcessingPopup (state) {
		state.suggestionsScan.showProcessingPopup = !state.suggestionsScan.showProcessingPopup
	},
	setSuggestionsScanPercent (state, percent) {
		state.suggestionsScan.percent = percent
	},
	setDomainsReportInnerPaginatedPage (state, { domain, page }) {
		const innerPagination   = state.domainsReport.innerPagination || {}
		innerPagination[domain] = page
		state.domainsReport.innerPagination = innerPagination
	},
	setOverviewData (state, data) {
		state.overview = data
	},
	resetPostReportState (state) {
		state.postReport = {
			inboundInternal     : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			outboundInternal    : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			affiliate           : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			external            : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			suggestionsInbound  : { rows: [], totals: { page: 1, pages: 1, total: 0 } },
			suggestionsOutbound : { rows: [], totals: { page: 1, pages: 1, total: 0 } }
		}
	},
	setLinksReportCounts (state, counts) {
		state.linksReport.counts = counts
	}
}