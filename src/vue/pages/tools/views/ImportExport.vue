<template>
	<div>
		<import-export
			v-if="!$aioseo.data.isNetworkAdmin || (!isUnlicensed && $license.hasCoreFeature('tools', 'network-tools-import-export'))"
		/>

		<lite-import-export
			v-if="$aioseo.data.isNetworkAdmin && (isUnlicensed || !$license.hasCoreFeature('tools', 'network-tools-import-export'))"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import ImportExport from './partials/ImportExport'
import LiteImportExport from './lite/ImportExport'
export default {
	components : {
		ImportExport,
		LiteImportExport
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ])
	}
}
</script>