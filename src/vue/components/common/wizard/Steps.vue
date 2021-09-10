<template>
	<div class="aioseo-wizard-steps">
		{{ getSteps }}
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
	computed : {
		...mapState('wizard', [ 'currentStage' ]),
		...mapGetters('wizard', [ 'getCurrentStageCount', 'getTotalStageCount' ]),
		getSteps () {
			// Translators: 1 - The current step count. 2 - The total step count.
			return this.$t.sprintf(this.$t.__('Step %1$s of %2$s', this.$td), this.getCurrentStageCount, this.getTotalStageCount)
		}
	}
}
</script>

<style lang="scss">
.aioseo-wizard-steps {
	color: $placeholder-color;
	font-size: 14px;
	margin-bottom: 20px;
}
</style>