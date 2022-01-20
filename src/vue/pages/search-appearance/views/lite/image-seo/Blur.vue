<template>
	<core-blur>
		<core-settings-row
			:name="strings.titleAttributeFormat"
		>
			<template #content>
				<core-html-tags-editor
					:line-numbers="false"
					single
					:default-tags="[
						'image_title',
						'separator_sa',
						'site_title',
						'alt_tag'
					]"
				>
					<template #tags-description>
						{{ strings.clickToAddVariablesTitleTag }}
					</template>
				</core-html-tags-editor>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.stripPunctuationTitleAttribute"
			align
		>
			<template #content>
				<base-radio-toggle
					:value="false"
					name="stripTitlePunctuation"
					:options="[
						{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
						{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
					]"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.altTagAttributeFormat"
		>
			<template #content>
				<core-html-tags-editor
					:line-numbers="false"
					single
					:default-tags="[
						'image_title',
						'separator_sa',
						'site_title',
						'alt_tag'
					]"
				>
					<template #tags-description>
						{{ strings.clickToAddVariablesAltTag }}
					</template>
				</core-html-tags-editor>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.stripPunctuationForAltAttribute"
			align
		>
			<template #content>
				<base-radio-toggle
					:value="false"
					name="stripAltPunctuation"
					:options="[
						{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
						{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
					]"
				/>
			</template>
		</core-settings-row>
	</core-blur>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				titleAttributeFormat            : this.$t.__('Title Attribute Format', this.$tdPro),
				stripPunctuationTitleAttribute  : this.$t.__('Strip Punctuation for Title Attributes', this.$tdPro),
				clickToAddVariablesTitleTag     : this.$t.__('Click on the tags below to insert variables into your title attribute.', this.$tdPro),
				altTagAttributeFormat           : this.$t.__('Alt Tag Attribute Format', this.$tdPro),
				clickToAddVariablesAltTag       : this.$t.__('Click on the tags below to insert variables into your alt tag attribute.', this.$tdPro),
				stripPunctuationForAltAttribute : this.$t.__('Strip Punctuation for Alt Attributes', this.$tdPro)
			}
		}
	}
}
</script>