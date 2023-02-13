import dateFormat from '@/vue/utils/dateFormat'
import { setOptions } from '@/vue/utils/options'
export default {
	getAuthUrl () {
		return this._vm.$http.get(this._vm.$links.restUrl('search-statistics/url/auth'))
			.then(response => {
				return response.body.url
			})
	},
	getReauthUrl () {
		return this._vm.$http.get(this._vm.$links.restUrl('search-statistics/url/reauth'))
			.then(response => {
				return response.body.url
			})
	},
	deleteAuth ({ commit }, { force }) {
		return this._vm.$http.delete(this._vm.$links.restUrl('search-statistics/auth'))
			.send({ force })
			.then(response => {
				if (true === response.body.success) {
					commit('isConnected', false)
				}

				return response.body
			})
	},
	setDateRange ({ commit, state, dispatch }, payload) {
		const dateRange = {
			start : dateFormat(payload.dateRange[0], 'Y-m-d'),
			end   : dateFormat(payload.dateRange[1], 'Y-m-d')
		}
		commit('dateRange', dateRange)
		commit('rolling', payload.rolling)

		setOptions({
			searchStatistics : state
		})

		dispatch('updateSeoStatistics', {
			filter     : 'all',
			searchTerm : ''
		})

		dispatch('updateKeywords', {
			filter     : 'all',
			searchTerm : ''
		})
	},
	loadInitialData ({ state, dispatch, commit }) {
		if (state.hasInitialized) {
			return
		}

		commit('hasInitialized', true)

		if (!state.data.seoStatistics?.statistics?.impressions) {
			dispatch('updateSeoStatistics', {
				filter     : 'all',
				searchTerm : ''
			})
		}

		if (!state.data.keywords?.paginated?.rows?.length) {
			dispatch('updateKeywords', {
				filter     : 'all',
				searchTerm : ''
			})
		}
	},
	updateSeoStatistics ({ commit, state }, options) {
		commit('loading', {
			key   : 'seoStatistics',
			value : true
		})

		this._vm.$http.get(this._vm.$links.restUrl('search-statistics/stats/seo-statistics'))
			.query({
				startDate : state.range.start,
				endDate   : state.range.end,
				rolling   : state.rolling,
				...options
			})
			.then(response => {
				if (response.body.success) {
					commit('dateRange', response.body.range)
					commit('data', {
						key   : 'seoStatistics',
						value : response.body.data
					})
				}
			})
			.finally(() => {
				commit('loading', {
					key   : 'seoStatistics',
					value : false
				})
			})
	},
	updateKeywords ({ commit, state }, options) {
		commit('loading', {
			key   : 'keywords',
			value : true
		})

		this._vm.$http.get(this._vm.$links.restUrl('search-statistics/stats/keywords'))
			.query({
				startDate : state.range.start,
				endDate   : state.range.end,
				rolling   : state.rolling,
				...options
			})
			.then(response => {
				if (response.body.success) {
					commit('dateRange', response.body.range)
					commit('data', {
						key   : 'keywords',
						value : response.body.data
					})
				}
			})
			.finally(() => {
				commit('loading', {
					key   : 'keywords',
					value : false
				})
			})
	},
	getPagesByKeywords ({ state }, keywords) {
		return this._vm.$http.post(this._vm.$links.restUrl('search-statistics/stats/keywords/posts'))
			.send({
				startDate : state.range.start,
				endDate   : state.range.end,
				keywords  : keywords
			 })
			.then(response => response.body.data)
	},
	getPostDetail ({ state }, postId) {
		return this._vm.$http.get(this._vm.$links.restUrl('search-statistics/post-detail'))
			.query({
				startDate : state.range.start,
				endDate   : state.range.end,
				postId    : postId
			})
			.then(response => response)
	},
	getPostDetailFocusKeywordTrend ({ state }, { focusKeyword }) {
		return this._vm.$http.get(this._vm.$links.restUrl('search-statistics/post-detail/focus-keyword'))
			.query({
				startDate    : state.range.start,
				endDate      : state.range.end,
				postId       : state.data.postDetail.postId,
				focusKeyword : focusKeyword
			})
			.then(response => response)
	},
	updatePostDetailSeoStatistics ({ commit, state }, options) {
		commit('loading', {
			key   : 'postDetailSeoStatistics',
			value : true
		})

		this._vm.$http.get(this._vm.$links.restUrl('search-statistics/post-detail/seo-statistics'))
			.query({
				startDate : state.range.start,
				endDate   : state.range.end,
				rolling   : state.rolling,
				postId    : state.data.postDetail.postId,
				...options
			})
			.then(response => {
				if (response.body.success) {
					commit('updatePostDetailSeoStatistics', response.body.data)
				}
			})
			.finally(() => {
				commit('loading', {
					key   : 'postDetailSeoStatistics',
					value : false
				})
			})
	},
	updatePostDetailKeywords ({ commit, state }, options) {
		commit('loading', {
			key   : 'postDetailKeywords',
			value : true
		})

		this._vm.$http.get(this._vm.$links.restUrl('search-statistics/post-detail/keywords'))
			.query({
				startDate : state.range.start,
				endDate   : state.range.end,
				rolling   : state.rolling,
				postId    : state.data.postDetail.postId,
				...options
			})
			.then(response => {
				if (response.body.success) {
					commit('updatePostDetailKeywords', response.body.data)
				}
			})
			.finally(() => {
				commit('loading', {
					key   : 'postDetailKeywords',
					value : false
				})
			})
	},
	getPageSpeed (context, payload) {
		return this._vm.$http.get(this._vm.$links.restUrl('search-statistics/pagespeed'))
			.query(payload)
			.then(response => response)
	},
	getSeoAnalysis (context, payload) {
		return this._vm.$http.get(this._vm.$links.restUrl('search-statistics/seo-analysis'))
			.query(payload)
			.then(response => response)
	}
}