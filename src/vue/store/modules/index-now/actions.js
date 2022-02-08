export default {
	generateApiKey ({ state, commit }) {
		return this._vm.$http.get(this._vm.$links.restUrl('index-now/generate-api-key'))
			.then(response => {
				commit('updateApiKey', response.body.key)
				commit('original/setOriginalIndexNowOptions', JSON.parse(JSON.stringify(state.options)), { root: true })

				return response.body.key
			})
	},
	getApiKey ({ state, commit }) {
		return this._vm.$http.get(this._vm.$links.restUrl('index-now/api-key'))
			.then(response => {
				commit('updateApiKey', response.body.key)
				commit('original/setOriginalIndexNowOptions', JSON.parse(JSON.stringify(state.options)), { root: true })

				return response.body.key
			})
	}
}