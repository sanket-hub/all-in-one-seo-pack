<template>
	<div>
		<redirects
			v-if="shouldShowMain || isUnlicensed"
			:redirects="redirects"
		/>

		<activate
			v-if="shouldShowActivate"
		/>

		<update
			v-if="shouldShowUpdate"
		/>

		<upgrade
			v-if="$addons.requiresUpgrade(addonSlug)"
		/>
	</div>
</template>

<script>
import Activate from './redirects/Activate'
import Redirects from './redirects/Redirects'
import Update from './redirects/Update'
import Upgrade from './redirects/Upgrade'
import { AddonConditions } from '@/vue/mixins'
export default {
	mixins : [ AddonConditions ],
	props  : {
		redirects : Object
	},
	components : {
		Activate,
		Redirects,
		Update,
		Upgrade
	},
	data () {
		return {
			addonSlug : 'aioseo-redirects'
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-search-statistics-redirects {
	font-size: 14px;

	.aioseo-cta {
		.aioseo-cta-background {
			.header-text {
				font-size: 15px;
			}

			.description {
				font-size: 14px;
			}
		}
	}
}
</style>