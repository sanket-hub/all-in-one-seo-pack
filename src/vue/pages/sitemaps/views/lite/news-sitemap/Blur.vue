<template>
	<core-blur>
		<div class="aioseo-settings-row aioseo-section-description">
			{{ strings.description }}
			<span
				v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'newsSitemaps', true)"
			/>
		</div>

		<core-settings-row
			:name="strings.enableSitemap"
		>
			<template #content>
				<base-toggle
					:value="true"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="$constants.GLOBAL_STRINGS.preview"
		>
			<template #content>
				<div class="aioseo-sitemap-preview">
					<base-button
						size="medium"
						type="blue"
					>
						<svg-external />
						{{ strings.openSitemap }}
					</base-button>
				</div>

				<div class="aioseo-description">
					{{ strings.noIndexDisplayed }}
					<br>
					{{ strings.doYou404 }}

					<span
						v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'blankSitemap', true)"
					/>
				</div>
			</template>
		</core-settings-row>
	</core-blur>
</template>

<script>
import { NewsSitemap } from '@/vue/pages/sitemaps/mixins'
import CoreBlur from '@/vue/components/common/core/Blur'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import SvgExternal from '@/vue/components/common/svg/External'
export default {
	components : {
		CoreBlur,
		CoreSettingsRow,
		SvgExternal
	},
	mixins : [ NewsSitemap ]
}
</script>