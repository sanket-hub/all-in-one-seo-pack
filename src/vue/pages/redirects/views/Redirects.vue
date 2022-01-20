<template>
	<div class="aioseo-redirects-main">
		<redirects
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
import { mapState } from 'vuex'
import Activate from './AIOSEO_VERSION/redirects/Activate'
import Lite from './lite/redirects/Redirects'
import Redirects from './AIOSEO_VERSION/redirects/Redirects'
import Update from './AIOSEO_VERSION/redirects/Update'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins     : [ AddonConditions ],
	components : {
		Activate,
		Lite,
		Redirects,
		Update
	},
	data () {
		return {
			addonSlug : 'aioseo-redirects'
		}
	},
	computed : {
		...mapState([ 'options', 'settings' ])
	}
}
</script>