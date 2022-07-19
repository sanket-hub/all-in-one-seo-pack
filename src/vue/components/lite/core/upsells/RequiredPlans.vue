<template>
	<core-alert
		v-if="isUnlicensed || showAlert"
		type="red"
	>
		{{ strings.thisFeatureRequires }} <strong>{{ $addons.currentPlans(this.addon) }}</strong>
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
		addon : String
	},
	data () {
		return {
			strings : {
				thisFeatureRequires : this.$t.__('This feature requires one of the following plans:', this.$td)
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		showAlert () {
			return this.$addons.requiresUpgrade(this.addon) && this.$addons.currentPlans(this.addon)
		}
	}
}
</script>