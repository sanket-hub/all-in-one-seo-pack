import { setOptions } from '@/vue/utils/options'

export default {
	semrushGetKeyphrases ({ commit, rootState }, database) {
		const { currentPost } = rootState
		return this._vm.$http.post(`${this._vm.$aioseo.urls.restUrl}aioseo/v1/integration/semrush/keyphrases/`)
			.send({
				keyphrase : currentPost.keyphrases.focus.keyphrase,
				database
			})
			.then(response => {
				if (403 === response.body.keyphrases.status) {
					commit('semrushSetKeyphrasesError', response.body.keyphrases.error)
					return
				}
				commit('semrushSetKeyphrases', response.body.keyphrases.data.rows)
			})
	},
	semrushAuthenticate ({ rootState, commit }, code) {
		const { internalOptions } = rootState
		return this._vm.$http.post(`${this._vm.$aioseo.urls.restUrl}aioseo/v1/integration/semrush/authenticate/`)
			.send({
				code
			})
			.then(response => {
				commit('updateInternalOption', { groups: [ 'integrations' ], key: 'semrush', value: response.body.semrush }, { root: true })
				internalOptions.integrations.semrush = response.body.semrush
				setOptions({
					internalOptions
				})
			})
	},
	semrushRefresh ({ rootState, commit }) {
		const { internalOptions } = rootState
		return this._vm.$http.post(`${this._vm.$aioseo.urls.restUrl}aioseo/v1/integration/semrush/refresh/`)
			.then(response => {
				commit('updateInternalOption', { groups: [ 'integrations' ], key: 'semrush', value: response.body.semrush }, { root: true })
				internalOptions.integrations.semrush = response.body.semrush
				setOptions({
					internalOptions
				})
			})
	}
}