<template>
	<div class="aioseo-col col-xs-12 text-xs-left">
		<base-input
			type="text"
			size="medium"
		/>
		<span class="field-description">{{ strings.areaServedDescription }}</span>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				areaServedDescription : this.$t.__('The geographic area where a service or offered item is provided.', this.$td)
			}
		}
	}
}
</script>

<style scoped>
.field-description {
	display: inline-block;
	margin-top: 10px;
	font-size: 14px;
}
</style>