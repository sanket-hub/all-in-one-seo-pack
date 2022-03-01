<template>
	<div class="aioseo-redirects">
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
				<core-alert
					v-if="$isPro && $addons.requiresUpgrade('aioseo-redirects') && $addons.currentPlans('aioseo-redirects')"
					type="red"
				>
					{{ strings.thisFeatureRequires }} <strong>{{ $addons.currentPlans('aioseo-redirects') }}</strong>
				</core-alert>

				<core-alert
					v-if="$isPro && $addons.isActive('aioseo-redirects') && !$addons.hasMinimumVersion('aioseo-redirects')"
				>
					CHANGEME
				</core-alert>

				{{ strings.redirectsDescription }}
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
	props : {
		hasMinimumVersion      : Boolean,
		noCoreCard             : Boolean,
		parentComponentContext : String
	},
	data () {
		return {
			strings : {
				ctaButtonText        : this.$t.__('Upgrade to Pro and Unlock Redirects', this.$td),
				ctaHeader            : this.$t.sprintf(this.$t.__('Redirects are only available for licensed %1$s %2$s users.', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				serverRedirects      : this.$t.__('Fast Server Redirects', this.$td),
				automaticRedirects   : this.$t.__('Automatic Redirects', this.$td),
				redirectMonitoring   : this.$t.__('Redirect Monitoring', this.$td),
				monitoring404        : this.$t.__('404 Monitoring', this.$td),
				fullSiteRedirects    : this.$t.__('Full Site Redirects', this.$td),
				siteAliases          : this.$t.__('Site Aliases', this.$td),
				redirectsDescription : this.$t.__('Our Redirection Manager allows you to easily create and manage redirects for your broken links to avoid confusing search engines and users, as well as losing valuable backlinks. It even automatically sends users and search engines from your old URLs to your new ones.', this.$td),
				thisFeatureRequires  : this.$t.__('This feature requires one of the following plans:', this.$td)
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-redirects {
	.aioseo-modal-body {
		padding: 20px 50px 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;

		h3 {
			font-size: 20px;
			margin-bottom: 16px;
		}

		.reset-description {
			font-size: 16px;
			color: $black;
			margin-bottom: 16px;
			text-align: center;
			max-width: 515px;
		}

		button.close {
			position: absolute;
			right: 11px;
			top: 11px;
			width: 24px;
			height: 24px;
			background-color: #fff;
			border: none;
			display: flex;
			align-items: center;

			svg.aioseo-close {
				cursor: pointer;
				width: 14px;
				height: 14px;
			}
		}

		.aioseo-description {
			max-width: 510px;
			text-align: center;
		}

		.aioseo-button:not(.close) {
			margin-top: 16px;
		}
	}
}
</style>