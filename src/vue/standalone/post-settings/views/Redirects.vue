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

import Redirects from './AIOSEO_VERSION/partials-redirects/Redirects'
import RedirectsActivate from './AIOSEO_VERSION/partials-redirects/RedirectsActivate'
import RedirectsLite from './lite/partials-redirects/Redirects'

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