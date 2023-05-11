export default {
	isConnected (state, payload) {
		state.isConnected = payload
	},
	dateRange (state, payload) {
		state.range = payload
	},
	rolling (state, payload) {
		state.rolling = payload
	},
	hasInitialized (state, payload) {
		state.hasInitialized = payload
	},
	loading (state, { key, value }) {
		state.loading[key] = value
	},
	data (state, { key, value }) {
		state.data[key] = value
	},
	updateKeywordIsTracked (state, { keyword, isTracked }) {
		const keywordData = state.data.keywords.list.rows[keyword]

		if (!keywordData) {
			return
		}

		state.data.keywords.list.rows[keyword] = {
			...keywordData,
			isTracked
		}
	},
	updateScanPercentage (state, percentage) {
		state.scanPercentage = percentage
	},
	toggleShowScanPopup (state) {
		state.showScanPopup = !state.showScanPopup
	},
	updatePostDetailSeoStatistics (state, data) {
		state.data.postDetail.seoStatistics = data
	},
	updatePostDetailKeywords (state, data) {
		state.data.postDetail.keywords = data
	},
	updatePostDetailPostId (state, postId) {
		state.data.postDetail.postId = postId
	}
}