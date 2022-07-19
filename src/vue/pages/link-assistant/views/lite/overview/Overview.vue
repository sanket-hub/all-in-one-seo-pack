<template>
	<div class="aioseo-link-assistant-overview">
		<blur />

		<cta
			class="aioseo-link-assistant-cta"
			:cta-link="$links.getPricingUrl('link-assistant', 'link-assistant-upsell', 'overview')"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('link-assistant', 'overview', 'home')"
			:feature-list="[
				strings.linkOpportunities,
				strings.domainReports,
				strings.orphanedPosts,
				strings.affiliateLinks
			]"
		>
			<template #header-text>
				{{ strings.ctaHeader }}
			</template>
			<template #description>
				<required-plans addon="aioseo-link-assistant" />

				{{ strings.linkAssistantDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
import Blur from './Blur'
import RequiredPlans from '@/vue/components/lite/core/upsells/RequiredPlans'
import Cta from '@/vue/components/common/cta/Index.vue'
export default {
	components : {
		Blur,
		RequiredPlans,
		Cta
	},
	data () {
		return {
			strings : {
				ctaButtonText : this.$t.sprintf(
					// Translators: 1 - "Pro".
					this.$t.__('Upgrade to %1$s and Unlock Link Assistant', this.$td),
					'Pro'
				),
				ctaHeader : this.$t.sprintf(
					// Translators: 1 - The plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Link Assistant is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				linkAssistantDescription : this.$t.__('Get relevant suggestions for adding internal links to all your content as well as finding any orphaned posts that have no internal links.', this.$td),
				linkOpportunities        : this.$t.__('Actionable Link Suggestions', this.$td),
				orphanedPosts            : this.$t.__('See Orphaned Posts', this.$td),
				affiliateLinks           : this.$t.__('See Affiliate Links', this.$td),
				domainReports            : this.$t.__('Top Domain Reports', this.$td)
			}
		}
	}
}
</script>