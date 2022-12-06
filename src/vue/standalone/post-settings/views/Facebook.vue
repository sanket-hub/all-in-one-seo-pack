<template>
	<div class="tab-facebook">
		<core-settings-row
			noBorder
			noVerticalMargin
		>
			<template #content>
				<core-alert
					class="facebook-disabled-warning"
					v-if="!options.social.facebook.general.enable"
					v-html="strings.facebookDisabled"
					type="red"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.tabName"
		>
			<template #content>
				<core-facebook-preview
					:class="{ ismobilecard: currentPost.socialMobilePreview }"
					:description="previewDescription"
					:image="imageUrl"
					:loading="loading"
					:title="previewTitle"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.facebookTitle"
			class="facebook-title-settings"
			align
		>
			<template #content>
				<core-html-tags-editor
					class="facebook-meta-input"
					v-model="currentPost.og_title"
					:line-numbers="false"
					single
					@counter="count => updateCount(count, 'titleCount')"
					@input="setIsDirty"
					:tags-context="`${currentPost.postType || currentPost.termType}Title`"
					:default-tags="$tags.getDefaultTags('term' === currentPost.context ? 'taxonomies' : null, null, 'title')"
				>
					<template #tags-description>
						{{ strings.clickToAddSiteName }}
					</template>
				</core-html-tags-editor>

				<div class="max-recommended-count"
					v-html="maxRecommendedCount(titleCount, 95)"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			:name="strings.facebookDescription"
			class="facebook-description-settings"
			align
		>
			<template #content>
				<core-html-tags-editor
					class="facebook-meta-input"
					v-model="currentPost.og_description"
					:line-numbers="false"
					description
					@counter="count => updateCount(count, 'descriptionCount')"
					@input="setIsDirty"
					:tags-context="`${currentPost.postType || currentPost.termType}Description`"
					:default-tags="$tags.getDefaultTags('term' === currentPost.context ? 'taxonomies' : null, null, 'description')"
				>
					<template #tags-description>
						{{ strings.clickToAddHomePageDescription }}
					</template>
				</core-html-tags-editor>

				<div class="max-recommended-count"
					v-html="maxRecommendedCount(descriptionCount, 200)"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			class="facebook-image-source"
			:name="strings.imageSource"
			align
		>
			<template #content>
				<base-select
					size="medium"
					:options="imageSourceOptionsFiltered"
					:value="getImageSourceOptionFiltered(currentPost.og_image_type)"
					@input="value => saveImageType(value.value)"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="'custom' === currentPost.og_image_type"
			:name="strings.customFieldsName"
			align
		>
			<template #content>
				<base-input
					type="text"
					size="medium"
					:placeholder="strings.placeholder"
					v-model="currentPost.og_image_custom_fields"
					@input="setIsDirty"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="'custom_image' === currentPost.og_image_type"
			class="facebook-image"
			:name="strings.facebookImage"
		>
			<template #content>
				<div class="facebook-image-upload">
					<base-input
						size="medium"
						v-model="currentPost.og_image_custom_url"
						:placeholder="strings.pasteYourImageUrl"
						@input="setIsDirty"
					/>

					<base-button
						class="insert-image"
						@click="openUploadModal('facebookImage', updateImage)"
						size="medium"
						type="black"
					>
						<svg-circle-plus />
						{{ strings.uploadOrSelectImage }}
					</base-button>

					<base-button
						class="remove-image"
						@click="currentPost.og_image_custom_url = null"
						size="medium"
						type="gray"
					>
						{{ strings.remove }}
					</base-button>
				</div>

				<div class="aioseo-description">
					{{ strings.minimumSize }}
				</div>

				<base-img :src="currentPost.og_image_custom_url" />
			</template>
		</core-settings-row>

		<core-settings-row
			class="facebook-video"
			:name="strings.video"
			align
		>
			<template #content>
				<base-input
					type="text"
					size="medium"
					v-model="currentPost.og_video"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			class="facebook-object-type"
			:name="strings.facebookObjectType"
			align
		>
			<template #content>
				<base-select
					size="medium"
					open-direction="top"
					:options="objectTypeOptions"
					group-label="groupLabel"
					group-values="options"
					:value="getObjectTypeOptions(currentPost.og_object_type)"
					@input="value => setObjectType(value.value)"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="shouldShowArticleSection"
			:name="strings.articleSection"
			align
		>
			<template #content>
				<base-input
					type="text"
					size="medium"
					v-model="currentPost.og_article_section"
				/>
			</template>
		</core-settings-row>

		<core-settings-row
			v-if="shouldShowArticleSection"
			:name="strings.articleTags"
			align
		>
			<template #content>
				<base-select
					multiple
					taggable
					:options="getJsonValue(currentPost.og_article_tags) || []"
					:value="getJsonValue(currentPost.og_article_tags) || []"
					@input="values => currentPost.og_article_tags = setJsonValue(values)"
					:tag-placeholder="strings.tagPlaceholder"
				/>
			</template>
		</core-settings-row>
	</div>
</template>

<script>
import { ImageSourceOptions, ImagePreview, JsonValues, MaxCounts, Tags, Uploader, IsDirty } from '@/vue/mixins'
import { mapState, mapActions } from 'vuex'
import BaseImg from '@/vue/components/common/base/Img'
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import CoreFacebookPreview from '@/vue/components/common/core/FacebookPreview'
import CoreHtmlTagsEditor from '@/vue/components/common/core/HtmlTagsEditor'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import SvgCirclePlus from '@/vue/components/common/svg/circle/Plus'

