<template>
	<core-main
		:page-name="strings.pageName"
		:show-save-button="showSaveButton"
		:exclude-tabs="excludeTabs"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import { mapState } from 'vuex'
import { RequiresActivation, RequiresUpdate } from '@/vue/mixins'
import CoreMain from '@/vue/components/common/core/main/Index.vue'
import FullSiteRedirect from './AIOSEO_VERSION/FullSiteRedirect'
import ImportExport from './AIOSEO_VERSION/ImportExport'
import Logs from './AIOSEO_VERSION/Logs'
import Logs404 from './AIOSEO_VERSION/Logs404'
import Redirects from './Redirects'
import Settings from './AIOSEO_VERSION/Settings'
export default {
	components : {
		CoreMain,
		FullSiteRedirect,
		ImportExport,
		Logs,
		Logs404,
		Redirects,
		Settings
	},
	mixins : [ RequiresActivation, RequiresUpdate ],
	data () {
		return {
			strings : {
				pageName : this.$t.__('Redirects', this.$td)
			}
		}
	},
	computed : {
		...mapState('redirects', [ 'options' ]),
		showSaveButton () {
			return 'redirects' !== this.$route.name &&
				'groups' !== this.$route.name &&
				'logs-404' !== this.$route.name &&
				'logs' !== this.$route.name &&
				'import-export' !== this.$route.name
		},
		excludeTabs () {
			const exclude = !this.$addons.isActive('aioseo-redirects')
				? this.getExcludedActivationTabs('aioseo-redirects')
				: this.getExcludedUpdateTabs('aioseo-redirects')

			if (!this.options.logs.log404.enabled) {
				exclude.push('logs-404')
			}

			if (!this.options.logs.redirects.enabled || 'server' === this.options.main.method) {
				exclude.push('logs')
			}

			return exclude
		}
	}
}
</script>

<style lang="scss">
.aioseo-redirects {
	position: relative;

	&.core-card {
		.aioseo-cta.floating {
			top: 120px;
		}
	}
}
</style>