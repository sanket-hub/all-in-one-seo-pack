export default {
	setOriginalOptions (state, payload) {
		state.options = payload
	},
	setOriginalNetworkOptions (state, payload) {
		state.networkOptions = payload
	},
	setOriginalDynamicOptions (state, payload) {
		state.dynamicOptions = payload
	},
	setOriginalRedirectOptions (state, payload) {
		state.redirectOptions = payload
	},
	setOriginalIndexNowOptions (state, payload) {
		state.indexNowOptions = payload
	}
}