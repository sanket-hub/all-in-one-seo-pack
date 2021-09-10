<template>
	<div>
		<core-card
			slug="analyzeNewCompetitor"
			hide-header
			no-slide
			:toggles="false"
		>
			<component
				:is="!options.general.licenseKey ? 'core-blur' : 'div'"
			>
				<slot />
			</component>

			<div
				v-if="!options.general.licenseKey"
				class="aioseo-seo-site-score-cta"
			>
				<a
					:href="$aioseo.urls.aio.settings"
				>{{ strings.enterLicenseKey }}</a> {{ strings.toSeeYourSiteScore }}
			</div>
		</core-card>

		<template
			v-if="options.general.licenseKey"
		>
			<slot name="competitor-results" />
		</template>
	</div>
</template>

<script>
import { popup } from '@/vue/utils/popup'
import { SeoSiteScore } from '@/vue/mixins'
import { mapState, mapActions } from 'vuex'
export default {
	mixins   : [ SeoSiteScore ],
	computed : {
		...mapState([ 'options' ])
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