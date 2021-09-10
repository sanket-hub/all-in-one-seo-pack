export default {
	updateRows (state, rows) {
		// NOTE: This line is required to force the rows to update properly.
		this._vm.$set(state, 'rows', [])
		this._vm.$set(state, 'rows', rows)
	},
	updateTotals (state, totals) {
		this._vm.$set(state.totals, 'main', totals)
	},
	updateLogs404 (state, logs) {
		this._vm.$set(state, 'logs404', logs)
	},
	updateTotals404 (state, totals) {
		this._vm.$set(state.totals, 'total404', totals)
	},
	updateLogs (state, logs) {
		this._vm.$set(state, 'logs', logs)
	},
	updateTotalsLogs (state, totals) {
		this._vm.$set(state.totals, 'logs', totals)
	},
	updateFilters (state, filters) {
		this._vm.$set(state, 'filters', filters)
	},
	setActiveSlug (state, slug) {
		const { filters } = state

		// First, set active to false.
		filters.forEach((filter, index) => {
			this._vm.$set(state.filters[index], 'active', false)
		})

		// Now set active to true on the new slug.
		const index = filters.findIndex(c => c.slug === slug)
		if (-1 !== index) {
			this._vm.$set(state.filters[index], 'active', true)
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
	resetSelectedFilters (state) {
		this._vm.$set(state, 'selectedFilters', {})
	},
	setSearchTerm (state, term) {
		this._vm.$set(state, 'searchTerm', term)
	},
	setPaginatedPageNumber (state, number) {
		this._vm.$set(state, 'paginatedPage', number)
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

		this._vm.$set(state, 'totals', totals)
		this._vm.$set(state, 'paginatedPage', 1)
	},
	updateSort (state, { slug, column }) {
		this._vm.$set(state.sort, slug, column)
	},
	updateSortDir (state, { slug, dir }) {
		this._vm.$set(state.sortDir, slug, dir)
	}
}