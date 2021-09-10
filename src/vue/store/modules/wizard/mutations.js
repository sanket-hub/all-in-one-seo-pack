export default {
	setStages (state, stages) {
		this._vm.$set(state, 'stages', stages)
	},
	setCurrentStage (state, stage) {
		this._vm.$set(state, 'currentStage', stage)
	},
	updateImporters (state, importers) {
		this._vm.$set(state, 'importers', importers)
	},
	updateFeatures (state, features) {
		this._vm.$set(state, 'features', features)
	},
	updateLicenseKey (state, key) {
		this._vm.$set(state, 'licenseKey', key)
	},
	loadState (state, payload) {
		Object.keys(payload).forEach(key => {
			this._vm.$set(state, key, payload[key])
		})
	}
}