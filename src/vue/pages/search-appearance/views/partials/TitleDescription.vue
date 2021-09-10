<template>
	<div class="aioseo-sa-ct-title-description">
		<core-settings-row
			:name="strings.showInSearchResults"
			align
		>
			<template #content>
				<base-radio-toggle
					v-if="edit"
					v-model="options.show"
					:name="`${object.name}ShowInSearch`"
					:options="[
						{ label: $constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
						{ label: $constants.GLOBAL_STRINGS.yes, value: true }
					]"
				/>
				<base-radio-toggle
					v-if="!edit"
					:value="true"
					:name="`${object.name}ShowInSearch`"
					:options="[
						{ label: $constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
						{ label: $constants.GLOBAL_STRINGS.yes, value: true }
					]"
				/>

				<div class="aioseo-description">
					{{ strings.noIndexDescription }}
				</div>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="edit && options.show"
			:name="$constants.GLOBAL_STRINGS.preview"
		>
			<template #content>
				<core-google-search-preview
					:title="options.title"
					:separator="separator"
					:description="options.metaDescription"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="options.show"
			:name="title"
		>
			<template #content>
				<core-html-tags-editor
					v-if="edit"
					v-model="options.title"
					:line-numbers="false"
					single
					:tags-context="`${object.name}Title`"
					:default-tags="$tags.getDefaultTags(type, object.name, 'title')"
				>
					<template #tags-description>
						{{ strings.clickToAddTitle }}
					</template>
				</core-html-tags-editor>

				<core-html-tags-editor
					v-if="!edit"
					:line-numbers="false"
					single
					:tags-context="`${object.name}Title`"
					:default-tags="$tags.getDefaultTags(type, object.name, 'title')"
				>
					<template #tags-description>
						{{ strings.clickToAddTitle }}
					</template>
				</core-html-tags-editor>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="options.show"
			:name="strings.metaDescription"
		>
			<template #content>
				<core-html-tags-editor
					v-if="edit"
					v-model="options.metaDescription"
					:line-numbers="false"
					description
					:tags-context="`${object.name}Description`"
					:default-tags="$tags.getDefaultTags(type, object.name, 'description')"
				>
					<template #tags-description>
						{{ strings.clickToAddDescription }}
					</template>
				</core-html-tags-editor>

				<core-html-tags-editor
					v-if="!edit"
					:line-numbers="false"
					:tags-context="`${object.name}Description`"
					:default-tags="$tags.getDefaultTags(type, object.name, 'description')"
				>
					<template #tags-description>
						{{ strings.clickToAddDescription }}
					</template>
				</core-html-tags-editor>
			</template>
		</core-settings-row>
	</div>
</template>

<script>
import { MaxCounts } from '@/vue/mixins'
export default {
	mixins : [ MaxCounts ],
	props  : {
		type : {
			type     : String,
			required : true
		},
		object : {
			type     : Object,
			required : true
		},
		separator : {
			type     : String,
			required : true
		},
		options : {
			type     : Object,
			required : true
		},
		edit : {
			type : Boolean,
			default () {
				return true
			}
		}
	},
	data () {
		return {
			titleCount       : 0,
			descriptionCount : 0,
			strings          : {
				showInSearchResults   : this.$t.__('Show in Search Results', this.$td),
				clickToAddTitle       : this.$t.__('Click on the tags below to insert variables into your title.', this.$td),
				metaDescription       : this.$t.__('Meta Description', this.$td),
				clickToAddDescription : this.$t.__('Click on the tags below to insert variables into your meta description.', this.$td),
				noIndexDescription    : this.$t.__('Selecting "No" will no-index this page.', this.$td)
			}
		}
	},
	watch : {
		show (newVal) {
			this.options.advanced.robotsMeta.noindex = !newVal
			if (!newVal) {
				this.options.advanced.robotsMeta.default = false
			}
		}
	},
	computed : {
		title () {
			// Translators: 1 - The type of page (Post, Page, Category, Tag, etc.).
			return this.$t.sprintf(this.$t.__('%1$s Title', this.$td), this.object.singular)
		},
		show () {
			return this.options.show
		}
	},
	methods : {

	}
}
</script>