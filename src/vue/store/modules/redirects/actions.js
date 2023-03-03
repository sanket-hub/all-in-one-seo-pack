import { setOptions } from '@/vue/utils/options'

export default {
	bulk ({ state }, { action, rowIds }) {
		const { rows } = state
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

		const httpAction = 'delete' === action ? 'delete' : 'post'
		const url        = 'delete' === action ? '' : `${action}/`
		return this._vm.$http[httpAction](this._vm.$links.restUrl(`redirects/bulk/${url}`))
			.send({
				rowIds : rowIdsWithHashes
			})
			.then(() => {
				setOptions({
					redirects : state
				})
			})
	},
	fetchRedirects ({ commit, state, rootState, dispatch }, { orderBy, orderDir, limit, offset, searchTerm, filter, additionalFilters }) {
		// Post|term metabox.
		if ('post' === rootState?.currentPost?.context || 'term' === rootState?.currentPost?.context) {
			return dispatch('getPostRedirects')
		}

		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/${filter}`))
			.send({
				orderBy,
				orderDir,
				limit,
				offset,
				searchTerm,
				additionalFilters
			})
			.then(response => {
				setOptions({
					redirects : state
				})
				commit('updateFilters', response.body.filters)
				commit('updateRows', response.body.rows)
				commit('updateTotals', response.body.totals)
			})
	},
	fetchLogs ({ commit, state }, { slug, orderBy, orderDir, limit, offset, searchTerm, filter }) {
		return this._vm.$http.post(this._vm.$links.restUrl(`redirects/${slug}/${filter}`))
			.send({
				orderBy,
				orderDir,
				limit,
				offset,
				searchTerm
			})
			.then(response => {
				setOptions({
					redirects : state
				})
				const updateRows = '404' === slug ? 'updateLogs404' : 'updateLogs'
				commit(updateRows, response.body.rows)

				const updateTotals = '404' === slug ? 'updateTotals404' : 'updateTotalsLogs'
				commit(updateTotals, response.body.totals)
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
	deleteLog (context, { slug, urls }) {
		return this._vm.$http.delete(this._vm.$links.restUrl(`redirects/logs/${slug}`))
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
			.then(() => dispatch('setLateRedirectsRefresh', true))
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
	},
	setLateRedirectsRefresh ({ commit }, value) {
		commit('updateLateRedirectsRefresh', value)
	}
}