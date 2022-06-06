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
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreDisplayInfo from '@/vue/components/common/core/DisplayInfo'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
export default {
	components : {
		CoreBlur,
		CoreDisplayInfo,
		CoreSettingsRow
	},
	data () {
		return {
			strings : {
				description : this.$t.__('Integrating with Google Maps will allow your users to find exactly where your business is located. Our interactive maps let them see your Google Reviews and get directions directly from your site. Create multiple maps for use with multiple locations.', this.$td),
				apiKey      : this.$t.__('API Key', this.$td)
			},
			displayInfo : {
				block : {
					copy : '',
					desc : this.$t.sprintf(
						// Translators: 1 - The plugin short name ("AIOSEO")
						this.$t.__('To add this block, edit a page or post and search for the "%1$s Local - Map" block.', this.$td),
						import.meta.env.VITE_SHORT_NAME
					)
				},
				shortcode : {
					copy : '[aioseo_local_map]',
					desc : this.$t.sprintf(
						// Translators: 1 - Learn more link.
						this.$t.__('Use the following shortcode to display the location map. %1$s', this.$td),
						this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'localSeoShortcodeMap', true)
					)
				},
				widget : {
					copy : '',
					desc : this.$t.sprintf(
						// Translators: 1 - Opening HTML link tag, 2 - Closing HTML link tag, 3 - The plugin short name ("AIOSEO")
						this.$t.__('To add this widget, visit the %1$swidgets page%2$s and look for the "%3$s Local - Map" widget.', this.$td),
						`<a href="${this.$aioseo.urls.admin.widgets}" target="_blank">`,
						'</a>',
						import.meta.env.VITE_SHORT_NAME
					)
				},
				php : {
					copy : '<?php if( function_exists( \'aioseo_local_map\' ) ) aioseo_local_map(); ?>',
					desc : this.$t.sprintf(
						// Translators: 1 - Learn more link.
						this.$t.__('Use the following PHP code anywhere in your theme to display the location map. %1$s', this.$td),
						this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'localSeoFunctionMap', true)
					)
				}
			}
		}
	}
}
</script>