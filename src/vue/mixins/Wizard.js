import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
import CoreModal from '@/vue/components/common/core/Modal'
import SvgClose from '@/vue/components/common/svg/Close'

export const Wizard = {
	data () {
		return {
			strings : {
				skipThisStep    : this.$t.__('Skip this Step', this.$td),
				goBack          : this.$t.__('Go Back', this.$td),
				saveAndContinue : this.$t.__('Save and Continue', this.$td)
			}
		}
	},
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
			showModal : false,
			strings   : {
				closeAndExit       : this.$t.__('Close and Exit Wizard Without Saving', this.$td),
				buildABetterAioseo : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO").
					this.$t.__('Build a Better %1$s', this.$td),
					import.meta.env.VITE_SHORT_NAME
				),
				getImprovedFeatures : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO").
					this.$t.__('Get improved features and faster fixes by sharing non-sensitive data via usage tracking that shows us how %1$s is being used. No personal data is tracked or stored.', this.$td),
					import.meta.env.VITE_SHORT_NAME
				),
				noThanks     : this.$t.__('No thanks', this.$td),
				yesCountMeIn : this.$t.__('Yes, count me in!', this.$td)
			}
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