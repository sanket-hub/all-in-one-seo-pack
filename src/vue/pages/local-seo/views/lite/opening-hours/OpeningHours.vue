<template>
	<div class="aioseo-opening-hours">
		<core-card
			slug="localBusinessOpeningHours"
		>

			<template #header>
				{{ strings.openingHours }}
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
					<core-alert
						v-if="$isPro && $addons.requiresUpgrade('aioseo-local-business') && $addons.currentPlans('aioseo-local-business')"
						type="red"
					>
						{{ strings.thisFeatureRequires }} <strong>{{ $addons.currentPlans('aioseo-local-business') }}</strong>
					</core-alert>

					{{ strings.locationInfo1 }}
				</template>
			</cta>
		</core-card>
	</div>
</template>

<script>
import Blur from './Blur'
export default {
	components : {
		Blur
	},
	data () {
		return {
			features : [
				this.$t.__('Show Opening Hours', this.$td),
				this.$t.__('Multiple Locations', this.$td),
				this.$t.__('Opening Hours block, widget and shortcode', this.$td)
			],
			strings : {
				locationInfo1       : this.$t.__('Local Business schema markup enables you to tell Google about your business, including your business name, address and phone number, opening hours and price range. This information may be displayed as a Knowledge Graph card or business carousel.', this.$td),
				openingHours        : this.$t.__('Opening Hours Settings', this.$td),
				ctaButtonText       : this.$t.__('Upgrade to Pro and Unlock Local SEO', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader           : this.$t.sprintf(this.$t.__('Local SEO is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				thisFeatureRequires : this.$t.__('This feature requires one of the following plans:', this.$td)
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