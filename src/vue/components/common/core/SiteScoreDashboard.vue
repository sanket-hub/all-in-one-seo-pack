<template>
	<div class="aioseo-site-score-dashboard">
		<div
			v-if="!analyzeError"
			class="aioseo-seo-site-score-score"
		>
			<core-site-score
				:loading="loading"
				:score="score"
				:description="description"
			/>
		</div>

		<div
			v-if="!analyzeError"
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

			<div class="links">
				<a :href="$aioseo.urls.aio.seoAnalysis">{{ strings.completeSiteAuditChecklist }}</a>
				<a :href="$aioseo.urls.aio.seoAnalysis" class="no-underline">&rarr;</a>
			</div>
		</div>

		<div
			class="analyze-errors"
			v-if="analyzeError"
		>
			<h3>{{ strings.anErrorOccurred }}</h3>
			{{ getError }}
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props : {
		score       : Number,
		loading     : Boolean,
		description : String,
		summary     : {
			type : Object,
			default () {
				return {}
			}
		}
	},
	data () {
		return {
			strings : {
				anErrorOccurred            : this.$t.__('An error occurred while analyzing your site.', this.$td),
				criticalIssues             : this.$t.__('Critical Issues', this.$td),
				warnings                   : this.$t.__('Warnings', this.$td),
				recommendedImprovements    : this.$t.__('Recommended Improvements', this.$td),
				goodResults                : this.$t.__('Good Results', this.$td),
				completeSiteAuditChecklist : this.$t.__('Complete Site Audit Checklist', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'analyzeError' ]),
		getError () {
			switch (this.analyzeError) {
				case 'invalid-url':
					return this.$t.__('The URL provided is invalid.', this.$td)
				case 'missing-content':
					return this.$t.__('We were unable to parse the content for this site.', this.$td)
				case 'invalid-token':
					// Translators: 1 - The plugin short name ('AIOSEO').
					return this.$t.sprintf(this.$t.__('Your site is not connected. Please connect to %1$s, then try again.', this.$td), process.env.VUE_APP_SHORT_NAME)
			}

			return this.analyzeError
		}
	}
}
</script>

<style lang="scss">
.aioseo-site-score-dashboard {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	.analyze-errors {
		text-align: center;
		margin-bottom: 1em;
	}

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

		.links {
			margin-top: 30px;
			font-size: 14px;
			font-weight: 600;

			.no-underline {
				padding-left: 5px;
			}
		}
	}
}
</style>