<template>
	<grid-column class="tool-settings">
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

					<p
						class="aioseo-description"
						v-html="setting.description"
					/>
				</template>
			</core-settings-row>
		</template>
	</grid-column>
</template>

<script>
import { WebmasterTools } from '@/vue/pages/settings/mixins'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import GridColumn from '@/vue/components/common/grid/Column'
export default {
	components : {
		CoreSettingsRow,
		GridColumn
	},
	mixins : [ WebmasterTools ]
}
</script>