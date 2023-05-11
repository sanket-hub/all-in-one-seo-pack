export const allowed = function (permission) {
	const user = this.$aioseo.user
	return !!user.canManage || !!(user.capabilities && user.capabilities[permission])
}