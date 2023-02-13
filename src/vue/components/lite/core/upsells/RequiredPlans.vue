<template>
	<core-alert
		v-if="isUnlicensed || showAlert"
		type="red"
	>
		{{ requiredPlansString }} <strong>{{ getRequiredPlans }}</strong>
	</core-alert>
</template>

<script>
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import { mapGetters } from 'vuex'
export default {
	components : {
		CoreAlert
	},
	props : {
		addon       : String,
		coreFeature : {
			type : Array,
			default () {
				return []
			}
		},
		addonFeature : {
			type : Array,
			default () {
				return []
			}
		}
	},
	data () {
		return {
			strings : {
				thisFeatureRequires         : this.$t.__('This feature requires one of the following plans:', this.$td),
				thisFeatureRequiresSingular : this.$t.__('This feature requires the following plan:', this.$td)
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		requiredPlansString () {
			return 1 < this.requiredPlans.length
				? this.strings.thisFeatureRequires
				: this.strings.thisFeatureRequiresSingular
		},
		getRequiredPlans () {
			return this.requiredPlans.join(', ')
		},
		showAlert () {
			if (this.level) {
				return !this.$license.hasMinimumLevel(this.level) && this.requiredPlans.length
			}

			return this.$addons.requiresUpgrade(this.addon) && this.requiredPlans.length
		},
		requiredPlans () {
			if (this.coreFeature.length || this.addonFeature.length) {
				const sectionSlug = this.coreFeature[0] || this.addonFeature[0]
				const feature     = this.coreFeature.length
					? ('undefined' !== typeof this.coreFeature[1] ? this.coreFeature[1] : '')
					: ('undefined' !== typeof this.addonFeature[1] ? this.addonFeature[1] : '')
				return this.$license.getPlansForFeature(sectionSlug, feature)
			}

			return this.$addons.currentPlans(this.addon)
		}
	}
}
</script>