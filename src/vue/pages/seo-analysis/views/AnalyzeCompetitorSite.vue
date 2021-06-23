<template>
	<div class="aioseo-analyze-competitor-site">
		<core-analyze-competitor-site-header>
			<div class="analyze-main">
				<div class="analyze-header">
					{{ strings.enterCompetitorUrl }}
				</div>
				<div>
					{{ strings.performInDepthAnalysis }}
				</div>
				<div class="analyze-input">
					<base-input
						v-model="competitorUrl"
						placeholder="https://competitorwebsite.com"
						:class="{ 'aioseo-error' : inputError }"
						@keyup.enter="startAnalyzing"
					/>

					<base-button
						type="green"
						@click="startAnalyzing"
						:loading="isAnalyzing"
						:disabled="!competitorUrl"
					>
						{{ strings.analyze }}
					</base-button>
				</div>

				<div
					v-if="inputError"
					class="aioseo-description aioseo-error"
				>
					{{ strings.pleaseEnterValidUrl }}
				</div>

				<div
					class="analyze-errors aioseo-description aioseo-error"
					v-if="analyzeError"
					v-html="getError"
				/>

				<div
					v-if="isAnalyzing"
					class="analyze-progress"
				>
					<div
						class="analyze-progress-value"
						:style="{
							animationDuration : `${analyzeTime}s`
						}"
					></div>
				</div>
			</div>

			<template #competitor-results>
				<core-card
					v-for="(results, site) in competitorResults"
					:key="site"
					:id="'aioseo-competitor-results' + hashCode(site)"
					:slug="'analyzeCompetitorSite' + site"
					:save-toggle-status="false"
				>
					<template #header>
						<core-analyze-competitor-site-score
							:score="parseResults(results).score"
						/>
						{{ site }}

						<svg-trash
							@click.native="startDeleteSite(site)"
						/>
					</template>

					<div class="competitor-results-main">
						<core-site-score-competitor
							:site="site"
							:score="parseResults(results).score"
							:loading="analyzing"
							:summary="getSummary(parseResults(results).results)"
							:mobile-snapshot="parseResults(results).results.advanced.mobileSnapshot"
						/>

						<div class="competitor-results-body">
							<core-seo-site-analysis-results
								section="all-items"
								:all-results="parseResults(results).results"
								show-google-preview
							/>
						</div>
					</div>
				</core-card>
			</template>
		</core-analyze-competitor-site-header>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { SeoSiteScore } from '@/vue/mixins'
