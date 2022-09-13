<template>
	<core-main
		:page-name="strings.pageName"
		:show-save-button="showSaveButton"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import BadBotBlocker from './BadBotBlocker'
import CoreMain from '@/vue/components/common/core/main/Index.vue'
import DatabaseTools from './DatabaseTools'
import Debug from './AIOSEO_VERSION/Debug'
import HtaccessEditor from './HtaccessEditor'
import ImportExport from './ImportExport'
import RobotsEditor from './RobotsEditor'
import SystemStatus from './SystemStatus'
export default {
	components : {
		BadBotBlocker,
		CoreMain,
		DatabaseTools,
		Debug,
		HtaccessEditor,
		ImportExport,
		RobotsEditor,
		SystemStatus
	},
	data () {
		return {
			strings : {
				pageName : this.$aioseo.data.isNetworkAdmin
					? this.$t.__('Network Tools', this.$td)
					: this.$t.__('Tools', this.$td)
			}
		}
	},
	computed : {
		showSaveButton () {
			return 'system-status' !== this.$route.name &&
				'import-export' !== this.$route.name &&
				'database-tools' !== this.$route.name &&
				'debug' !== this.$route.name
		}
	}
}
</script>