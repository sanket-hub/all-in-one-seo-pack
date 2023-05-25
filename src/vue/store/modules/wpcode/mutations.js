export default {
	setSnippets (state, snippets) {
		state.snippets = snippets
	},
	setPluginInstalled (state, installed) {
		state.pluginInstalled = installed
	},
	setPluginActive (state, active) {
		state.pluginActive = active
	},
	setPluginNeedsUpdate (state, active) {
		state.pluginNeedsUpdate = active
	}
}