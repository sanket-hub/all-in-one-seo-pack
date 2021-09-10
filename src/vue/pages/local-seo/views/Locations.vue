<template>
	<div class="aioseo-locations">
		<locations
			v-if="!isUnlicensed && $addons.isActive('aioseo-local-business') && !$addons.requiresUpgrade('aioseo-local-business')"
		/>

		<locations-activate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-local-business') && $addons.canActivate('aioseo-local-business') && !$addons.requiresUpgrade('aioseo-local-business')"
		/>

		<locations-lite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-local-business')"
		/>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import LocationsActivate from './AIOSEO_VERSION/LocationsActivate'
import LocationsLite from './lite/Locations'
import Locations from './AIOSEO_VERSION/Locations'
export default {
	components : {
		LocationsActivate,
		LocationsLite,
		Locations
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>