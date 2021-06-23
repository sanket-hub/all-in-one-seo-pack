import Vue from 'vue'
export const allowed = (permission) => {
	const user = Vue.prototype.$aioseo.user
	return !!(user.capabilities && user.capabilities[permission])
}