import { isUrl } from '@/vue/utils/helpers'
export default {
	mixins : [ SeoSiteScore ],
	data () {
		return {
			competitorUrl     : null,
			isAnalyzing       : false,
			inputError        : false,
			competitorResults : {},
			analyzeTime       : 8,
			strings           : {
				enterCompetitorUrl     : this.$t.__('Enter Competitor URL', this.$td),
				performInDepthAnalysis : this.$t.__('Perform in-depth SEO Analysis of your competitor\'s website.', this.$td),
				analyze                : this.$t.__('Analyze', this.$td),
				pleaseEnterValidUrl    : this.$t.__('Please enter a valid URL.', this.$td)
			}
		}
	},
	watch : {
		analyzeError (newValue) {
			if (newValue) {
				this.isAnalyzing = false
			}
		}
	},
	computed : {
		...mapState([ 'options', 'analyzing', 'analyzeError' ]),
		...mapGetters([ 'getCompetitorSiteAnalysisResults', 'goodCount', 'recommendedCount', 'criticalCount' ]),
		getError () {
			switch (this.analyzeError) {
				case 'invalid-url':
					return this.$t.__('The URL provided is invalid.', this.$td)
				case 'missing-content':
					return this.$t.sprintf(
						'%1$s %2$s',
						this.$t.__('We were unable to parse the content for this site.', this.$td),
						this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'seoAnalyzerIssues', true)
					)
				case 'invalid-token':
					// Translators: 1 - The plugin short name ('AIOSEO').
					return this.$t.sprintf(this.$t.__('Your site is not connected. Please connect to %1$s, then try again.', this.$td), process.env.VUE_APP_SHORT_NAME)
			}

			return this.analyzeError
		}
	},
	methods : {
		...mapActions([ 'runSiteAnalyzer', 'deleteCompetitorSite', 'saveConnectToken' ]),
		...mapMutations([ 'toggleCard', 'closeCard' ]),
		parseResults (results) {
			return JSON.parse(results)
		},
		getSummary (results) {
			return {
				recommended : this.recommendedCount(results),
				critical    : this.criticalCount(results),
				good        : this.goodCount(results)
			}
		},
		startAnalyzing () {
			this.inputError = false

			this.competitorUrl = this.competitorUrl.replace('http://', 'https://')
			if (!this.competitorUrl.startsWith('https://')) {
				this.competitorUrl = 'https://' + this.competitorUrl
			}

			if (!isUrl(this.competitorUrl)) {
				this.inputError = true
				return
			}

			this.$store.commit('analyzing', true)
			this.$store.commit('analyzeError', false)
			this.runSiteAnalyzer({
				url : this.competitorUrl
			})

			this.isAnalyzing = true
			setTimeout(this.checkStatus, this.analyzeTime * 1000)

			this.closeAllCards()
		},
		checkStatus () {
			this.isAnalyzing = false
			if (this.analyzing) {
				this.$nextTick(() => {
					this.isAnalyzing = true

					// Don't allow it to go too fast.
					if (2 > this.analyzeTime) {
						this.analyzeTime = 8
					}

					this.analyzeTime = this.analyzeTime / 2
					setTimeout(this.checkStatus, this.analyzeTime * 1000)
				})

				return
			}

			this.competitorUrl     = null
			this.competitorResults = this.getCompetitorSiteAnalysisResults
			this.toggleFirstCard()

			this.$nextTick(() => {
				const keys   = Object.keys(this.competitorResults)
				const header = document.querySelector('.aioseo-header')
				const offset = header.offsetHeight + header.offsetTop + 30

				this.$scrollTo('#aioseo-competitor-results' + this.hashCode(keys[0]), { offset: -offset })
			})
		},
		startDeleteSite (site) {
			this.closeAllCards()

			this.$delete(this.competitorResults, site)

			this.deleteCompetitorSite(site)
				.then(() => {
					this.competitorResults = this.getCompetitorSiteAnalysisResults
				})
		},
		closeAllCards () {
			const keys = Object.keys(this.competitorResults)
			keys.forEach(key => {
				this.closeCard('analyzeCompetitorSite' + key)
			})
		},
		toggleFirstCard () {
			const keys = Object.keys(this.competitorResults)
			this.toggleCard('analyzeCompetitorSite' + keys[0])
		},
		hashCode (string) {
			if (!string) {
				return
			}
			let hash = 0, i, chr
			for (i = 0; i < string.length; i++) {
				chr   = string.charCodeAt(i)
				hash  = ((hash << 5) - hash) + chr
				hash |= 0 // Convert to 32bit integer
			}
			return hash
		}
	},
	mounted () {
		this.$store.commit('analyzeError', false)
		this.competitorResults = this.getCompetitorSiteAnalysisResults

		this.toggleFirstCard()
	}
}
</script>

<style lang="scss">
.aioseo-analyze-competitor-site {
	.analyze-main {
		padding: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-self: center;
		font-size: 16px;

		.analyze-header {
			font-size: 18px;
			font-weight: 600;
			margin-bottom: 16px;
		}

		.analyze-input {
			margin-top: 30px;
			display: flex;
			align-items: center;

			.aioseo-input {
				min-width: 430px;
				margin-right: 10px;
			}
		}
	}

	.analyze-progress {
		min-width: 548px;
		margin-top: 30px;
		background: $gray;
		justify-content: flex-start;
		border-radius: 100px;
		align-items: center;
		position: relative;
		padding: 0;
		display: flex;
		height: 10px;
		width: 500px;

		.analyze-progress-value {
			animation: analyze-load 2s normal forwards;
			border-radius: 100px;
			background: $blue;
			height: 10px;
			width: 0;
		}

		@keyframes analyze-load {
			0% { width: 0; }
			100% { width: 100%; }
		}
	}

	.aioseo-trash {
		width: 20px;
		height: 20px;
		color: $placeholder-color;
		margin-left: 14px;
		cursor: pointer;

		&:hover {
			color: $black2;
		}
	}

	.competitor-results-main {
		display: flex;
		flex-direction: row;
		font-size: 16px;
		align-items: flex-start;

		.competitor-results-body {
			flex: 1;
			margin-left: 30px;
			min-width: 0; // @link: https://weblog.west-wind.com/posts/2016/feb/15/flexbox-containers-pre-tags-and-managing-overflow
		}
	}

	.aioseo-seo-site-score-cta {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		background-color: #fff;
		padding: 24px 30px;
		border: 1px solid $border;
		box-shadow: 0px 2px 10px rgba(0, 90, 224, 0.2);
		color: $black;
		font-size: 16px;
		font-weight: 600;
		width: 82%;
		max-width: 500px;
		text-align: center;
	}
}
</style>