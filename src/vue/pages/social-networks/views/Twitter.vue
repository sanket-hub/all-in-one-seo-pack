<template>
	<div class="aioseo-twitter">
		<core-card
			slug="twitter"
			:header-text="strings.twitterCardSettings"
		>
			<div class="aioseo-settings-row aioseo-section-description">
				{{ strings.description }}
				<span
					v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'twitter', true)"
				/>
			</div>

			<core-settings-row
				:name="strings.enableTwitterCard"
			>
				<template #content>
					<base-toggle
						v-model="options.social.twitter.general.enable"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable"
				class="default-card-type"
				:name="strings.defaultCardType"
				align
			>
				<template #content>
					<base-select
						size="medium"
						:options="twitterCards"
						:value="getCardOptions(options.social.twitter.general.defaultCardType)"
						@input="value => options.social.twitter.general.defaultCardType = value.value"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				class="twitter-default-image-source"
				v-if="options.social.twitter.general.enable"
				:name="strings.defaultImageSourcePosts"
				align
			>
				<template #content>
					<base-select
						size="medium"
						:options="imageSourceOptions"
						:value="getImageSourceOption(options.social.twitter.general.defaultImageSourcePosts)"
						@input="value => options.social.twitter.general.defaultImageSourcePosts = value.value"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable && 'custom' === options.social.twitter.general.defaultImageSourcePosts"
				:name="strings.postCustomFieldName"
				align
			>
				<template #content>
					<base-input
						size="medium"
						v-model="options.social.twitter.general.customFieldImagePosts"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable"
				class="twitter-image"
				:name="strings.defaultTwitterImagePosts"
				align
			>
				<template #content>
					<div class="twitter-image-upload">
						<base-input
							size="medium"
							v-model="options.social.twitter.general.defaultImagePosts"
							:placeholder="strings.pasteYourImageUrl"
						/>

						<base-button
							class="insert-image"
							@click="openUploadModal('defaultImagePosts', (imageUrl) => options.social.twitter.general.defaultImagePosts = imageUrl)"
							size="medium"
							type="black"
						>
							<svg-circle-plus />
							{{ strings.uploadOrSelectImage }}
						</base-button>

						<base-button
							class="remove-image"
							@click="options.social.twitter.general.defaultImagePosts = null"
							size="medium"
							type="gray"
						>
							{{ strings.remove }}
						</base-button>
					</div>

					<div class="aioseo-description">
						<span v-if="'summary' === options.social.twitter.general.defaultCardType">{{ strings.minimumSizeSummary }}</span>
						<span v-if="'summary_large_image' === options.social.twitter.general.defaultCardType">{{ strings.minimumSizeSummaryWithLarge }}</span>
					</div>

					<base-img :src="options.social.twitter.general.defaultImagePosts" />
				</template>
			</core-settings-row>

			<core-settings-row
				class="twitter-default-image-source"
				v-if="options.social.twitter.general.enable"
				:name="strings.defaultImageSourceTerms"
				align
			>
				<template #content>
					<base-select
						v-if="!isUnlicensed"
						size="medium"
						:options="getTermImageSourceOptions()"
						:value="getImageSourceOption(options.social.twitter.general.defaultImageSourceTerms)"
						@input="value => options.social.twitter.general.defaultImageSourceTerms = value.value"
					/>

					<base-select
						v-if="isUnlicensed"
						size="medium"
						:options="getTermImageSourceOptions()"
						:value="getImageSourceOption('default')"
						disabled
					/>

					<core-alert
						class="inline-upsell"
						v-if="isUnlicensed"
						type="blue"
					>
						<div v-html="strings.defaultTermImageSourceUpsell" />
					</core-alert>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable && 'custom' === options.social.twitter.general.defaultImageSourceTerms && !isUnlicensed"
				:name="strings.termsCustomFieldName"
				align
			>
				<template #content>
					<base-input
						size="medium"
						v-model="options.social.twitter.general.customFieldImageTerms"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable && !isUnlicensed"
				class="twitter-image"
				:name="strings.defaultTwitterImageTerms"
				align
			>
				<template #content>
					<div class="twitter-image-upload">
						<base-input
							size="medium"
							v-model="options.social.twitter.general.defaultImageTerms"
							:placeholder="strings.pasteYourImageUrl"
						/>

						<base-button
							class="insert-image"
							@click="openUploadModal('defaultImageTerms', (imageUrl) => options.social.twitter.general.defaultImageTerms = imageUrl)"
							size="medium"
							type="black"
						>
							<svg-circle-plus />
							{{ strings.uploadOrSelectImage }}
						</base-button>

						<base-button
							class="remove-image"
							@click="options.social.twitter.general.defaultImageTerms = null"
							size="medium"
							type="gray"
						>
							{{ strings.remove }}
						</base-button>
					</div>

					<div class="aioseo-description">
						<span v-if="'summary' === options.social.twitter.general.defaultCardType">{{ strings.minimumSizeSummary }}</span>
						<span v-if="'summary_large_image' === options.social.twitter.general.defaultCardType">{{ strings.minimumSizeSummaryWithLarge }}</span>
					</div>

					<base-img :src="options.social.twitter.general.defaultImageTerms" />
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable"
				:name="strings.showTwitterAuthor"
				align
			>
				<template #content>
					<base-radio-toggle
						v-model="options.social.twitter.general.showAuthor"
						name="showTwitterAuthor"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.yes, value: true }
						]"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable"
				:name="strings.additionalData"
				align
			>
				<template #content>
					<base-radio-toggle
						v-model="options.social.twitter.general.additionalData"
						name="additionalData"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
						]"
					/>

					<div class="aioseo-description">
						{{ strings.additionalDataDescription }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="options.social.twitter.general.enable"
				:name="strings.useDataFromFacebook"
				align
			>
				<template #content>
					<base-radio-toggle
						v-model="options.social.twitter.general.useOgData"
						name="useOgData"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.yes, value: true }
						]"
					/>
					<div class="aioseo-description">
						{{ strings.useOgDataDescription }}
					</div>
				</template>
			</core-settings-row>
		</core-card>

		<core-card
			v-if="options.social.twitter.general.enable"
			slug="twitterHomePageSettings"
			:header-text="strings.homePageSettings"
		>
			<div
				v-if="$aioseo.data.staticHomePage"
				class="aioseo-settings-row aioseo-section-description"
			>
				<span v-html="strings.homePageDisabledDescription" />
				&nbsp;
				<span
					v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'staticHomePageTwitter', true)"
				/>
			</div>

			<br
				v-if="$aioseo.data.staticHomePage"
			>

			<core-settings-row
				:name="$constants.GLOBAL_STRINGS.preview"
			>
				<template #content>
					<core-twitter-preview
						:card="options.social.twitter.homePage.cardType"
						:description="previewDescription"
						:image="options.social.twitter.homePage.image"
						:title="previewTitle"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="!$aioseo.data.staticHomePage"
				class="default-card-type"
				:name="strings.cardType"
				align
			>
				<template #content>
					<base-select
						size="medium"
						:options="twitterCards"
						:value="getCardOptions(options.social.twitter.homePage.cardType)"
						@input="value => options.social.twitter.homePage.cardType = value.value"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="!$aioseo.data.staticHomePage"
				class="twitter-image"
				:name="strings.homePageImage"
				align
			>
				<template #content>
					<div class="twitter-image-upload">
						<base-input
							size="medium"
							v-model="options.social.twitter.homePage.image"
							:placeholder="strings.pasteYourImageUrl"
						/>

						<base-button
							class="insert-image"
							@click="openUploadModal('homePageImage', (imageUrl) => options.social.twitter.homePage.image = imageUrl)"
							size="medium"
							type="black"
						>
							<svg-circle-plus />
							{{ strings.uploadOrSelectImage }}
						</base-button>

						<base-button
							class="remove-image"
							@click="options.social.twitter.homePage.image = null"
							size="medium"
							type="gray"
						>
							{{ strings.remove }}
						</base-button>
					</div>

					<div class="aioseo-description">
						<span v-if="'summary' === options.social.twitter.homePage.cardType">{{ strings.minimumSizeSummary }}</span>
						<span v-if="'summary_large_image' === options.social.twitter.homePage.cardType">{{ strings.minimumSizeSummaryWithLarge }}</span>
					</div>

					<base-img :src="options.social.twitter.homePage.image" />
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="!$aioseo.data.staticHomePage"
				:name="strings.homePageTitle"
			>
				<template #content>
					<core-html-tags-editor
						class="twitter-meta-input"
						v-model="options.social.twitter.homePage.title"
						:line-numbers="false"
						single
						@counter="count => updateCount(count, 'titleCount')"
						tags-context="homePage"
						:default-tags="[
							'site_title',
							'tagline',
							'separator_sa'
						]"
					>
						<template #tags-description>
							{{ strings.clickToAddHomePageTitle }}
						</template>
					</core-html-tags-editor>

					<div
						class="max-recommended-count"
						v-html="maxRecommendedCount(titleCount, 70)"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="!$aioseo.data.staticHomePage"
				:name="strings.homePageDescription"
			>
				<template #content>
					<core-html-tags-editor
						class="twitter-meta-input"
						v-model="options.social.twitter.homePage.description"
						:line-numbers="false"
						@counter="count => updateCount(count, 'descriptionCount')"
						tags-context="homePage"
						:default-tags="[
							'site_title',
							'tagline',
							'separator_sa'
						]"
					>
						<template #tags-description>
							{{ strings.clickToAddHomePageDescription }}
						</template>
					</core-html-tags-editor>

					<div
						class="max-recommended-count"
						v-html="maxRecommendedCount(descriptionCount, 200)"
					/>
				</template>
			</core-settings-row>
		</core-card>
	</div>
