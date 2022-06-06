<template>
	<div>
		<core-card
			slug="analyzeNewCompetitor"
			hide-header
			no-slide
			:toggles="false"
		>
			<component
				:is="!internalOptions.internal.siteAnalysis.connectToken ? 'core-blur' : 'div'"
			>
				<slot />
			</component>

			<div
				v-if="!internalOptions.internal.siteAnalysis.connectToken"
				class="aioseo-seo-site-score-cta"
			>
				<a
					href="#"
					@click="openPopup($aioseo.urls.connect)"
				>{{ connectWithAioseo }}</a> {{ strings.toAnalyzeCompetitorSite }}
			</div>
		</core-card>

		<template
			v-if="internalOptions.internal.siteAnalysis.connectToken"
		>
			<slot name="competitor-results" />
		</template>
	</div>
</template>

<script>
import { popup } from '@/vue/utils/popup'
import { SeoSiteScore } from '@/vue/mixins'
import { mapState, mapActions } from 'vuex'
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreCard from '@/vue/components/common/core/Card'
export default {
	components : {
		CoreBlur,
		CoreCard
	},
	mixins   : [ SeoSiteScore ],
	computed : {
		...mapState([ 'internalOptions' ])
	},
	methods : {
		...mapActions([ 'saveConnectToken' ]),
		openPopup (url) {
			popup(
				url,
				this.connectWithAioseo,
				600,
				630,
				true,
				[ 'token' ],
				this.completedCallback,
				() => {}
			)
		},
		completedCallback (payload) {
			return this.saveConnectToken(payload.token)
		}
	}
}
</script>