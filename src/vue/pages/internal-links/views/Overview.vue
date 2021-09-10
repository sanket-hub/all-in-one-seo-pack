<template>
	<div class="aioseo-internal-links-overview">
		<core-card
			slug="internalLinksOverview"
			:header-text="strings.overview"
		>
		</core-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				overview : this.$t.__('Overview', this.$td)
			}
		}
	}
}
</script>