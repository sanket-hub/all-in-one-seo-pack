export default {
	methods : {
		viewPost (singular) {
			return this.$t.sprintf(
				// Translators: 1 - The singular label for the current post type.
				this.$t.__('View %1$s', this.$td),
				singular
			)
		},
		editPost (singular) {
			return this.$t.sprintf(
				// Translators: 1 - The singular label for the current post type.
				this.$t.__('Edit %1$s', this.$td),
				singular
			)
		}
	}
}