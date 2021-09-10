export default {
	shouldShowImportStep : () => window.aioseo.importers.filter(plugin => plugin.canImport).length,
	getNextLink          : state => {
		const link  = { name: state.stages[0] }
		const index = state.stages.findIndex(s => s === state.currentStage)
		if (-1 === index) {
			return link
		}

		link.name = state.stages[index + 1] ? state.stages[index + 1] : 'success'

		return link
	},
	getPrevLink : state => {
		const link  = { name: state.stages[0] }
		const index = state.stages.findIndex(s => s === state.currentStage)
		if (-1 === index) {
			return link
		}

		link.name = state.stages[index - 1] ? state.stages[index - 1] : 'welcome'

		return link
	},
	getCurrentStageCount : (state, getters) => {
		const index = state.stages.findIndex(s => s === state.currentStage)
		if (-1 === index) {
			return 'success' === state.currentStage ? getters.getTotalStageCount : 0
		}

		return index + 1
	},
	getTotalStageCount : state => state.stages.length
}