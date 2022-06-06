<template>
	<div class="aioseo-link-assistant-overview">
		<overview
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
import Activate from './AIOSEO_VERSION/overview/Activate'
import Lite from './lite/overview/Overview'
import Overview from './AIOSEO_VERSION/overview/Overview'
import Update from './AIOSEO_VERSION/overview/Update'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins     : [ AddonConditions ],
	components : {
		Activate,
		Lite,
		Overview,
		Update
	},
	data () {
		return {
			addonSlug : 'aioseo-link-assistant'
		}
	}
}
</script>