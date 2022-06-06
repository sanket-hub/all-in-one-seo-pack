<template>
	<grid-column class="tool-settings tool-settings-microsoft-clarity">
		<template
			v-for="(setting, index) in tool.settings"
		>
			<core-settings-row
				noHorizontalMargin
				align-small
				:key="index"
			>
				<template #name>
					{{ setting.label }}
				</template>

				<template #content>
					<div class="d-flex">
						<base-input
							size="small"
							@blur="maybeUpdateId(setting.option)"
							v-model="options.webmasterTools[setting.option]"
						/>
					</div>

					<p class="aioseo-description" v-html="setting.description" />

					<div
						class="aioseo-description"
						v-if="isConnected"
					>
						<a target="_blank" :href="clarityDashboardUrl(options.webmasterTools[setting.option])">{{ strings.dashboard }}</a> |
						<a target="_blank" :href="claritySettingsUrl(options.webmasterTools[setting.option])">{{ strings.settings }}</a>
					</div>

					<br>

					<core-alert
						v-if="!isConnected"
						v-html="strings.description"
					/>
				</template>
			</core-settings-row>
		</template>
	</grid-column>
</template>

<script>
import { WebmasterTools } from '@/vue/pages/settings/mixins'
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import GridColumn from '@/vue/components/common/grid/Column'
export default {
	components : {
		CoreAlert,
		CoreSettingsRow,
		GridColumn
	},
	mixins : [ WebmasterTools ],
	data () {
		return {
			strings : {
				dashboard   : this.$t.__('Dashboard', this.$td),
				settings    : this.$t.__('Settings', this.$td),
				description : this.$t.sprintf(
					// Translators: 1 - "Clarity", 2 - Opening HTML link tag, 3 - Closing HTML link tag.
					this.$t.__('If you don\'t already have a project on %1$s, create a project %2$shere%3$s.', this.$td),
					'Clarity',
					'<a target="_blank" href="https://clarity.microsoft.com/projects?snpf=1&utm_source=aioseo&utm_medium=partner&utm_campaign=growth">',
					'</a>'
				)
			}
		}
	},
	methods : {
		clarityDashboardUrl (projectId) {
			return `https://clarity.microsoft.com/projects/view/${projectId}/dashboard?date=Last%203%20days`
		},
		claritySettingsUrl (projectId) {
			return `https://clarity.microsoft.com/projects/view/${projectId}/settings?date=Last%203%20days`
		}
	}
}
</script>