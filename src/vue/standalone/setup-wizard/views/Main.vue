<template>
	<component :is="$route.name" />
</template>

<script>
import AdditionalInformation from './AdditionalInformation'
import Category from './Category'
import Features from './Features'
import Import from './Import'
import LicenseKey from './LicenseKey'
import SearchAppearance from './SearchAppearance'
import SmartRecommendations from './SmartRecommendations'
import Success from './Success'
import Welcome from './Welcome'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
	components : {
		AdditionalInformation,
		Category,
		Features,
		Import,
		LicenseKey,
		SearchAppearance,
		SmartRecommendations,
		Success,
		Welcome
	},
	computed : {
		...mapGetters('wizard', [ 'shouldShowImportStep' ]),
		...mapGetters([ 'isUnlicensed' ]),
		...mapState('wizard', [ 'stages' ]),
		...mapState([ 'internalOptions' ])
	},
	methods : {
		...mapMutations('wizard', [ 'setStages', 'loadState' ]),
		deleteStage (stage) {
			const stages = [ ...this.stages ]
			const index = stages.findIndex(s => stage === s)
			if (-1 !== index) {
				// Delete the stage from stages.
				stages.splice(index, 1)
			}

			this.setStages(stages)
		}
	},
	mounted () {
		if (this.internalOptions.internal.wizard) {
			const wizard = JSON.parse(this.internalOptions.internal.wizard)
			delete wizard.currentStage
			delete wizard.stages
			delete wizard.licenseKey
			this.loadState(wizard)
		}

		if (!this.shouldShowImportStep) {
			this.deleteStage('import')
		}

		if (!this.isUnlicensed) {
			this.deleteStage('license-key')
		}

		if (this.$isPro) {
			this.deleteStage('smart-recommendations')
		}
	}
}
</script>