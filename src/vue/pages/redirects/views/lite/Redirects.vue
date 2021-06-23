<template>
	<div class="aioseo-redirects">
		<core-card
			slug="addNewRedirection"
			:header-text="strings.addNewRedirection"
		>
			<core-blur>
				<core-add-redirection
					:type="$constants.REDIRECT_TYPES[0].value"
					:query="$constants.REDIRECT_QUERY_PARAMS[0].value"
					:slash="true"
					:case="true"
				/>
			</core-blur>
		</core-card>

		<core-blur>
			<base-wp-table
				:filters="[]"
				:totals="{
					total : 0,
					pages : 0,
					page  : 1
				}"
				:columns="columns"
				:rows="[]"
				:search-label="strings.searchUrls"
				:bulk-options="bulkOptions"
				:additional-filters="additionalFilters"
			/>
		</core-blur>

		<cta
			:cta-link="$links.getPricingUrl('redirects', 'redirects-upsell')"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('redirects', null, 'home')"
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

				{{ strings.redirectsDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				addNewRedirection    : this.$t.__('Add New Redirection', this.$td),
				searchUrls           : this.$t.__('Search URLs', this.$td),
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
			},
			bulkOptions : [
				{ label: '', value: '' }
			]
		}
	},
	computed : {
		columns () {
			const columns = [
				{
					slug  : 'source_url',
					label : this.$t.__('Source URL', this.$td)
				},
				{
					slug  : 'target_url',
					label : this.$t.__('Target URL', this.$td)
				},
				{
					slug  : 'hits',
					label : this.$t.__('Hits', this.$td),
					width : '97px'
				},
				{
					slug  : 'type',
					label : this.$t.__('Type', this.$td),
					width : '100px'
				},
				{
					slug  : 'group',
					label : this.$t.__('Group', this.$td),
					width : '150px'
				},
				{
					slug  : 'enabled',
					label : this.$constants.GLOBAL_STRINGS.enabled,
					width : '80px'
				}
			]

			return columns
		},
		additionalFilters () {
			return [
				{
					label   : this.$t.__('Filter by Group', this.$td),
					name    : 'group',
					options : [ { label: this.$t.__('All Groups', this.$td), value: 'all' } ].concat(this.$constants.REDIRECT_GROUPS)
				}
			]
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