<template>
	<div
		:class="{
			'aioseo-redirects': true,
			'core-card': !noCoreCard
			}"
	>
		<blur
			:noCoreCard="noCoreCard"
		/>

		<cta
			:cta-link="$links.getPricingUrl('redirects', 'redirects-upsell', parentComponentContext ? parentComponentContext : null)"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('redirects', parentComponentContext ? parentComponentContext : null, 'home')"
			:feature-list="[
				strings.serverRedirects,
				strings.automaticRedirects,
				strings.redirectMonitoring,
				strings.monitoring404,
				strings.fullSiteRedirects,
				strings.siteAliases
			]"
		>
			<template #header-text>
				{{ strings.ctaHeader }}
			</template>
			<template #description>
				<required-plans addon="aioseo-redirects" />

				{{ strings.redirectsDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
import Blur from './Blur'
import Cta from '@/vue/components/common/cta/Index.vue'
import RequiredPlans from '@/vue/components/lite/core/upsells/RequiredPlans'
export default {
	components : {
		Blur,
		RequiredPlans,
		Cta
	},
	props : {
		noCoreCard             : Boolean,
		parentComponentContext : String
	},
	data () {
		return {
			strings : {
				ctaButtonText : this.$t.__('Upgrade to Pro and Unlock Redirects', this.$td),
				ctaHeader     : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - Pro.
					this.$t.__('Redirects are only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				serverRedirects      : this.$t.__('Fast Server Redirects', this.$td),
				automaticRedirects   : this.$t.__('Automatic Redirects', this.$td),
				redirectMonitoring   : this.$t.__('Redirect Monitoring', this.$td),
				monitoring404        : this.$t.__('404 Monitoring', this.$td),
				fullSiteRedirects    : this.$t.__('Full Site Redirects', this.$td),
				siteAliases          : this.$t.__('Site Aliases', this.$td),
				redirectsDescription : this.$t.__('Our Redirection Manager allows you to easily create and manage redirects for your broken links to avoid confusing search engines and users, as well as losing valuable backlinks. It even automatically sends users and search engines from your old URLs to your new ones.', this.$td)
			}
		}
	}
}
</script>