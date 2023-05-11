export default {
	setStages (state, stages) {
		state.stages = stages
	},
	setCurrentStage (state, stage) {
		state.currentStage = stage
	},
	updateImporters (state, importers) {
		state.importers = importers
	},
	updateFeatures (state, features) {
		state.features = features
	},
	updateLicenseKey (state, key) {
		state.licenseKey = key
	},
	loadState (state, payload) {
		Object.keys(payload).forEach(key => {
			state[key] = payload[key]
		})
	}
}