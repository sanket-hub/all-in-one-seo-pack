import { mapActions } from 'vuex'

export const WpTable = {
	data () {
		return {
			resultsPerPage : 20,
			orderBy        : null,
			orderDir       : 'asc',
			searchTerm     : null,
			pageNumber     : 1,
			filter         : 'all',
			wpTableKey     : 0,
			wpTableLoading : false
		}
	},
	methods : {
		...mapActions([ 'changeItemsPerPage' ]),
		refreshTable () {
			this.wpTableLoading = true

			return this.processFetchTableData()
				.then(() => (this.wpTableLoading = false))
		},
		processAdditionalFilters ({ filters }) {
			this.wpTableLoading = true

			this.processFetchTableData(filters)
				.then(() => (this.wpTableLoading = false))
		},
		processSearch (searchTerm) {
			this.pageNumber     = 1
			this.searchTerm     = searchTerm
			this.wpTableLoading = true

			this.processFetchTableData()
				.then(() => (this.wpTableLoading = false))
		},
		processPagination (pageNumber) {
			this.pageNumber     = pageNumber
			this.wpTableLoading = true

			this.processFetchTableData()
				.then(() => (this.wpTableLoading = false))
		},
		processFilterTable (filter) {
			this.filter         = filter.slug
			this.searchTerm     = null
			this.pageNumber     = 1
			this.wpTableLoading = true
			this.resetSelectedFilters()

			this.processFetchTableData()
				.then(() => (this.wpTableLoading = false))
		},
		processChangeItemsPerPage (newNumber) {
			this.pageNumber     = 1
			this.resultsPerPage = newNumber
			this.wpTableLoading = true

			this.changeItemsPerPage({
				slug  : this.changeItemsPerPageSlug,
				value : newNumber
			})
				.then(() => this.processFetchTableData()
					.then(() => this.$scrollTo(`#${this.tableId}`, { offset: -110 }))
				)
				.then(() => (this.wpTableLoading = false))
		},
		processSort (column, event) {
			event.target.blur()
			this.orderBy        = column.slug
			this.orderDir       = this.orderBy !== column.slug ? column.sortDir : ('asc' === column.sortDir ? 'desc' : 'asc')
			this.wpTableLoading = true

			this.processFetchTableData()
				.then(() => (this.wpTableLoading = false))
		},
		processFetchTableData (additionalFilters) {
			return this.fetchData({
				slug              : this.slug || null,
				orderBy           : this.orderBy,
				orderDir          : this.orderDir,
				limit             : this.resultsPerPage,
				offset            : 1 === this.pageNumber ? 0 : (this.pageNumber - 1) * this.resultsPerPage,
				searchTerm        : this.searchTerm,
				filter            : this.filter,
				additionalFilters : additionalFilters || this.selectedFilters
			})
		},
		// Wrapper function that can be extended/utilized.
		resetSelectedFilters () {}
	},
	created () {
		this.resultsPerPage = this.$aioseo.settings.tablePagination[this.changeItemsPerPageSlug] || this.resultsPerPage
	}
}