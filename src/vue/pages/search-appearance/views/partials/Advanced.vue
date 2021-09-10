<template>
	<div class="aioseo-sa-ct-advanced">
		<core-settings-row
			:name="strings.robotsSetting"
		>
			<template #content>
				<core-robots-meta
					:options="options.advanced.robotsMeta"
					:mainOptions="options"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="showBulk"
			:name="strings.bulkEditing"
			align
		>
			<template #content>
				<base-radio-toggle
					v-model="options.advanced.bulkEditing"
					:name="`${object.name}BulkEditing`"
					:options="[
						{ label: $constants.GLOBAL_STRINGS.disabled, value: 'disabled' },
						{ label: $constants.GLOBAL_STRINGS.enabled, value: 'enabled' },
						{ label: strings.readOnly, value: 'read-only' },
					]"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="!noMetaBox && (!isUnlicensed || 'taxonomies' !== type)"
			:name="strings.otherOptions"
		>
			<template #content>
				<!--div class="other-options">
					<base-toggle
						v-model="options.advanced.showDateInGooglePreview"
					>
						{{ strings.showDateInGooglePreview }}
					</base-toggle>
				</div>
				<div class="other-options">
					<base-toggle
						v-model="options.advanced.showPostThumbnailInSearch"
					>
						{{ showPostThumbnailInSearch }}
					</base-toggle>
				</div-->
				<div class="other-options">
					<base-toggle
						v-model="options.advanced.showMetaBox"
					>
						{{ showMetaBox }}
					</base-toggle>
				</div>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="mainOptions.searchAppearance.advanced.useKeywords && includeKeywords"
			:name="strings.keywords"
			align
		>
			<template #content>
				<base-select
					multiple
					taggable
					:options="getJsonValue(options.advanced.keywords) || []"
					:value="getJsonValue(options.advanced.keywords) || []"
					@input="values => options.advanced.keywords = setJsonValue(values)"
					:tag-placeholder="strings.tagPlaceholder"
				/>
			</template>
		</core-settings-row>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { JsonValues, MaxCounts } from '@/vue/mixins'
export default {
	mixins : [ JsonValues, MaxCounts ],
	props  : {
		type : {
			type     : String,
			required : true
		},
		object : {
			type     : Object,
			required : true
		},
		options : {
			type     : Object,
			required : true
		},
		showBulk        : Boolean,
		noMetaBox       : Boolean,
		includeKeywords : Boolean
	},
	data () {
		return {
			titleCount       : 0,
			descriptionCount : 0,
			strings          : {
				robotsSetting           : this.$t.__('Robots Meta Settings', this.$td),
				bulkEditing             : this.$t.__('Bulk Editing', this.$td),
				readOnly                : this.$t.__('Read Only', this.$td),
				otherOptions            : this.$t.__('Other Options', this.$td),
				showDateInGooglePreview : this.$t.__('Show Date in Google Preview', this.$td),
				keywords                : this.$t.__('Keywords', this.$td)
			}
		}
	},
	computed : {
		...mapState({
			mainOptions : 'options'
		}),
		...mapGetters([
			'isUnlicensed'
		]),
		title () {
			// Translators: 1 - The type of page (Post, Page, Category, Tag, etc.).
			return this.$t.sprintf(this.$t.__('%1$s Title', this.$td), this.object.singular)
		},
		showPostThumbnailInSearch () {
			// Translators: 1 - The type of page (Post, Page, Category, Tag, etc.).
			return this.$t.sprintf(this.$t.__('Show %1$s Thumbnail in Google Custom Search', this.$td), this.object.singular)
		},
		showMetaBox () {
			// Translators: 1 - The plugin name ("All in One SEO")
			return this.$t.sprintf(this.$t.__('Show %1$s Meta Box', this.$td), process.env.VUE_APP_SHORT_NAME)
		}
	}
}
</script>

<style lang="scss">
.aioseo-sa-ct-advanced {
	.other-options {
		margin-top: 10px;

		&:first-child {
			margin-top: 0;
		}
	}
}
</style>