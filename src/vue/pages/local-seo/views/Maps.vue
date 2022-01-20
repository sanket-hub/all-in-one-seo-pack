<template>
	<div class="aioseo-maps">
		<maps
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
import Maps from './AIOSEO_VERSION/maps/Maps'
import Activate from './AIOSEO_VERSION/maps/Activate'
import Lite from './lite/maps/Maps'
import Update from './AIOSEO_VERSION/maps/Update'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins     : [ AddonConditions ],
	components : {
		Maps,
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