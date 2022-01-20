<template>
	<div class="aioseo-opening-hours">
		<opening-hours
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
import OpeningHours from './AIOSEO_VERSION/opening-hours/OpeningHours'
import Activate from './AIOSEO_VERSION/opening-hours/Activate'
import Lite from './lite/opening-hours/OpeningHours'
import Update from './AIOSEO_VERSION/opening-hours/Update'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins     : [ AddonConditions ],
	components : {
		OpeningHours,
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