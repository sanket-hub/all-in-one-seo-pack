<template>
	<div class="aioseo-col col-xs-12 text-xs-left">
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description">{{ strings.websiteDesc }}</span>
			<base-input
				type="text"
				size="medium"
			/>
		</div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description mt-8">{{ strings.aboutDesc }}</span>
			<base-input
				type="text"
				size="medium"
			/>
		</div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description mt-8">{{ strings.contactDesc }}</span>
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
				websiteDesc : this.$t.__('Website URL:', this.$td),
				aboutDesc   : this.$t.__('About Page URL:', this.$td),
				contactDesc : this.$t.__('Contact Page URL:', this.$td)
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