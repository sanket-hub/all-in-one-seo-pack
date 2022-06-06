<template>
	<div v-if="internalOptions.internal">
		<core-seo-setup :isWpDashboard="true" />
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { Standalone } from '@/vue/mixins/Standalone'
import CoreSeoSetup from '@/vue/components/common/core/SeoSetup.vue'
export default {
	mixins     : [ Standalone ],
	components : {
		CoreSeoSetup
	},
	computed : {
		...mapState([ 'internalOptions' ])
	}
}
</script>