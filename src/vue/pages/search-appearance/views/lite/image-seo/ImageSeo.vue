<template>
	<div class="aioseo-sa-image-seo">
		<blur />

		<cta
			:cta-link="$links.getPricingUrl('image-seo', 'image-seo-upsell')"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('image-seo', null, 'home')"
			:feature-list="features"
		>
			<template #header-text>
				{{ strings.ctaHeader }}
			</template>

			<template #description>
				<required-plans addon="aioseo-image-seo" />

				{{ strings.ctaDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
import Blur from './Blur'
import RequiredPlans from '@/vue/components/lite/core/upsells/RequiredPlans'
import Cta from '@/vue/components/common/cta/Index'
export default {
	components : {
		Blur,
		RequiredPlans,
		Cta
	},
	data () {
		return {
			strings : {
				titleAttributeFormat : this.$t.__('Title Attribute Format', this.$td),
				ctaDescription       : this.$t.__('The Image SEO module is a premium feature that enables you to globally control the title, alt tag, caption, description and filename of the images on your site.', this.$td),
				ctaButtonText        : this.$t.__('Upgrade to Pro and Unlock Image SEO', this.$td),
				ctaHeader            : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Image SEO is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				)
			},
			features : [
				this.$t.__('Autogenerate image attributes', this.$td),
				this.$t.__('Clean uploaded image filenames', this.$td),
				this.$t.__('Strip punctuation from image attributes', this.$td),
				this.$t.__('Convert casing of image attributes', this.$td)
			]
		}
	}
}
</script>

<style scoped lang="scss">
.aioseo-app .aioseo-sa-image-seo {
	min-height: 650px;

	.aioseo-cta .feature-list {
		max-width: 600px;
	}
}
</style>