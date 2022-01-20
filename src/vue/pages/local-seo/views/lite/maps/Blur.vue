<template>
	<div class="aioseo-maps-blur">
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
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				description : this.$t.__('Integrating with Google Maps will allow your users to find exactly where your business is located. Our interactive maps let them see your Google Reviews and get directions directly from your site. Create multiple maps for use with multiple locations.', this.$td),
				apiKey      : this.$t.__('API Key', this.$td)
			},
			displayInfo : {
				block : {
					copy : '',
					// Translators: 1 - The plugin short name ("AIOSEO")
					desc : this.$t.sprintf(this.$t.__('To add this block, edit a page or post and search for the "%1$s Local - Map" block.', this.$td), process.env.VUE_APP_SHORT_NAME)
				},
				shortcode : {
					copy : '[aioseo_local_map]',
					// Translators: 1 - Learn more link.
					desc : this.$t.sprintf(this.$t.__('Use the following shortcode to display the location map. %1$s', this.$td), this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'localSeoShortcodeMap', true))
				},
				widget : {
					copy : '',
					// Translators: 1 - Opening HTML link tag, 2 - Closing HTML link tag, 3 - The plugin short name ("AIOSEO")
					desc : this.$t.sprintf(this.$t.__('To add this widget, visit the %1$swidgets page%2$s and look for the "%3$s Local - Map" widget.', this.$td), `<a href="${this.$aioseo.urls.admin.widgets}" target="_blank">`, '</a>', process.env.VUE_APP_SHORT_NAME)
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