import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import CoreModal from '@/vue/components/common/core/modal/Index'
import SvgClose from '@/vue/components/common/svg/Close'

export const Wizard = {
	computed : {
		...mapGetters('wizard', [ 'getNextLink', 'getPrevLink' ]),
		...mapGetters([ 'isUnlicensed' ]),
		features () {
			return [ ...this.$constants.WIZARD_FEATURES ]
		},
		getSelectedUpsellFeatures () {
			if (!this.presetFeatures) {
				return []
			}

			return this.presetFeatures
				.filter(feature => {
					return this.needsUpsell(this.features.find(f => f.value === feature))
				})
				.map(feature => this.features.find(f => f.value === feature))
		}
	},
	methods : {
		...mapMutations('wizard', [ 'setCurrentStage' ]),
		needsUpsell (feature) {
			if (!feature.pro) {
				return false
			}

			if (this.isUnlicensed) {
				return true
			}

			if (feature.upgrade && this.$addons.requiresUpgrade(feature.upgrade)) {
				return true
			}

			return false
		}
	},
	mounted () {
		this.setCurrentStage(this.stage)
	}
}

export const WizardUsageTracking = {
	components : {
		CoreModal,
		SvgClose
	},
	data () {
		return {
			loading   : false,
			showModal : false
		}
	},
	computed : {
		...mapState('wizard', [ 'smartRecommendations' ])
	},
	methods : {
		...mapActions('wizard', [ 'saveWizard' ]),
		processOptIn () {
			this.smartRecommendations.usageTracking = true
			this.loading                            = true
			this.saveWizard('smartRecommendations')
				.then(() => {
					window.location.href = this.$aioseo.urls.aio.dashboard
				})
		}
	}
}