<template>
	<div class="aioseo-locations-lite">
		<core-card
			slug="localBusinessInfo"
			class="aioseo-locations-card"
		>

			<template #header>
				{{ strings.businessInfo }}
				<core-pro-badge />
			</template>

			<core-blur>
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
								@click="openUploadModal('image', ['options', 'localBusiness', 'locations', 'business', 'image'])"
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
						<local-business-business-type />
					</template>
				</core-settings-row>
			</core-blur>

			<cta
				:cta-link="$links.getPricingUrl('local-seo', 'local-seo-upsell', 'locations')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('local-seo', null, 'home')"
				:feature-list="features"
			>
				<template #header-text>
					{{ strings.ctaHeader }}
				</template>
				<template #description>
					{{ strings.locationInfo1 }}
				</template>
			</cta>
		</core-card>
	</div>
</template>

<script>
export default {
	data () {
		return {
			features : [
				this.$t.__('Local Business Schema', this.$td),
				this.$t.__('Multiple Locations', this.$td),
				this.$t.__('Business Info and Location blocks, widgets and shortcodes', this.$td),
				this.$t.__('Detailed Address, Contact and Payment Info', this.$td)
			],
			strings : {
				locationsSettings   : this.$t.__('Locations Settings', this.$td),
				description         : '',
				locationInfo1       : this.$t.__('Local Business schema markup enables you to tell Google about your business, including your business name, address and phone number, opening hours and price range. This information may be displayed as a Knowledge Graph card or business carousel.', this.$td),
				locationInfo2       : this.$t.__('Local business information may be displayed when users search for businesses on Google search or Google Maps. Google decides on a per search basis whether to display this information or not and it’s completely automated.', this.$td),
				displayLocationInfo : this.$t.__('Display Location Info', this.$td),
				businessInfo        : this.$t.__('Business Info', this.$td),
				businessType        : this.$t.__('Type', this.$td),
				image               : this.$t.__('Image', this.$td),
				name                : this.$t.__('Name', this.$td),
				urls                : this.$t.__('URLs', this.$td),
				businessAddress     : this.$t.__('Address', this.$td),
				businessIDs         : this.$t.__('IDs', this.$td),
				areaServed          : this.$t.__('Area Served', this.$td),
				uploadOrSelectImage : this.$t.__('Upload or Select Image', this.$td),
				pasteYourImageUrl   : this.$t.__('Paste your image URL or select a new image', this.$td),
				minimumSize         : this.$t.__('Minimum size: 112px x 112px, The image must be in JPG, PNG, GIF, SVG, or WEBP format.', this.$td),
				remove              : this.$t.__('Remove', this.$td),
				ctaButtonText       : this.$t.__('Upgrade to Pro and Unlock Local SEO', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader           : this.$t.sprintf(this.$t.__('Local SEO is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro')
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-locations-lite {
	.aioseo-locations-card {
		.content {
			min-height: 550px;
		}
	}

	.location-description {
		margin-top: 0;
		margin-bottom: 16px;
		&.mb-0 {
			margin-bottom: 0;
		}
	}
	.aioseo-input,
	.aioseo-select,
	.aioseo-multiselect {
		max-width: 480px;
	}
	.aioseo-tag {
		background: $gray;
		padding: 3px 8px;
		margin-right: 8px;
		border-radius: 3px;
	}

	.info-business-image {
		.image-upload {
			display: flex;

			.aioseo-input {
				max-width: 445px;
				margin-right: 10px;
			}

			.insert-image {
				min-width: 214px;
				margin-right: 10px;

				svg.aioseo-circle-plus {
					width: 13px;
					height: 13px;
					margin-right: 10px;
				}
			}
		}

		img {
			margin-top: 20px;
			width: auto;
			max-width: 525px;
			max-height: 525px;
			height: auto;
		}
	}
}
</style>