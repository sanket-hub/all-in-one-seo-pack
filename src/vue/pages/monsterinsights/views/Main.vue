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
import CoreMain from '@/vue/components/common/core/main/Index'
import Monsterinsights from './Monsterinsights'
export default {
	components : {
		CoreMain,
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