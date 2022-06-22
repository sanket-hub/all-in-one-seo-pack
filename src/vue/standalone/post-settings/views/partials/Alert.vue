<template>
	<div>
		<core-api-bar v-if="!pong"/>

		<core-license-key-bar v-if="$isPro && isUnlicensed && pong" />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CoreApiBar from '@/vue/components/common/core/ApiBar'
import CoreLicenseKeyBar from '@/vue/components/AIOSEO_VERSION/core/LicenseKeyBar'
export default {
	components : {
		CoreApiBar,
		CoreLicenseKeyBar
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'pong' ])
	}
}
</script>