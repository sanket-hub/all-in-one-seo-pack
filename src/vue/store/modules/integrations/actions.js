import { setOptions } from '@/vue/utils/options'

export default {
	semrushGetKeyphrases ({ commit, rootState }, database) {
		commit('semrushSetKeyphrasesError', null)
		const { currentPost } = rootState
		return this._vm.$http.post(this._vm.$links.restUrl('integration/semrush/keyphrases'))
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
			.catch(error => {
				if (!error || !error.response || !error.response.body || !error.response.body.message) {
					commit('semrushSetKeyphrasesError', this.$t.__('An unknown error occurred, please try again later.', this.$td))
					return
				}

				commit('semrushSetKeyphrasesError', error.response.body.message)
			})
	},
	semrushAuthenticate ({ rootState, commit }, code) {
		commit('semrushSetKeyphrasesError', null)
		const { internalOptions } = rootState
		return this._vm.$http.post(this._vm.$links.restUrl('integration/semrush/authenticate'))
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
			.catch(error => {
				if (!error || !error.response || !error.response.body || !error.response.body.message) {
					commit('semrushSetKeyphrasesError', this.$t.__('An unknown error occurred, please try again later.', this.$td))
					return
				}

				commit('semrushSetKeyphrasesError', error.response.body.message)
			})
	},
	semrushRefresh ({ rootState, commit }) {
		const { internalOptions } = rootState
		return this._vm.$http.post(this._vm.$links.restUrl('integration/semrush/refresh'))
			.then(response => {
				commit('updateInternalOption', { groups: [ 'integrations' ], key: 'semrush', value: response.body.semrush }, { root: true })
				internalOptions.integrations.semrush = response.body.semrush
				setOptions({
					internalOptions
				})
			})
	}
}