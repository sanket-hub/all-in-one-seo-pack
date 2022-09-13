import { setOptions } from '@/vue/utils/options'

export default {
	filter ({ state, commit, rootState }, { slug, additional, page }) {
		if ('404' === slug || 'logs' === slug) {
			commit('resetSelectedFilters')
		}

		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/${slug}/`))
			.send({
				additional,
				searchTerm : state.tableFields.main.searchTerm,
				page       : page,
				id         : rootState.currentPost ? rootState.currentPost.id : null,
				context    : rootState.currentPost ? rootState.currentPost.context : null
			})
			.then(response => {
				if ('404' === slug) {
					commit('updateLogs404', response.body.rows)
					commit('updateTotals404', response.body.totals)
					state.logs404 = response.body.rows
					setOptions({
						redirects : state
					})
					return
				}
				if ('logs' === slug) {
					commit('updateLogs', response.body.rows)
					commit('updateTotalsLogs', response.body.totals)
					state.logs = response.body.rows
					setOptions({
						redirects : state
					})
					return
				}

				state.rows = response.body.rows
				setOptions({
					redirects : state
				})
				commit('updateFilters', response.body.filters)
				commit('updateRows', response.body.rows)
				commit('updateTotals', response.body.totals)
			})
	},
	bulk ({ getters, state, commit, rootState }, { action, rowIds }) {
		const { rows, selectedFilters } = state
		// First, let's remove any rows that are already set to this action.
		rowIds = rowIds.filter(rowId => {
			const row = rows.find(r => r.id === parseInt(rowId))
			if ('enable' === action && row.enabled) {
				return false
			}

			if ('disable' === action && !row.enabled) {
				return false
			}

			if ('reset-hits' === action && !row.hits) {
				return false
			}

			return true
		})

		if (!rowIds.length) {
			return Promise.resolve()
		}

		// Convert the rowIds into an object with hashes.
		let rowIdsWithHashes = rowIds
		if ('enable' === action || 'disable' === action) {
			rowIdsWithHashes = {}
			rowIds.forEach(rowId => {
				const row = rows.find(r => r.id === parseInt(rowId))
				rowIdsWithHashes[row.source_url_match_hash] = rowId
			})
		}

		const filter     = getters.getCurrentFilter || { slug: 'search' }
		const httpAction = 'delete' === action ? 'delete' : 'post'
		const url        = 'delete' === action ? '' : `${action}/`
		return this._vm.$http[httpAction](this._vm.$links.restUrl(`redirects/bulk/${url}`))
			.send({
				searchTerm  : state.tableFields.main.searchTerm,
				currentPage : state.totals.main.page,
				currentSlug : filter.slug,
				additional  : selectedFilters,
				rowIds      : rowIdsWithHashes,
				id          : rootState.currentPost ? rootState.currentPost.id : null,
				context     : rootState.currentPost ? rootState.currentPost.context : null
			})
			.then(response => {
				commit('updateFilters', response.body.filters)
				commit('updateRows', response.body.rows)
				commit('updateTotals', response.body.totals)
				setOptions({
					redirects : state
				})
			})
	},
	paginate ({ getters, state, commit }, { page, paginate404, paginateLogs, filter, additional }) {
		const orderBy = {
			column  : null,
			sortDir : null
		}
		if (paginate404) {
			orderBy.column  = state.sort.logs404
			orderBy.sortDir = state.sortDir.logs404
		} else if (paginateLogs) {
			orderBy.column  = state.sort.logs
			orderBy.sortDir = state.sortDir.logs
		}

		page   = page || 1
		filter = filter || getters.getCurrentFilter
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/paginate/${filter.slug}/${page || 1}/`))
			.send({
				additional,
				orderBy
			})
			.then(response => {
				setOptions({
					redirects : state
				})
				if (paginate404) {
					commit('updateLogs404', response.body.rows)
					commit('updateTotals404', response.body.totals)
					return
				}
				if (paginateLogs) {
					commit('updateLogs', response.body.rows)
					commit('updateTotalsLogs', response.body.totals)
					return
				}
				commit('updateRows', response.body.rows)
				commit('updateTotals', response.body.totals)
			})
	},
	search ({ state, commit }, { searchTerm, page }) {
		commit('resetSelectedFilters')
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/search/${page}/`))
			.send({
				searchTerm : searchTerm
			})
			.then(response => {
				commit('updateFilters', response.body.filters)
				commit('updateRows', response.body.rows)
				commit('updateTotals', response.body.totals)
				setOptions({
					redirects : state
				})
			})
	},
	searchLogs ({ state, commit }, { searchTerm, page }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/search/logs/${page}/`))
			.send({
				searchTerm : searchTerm,
				orderBy    : state.sort.logs,
				sortDir    : state.sortDir.logs
			})
			.then(response => {
				commit('updateLogs', response.body.rows)
				commit('updateTotalsLogs', response.body.totals)
			})
	},
	search404Logs ({ state, commit }, { searchTerm, page }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/search/logs404/${page}/`))
			.send({
				searchTerm : searchTerm,
				orderBy    : state.sort.logs404,
				sortDir    : state.sortDir.logs404
			})
			.then(response => {
				commit('updateLogs404', response.body.rows)
				commit('updateTotals404', response.body.totals)
			})
	},
	create (context, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('redirects'))
			.send(payload)
	},
	update ({ commit, state }, { id, payload }) {
		const rows = state.rows
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/${id}/`))
			.send(payload)
			.then(response => {
				if (response.body.redirect && response.body.redirect.id) {
					const redirectIndex = rows.findIndex(r => r.id === response.body.redirect.id)
					if (-1 !== redirectIndex) {
						rows[redirectIndex] = response.body.redirect
						commit('updateRows', rows)

						setOptions({
							redirects : state
						})
					}
				}
			})
	},
	delete (context, id) {
		return this._vm.$http.delete(this._vm.$links.restUrl(`redirects/${id}`))
	},
	test (context, { id, payload }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/${id}/test/`)).send(payload)
	},
	delete404 (context, urls) {
		return this._vm.$http.delete(this._vm.$links.restUrl('redirects/logs-404'))
			.send({
				urls
			})
	},
	deleteLog (context, urls) {
		return this._vm.$http.delete(this._vm.$links.restUrl('redirects/logs'))
			.send({
				urls
			})
	},
	exportServerRedirects (context, server) {
		return this._vm.$http.get(this._vm.$links.restUrl(`redirects/export/${server}/`))
	},
	exportRedirects (context, { groups, type }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/export/${type}/`))
			.send({
				groups
			})
	},
	exportLogs (context, type) {
		return this._vm.$http.get(this._vm.$links.restUrl(`redirects/export-logs/${type}/`))
	},
	uploadFile ({ commit }, { file, filename }) {
		return this._vm.$http.post(this._vm.$links.restUrl('redirects/import'))
			.attach('file', file, filename)
			.then(response => {
				commit('updateFilters', response.body.filters)
				commit('updateRows', response.body.rows)
				commit('updateTotals', response.body.totals)
			})
	},
	importPlugins ({ dispatch }, plugins) {
		return this._vm.$http.post(this._vm.$links.restUrl('redirects/import-plugins'))
			.send({
				plugins
			})
			.then(() => dispatch('filter', { slug: 'all' }))
	},
	getPosts (context, payload) {
		return this._vm.$http.post(this._vm.$links.restUrl('redirects/posts'))
			.send(payload)
			.then(response => {
				if (!response.body.success) {
					throw new Error(response.body.message)
				}

				return response
			})
	},
	getRedirectOptions ({ commit }) {
		return this._vm.$http.get(this._vm.$links.restUrl('redirects/options'))
			.then(response => {
				if (response.body.options) {
					commit('updateOptions', response.body.options)
					commit('original/setOriginalRedirectOptions', JSON.parse(JSON.stringify(response.body.options)), { root: true })
					const redirects     = this._vm.$aioseo.redirects
					redirects.importers = response.body.importers
					setOptions({
						options : response.body.options,
						redirects
					})
				}
			})
	},
	testServerRedirects ({ state, commit }) {
		if (state.server.redirectTest.testing) {
			return
		}

		commit('updateServerRedirectTestStatus', {
			testing : true,
			failed  : state.server.redirectTest.failed
		})
		return this._vm.$http.get(this._vm.$links.restUrl('redirects/server/test')).then(response => {
			commit('updateServerRedirectTestStatus', {
				testing : false,
				failed  : !response.body.success
			})
			commit('updateNotifications', response.body.notifications, { root: true })
		}).catch(() => {
			commit('updateServerRedirectTestStatus', {
				testing : false,
				failed  : true
			})
		})
	},
	getPostRedirects ({ commit, rootState }) {
		return this._vm.$http.get(this._vm.$links.restUrl('redirects/' + rootState.currentPost.context + '/' + rootState.currentPost.id)).then(response => {
			commit('updateRows', response.body.rows)
			commit('updatePostPermalinkPath', response.body.permalinkPath, { root: true })
			commit('updatePostStatus', response.body.postStatus, { root: true })
		}).catch(() => {
		})
	}
}