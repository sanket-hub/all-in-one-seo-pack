export default {
	updateRows (state, rows) {
		state.rows = rows
	},
	updateTotals (state, totals) {
		state.totals.main = totals
	},
	updateLogs404 (state, logs) {
		state.logs404 = logs
	},
	updateTotals404 (state, totals) {
		state.totals.total404 = totals
	},
	updateLogs (state, logs) {
		state.logs = logs
	},
	updateTotalsLogs (state, totals) {
		state.totals.logs = totals
	},
	updateFilters (state, filters) {
		state.filters = filters
	},
	setActiveSlug (state, slug) {
		const { filters } = state

		// First, set active to false.
		filters.forEach((filter, index) => {
			state.filters[index].active = false
		})

		// Now set active to true on the new slug.
		const index = filters.findIndex(c => c.slug === slug)
		if (-1 !== index) {
			state.filters[index].active = true
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
	resetPageNumbers (state) {
		const { main, total404, logs } = state.totals
		main.page     = 1
		total404.page = 1
		logs.page     = 1

		const totals = {
			main,
			total404,
			logs
		}

		state.totals = totals
	},
	updateSort (state, { slug, column }) {
		state.sort[slug] = column
	},
	updateSortDir (state, { slug, dir }) {
		state.sortDir[slug] = dir
	},
	updateServerRedirectTestStatus (state, { failed, testing }) {
		state.server.redirectTest.failed  = failed
		state.server.redirectTest.testing = testing
	},
	setLateRefresh (state, { value, type }) {
		type = 'all' === type ? [ 'redirects', 'logs', 'logs404' ] : [ type ]
		for (const t in type) {
			state.lateRefresh[type[t]] = value
		}
	}
}