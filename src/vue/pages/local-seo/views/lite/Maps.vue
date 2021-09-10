<template>
	<div class="aioseo-local-maps">
		<core-card
			slug="localBusinessMapsApiKey"
		>
			<template #header>
				{{ strings.googleMapsApiKey }}
			</template>

			<core-blur>
				<div
					class="aioseo-settings-row"
				>
					<p class="apikey-description">{{ strings.description }}</p>
				</div>

				<core-settings-row
					:name="strings.apiKey"
					align
				>
					<template #content>
						<base-input
							size="medium"
						>
						</base-input>
					</template>
				</core-settings-row>

				<core-display-info
					:options="displayInfo"
				/>

			</core-blur>

		</core-card>

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
				{{ strings.ctaDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
export default {
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
				description      : this.$t.__('Integrating with Google Maps will allow your users to find exactly where your business is located. Our interactive maps let them see your Google Reviews and get directions directly from your site. Create multiple maps for use with multiple locations.', this.$td),
				apiKey           : this.$t.__('API Key', this.$td),
				mapSettings      : this.$t.__('Map Settings', this.$td),
				ctaButtonText    : this.$t.__('Upgrade to Pro and Unlock Local SEO', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader        : this.$t.sprintf(this.$t.__('Local SEO Maps are only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				ctaDescription   : this.$t.__('Show your location to your visitors using an interactive Google Map. Create multiple maps for use with multiple locations.', this.$td)
			},
			displayInfo : {
				widget : {
					copy : '',
					// Translators: 1 - Opening HTML link tag, 2 - Closing HTML link tag, 3 - The plugin short name ("AIOSEO")
					desc : this.$t.sprintf(this.$t.__('To add this widget, visit the %1$swidgets page%2$s and look for the "%3$s Local - Map" widget.', this.$td), `<a href="${this.$aioseo.urls.admin.widgets}" target="_blank">`, '</a>', process.env.VUE_APP_SHORT_NAME)
				},
				shortcode : {
					copy : '[aioseo_local_map]',
					// Translators: 1 - Learn more link.
					desc : this.$t.sprintf(this.$t.__('Use the following shortcode to display the location map. %1$s', this.$td), this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'localSeoShortcodeMap', true))
				},
				block : {
					copy : '',
					// Translators: 1 - The plugin short name ("AIOSEO")
					desc : this.$t.sprintf(this.$t.__('To add this block, edit a page or post and search for the "%1$s Local - Map" block.', this.$td), process.env.VUE_APP_SHORT_NAME)
				},
				php : {
					copy : '<?php if( function_exists( \'aioseo_local_map\' ) ) aioseo_local_map(); ?>',
					// Translators: 1 - Learn more link.
					desc : this.$t.sprintf(this.$t.__('Use the following PHP code anywhere in your theme to display the location map. %1$s', this.$td), this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'localSeoFunctionMap', true))
				}
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