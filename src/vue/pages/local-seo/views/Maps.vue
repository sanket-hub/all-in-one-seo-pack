<template>
	<div class="aioseo-maps">
		<maps-pro
			v-if="!isUnlicensed && $addons.isActive('aioseo-local-business') && !$addons.requiresUpgrade('aioseo-local-business')"
		/>

		<maps-activate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-local-business') && $addons.canActivate('aioseo-local-business') && !$addons.requiresUpgrade('aioseo-local-business')"
		/>

		<maps-lite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-local-business')"
		/>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import MapsActivate from './pro/MapsActivate'
import MapsLite from './lite/Maps'
import MapsPro from './pro/Maps'
export default {
	components : {
		MapsActivate,
		MapsLite,
		MapsPro
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>