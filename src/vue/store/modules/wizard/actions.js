import { setOptions } from '@/vue/utils/options'

export default {
	saveWizard ({ state, commit }, section) {
		return this._vm.$http.post(`${this._vm.$aioseo.urls.restUrl}aioseo/v1/wizard`)
			.send({
				section,
				wizard : { ...state }
			})
			.then(response => {
				if (response.body.options) {
					commit('updateOptions', response.body.options, { root: true })
					commit('original/setOriginalOptions', JSON.parse(JSON.stringify(response.body.options)), { root: true })
				}
				setOptions({
					options : response.body.options
				})
			})
	}
}