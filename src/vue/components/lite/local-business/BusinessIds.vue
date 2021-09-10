<template>
	<div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description">{{ strings.vatID }}</span>
			<base-input
				type="text"
				size="medium"
			/>
		</div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description mt-8">{{ strings.taxID }}</span>
			<base-input
				type="text"
				size="medium"
			/>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				vatID : this.$t.__('VAT ID:', this.$td),
				taxID : this.$t.__('Tax ID:', this.$td)
			}
		}
	}
}
</script>

<style scoped>
.field-description {
	display: inline-block;
	margin-bottom: 10px;
	font-size: 14px;
}
.mt-8 {
	margin-top: 8px;
}
</style>