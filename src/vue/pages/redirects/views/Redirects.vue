<template>
	<div class="aioseo-redirects-main">
		<redirects
			v-if="!isUnlicensed && $addons.isActive('aioseo-redirects') && !$addons.requiresUpgrade('aioseo-redirects')"
		/>

		<redirects-activate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-redirects') && $addons.canActivate('aioseo-redirects') && !$addons.requiresUpgrade('aioseo-redirects')"
		/>

		<redirects-lite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-redirects')"
		/>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Redirects from './AIOSEO_VERSION/Redirects'
import RedirectsActivate from './AIOSEO_VERSION/RedirectsActivate'
import RedirectsLite from './lite/Redirects'
export default {
	components : {
		Redirects,
		RedirectsActivate,
		RedirectsLite
	},
	data () {
		return {
			strings : {
				locationsSettings : this.$t.__('Redirects Settings', this.$td)
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'options', 'settings' ])
	}
}
</script>