<template>
	<div class="aioseo-locations-blur">
		<core-blur>
			<core-settings-row
				:name="strings.name"
				class="info-name-row"
				align
			>
				<template #content>
					<div class="aioseo-col col-xs-12 text-xs-left">
						<base-input
							type="text"
							size="medium"
						/>
						<span class="field-description">{{ strings.nameDesc }}</span>
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				class="info-business-image"
				:name="strings.image"
			>
				<template #content>
					<div class="image-upload">
						<base-input
							size="medium"
							:placeholder="strings.pasteYourImageUrl"
						/>
						<base-button
							class="insert-image"
							size="medium"
							type="black"
						>
							<svg-circle-plus />
							{{ strings.uploadOrSelectImage }}
						</base-button>

						<base-button
							class="remove-image"
							size="medium"
							type="gray"
						>
							{{ strings.remove }}
						</base-button>
					</div>

					<div class="aioseo-description">
						{{ strings.minimumSize }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.businessType"
				class="info-business-type"
				align
			>
				<template #content>
					<base-select
						size="large"
						:options="businessTypes"
						value="default"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.urls"
				class="info-urls-row"
				align
			>
				<template #content>
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
			</core-settings-row>
		</core-blur>
	</div>
</template>

<script>
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import SvgCirclePlus from '@/vue/components/common/svg/circle/Plus'
export default {
	components : {
		CoreBlur,
		CoreSettingsRow,
		SvgCirclePlus
	},
	data () {
		return {
			strings : {
				name                : this.$t.__('name', this.$td),
				nameDesc            : this.$t.__('Your name or company name.', this.$td),
				businessType        : this.$t.__('Type', this.$td),
				urls                : this.$t.__('URLs', this.$td),
				image               : this.$t.__('Image', this.$td),
				uploadOrSelectImage : this.$t.__('Upload or Select Image', this.$td),
				pasteYourImageUrl   : this.$t.__('Paste your image URL or select a new image', this.$td),
				minimumSize         : this.$t.__('Minimum size: 112px x 112px, The image must be in JPG, PNG, GIF, SVG, or WEBP format.', this.$td),
				remove              : this.$t.__('Remove', this.$td),
				websiteDesc         : this.$t.__('Website URL:', this.$td),
				aboutDesc           : this.$t.__('About Page URL:', this.$td),
				contactDesc         : this.$t.__('Contact Page URL:', this.$td)
			},
			businessTypes : [
				{ label: this.$t.__('default', this.$td), value: 'LocalBusiness' },
				{ label: this.$t.__('Animal Shelter', this.$td), value: 'Animal Shelter' }
			]
		}
	}
}
</script>