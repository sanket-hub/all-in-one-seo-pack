<template>
	<div>
		<database-tools
			v-if="!$aioseo.data.isNetworkAdmin || (!isUnlicensed && $license.hasCoreFeature('tools', 'network-tools-database'))"
		/>

		<lite-database-tools
			v-if="$aioseo.data.isNetworkAdmin && (isUnlicensed || !$license.hasCoreFeature('tools', 'network-tools-database'))"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import DatabaseTools from './partials/DatabaseTools'
import LiteDatabaseTools from './lite/DatabaseTools'
export default {
	components : {
		DatabaseTools,
		LiteDatabaseTools
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>