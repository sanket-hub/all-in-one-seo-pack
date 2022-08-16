<template>
	<div class="aioseo-tab-content">
		<Redirects
			v-if="!isUnlicensed && $addons.isActive('aioseo-redirects') && !$addons.requiresUpgrade('aioseo-redirects')"
			:parentComponentContext="parentComponentContext"
		/>

		<RedirectsLite
			v-if="isUnlicensed || $addons.requiresUpgrade('aioseo-redirects')"
			:parentComponentContext="parentComponentContext"
		/>

		<RedirectsActivate
			v-if="!isUnlicensed && !$addons.isActive('aioseo-redirects') && $addons.canActivate('aioseo-redirects') && !$addons.requiresUpgrade('aioseo-redirects')"
			:parentComponentContext="parentComponentContext"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

import Redirects from './AIOSEO_VERSION/Redirects'
import RedirectsActivate from './AIOSEO_VERSION/RedirectsActivate'
import RedirectsLite from './lite/Redirects'

export default {
	props : {
		parentComponentContext : String
	},
	components : {
		Redirects,
		RedirectsActivate,
		RedirectsLite
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>