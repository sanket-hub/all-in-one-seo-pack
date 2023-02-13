export default {
	isConnected (state, payload) {
		this._vm.$set(state, 'isConnected', payload)
	},
	dateRange (state, payload) {
		this._vm.$set(state, 'range', payload)
	},
	rolling (state, payload) {
		this._vm.$set(state, 'rolling', payload)
	},
	hasInitialized (state, payload) {
		this._vm.$set(state, 'hasInitialized', payload)
	},
	loading (state, { key, value }) {
		this._vm.$set(state.loading, key, value)
	},
	data (state, { key, value }) {
		this._vm.$set(state.data, key, value)
	},
	updateKeywordIsTracked (state, { keyword, isTracked }) {
		const keywordData = state.data.keywords.list.rows[keyword]

		if (!keywordData) {
			return
		}

		this._vm.$set(state.data.keywords.list.rows, keyword, {
			...keywordData,
			isTracked
		})
	},
	updateScanPercentage (state, percentage) {
		this._vm.$set(state, 'scanPercentage', percentage)
	},
	toggleShowScanPopup (state) {
		this._vm.$set(state, 'showScanPopup', !state.showScanPopup)
	},
	updatePostDetailSeoStatistics (state, data) {
		this._vm.$set(state.data.postDetail, 'seoStatistics', data)
	},
	updatePostDetailKeywords (state, data) {
		this._vm.$set(state.data.postDetail, 'keywords', data)
	},
	updatePostDetailPostId (state, postId) {
		this._vm.$set(state.data.postDetail, 'postId', postId)
	}
}