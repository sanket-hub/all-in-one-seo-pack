<template>
	<div class="aioseo-sa-image-seo">
		<core-blur>
			<core-settings-row
				:name="strings.titleAttributeFormat"
			>
				<template #content>
					<core-html-tags-editor
						:line-numbers="false"
						single
						:default-tags="[
							'image_title',
							'separator_sa',
							'site_title',
							'alt_tag'
						]"
					>
						<template #tags-description>
							{{ strings.clickToAddVariablesTitleTag }}
						</template>
					</core-html-tags-editor>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.stripPunctuationTitleAttribute"
				align
			>
				<template #content>
					<base-radio-toggle
						:value="false"
						name="stripTitlePunctuation"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
						]"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.altTagAttributeFormat"
			>
				<template #content>
					<core-html-tags-editor
						:line-numbers="false"
						single
						:default-tags="[
							'image_title',
							'separator_sa',
							'site_title',
							'alt_tag'
						]"
					>
						<template #tags-description>
							{{ strings.clickToAddVariablesAltTag }}
						</template>
					</core-html-tags-editor>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.stripPunctuationForAltAttribute"
				align
			>
				<template #content>
					<base-radio-toggle
						:value="false"
						name="stripAltPunctuation"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
						]"
					/>
				</template>
			</core-settings-row>
		</core-blur>

		<cta
			:cta-link="$links.getPricingUrl('image-seo', 'image-seo-upsell')"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('image-seo', null, 'home')"
			:feature-list="[
				strings.setTitleAttributes,
				strings.setAltTagAttributes,
				strings.stripPunctuationTitles,
				strings.stripPunctuationAltTags
			]"
		>
			<template #header-text>
				{{ strings.ctaHeader }}
			</template>
			<template #description>
				<core-alert
					v-if="$addons.requiresUpgrade('aioseo-image-seo') && $addons.currentPlans('aioseo-image-seo')"
					type="red"
				>
					{{ strings.thisFeatureRequires }} <strong>{{ $addons.currentPlans('aioseo-image-seo') }}</strong>
				</core-alert>

				{{ strings.ctaDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				titleAttributeFormat            : this.$t.__('Title Attribute Format', this.$td),
				stripPunctuationTitleAttribute  : this.$t.__('Strip Punctuation for Title Attributes', this.$td),
				clickToAddVariablesTitleTag     : this.$t.__('Click on the tags below to insert variables into your title attribute.', this.$td),
				altTagAttributeFormat           : this.$t.__('Alt Tag Attribute Format', this.$td),
				clickToAddVariablesAltTag       : this.$t.__('Click on the tags below to insert variables into your alt tag attribute.', this.$td),
				stripPunctuationForAltAttribute : this.$t.__('Strip Punctuation for Alt Attributes', this.$td),
				thisFeatureRequires             : this.$t.__('This feature requires one of the following plans:', this.$td),
				ctaDescription                  : this.$t.__('The Image SEO module is a premium feature that enables you to globally control the Title Attribute and Alt Text for attachment pages and images that are embedded in your content. These can be set based on a specified format, similar to the Title Format settings in the Global Settings menu.', this.$tdPro),
				ctaButtonText                   : this.$t.__('Upgrade to Pro and Unlock Image SEO', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader                       : this.$t.sprintf(this.$t.__('Image SEO is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				setTitleAttributes              : this.$t.__('Set title attributes', this.$td),
				setAltTagAttributes             : this.$t.__('Set alt tag attributes', this.$td),
				stripPunctuationTitles          : this.$t.__('Strip punctuation for titles', this.$td),
				stripPunctuationAltTags         : this.$t.__('Strip punctuation for alt tags', this.$td)
			}
		}
	}
}
</script>