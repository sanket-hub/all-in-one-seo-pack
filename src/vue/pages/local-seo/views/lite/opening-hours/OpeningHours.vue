<template>
	<div class="aioseo-opening-hours">
		<core-card
			slug="localBusinessOpeningHours"
			:noSlide="true"
		>

			<template #header>
				<span>{{ strings.openingHours }}</span>
				<core-pro-badge />
			</template>

			<blur />

			<cta
				:cta-link="$links.getPricingUrl('local-seo', 'local-seo-upsell', 'opening-hours')"
				:button-text="strings.ctaButtonText"
				:learn-more-link="$links.getUpsellUrl('local-seo', null, 'home')"
				:feature-list="features"
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
				this.$t.__('Show Opening Hours', this.$td),
				this.$t.__('Multiple Locations', this.$td),
				this.$t.__('Opening Hours block, widget and shortcode', this.$td)
			],
			strings : {
				locationInfo1 : this.$t.__('Local Business schema markup enables you to tell Google about your business, including your business name, address and phone number, opening hours and price range. This information may be displayed as a Knowledge Graph card or business carousel.', this.$td),
				openingHours  : this.$t.__('Opening Hours Settings', this.$td),
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
.aioseo-opening-hours {
	.aioseo-input,
	.aioseo-select,
	.aioseo-multiselect {
		max-width: 480px;
	}
	.mt-10 {
		display: inline-block;
		margin-top: 10px;
		font-size: 14px;
	}
	.mt-16 {
		margin-top: 16px;
	}
}
.aioseo-col-flex {
	display: flex;
	align-items: center;
	padding: 12px 0;
	border-bottom: 1px solid $border;
	&:first-of-type {
		padding-top: 0;
	}
	&:last-of-type {
		padding-bottom: 0;
		border: none;
	}
	.aioseo-col-day {
		flex: 1
	}
	.aioseo-col-hours,
	.aioseo-col-alwaysopen {
		flex: 2
	}
	span.separator {
		margin: 0 20px;
	}
	.aioseo-select {
		display: inline-block;
		max-width: 125px;
	}
	.multiselect--disabled {
		.multiselect__tags,
		.multiselect__single {
			background: $background;
		}
	}
}
</style>