<template>
	<div class="aioseo-tab-content aioseo-localseo-info">
		<core-settings-row
			:name="strings.name"
			class="info-name-row"
			align
		>
			<template #content>
				<local-business-name />
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.businessType"
			class="info-business-type"
			align
		>
			<template #content>
				<local-business-business-type />
      </template>
    </core-settings-row>

    <core-settings-row
			class="info-business-image"
			:name="strings.image"
			align
		>
			<template #content>
				<local-business-image />
			</template>
		</core-settings-row>

		<!--core-settings-row
			:name="strings.urls"
			class="info-urls-row"
			align
		>
			<template #content>
				<local-business-urls />
			</template>
		</core-settings-row-->

		<core-settings-row
			:name="strings.businessAddress"
			class="info-businessaddress-row"
			align
		>
			<template #content>
				<local-business-business-address />
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.businessContact"
			class="info-businesscontact-row"
			align
		>
			<template #content>
				<local-business-business-contact />
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.businessIDs"
			class="info-businessids-row"
			align
		>
			<template #content>
				<local-business-business-ids />
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.paymentInfo"
			class="info-paymentinfo-row"
			align
		>
			<template #content>
				<local-business-payment-info />
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.areaServed"
			class="info-area-row"
			align
		>
			<template #content>
				<local-business-area-served />
			</template>
		</core-settings-row>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				pageName        : this.$t.__('Business Info', this.$td),
				name            : this.$t.__('Name', this.$td),
				businessType    : this.$t.__('Type', this.$td),
				image           : this.$t.__('Image', this.$td),
				urls            : this.$t.__('URLs', this.$td),
				websiteDesc     : this.$t.__('Website URL', this.$td),
				aboutDesc       : this.$t.__('About Page URL', this.$td),
				contactDesc     : this.$t.__('Contact Page URL', this.$td),
				businessAddress : this.$t.__('Address', this.$td),
				businessContact : this.$t.__('Contact Info', this.$td),
				businessIDs     : this.$t.__('IDs', this.$td),
				paymentInfo     : this.$t.__('Payment Info', this.$td),
				areaServed      : this.$t.__('Area Served', this.$td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-localseo-info {
	.aioseo-input,
	.aioseo-select,
	.aioseo-multiselect {
		max-width: 480px;
	}
	.field-description {
		font-size: 14px;
	}
	.info-businessaddress-row .columns {
		display: flex;
		flex: 0 1 auto;
		flex-direction: row;
		flex-wrap: wrap;
	}
}
</style>