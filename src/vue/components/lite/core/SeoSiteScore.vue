<template>
	<div class="aioseo-seo-site-score">
		<core-blur
			v-if="!internalOptions.internal.siteAnalysis.connectToken"
		>
			<core-site-score-dashboard
				:score="85"
				:description="description"
			/>
		</core-blur>

		<div
			v-if="!internalOptions.internal.siteAnalysis.connectToken"
			class="aioseo-seo-site-score-cta"
		>
			<a
				href="#"
				@click="openPopup($aioseo.urls.connect)"
			>{{ connectWithAioseo }}</a> {{ strings.toSeeYourSiteScore }}
		</div>

		<core-site-score-dashboard
			v-if="internalOptions.internal.siteAnalysis.connectToken"
			:score="internalOptions.internal.siteAnalysis.score"
			:description="description"
			:loading="analyzing"
			:summary="getSummary"
		/>
	</div>
</template>

<script>
import { popup } from '@/vue/utils/popup'
import { SeoSiteScore } from '@/vue/mixins'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
	mixins   : [ SeoSiteScore ],
	computed : {
		...mapState([ 'internalOptions', 'analyzing' ]),
		...mapGetters([ 'goodCount', 'recommendedCount', 'criticalCount' ]),
		getSummary () {
			return {
				recommended : this.recommendedCount(),
				critical    : this.criticalCount(),
				good        : this.goodCount()
			}
		}
	},
	methods : {
		...mapActions([ 'saveConnectToken', 'runSiteAnalyzer' ]),
		openPopup (url) {
			popup(
				url,
				this.connectWithAioseo,
				600,
				630,
				true,
				[ 'token' ],
				this.completedCallback,
				this.closedCallback
			)
		},
		completedCallback (payload) {
			return this.saveConnectToken(payload.token)
		},
		closedCallback (reload) {
			if (reload) {
				this.runSiteAnalyzer()
			}

			this.$store.commit('analyzing', true)
		}
	},
	mounted () {
		if (!this.internalOptions.internal.siteAnalysis.score && this.internalOptions.internal.siteAnalysis.connectToken) {
			this.$store.commit('analyzing', true)
			this.runSiteAnalyzer()
		}
	}
}
</script>

<style lang="scss">
.aioseo-seo-site-score {
	.aioseo-blur {
		display: flex;
		align-items: center;
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
		text-align: center;
	}
}
</style>