import Vue from 'vue'
export const allowed = (permission) => {
	const user = Vue.prototype.$aioseo.user
	return !!user.canManage || !!(user.capabilities && user.capabilities[permission])
}