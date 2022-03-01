<template>
	<div class="aioseo-seo-audit-checklist">
		<core-card
			slug="connectOrScore"
			hide-header
			no-slide
			:toggles="false"
		>
			<core-seo-site-score-analyze />
		</core-card>

		<core-card
			v-if="(($isPro && options.general.licenseKey) || internalOptions.internal.siteAnalysis.connectToken) && internalOptions.internal.siteAnalysis.score"
			slug="completeSeoChecklist"
		>
			<template #header>
				<span
					class="card-title"
				>{{ strings.completeSeoChecklist }}</span>

				<base-button
					class="refresh-results"
					type="gray"
					size="small"
					@click="refresh"
					:loading="analyzing"
				>
					<svg-refresh />
					{{ strings.refreshResults }}
				</base-button>
			</template>
			<template #tabs>
				<core-main-tabs
					:tabs="tabs"
					:showSaveButton="false"
					:active="settings.internalTabs.seoAuditChecklist"
					internal
					@changed="processChangeTab"
					skinny-tabs
				>
					<template #md-tab="{ tab }">
						<span
							class="round"
							:class="tab.data.analyze.classColor"
						>{{ tab.data.analyze.count || 0 }}</span>
						<span class="label">{{ tab.label }}</span>
					</template>
				</core-main-tabs>
			</template>

			<core-seo-site-analysis-results
				:section="settings.internalTabs.seoAuditChecklist"
				:all-results="getSiteAnalysisResults"
				show-instructions
			/>
		</core-card>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
	data () {
		return {
			internalDebounce : false,
			strings          : {
				completeSeoChecklist : this.$t.__('Complete SEO Checklist', this.$td),
				refreshResults       : this.$t.__('Refresh Results', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'internalOptions', 'options', 'settings', 'analyzing' ]),
		...mapGetters([ 'getSiteAnalysisResults', 'allItemsCount', 'criticalCount', 'recommendedCount', 'goodCount' ]),
		tabs () {
			const siteAnalysis = this.internalOptions.internal.siteAnalysis
			return [
				{
					slug    : 'all-items',
					name    : this.$t.__('All Items', this.$td),
					analyze : {
						classColor : 'black',
						count      : siteAnalysis.score
							? this.allItemsCount()
							: 0
					}
				},
				{
					slug    : 'critical',
					name    : this.$t.__('Important Issues', this.$td),
					analyze : {
						classColor : 'red',
						count      : siteAnalysis.score
							? this.criticalCount()
							: 0
					}
				},
				{
					slug    : 'recommended-improvements',
					name    : this.$t.__('Recommended Improvements', this.$td),
					analyze : {
						classColor : 'blue',
						count      : siteAnalysis.score
							? this.recommendedCount()
							: 0
					}
				},
				{
					slug    : 'good-results',
					name    : this.$t.__('Good Results', this.$td),
					analyze : {
						classColor : 'green',
						count      : siteAnalysis.score
							? this.goodCount()
							: 0
					}
				}
			]
		}
	},
	methods : {
		...mapActions([ 'changeTab', 'runSiteAnalyzer' ]),
		processChangeTab (value) {
			if (this.internalDebounce) {
				return
			}

			this.internalDebounce = true
			this.changeTab({ slug: 'seoAuditChecklist', value })

			// Debouncing a little here to save extra API calls. @TODO: [V4+] Figure out why this gets hit twice?
			setTimeout(() => {
				this.internalDebounce = false
			}, 50)
		},
		refresh () {
			this.$store.commit('analyzing', true)
			this.runSiteAnalyzer({
				refresh : true
			})
		}
	}
}
</script>

<style lang="scss">
.aioseo-seo-audit-checklist {
	.round {
		position: relative;
		border-radius: 50%;
		width: 24px;
		min-width: 24px;
		max-width: 24px;
		height: 24px;
		line-height: 24px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
		font-size: 12px;
		color: #fff;
		font-weight: 600;

		&.red {
			background-color: $red;
		}

		&.blue {
			background-color: $blue;
		}

		&.orange {
			background-color: $orange;
		}

		&.green {
			background-color: $green;
		}

		&.black {
			background-color: $black2;
		}
	}

	.card-title {
		flex: 1;
	}

	.refresh-results {
		margin-right: 10px;

		.aioseo-refresh {
			width: 14px;
			height: 14px;
			margin-right: 10px;
		}
	}
}
</style>