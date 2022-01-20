<template>
	<div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description">{{ strings.emailAddress }}</span>
			<base-input
				type="text"
				size="medium"
			/>
		</div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description mt-8">{{ strings.phoneNumber }}</span>
			<base-phone
			/>
		</div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description mt-8">{{ strings.faxNumber }}</span>
			<base-phone
			/>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				emailAddress : this.$t.__('Email address:', this.$td),
				phoneNumber  : this.$t.__('Phone number:', this.$td),
				faxNumber    : this.$t.__('Fax number:', this.$td)
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