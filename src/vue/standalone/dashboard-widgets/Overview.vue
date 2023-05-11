<template>
	<div class="aioseo-app" style="background-color: transparent;">
		<core-overview :isWpDashboard="true" />
	</div>
</template>

<script>
import { Standalone } from '@/vue/mixins/Standalone'
import CoreOverview from '@/vue/components/common/core/Overview'
export default {
	components : {
		CoreOverview
	},
	mixins : [ Standalone ]
}
</script>