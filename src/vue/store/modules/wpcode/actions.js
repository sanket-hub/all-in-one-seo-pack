export default {
	loadSnippets ({ commit }) {
		return this._vm.$http.post(this._vm.$links.restUrl('integration/wpcode/snippets'))
			.send()
			.then(response => {
				if (response.body.snippets) {
					commit('wpcode/setSnippets', response.body.snippets, { root: true })
				}

				commit('wpcode/setPluginInstalled', response.body.pluginInstalled, { root: true })
				commit('wpcode/setPluginActive', response.body.pluginActive, { root: true })
				commit('wpcode/setPluginNeedsUpdate', response.body.pluginNeedsUpdate, { root: true })
			})
	}
}