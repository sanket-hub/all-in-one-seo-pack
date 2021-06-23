export default {
	setOriginalOptions (state, payload) {
		this._vm.$set(state, 'options', payload)
	},
	setOriginalNetworkOptions (state, payload) {
		this._vm.$set(state, 'networkOptions', payload)
	},
	setOriginalRedirectOptions (state, payload) {
		this._vm.$set(state, 'redirectOptions', payload)
	}
}