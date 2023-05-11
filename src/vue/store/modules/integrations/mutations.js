export default {
	semrushSetKeyphrases (state, keyphrases) {
		state.semrush.error = null
		state.semrush.results = keyphrases
	},
	semrushSetKeyphrasesError (state, error) {
		state.semrush.error = error
		state.semrush.results = []
	}
}