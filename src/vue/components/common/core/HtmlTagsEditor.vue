<template>
	<div class="aioseo-html-tags-editor">
		<core-alert-unfiltered-html v-if="checkUnfilteredHtml" />

		<div v-if="!disabled">
			<div
				v-if="showTags && allowTags && tagsDescription.length"
				class="aioseo-description tags-description"
			>
				<slot name="tags-description">
					{{ tagsDescription }}
				</slot>
			</div>

			<div
				v-if="showTags && allowTags"
				class="add-tags"
			>
				<core-add-template-tag
					v-for="(tag, index) in filteredTags"
					:key="index"
					@click.native="insertTag(tag.id)"
				>
					{{ tag.name }}
				</core-add-template-tag>

				<div
					v-if="!disableEmoji"
				>
					<button
						class="aioseo-show-emoji-button"
						@click.prevent="showEmojiPicker = !showEmojiPicker"
					>
						😀
					</button>

					<core-emoji
						:show.sync="showEmojiPicker"
						@selected-emoji="insertSelectedEmoji"
					/>
				</div>

				<a
					v-if="showAllTagsLink"
					class="aioseo-view-all-tags"
					href="#"
					@click.prevent="insertTag()"
				>
					{{ strings.allTags }}&nbsp;&rarr;
				</a>
			</div>
		</div>

		<base-editor
			ref="editor"
			:value="value"
			@input="value => $emit('input', value)"
			:allow-tags="allowTags"
			:line-numbers="lineNumbers"
			:single="single"
			:disabled="disabled"
			:minimum-line-numbers="minimumLineNumbers"
			@counter="count => $emit('counter', count)"
			:tags-context="tagsContext"
			:default-menu-orientation="defaultMenuOrientation"
			:description="description"
		/>
	</div>
</template>

<script>
import BaseEditor from '@/vue/components/common/base/Editor'
import CoreAddTemplateTag from '@/vue/components/common/core/AddTemplateTag'
import CoreAlertUnfilteredHtml from '@/vue/components/common/core/alert/UnfilteredHtml'
import CoreEmoji from '@/vue/components/common/core/Emoji'
export default {
	components : {
		BaseEditor,
		CoreAddTemplateTag,
		CoreAlertUnfilteredHtml,
		CoreEmoji
	},
	props : {
		single      : Boolean,
		lineNumbers : {
			type : Boolean,
			default () {
				return true
			}
		},
		minimumLineNumbers : {
			type : Number,
			default () {
				return 13
			}
		},
		allowTags : {
			type : Boolean,
			default () {
				return true
			}
		},
		showTags : {
			type : Boolean,
			default () {
				return true
			}
		},
		showAllTagsLink : {
			type : Boolean,
			default () {
				return true
			}
		},
		defaultTags : Array,
		value       : {
			type    : String,
			default : ''
		},
		tagsContext            : String,
		defaultMenuOrientation : String,
		description            : Boolean,
		disableEmoji           : Boolean,
		tagsDescription        : {
			type : String,
			default () {
				return this.$t.__('Click on the tags below to insert variables into your template.', this.$td)
			}
		},
		checkUnfilteredHtml : {
			type : Boolean,
			default () {
				return false
			}
		},
		disabled : {
			type : Boolean,
			default () {
				return this.checkUnfilteredHtml && !this.$aioseo.user.unfilteredHtml
			}
		}
	},
	data () {
		return {
			showEmojiPicker : false,
			strings         : {
				allTags : this.$t.__('View all tags', this.$td)
			}
		}
	},
	computed : {
		filteredTags () {
			const tags = this.tagsContext ? this.$tags.context(this.tagsContext) : this.$aioseo.tags.tags
			return !this.defaultTags
				? tags
					.filter(tag => !tag.deprecated)
					.slice(0, 3)
				: this.defaultTags.map(dt => tags.find(t => t.id === dt))
					.filter(tag => tag)
		}
	},
	methods : {
		insertTag (tagId) {
			this.$refs.editor.insertTag(tagId)
		},
		insertSelectedEmoji (emoji) {
			this.$refs.editor.insertToCursor(emoji.native)
		}
	}
}
</script>

<style lang="scss">
.aioseo-html-tags-editor {
	.no-access {
		margin-bottom: 20px;
	}

	.aioseo-description.tags-description {
		margin: 0 0 20px;
	}

	.add-tags {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
		gap: 10px;

		button {
			height: 30px;
			background: #fff;
			border-radius: 3px;
			padding: 0 5px;
			color: $black;
			font-size: 14px;
			border: 1px solid $border;
			cursor: pointer;
			user-select: none;
			font-weight: 600;

			&:hover {
				background-color: $background;
			}
		}

		a {
			font-size: 14px;

			&.no-underline {
				padding-left: 10px;
			}
		}
	}
}
</style>