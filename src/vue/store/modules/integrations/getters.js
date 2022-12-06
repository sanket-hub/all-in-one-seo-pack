import { DateTime } from 'luxon'
export default {
	semrushExpired : (state, getters, rootState) => {
		if (!rootState.internalOptions.integrations.semrush.expires) {
			return true
		}

		const now     = DateTime.now()
		const expires = DateTime.fromMillis(parseInt(rootState.internalOptions.integrations.semrush.expires * 1000, 10))

		if (now >= expires) {
			return true
		}

		return false
	},
	semrushHasValidTokens : (state, getters, rootState) => {
		return !getters.semrushExpired && rootState.internalOptions.integrations.semrush.accessToken && rootState.internalOptions.integrations.semrush.refreshToken
	}
}