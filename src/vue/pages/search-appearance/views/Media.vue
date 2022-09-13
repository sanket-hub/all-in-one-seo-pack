<template>
	<div class="aioseo-search-appearance-content-types">
		<core-card
			:slug="`${postType.name}SA`"
		>
			<template #header>
				<div
					class="icon dashicons"
					:class="`${postType.icon || 'dashicons-admin-post'}`"
				/>
				<div v-html="postType.label"></div>
			</template>

			<template #before-tabs>
				<core-settings-row
					:name="strings.redirectAttachmentUrls"
					align
				>
					<template #content>
						<base-radio-toggle
							v-model="dynamicOptions.searchAppearance.postTypes.attachment.redirectAttachmentUrls"
							name="redirectAttachmentUrls"
							:options="[
								{ label: $constants.GLOBAL_STRINGS.disabled, value: 'disabled', activeClass: 'dark' },
								{ label: strings.attachment, value: 'attachment' },
								{ label: strings.attachmentParent, value: 'attachment_parent' }
							]"
						/>

						<div class="aioseo-description">
							{{ strings.attachmentUrlsDescription }}
						</div>
					</template>
				</core-settings-row>
			</template>

			<template
				#tabs
				v-if="'disabled' === dynamicOptions.searchAppearance.postTypes.attachment.redirectAttachmentUrls"
			>
				<core-main-tabs
					:tabs="tabs.attachments"
					:showSaveButton="false"
					:active="settings.internalTabs[`${postType.name}SA`]"
					internal
					@changed="value => processChangeTab(postType.name, value)"
				/>
			</template>

			<transition
				name="route-fade" mode="out-in"
				v-if="'disabled' === dynamicOptions.searchAppearance.postTypes.attachment.redirectAttachmentUrls"
			>
				<component
					:is="settings.internalTabs[`${postType.name}SA`]"
					:object="postType"
					:separator="options.searchAppearance.global.separator"
					:options="dynamicOptions.searchAppearance.postTypes[postType.name]"
					type="postTypes"
				/>
			</transition>
		</core-card>

		<core-card
			slug="imageSeo"
			:noSlide="!shouldShowMain"
		>
			<template #header>
				<span>{{ strings.imageSeo }}</span>
				<core-pro-badge />
			</template>

			<template #tabs>
				<core-main-tabs
					:tabs="tabs.imageSeo"
					:showSaveButton="false"
					:active="imageSeoActiveTab.slug"
					internal
					@changed="value => setImageSeoActiveTab(value)"
				/>
			</template>

			<image-seo
				v-if="shouldShowMain"
				:activeTab="imageSeoActiveTab"
				:key="imageSeoKey"
			/>

			<activate
				v-if="shouldShowActivate"
			/>

			<update
				v-if="shouldShowUpdate"
			/>

			<lite
				v-if="shouldShowLite"
			/>

		</core-card>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { AddonConditions } from '@/vue/mixins'
import Activate from './AIOSEO_VERSION/image-seo/Activate'
import Advanced from './partials/Advanced'
import BaseRadioToggle from '@/vue/components/common/base/RadioToggle'
import CoreCard from '@/vue/components/common/core/Card'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import CoreProBadge from '@/vue/components/common/core/ProBadge'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import CustomFields from './partials/AIOSEO_VERSION/CustomFields'
import ImageSeo from './AIOSEO_VERSION/image-seo/ImageSeo'
import Lite from './lite/image-seo/ImageSeo'
import Schema from './partials/Schema'
import TitleDescription from './partials/TitleDescription'
import Update from './AIOSEO_VERSION/image-seo/Update'

export default {
	mixins     : [ AddonConditions ],
	components : {
		Activate,
		Advanced,
		BaseRadioToggle,
		CoreCard,
		CoreMainTabs,
		CoreProBadge,
		CoreSettingsRow,
		CustomFields,
		ImageSeo,
		Lite,
		Schema,
		TitleDescription,
		Update
	},
	data () {
		return {
			imageSeoKey       : 0,
			addonSlug         : 'aioseo-image-seo',
			internalDebounce  : false,
			imageSeoActiveTab : {
				slug : 'title',
				name : this.$t.__('Title', this.$td),
				pro  : true
			},
			strings : {
				redirectAttachmentUrls    : this.$t.__('Redirect Attachment URLs', this.$td),
				attachment                : this.$t.__('Attachment', this.$td),
				attachmentParent          : this.$t.__('Attachment Parent', this.$td),
				attachmentUrlsDescription : this.$t.__('We recommended redirecting attachment URLs back to the attachment since the default WordPress attachment pages have little SEO value.', this.$td),
				imageSeo                  : this.$t.__('Image SEO', this.$td),
				advancedSettings          : this.$t.__('Advanced Settings', this.$tdPro)
			},
			tabs : {
				attachments : [
					{
						slug   : 'title-description',
						name   : this.$t.__('Title & Description', this.$td),
						access : 'aioseo_search_appearance_settings',
						pro    : false
					},
					{
						slug   : 'Schema',
						name   : this.$t.__('Schema Markup', this.$td),
						access : 'aioseo_search_appearance_settings',
						pro    : true
					},
					{
						slug   : 'advanced',
						name   : this.$t.__('Advanced', this.$td),
						access : 'aioseo_search_appearance_settings',
						pro    : false
					}
				],
				imageSeo : [
					{
						slug : 'title',
						name : this.$t.__('Title', this.$td),
						pro  : true
					},
					{
						slug : 'altTag',
						name : this.$t.__('Alt Tag', this.$td),
						pro  : true
					},
					{
						slug : 'caption',
						name : this.$t.__('Caption', this.$td),
						pro  : true
					},
					{
						slug : 'description',
						name : this.$t.__('Description', this.$td),
						pro  : true
					},
					{
						slug : 'filename',
						name : this.$t.__('Filename', this.$td),
						pro  : true
					}
				]
			}
		}
	},
	computed : {
		...mapState([ 'options', 'dynamicOptions', 'settings' ]),
		postType () {
			return this.$aioseo.postData.postTypes
				.filter(pt => 'attachment' === pt.name)[0]
		}
	},
	methods : {
		...mapActions([ 'changeTab' ]),
		processChangeTab (postType, value) {
			if (this.internalDebounce) {
				return
			}

			this.internalDebounce = true
			this.changeTab({ slug: `${postType}SA`, value })

			// Debouncing a little here to save extra API calls.
			setTimeout(() => {
				this.internalDebounce = false
			}, 50)
		},
		setImageSeoActiveTab (tabSlug) {
			this.imageSeoActiveTab = this.tabs.imageSeo.find(tab => tab.slug === tabSlug)
			this.imageSeoKey++
		}
	}
}
</script>

<style lang="scss">
.aioseo-search-appearance-content-types {
	.icon {
		display: flex;
		align-items: center;
		margin-right: 16px;
	}
}
</style>