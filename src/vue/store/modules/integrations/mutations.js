export default {
	semrushSetKeyphrases (state, keyphrases) {
		this._vm.$set(state.semrush, 'results', keyphrases)
	},
	semrushSetKeyphrasesError (state, error) {
		this._vm.$set(state.semrush, 'error', error)
	}
}