export default {
	components : {
		BaseImg,
		CoreAlert,
		CoreFacebookPreview,
		CoreHtmlTagsEditor,
		CoreSettingsRow,
		SvgCirclePlus
	},
	mixins : [ ImageSourceOptions, ImagePreview, JsonValues, MaxCounts, Tags, Uploader, IsDirty ],
	props  : {
		isMobilePreview : {
			type : Boolean,
			default () {
				return false
			}
		}
	},
	data () {
		return {
			titleCount       : 0,
			descriptionCount : 0,
			strings          : {
				tabName                       : this.$t.__('Facebook Preview', this.$td),
				imageSource                   : this.$t.__('Image Source', this.$td),
				customFieldsName              : this.$t.__('Custom Field Name', this.$td),
				video                         : this.$t.__('Video URL', this.$td),
				width                         : this.$t.__('Width', this.$td),
				height                        : this.$t.__('Height', this.$td),
				facebookObjectType            : this.$t.__('Object Type', this.$td),
				facebookImage                 : this.$t.__('Facebook Image', this.$td),
				facebookTitle                 : this.$t.__('Facebook Title', this.$td),
				facebookDescription           : this.$t.__('Facebook Description', this.$td),
				uploadOrSelectImage           : this.$t.__('Upload or Select Image', this.$td),
				pasteYourImageUrl             : this.$t.__('Paste your image URL or select a new image', this.$td),
				minimumSize                   : this.$t.__('Minimum size: 200px x 200px, ideal ratio 1.91:1, 5MB max. (eg: 1640px x 856px or 3280px x 1712px for retina screens). JPG, PNG, WEBP and GIF formats only.', this.$td),
				remove                        : this.$t.__('Remove', this.$td),
				clickToAddSiteName            : this.$t.__('Click on the tags below to insert variables into your site name.', this.$td),
				clickToAddHomePageDescription : this.$t.__('Click on the tags below to insert variables into your meta description.', this.$td),
				articleSection                : this.$t.__('Article Section', this.$td),
				articleTags                   : this.$t.__('Article Tags', this.$td),
				tagPlaceholder                : this.$t.__('Press enter to create an article tag', this.$td),
				facebookDisabled              : this.$t.sprintf(
					// Translators: 1 - "Open Graph", 2 - "Go to Social Networks ->".
					this.$t.__('No %1$s markup will be output for your post because it is currently disabled. You can enable %1$s markup in the Social Networks settings. %2$s', this.$td),
					this.$t.__('Open Graph', this.$td),
					this.$t.sprintf(
						'<a href="%1$s" target="_blank">%2$s<span class="link-right-arrow">&nbsp;&rarr;</span></a>',
						this.$aioseo.urls.aio.socialNetworks + '#facebook',
						this.$t.__('Go to Social Networks', this.$td)
					)
				)
			}
		}
	},
	computed : {
		...mapState('live-tags', [ 'liveTags' ]),
		...mapState([ 'currentPost', 'metaBoxTabs', 'options', 'dynamicOptions' ]),
		objectTypeOptions () {
			return [ { groupLabel: this.$t.__('Default', this.$td), options: [ { label: this.$t.__('Default Object Type (Set in Social Networks)', this.$td), value: 'default' } ] } ].concat(this.$constants.OG_TYPE_OPTIONS)
		},
		previewTitle () {
			return this.parseTags(this.currentPost.og_title || this.currentPost.title || this.currentPost.tags.title || '#post_title #separator_sa #site_title')
		},
		previewDescription () {
			return this.parseTags(this.currentPost.og_description || this.currentPost.description || this.currentPost.tags.description || '#post_content')
		},
		shouldShowArticleSection () {
			const context = 'term' === this.currentPost.context ? 'taxonomies' : 'postTypes'
			return 'article' === this.currentPost.og_object_type ||
				(
					'default' === this.currentPost.og_object_type &&
					'article' === this.dynamicOptions.social.facebook.general[context][this.currentPost.postType || this.currentPost.termType].objectType
				)
		}
	},
	methods : {
		...mapActions([ 'savePostState' ]),
		scrollToElement () {
			const container = document.getElementsByClassName('component-wrapper')[0]
			setTimeout(() => {
				if (container) {
					container.firstChild.scrollTop = 0
				}
			}, 10)
		},
		saveImageType (value) {
			this.$set(this.currentPost, 'og_image_type', value)
			this.$store.commit('isDirty', true)
		},
		getObjectTypeOptions (savedOption) {
			let option = null
			this.objectTypeOptions.forEach(group => {
				const localOption = group.options.find(o => o.value === savedOption)
				if (localOption) {
					option = localOption
				}
			})

			return option
		},
		setObjectType (option) {
			this.$set(this.currentPost, 'og_object_type', option)
			this.$store.commit('isDirty', true)
		},
		updateImage (imageUrl) {
			this.currentPost.og_image_custom_url = imageUrl
			this.savePostState()
		}
	},
	watch : {
		'currentPost.og_image_type' () {
			this.setImageUrl()
		},
		'currentPost.og_image_custom_url' () {
			this.setImageUrl()
		}
	},
	mounted () {
		this.scrollToElement()
	}
}
</script>
<style lang="scss">
.tab-facebook {
	.facebook-image-upload {
		display: flex;

		.aioseo-input-container {
			width: 100%;
			max-width: 445px;
			margin-right: 10px;

			.aioseo-input {
				width: 100%;
			}
		}

		.insert-image {
			min-width: 214px;
			margin-right: 10px;

			svg.aioseo-circle-plus {
				width: 13px;
				height: 13px;
				margin-right: 10px;
			}
		}
	}

	.facebook-image {
		img {
			margin-top: 20px;
			width: auto;
			max-width: 525px;
			max-height: 525px;
			height: auto;
		}

		&.vertical {
			img {
				max-width: 158px;
				max-height: 158px;
			}
		}
	}

	.facebook-meta-input {
		margin-top: 10px;
	}
}
</style>