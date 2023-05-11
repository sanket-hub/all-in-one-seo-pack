<template>
	<div class="aioseo-locations-lite">
		<core-card
			slug="localBusinessInfo"
			class="aioseo-locations-card"
			:noSlide="true"
		>

			<template #header>
				<span>{{ strings.businessInfo }}</span>
				<core-pro-badge />
			</template>

			<blur />

			<cta
				:cta-link="$links.getPricingUrl('local-seo', 'local-seo-upsell', 'locations')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('local-seo', null, 'home')"
				:feature-list="features"
				align-top
			>
				<template #header-text>
					{{ strings.ctaHeader }}
				</template>
				<template #description>
					<required-plans addon="aioseo-local-business" />

					{{ strings.locationInfo1 }}
				</template>
			</cta>
		</core-card>
	</div>
</template>

<script>
import Blur from './Blur'
import RequiredPlans from '@/vue/components/lite/core/upsells/RequiredPlans'
import CoreCard from '@/vue/components/common/core/Card'
import CoreProBadge from '@/vue/components/common/core/ProBadge'
import Cta from '@/vue/components/common/cta/Index'
export default {
	components : {
		Blur,
		RequiredPlans,
		CoreCard,
		CoreProBadge,
		Cta
	},
	data () {
		return {
			features : [
				this.$t.__('Local Business Schema', this.$td),
				this.$t.__('Multiple Locations', this.$td),
				this.$t.__('Business Info and Location blocks, widgets and shortcodes', this.$td),
				this.$t.__('Detailed Address, Contact and Payment Info', this.$td)
			],
			strings : {
				locationInfo1 : this.$t.__('Local Business schema markup enables you to tell Google about your business, including your business name, address and phone number, opening hours and price range. This information may be displayed as a Knowledge Graph card or business carousel.', this.$td),
				businessInfo  : this.$t.__('Business Info', this.$td),
				ctaButtonText : this.$t.__('Upgrade to Pro and Unlock Local SEO', this.$td),
				ctaHeader     : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Local SEO is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				)
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

			.aioseo-input-container {
				width: 100%;
				max-width: 445px;
				margin-right: 8px;

				.aioseo-input {
					width: 100%;
				}
			}

			.insert-image {
				min-width: 214px;
				margin-right: 8px;

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