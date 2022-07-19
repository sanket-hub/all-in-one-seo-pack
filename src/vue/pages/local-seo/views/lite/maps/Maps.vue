<template>
	<div class="aioseo-local-maps">
		<core-card
			slug="localBusinessMapsApiKey"
			:noSlide="true"
		>
			<template #header>
				{{ strings.googleMapsApiKey }}
				<core-pro-badge />
			</template>

			<blur />

			<cta
				:cta-link="$links.getPricingUrl('local-seo', 'local-seo-upsell', 'maps')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('local-seo', null, 'home')"
				:feature-list="features"
			>
				<template #header-text>
					{{ strings.ctaHeader }}
				</template>
				<template #description>
					<required-plans addon="aioseo-local-business" />

					{{ strings.ctaDescription }}
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
import Cta from '@/vue/components/common/cta/Index.vue'
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
				this.$t.__('Google Places Support', this.$td),
				this.$t.__('Google Reviews', this.$td),
				this.$t.__('Driving Directions', this.$td),
				this.$t.__('Multiple Locations', this.$td)
			],
			strings : {
				googleMapsApiKey : this.$t.__('Google Maps API Key', this.$td),
				ctaButtonText    : this.$t.__('Upgrade to Pro and Unlock Local SEO', this.$td),
				ctaHeader        : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Local SEO Maps are only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				ctaDescription : this.$t.__('Show your location to your visitors using an interactive Google Map. Create multiple maps for use with multiple locations.', this.$td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-local-maps {
	position: relative;
}
</style>