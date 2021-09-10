export const IsDirty = {
	methods : {
		setIsDirty () {
			this.$store.commit('isDirty', true)
		},
		clearIsDirty () {
			this.$store.commit('isDirty', false)
		}
	}
}