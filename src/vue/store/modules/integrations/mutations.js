export default {
	semrushSetKeyphrases (state, keyphrases) {
		this._vm.$set(state.semrush, 'results', keyphrases)
	}
}