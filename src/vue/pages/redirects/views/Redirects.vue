<template>
	<div class="aioseo-redirects-main">
		<redirects
			v-if="shouldShowMain"
		/>

		<cta
			v-if="shouldShowUpdate || shouldShowActivate"
		/>

		<lite
			v-if="shouldShowLite"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Cta from './AIOSEO_VERSION/redirects/Cta'
import Lite from './lite/redirects/Redirects'
import Redirects from './AIOSEO_VERSION/redirects/Redirects'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins     : [ AddonConditions ],
	components : {
		Cta,
		Lite,
		Redirects
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