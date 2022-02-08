export default {
	updateApiKey (state, apiKey) {
		this._vm.$set(state.options.indexNow, 'apiKey', apiKey)
	}
}