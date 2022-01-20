<template>
	<div>
		<blur />

		<cta
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
				<core-alert
					v-if="$isPro && $addons.requiresUpgrade('aioseo-link-assistant') && $addons.currentPlans('aioseo-link-assistant')"
					type="red"
				>
					{{ strings.thisFeatureRequires }} <strong>{{ $addons.currentPlans('aioseo-link-assistant') }}</strong>
				</core-alert>

				{{ strings.linkAssistantDescription }}
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
				// Translators: 1 - "Pro".
				ctaButtonText            : this.$t.sprintf(this.$t.__('Upgrade to %1$s and Unlock Link Assistant', this.$td), 'Pro'),
				// Translators: 1 - The plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeader                : this.$t.sprintf(this.$t.__('Link Assistant is only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				linkAssistantDescription : this.$t.__('Get relevant suggestions for adding internal links to all your content as well as finding any orphaned posts that have no internal links.', this.$td),
				thisFeatureRequires      : this.$t.__('This feature requires one of the following plans:', this.$td),
				linkOpportunities        : this.$t.__('Actionable Link Suggestions', this.$td),
				orphanedPosts            : this.$t.__('See Orphaned Posts', this.$td),
				affiliateLinks           : this.$t.__('See Affiliate Links', this.$td),
				domainReports            : this.$t.__('Top Domain Reports', this.$td)
			}
		}
	}
}
</script>