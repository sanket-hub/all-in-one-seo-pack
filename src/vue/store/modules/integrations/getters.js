import Vue from 'vue'
export default {
	semrushExpired : (state, getters, rootState) => {
		if (!rootState.internalOptions.integrations.semrush.expires) {
			return true
		}

		const now     = Vue.prototype.$moment()
		const expires = Vue.prototype.$moment.unix(rootState.internalOptions.integrations.semrush.expires)

		if (now.isSameOrAfter(expires)) {
			return true
		}

		return false
	},
	semrushHasValidTokens : (state, getters, rootState) => {
		return !getters.semrushExpired && rootState.internalOptions.integrations.semrush.accessToken && rootState.internalOptions.integrations.semrush.refreshToken
	}
}