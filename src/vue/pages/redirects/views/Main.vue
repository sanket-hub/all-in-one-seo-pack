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
import FullSiteRedirect from './AIOSEO_VERSION/FullSiteRedirect'
import ImportExport from './AIOSEO_VERSION/ImportExport'
import Logs from './AIOSEO_VERSION/Logs'
import Logs404 from './AIOSEO_VERSION/Logs404'
import Redirects from './Redirects'
import Settings from './AIOSEO_VERSION/Settings'
export default {
	components : {
		FullSiteRedirect,
		ImportExport,
		Logs,
		Logs404,
		Redirects,
		Settings
	},
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
			if (!this.$addons.isActive('aioseo-redirects') || this.$addons.requiresUpgrade('aioseo-redirects')) {
				return [
					'full-site-redirect',
					'logs',
					'logs-404',
					'import-export',
					'settings'
				]
			}

			const exclude = []
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