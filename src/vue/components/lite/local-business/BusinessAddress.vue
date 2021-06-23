<template>
	<div class="columns field-row">
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description">{{ strings.streetAddress }}</span>
			<base-input
				type="text"
				size="medium"
			/>
		</div>
		<div class="aioseo-col col-xs-12 text-xs-left">
			<span class="field-description mt-8">{{ strings.streetAddress2 }}</span>
			<base-input
				type="text"
				size="medium"
			/>
		</div>
		<div class="aioseo-address-wrapper">
			<div class="aioseo-col col-xs-12 col-sm-12 col-md-4 text-xs-left">
				<span class="field-description mt-8">{{ strings.zipCode }}</span>
				<base-input
					type="text"
					size="medium"
				/>
			</div>
			<div class="aioseo-col col-xs-12 col-sm-12 col-md-4 text-xs-left">
				<span class="field-description mt-8">{{ strings.city }}</span>
				<base-input
					type="text"
					size="medium"
				/>
			</div>
			<div class="aioseo-col col-xs-12 col-sm-12 col-md-4 text-xs-left">
				<span class="field-description mt-8">{{ strings.state }}</span>
				<base-input
					type="text"
					size="medium"
				/>
			</div>
		</div>
		<div class="aioseo-col col-xs-12 col-sm-6 text-xs-left">
			<span class="field-description mt-8">{{ strings.country }}</span>
			<base-select
				size="medium"
				:options="$constants.COUNTRY_LIST"
			/>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				streetAddress  : this.$t.__('Address Line 1', this.$td),
				streetAddress2 : this.$t.__('Address Line 2', this.$td),
				zipCode        : this.$t.__('Zip code:', this.$td),
				city           : this.$t.__('City:', this.$td),
				state          : this.$t.__('State:', this.$td),
				country        : this.$t.__('Country:', this.$td)
			}
		}
	}
}
</script>

<style scoped>
.aioseo-address-wrapper {
	display: flex;
	max-width: 500px;
}
.field-description {
	display: inline-block;
	margin-bottom: 10px;
	font-size: 14px;
}
.mt-8 {
	margin-top: 8px;
}
</style>