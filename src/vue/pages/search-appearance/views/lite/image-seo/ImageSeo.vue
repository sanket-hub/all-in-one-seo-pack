<template>
	<div class="aioseo-sa-image-seo">
		<blur />

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
import Blur from './Blur'
export default {
	components : {
		Blur
	},
	data () {
		return {
			strings : {
				titleAttributeFormat    : this.$t.__('Title Attribute Format', this.$td),
				thisFeatureRequires     : this.$t.__('This feature requires one of the following plans:', this.$td),
				ctaDescription          : this.$t.__('The Image SEO module is a premium feature that enables you to globally control the Title Attribute and Alt Text for attachment pages and images that are embedded in your content. These can be set based on a specified format, similar to the Title Format settings in the Global Settings menu.', this.$tdPro),
				ctaButtonText           : this.$t.__('Upgrade to Pro and Unlock Image SEO', this.$td),
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader               : this.$t.sprintf(this.$t.__('Image SEO is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				setTitleAttributes      : this.$t.__('Set title attributes', this.$td),
				setAltTagAttributes     : this.$t.__('Set alt tag attributes', this.$td),
				stripPunctuationTitles  : this.$t.__('Strip punctuation for titles', this.$td),
				stripPunctuationAltTags : this.$t.__('Strip punctuation for alt tags', this.$td)
			}
		}
	}
}
</script>