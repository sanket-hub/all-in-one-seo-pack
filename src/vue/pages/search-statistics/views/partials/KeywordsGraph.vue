<template>
	<div>
		<keywords-graph
			v-if="shouldShowMain('search-statistics', 'keyword-rankings') || isUnlicensed"
			legend-style="simple"
		/>

		<upgrade
			v-if="shouldShowUpgrade('search-statistics', 'keyword-rankings')"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import KeywordsGraph from './keywords-graph/KeywordsGraph'
import Upgrade from './keywords-graph/Upgrade'
import { LicenseConditions } from '@/vue/mixins'
export default {
	mixins : [ LicenseConditions ],
	props  : {
		redirects : Object
	},
	components : {
		KeywordsGraph,
		Upgrade
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
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