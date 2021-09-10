<template>
	<div class="aioseo-opening-hours">
		<opening-hours
			v-if="!isUnlicensed && $addons.isActive('aioseo-local-business') && !$addons.requiresUpgrade('aioseo-local-business')"
		/>

		<opening-hours-activate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-local-business') && $addons.canActivate('aioseo-local-business') && !$addons.requiresUpgrade('aioseo-local-business')"
		/>

		<opening-hours-lite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-local-business')"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import OpeningHoursActivate from './AIOSEO_VERSION/OpeningHoursActivate'
import OpeningHoursLite from './lite/OpeningHours'
import OpeningHours from './AIOSEO_VERSION/OpeningHours'
export default {
	components : {
		OpeningHoursActivate,
		OpeningHoursLite,
		OpeningHours
	},
	data () {
		return {
			strings : {
				localSeo : this.$t.__('Opening Hours Settings', this.$td)
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>