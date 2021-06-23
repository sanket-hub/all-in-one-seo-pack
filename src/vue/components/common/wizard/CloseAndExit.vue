<template>
	<div class="aioseo-wizard-close-and-exit">
		<a :href="$aioseo.urls.aio.dashboard">
			{{ strings.closeAndExit }}
		</a>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				closeAndExit : this.$t.__('Close and Exit Wizard Without Saving', this.$td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-wizard-close-and-exit {
	margin: 96px 0;
	min-height: 96px;
	text-align: center;
	font-size: 14px;

	a {
		color: $placeholder-color !important;
	}
}
</style>