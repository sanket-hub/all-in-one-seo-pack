<template>
	<div class="aioseo-col col-xs-12 text-xs-left">
		<base-input
			type="text"
			size="medium"
		/>
		<span class="field-description">{{ strings.nameDesc }}</span>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				name     : this.$t.__('name', this.$td),
				nameDesc : this.$t.__('Your name or company name.', this.$td)
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