import { setOptions } from '@/vue/utils/options'

export default {
	saveWizard ({ state, commit }, section) {
		return this._vm.$http.post(this._vm.$links.restUrl('wizard'))
			.send({
				section,
				wizard  : { ...state },
				network : this._vm.$aioseo.data.isNetworkAdmin
			})
			.then(response => {
				if (response.body.options) {
					commit('updateOptions', response.body.options, { root: true })
					commit('original/setOriginalOptions', JSON.parse(JSON.stringify(response.body.options)), { root: true })
				}
				setOptions(this._vm, {
					options : response.body.options
				})
			})
	}
}