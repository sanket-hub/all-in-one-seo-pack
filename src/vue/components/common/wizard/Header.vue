<template>
	<div class="aioseo-wizard-header">
		<div class="logo">
			<svg-aioseo-logo />
		</div>

		<wizard-progress
			:steps="steps"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed : {
		...mapGetters('wizard', [ 'getCurrentStageCount', 'getTotalStageCount' ]),
		steps () {
			const steps = []
			for (let i = 0; i < this.getTotalStageCount; i++) {
				if (i < this.getCurrentStageCount) {
					steps.push({ active: true })
				} else {
					steps.push({ active: false })
				}
			}

			return steps
		}
	}
}
</script>

<style lang="scss">
.aioseo-wizard-header {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	svg.aioseo-logo {
		margin: 60px 0 40px;
		width: 100%;
		max-width: 140px;
		height: auto;
		margin-right: 10px;
	}
}
</style>