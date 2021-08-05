import Vue from 'vue'
export const allowed = () => {
	return !!Vue.prototype.$aioseo.user.canManage
}