<template>
	<core-alert
		class="no-access"
		v-if="!$aioseo.user.unfilteredHtml"
		type="red"
		v-html="strings.unfilteredHtmlError"
	/>
</template>
<script>
export default {
	data () {
		return {
			strings : {
				// Translators: 1 - Learn more link.
				unfilteredHtmlError : this.$t.sprintf(this.$t.__('Your user account role does not have access to edit this field. %1$s', this.$td), this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'unfilteredHtml', true))
			}
		}
	}
}
</script>