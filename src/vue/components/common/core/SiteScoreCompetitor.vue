<template>
	<div class="aioseo-site-score-competitor">
		<div
			class="aioseo-seo-site-score-score"
		>
			<core-site-score
				:loading="isAnalyzing || loading"
				:score="score"
				:description="description"
			/>
		</div>

		<div
			class="aioseo-seo-site-score-recommendations"
		>
			<div class="critical">
				<span class="round red">{{ summary.critical || 0 }}</span>
				{{ strings.criticalIssues }}
			</div>
			<div class="recommended">
				<span class="round blue">{{ summary.recommended || 0 }}</span>
				{{ strings.recommendedImprovements }}
			</div>
			<div class="good">
				<span class="round green">{{ summary.good || 0 }}</span>
				{{ strings.goodResults }}
			</div>
		</div>

		<base-button
			class="refresh-results"
			type="gray"
			size="small"
			@click="refresh"
			:loading="isAnalyzing"
		>
			<svg-refresh />
			{{ strings.refreshResults }}
		</base-button>

		<div
			v-if="mobileSnapshot"
			class="mobile-snapshot"
		>
			<div>{{ strings.mobileSnapshot }}</div>
			<img :src="mobileSnapshot" />
		</div>
	</div>
</template>

<script>
import { SeoSiteScore } from '@/vue/mixins'
import { mapActions } from 'vuex'
export default {
	mixins : [ SeoSiteScore ],
	props  : {
		score   : Number,
		loading : Boolean,
		site    : {
			type     : String,
			required : true
		},
		summary : {
			type : Object,
			default () {
				return {}
			}
		},
		mobileSnapshot : String
	},
	data () {
		return {
			isAnalyzing : false,
			strings     : {
				criticalIssues             : this.$t.__('Critical Issues', this.$td),
				warnings                   : this.$t.__('Warnings', this.$td),
				recommendedImprovements    : this.$t.__('Recommended Improvements', this.$td),
				goodResults                : this.$t.__('Good Results', this.$td),
				completeSiteAuditChecklist : this.$t.__('Complete Site Audit Checklist', this.$td),
				refreshResults             : this.$t.__('Refresh Results', this.$td),
				mobileSnapshot             : this.$t.__('Mobile Snapshot', this.$td)
			}
		}
	},
	methods : {
		...mapActions([ 'runSiteAnalyzer', 'deleteCompetitorSite' ]),
		refresh () {
			this.isAnalyzing = true
			this.runSiteAnalyzer({
				url     : this.site,
				refresh : true
			})
				.then(() => (this.isAnalyzing = false))
		}
	}
}
</script>

<style lang="scss">
.aioseo-site-score-competitor {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	.aioseo-seo-site-score-score {
		position: relative;
		min-width: 175px;
		max-width: 217px;
		margin-right: 1em;

		svg {
			width: 100%;
			height: auto;
		}
	}

	.aioseo-seo-site-score-recommendations {
		margin: 20px 0;

		> div:not(.links) {
			display: flex;
			align-items: center;
			font-size: 14px;
			color: $black;
			font-weight: 600;
			margin-bottom: 10px;

			.round {
				position: relative;
				border-radius: 50%;
				width: 24px;
				min-width: 24px;
				max-width: 24px;
				height: 24px;
				display: flex;
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
			}
		}
	}

	.refresh-results {
		.aioseo-refresh {
			width: 14px;
			height: 14px;
			margin-right: 10px;
		}
	}

	.mobile-snapshot {
		margin-top: 60px;
		max-width: 250px;

		div {
			font-weight: 600;
			font-size: 16px;
			margin-bottom: 10px;
		}

		img {
			width: 100%;
			height: auto;
		}
	}
}
</style>