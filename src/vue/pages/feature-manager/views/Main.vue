<template>
	<core-main
		:page-name="strings.pageName"
		:show-tabs="false"
		:show-save-button="false"
	>
		<feature-manager />
	</core-main>
</template>

<script>
import CoreMain from '@/vue/components/common/core/main/Index'
import FeatureManager from './FeatureManager'
export default {
	components : {
		CoreMain,
		FeatureManager
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Feature Manager', this.$td)
			}
		}
	}
}
</script>