<template>
	<core-main
		:page-name="strings.pageName"
		:show-tabs="false"
		:show-save-button="false"
	>
		<monsterinsights />
	</core-main>
</template>

<script>
import Monsterinsights from './Monsterinsights'
export default {
	components : {
		Monsterinsights
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Analytics', this.$td)
			}
		}
	}
}
</script>