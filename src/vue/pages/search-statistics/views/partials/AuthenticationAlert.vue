<template>
	<core-alert
		class="aioseo-input-error aioseo-search-statistics-authentication-alert"
		type="red"
		v-if="invalidAuthentication"
	>
		<strong>{{ error }}</strong>
	</core-alert>
</template>

<script>
import { mapState } from 'vuex'
import CoreAlert from '@/vue/components/common/core/alert/Index'
export default {
	components : {
		CoreAlert
	},
	data () {
		return {
			error : this.$t.__('Your connection with Google Search Console has expired or is invalid. Please check that your site is verified in Google Search Console and try to reconnect. If the problem persists, please contact our support team.', this.$tdPro)
		}
	},
	computed : {
		...mapState([ 'internalOptions' ]),
		...mapState('search-statistics', [ 'unverifiedSite' ]),
		invalidAuthentication () {
			return this.unverifiedSite || 'object' !== typeof this.internalOptions.internal?.searchStatistics?.profile
		}
	}
}
</script>

<style lang="scss">
.aioseo-search-statistics-authentication-alert {
	margin-bottom: 20px;
}
</style>