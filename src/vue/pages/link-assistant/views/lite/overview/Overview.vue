<template>
	<div>
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
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import Cta from '@/vue/components/common/cta/Index.vue'
export default {
	components : {
		Blur,
		CoreAlert,
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

<style lang="scss">
.aioseo-link-assistant-cta.aioseo-cta.floating {
	top: 200px;
	transform: translateX(-50%);
}
</style>