<template>
	<div class="aioseo-locations">
		<locations
			v-if="shouldShowMain"
		/>

		<activate
			v-if="shouldShowActivate"
		/>

		<update
			v-if="shouldShowUpdate"
		/>

		<lite
			v-if="shouldShowLite"
		/>
	</div>
</template>

<script>
import Locations from './AIOSEO_VERSION/locations/Locations'
import Activate from './AIOSEO_VERSION/locations/Activate'
import Lite from './lite/locations/Locations'
import Update from './AIOSEO_VERSION/locations/Update'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins     : [ AddonConditions ],
	components : {
		Locations,
		Activate,
		Lite,
		Update
	},
	data () {
		return {
			addonSlug : 'aioseo-local-business'
		}
	}
}
</script>