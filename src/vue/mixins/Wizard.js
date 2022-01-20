import { mapGetters, mapMutations } from 'vuex'
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