</template>

<script>
import { ImageSourceOptions, JsonValues, MaxCounts, Tags, Uploader } from '@/vue/mixins'
import { mapState, mapGetters } from 'vuex'
import BaseImg from '@/vue/components/common/base/Img'
import BaseRadioToggle from '@/vue/components/common/base/RadioToggle'
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import CoreCard from '@/vue/components/common/core/Card'
import CoreHtmlTagsEditor from '@/vue/components/common/core/HtmlTagsEditor'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import CoreTwitterPreview from '@/vue/components/common/core/TwitterPreview'
import SvgCirclePlus from '@/vue/components/common/svg/circle/Plus'

export default {
	components : {
		BaseImg,
		BaseRadioToggle,
		CoreAlert,
		CoreCard,
		CoreHtmlTagsEditor,
		CoreSettingsRow,
		CoreTwitterPreview,
		SvgCirclePlus
	},
	mixins : [ ImageSourceOptions, JsonValues, MaxCounts, Tags, Uploader ],
	data () {
		return {
			titleCount       : 0,
			descriptionCount : 0,
			option           : null,
			pagePostOptions  : [],
			strings          : {
				twitterCardSettings           : this.$t.__('Twitter Card Settings', this.$td),
				description                   : this.$t.__('Enable this feature if you want Twitter to display a preview card with images and a text excerpt when a link to your site is shared.', this.$td),
				enableTwitterCard             : this.$t.__('Enable Twitter Card', this.$td),
				useDataFromFacebook           : this.$t.__('Use Data from Facebook Tab', this.$td),
				useOgDataDescription          : this.$t.__('Choose whether you want to use the OG data from the Facebook tab in your individual pages/posts by default.', this.$td),
				defaultCardType               : this.$t.__('Default Card Type', this.$td),
				summary                       : this.$t.__('Summary', this.$td),
				summaryLarge                  : this.$t.__('Summary with Large Image', this.$td),
				defaultImageSourcePosts       : this.$t.__('Default Post Image Source', this.$td),
				defaultImageSourceTerms       : this.$t.__('Default Term Image Source', this.$td),
				width                         : this.$t.__('Width', this.$td),
				height                        : this.$t.__('Height', this.$td),
				postCustomFieldName           : this.$t.__('Post Custom Field Name', this.$td),
				termsCustomFieldName          : this.$t.__('Term Custom Field Name', this.$td),
				defaultTwitterImagePosts      : this.$t.__('Default Post Twitter Image', this.$td),
				defaultTwitterImageTerms      : this.$t.__('Default Term Twitter Image', this.$td),
				uploadOrSelectImage           : this.$t.__('Upload or Select Image', this.$td),
				pasteYourImageUrl             : this.$t.__('Paste your image URL or select a new image', this.$td),
				minimumSizeSummary            : this.$t.__('Minimum size: 144px x 144px, ideal ratio 1:1, 5MB max. JPG, PNG, WEBP and GIF formats only.', this.$td),
				minimumSizeSummaryWithLarge   : this.$t.__('Minimum size: 300px x 157px, ideal ratio 2:1, 5MB max. JPG, PNG, WEBP and GIF formats only.', this.$td),
				homePageSettings              : this.$t.__('Home Page Settings', this.$td),
				homePageImage                 : this.$t.__('Home Page Image', this.$td),
				homePageTitle                 : this.$t.__('Home Page Title', this.$td),
				useHomePageTitle              : this.$t.__('Use the home page title', this.$td),
				clickToAddHomePageTitle       : this.$t.__('Click on the tags below to insert variables into your home page title.', this.$td),
				homePageDescription           : this.$t.__('Description', this.$td),
				useHomePageDescription        : this.$t.__('Use the home page description', this.$td),
				clickToAddHomePageDescription : this.$t.__('Click on the tags below to insert variables into your description.', this.$td),
				remove                        : this.$t.__('Remove', this.$td),
				showTwitterAuthor             : this.$t.__('Show Twitter Author', this.$td),
				homePageDisabledDescription   : this.$t.sprintf(
					// Translators: 1 - Opening HTML link tag, 2 - Closing HTML link tag.
					this.$t.__('You are using a static home page which is found under Pages. You can %1$sedit your home page settings%2$s directly to change the title, meta and image.', this.$td),
					`<a href="${this.$aioseo.urls.staticHomePage}&aioseo-tab=social&social-tab=twitter&aioseo-scroll=aioseo-post-settings-twitter&aioseo-highlight=aioseo-post-settings-twitter">`,
					'</a>'
				),
				cardType                     : this.$t.__('Card Type', this.$td),
				additionalData               : this.$t.__('Additional Data', this.$td),
				additionalDataDescription    : this.$t.__('Enable this option to show additional Twitter data on your posts and pages (i.e., who the post was written by and how long it might take to read the article).', this.$td),
				defaultTermImageSourceUpsell : this.$t.sprintf(
					// Translators: 1 - The plugin short name ("AIOSEO"), 2 - Learn more link.
					this.$t.__('Default Term Image Source is only available for licensed %1$s users. %2$s', this.$td),
					`<strong>${import.meta.env.VITE_SHORT_NAME} Pro</strong>`,
					this.$links.getUpsellLink('general-facebook-settings', this.$constants.GLOBAL_STRINGS.learnMore, 'default-term-image-soruce', true)
				)
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'options' ]),
		twitterCards () {
			return [
				{ label: this.strings.summary, value: 'summary' },
				{ label: this.strings.summaryLarge, value: 'summary_large_image' }
			]
		},
		previewTitle () {
			if (this.$aioseo.data.staticHomePage) {
				return this.parseTags(this.$aioseo.data.staticHomePageTwitterTitle || '#site_title')
			}

			return this.parseTags(this.options.social.twitter.homePage.title || '#site_title')
		},
		previewDescription () {
			if (this.$aioseo.data.staticHomePage) {
				return this.parseTags(this.$aioseo.data.staticHomePageTwitterDescription || '#tagline')
			}

			return this.parseTags(this.options.social.twitter.homePage.description || '#tagline')
		}
	},
	methods : {
		getCardOptions (option) {
			return this.twitterCards.find(t => t.value === option)
		}
	}
}
</script>

<style lang="scss">
.aioseo-twitter {
	.inline-upsell {
		display: inline-flex;
		margin-top: 20px;
	}

	.twitter-image-upload {
		display: flex;

		.aioseo-input {
			max-width: 445px;
			margin-right: 10px;
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

	.twitter-image {
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

	.twitter-default-image-source {
		.aioseo-select {
			max-width: 350px;
		}
	}

	.default-card-type {
		.aioseo-select {
			max-width: 260px;
		}
	}
}
</style>