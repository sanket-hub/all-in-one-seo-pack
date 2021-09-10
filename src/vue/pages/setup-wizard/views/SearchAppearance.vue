<template>
	<div class="aioseo-wizard-search-appearance">
		<wizard-header />
		<wizard-container>
			<wizard-body>
				<wizard-steps />

				<div class="header">
					{{ strings.searchAppearance }}
				</div>

				<div class="description">
					{{ strings.description }}
				</div>

				<div class="aioseo-settings-row no-border">
					<div class="settings-name">
						<div class="name small-margin">
							{{ strings.googleSnippetPreview }}
						</div>
					</div>

					<div
						class="edit-site-info-activator"
						:class="{ hover: showHoverClass }"
						@mouseenter="addHoverClass"
						@mouseleave="removeHoverClass"
					>
						<core-google-search-preview
							:title="category.siteTitle"
							:separator="options.searchAppearance.global.separator"
							:description="category.metaDescription"
						/>

						<div
							v-if="showHoverClass && !editing"
							class="background-fade"
							@click="editing = true"
						/>
						<div
							v-if="showHoverClass && !editing"
							class="action"
						>
							<base-button
								size="small"
								type="black"
								@click="editing = true"
							>
								{{ strings.editTitleAndDescription }}
							</base-button>
						</div>
					</div>
				</div>

				<div
					v-if="editing"
					class="site-info"
				>
					<div class="site-title aioseo-settings-row no-border">
						<div class="settings-name">
							<div class="name small-margin">{{ strings.siteTitle }}</div>
						</div>
						<core-html-tags-editor
							v-model="category.siteTitle"
							:line-numbers="false"
							single
							@counter="count => updateCount(count, 'titleCount')"
							tags-context="homePage"
							:default-tags="[
								'site_title',
								'separator_sa',
								'tagline'
							]"
						>
							<template #tags-description>
								{{ strings.clickToAddSiteTitle }}
							</template>
						</core-html-tags-editor>

						<div
							class="max-recommended-count"
							v-html="maxRecommendedCount(titleCount, 60)"
						/>
					</div>

					<div class="site-description aioseo-settings-row no-border">
						<div class="settings-name">
							<div class="name small-margin">{{ strings.metaDescription }}</div>
						</div>
						<core-html-tags-editor
							v-model="category.metaDescription"
							:line-numbers="false"
							@counter="count => updateCount(count, 'descriptionCount')"
							tags-context="homePage"
							:default-tags="[
								'site_title',
								'separator_sa',
								'tagline'
							]"
						>
							<template #tags-description>
								{{ strings.clickToAddSiteDescription }}
							</template>
						</core-html-tags-editor>

						<div
							class="max-recommended-count"
							v-html="maxRecommendedCount(descriptionCount, 160)"
						/>
					</div>
				</div>

				<div
					class="aioseo-settings-row no-border"
					:class="[
						{ 'no-margin': searchAppearance.underConstruction },
						{ 'small-padding': searchAppearance.underConstruction }
					]"
				>
					<div class="settings-name">
						<div class="name small-margin">
							{{ strings.isSiteUnderConstruction }}
						</div>
					</div>

					<base-radio-toggle
						v-model="searchAppearance.underConstruction"
						name="underConstruction"
						:options="[
							{ label: strings.underConstruction, value: true, activeClass: 'dark' },
							{ label: strings.liveSite, value: false }
						]"
					/>
				</div>

				<div
					v-if="!searchAppearance.underConstruction"
					class="aioseo-settings-row no-border post-types"
				>
					<base-toggle
						size="medium"
						v-model="searchAppearance.postTypes.postTypes.all"
					>
						{{ strings.includeAllPostTypes }}
					</base-toggle>

					<core-post-type-options
						v-if="!searchAppearance.postTypes.postTypes.all"
						:options="searchAppearance.postTypes"
						type="postTypes"
					/>
				</div>

				<div
					v-if="!searchAppearance.underConstruction"
					class="aioseo-settings-row no-border enable-sitemaps"
				>
					<base-checkbox
						round
						class="no-clicks"
						type="green"
						:value="true"
						@click.native.stop.prevent="() => {}"
					>
						{{ strings.enableSitemap }}
					</base-checkbox>
				</div>

				<div
					v-if="!searchAppearance.underConstruction"
					class="aioseo-settings-row no-border"
				>
					<div class="settings-name">
						<div class="name small-margin">
							{{ strings.doYouHaveMultipleAuthors }}
						</div>
					</div>

					<base-radio-toggle
						v-model="searchAppearance.multipleAuthors"
						name="multipleAuthors"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.yes, value: true }
						]"
					/>
				</div>

				<div
					v-if="!searchAppearance.underConstruction"
					class="aioseo-settings-row no-border no-margin small-padding"
				>
					<div class="settings-name">
						<div class="name small-margin">
							{{ strings.redirectAttachmentPages }}
						</div>
					</div>

					<base-radio-toggle
						v-model="searchAppearance.redirectAttachmentPages"
						name="redirectAttachmentPages"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.yes, value: true }
						]"
					/>
				</div>

				<template #footer>
					<div class="go-back">
						<router-link :to="getPrevLink" class="no-underline">&larr;</router-link>
						&nbsp;
						<router-link :to="getPrevLink">{{ strings.goBack }}</router-link>
					</div>
					<div class="spacer"></div>
					<base-button
						type="gray"
						tag="router-link"
						:to="getNextLink"
					>{{ strings.skipThisStep }}</base-button>
					<base-button
						type="blue"
						:loading="loading"
						@click="saveAndContinue"
					>{{ strings.saveAndContinue }} &rarr;</base-button>
				</template>
			</wizard-body>

			<wizard-close-and-exit />
		</wizard-container>
	</div>
</template>

<script>
import { MaxCounts, Wizard } from '@/vue/mixins'
import { mapActions, mapState } from 'vuex'
export default {
	mixins : [ MaxCounts, Wizard ],
	data () {
		return {
			loaded           : false,
			titleCount       : 0,
			descriptionCount : 0,
			showHoverClass   : false,
			editing          : false,
			loading          : false,
			stage            : 'search-appearance',
			strings          : {
				searchAppearance          : this.$t.__('Search Appearance', this.$td),
				description               : this.$t.__('The way your site is displayed in search results is very important. Take some time to look over these settings and tweak as needed.', this.$td),
				googleSnippetPreview      : this.$t.__('Google Snippet Preview', this.$td),
				editTitleAndDescription   : this.$t.__('Edit Title and Description', this.$td),
				clickToAddSiteTitle       : this.$t.__('Click on the tags below to insert variables into your site title.', this.$td),
				clickToAddSiteDescription : this.$t.__('Click on the tags below to insert variables into your meta description.', this.$td),
				siteTitle                 : this.$t.__('Home Page Title', this.$td),
				metaDescription           : this.$t.__('Meta Description', this.$td),
				isSiteUnderConstruction   : this.$t.__('Is the site under construction or live (ready to be indexed)?', this.$td),
				underConstruction         : this.$t.__('Under Construction', this.$td),
				liveSite                  : this.$t.__('Live Site', this.$td),
				includeAllPostTypes       : this.$t.__('Include All Post Types', this.$td),
				enableSitemap             : this.$t.__('Enable Sitemap', this.$td),
				doYouHaveMultipleAuthors  : this.$t.__('Do you have multiple authors?', this.$td),
				redirectAttachmentPages   : this.$t.__('Redirect attachment pages?', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'options', 'dynamicOptions' ]),
		...mapState('wizard', [ 'category', 'searchAppearance' ])
	},
	methods : {
		...mapActions('wizard', [ 'saveWizard' ]),
		addHoverClass () {
			this.showHoverClass = true
		},
		removeHoverClass () {
			this.showHoverClass = false
		},
		saveAndContinue () {
			this.loading = true
			this.saveWizard('searchAppearance')
				.then(() => {
					this.$router.push(this.getNextLink)
				})
		}
	},
	mounted () {
		this.searchAppearance.redirectAttachmentPages = 'attachment' === this.dynamicOptions.searchAppearance.postTypes.attachment.redirectAttachmentUrls
		this.loaded = true
	}
}
</script>

<style lang="scss">
.aioseo-wizard-search-appearance {
	color: $black;

	.header {
		font-size: 24px;
		color: $black;
		font-weight: 600;
	}

	.description {
		margin-top: 20px;
		font-size: 16px;
		color: $black2;
		margin-bottom: 40px;
		line-height: 1.4;
	}

	.aioseo-settings-row {
		.aioseo-radio-toggle {
			margin-top: 10px;
		}

		.edit-site-info-activator {
			margin-top: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.aioseo-google-search-preview {
				flex: 1;
			}

			.action {
				position: absolute;
				top: 1;
				left: 1;
				right: 1;
				bottom: 1;
			}

			.background-fade {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				border: 1px solid $border;
				cursor: pointer;
			}

			&.hover {
				.background-fade {
					background: #fff;
					opacity: 0.7;
				}
			}
		}

		&.enable-sitemaps {
			.aioseo-checkbox {
				font-size: 16px;
				font-weight: 600;
			}
		}

		&.post-types {
			font-size: 16px;

			.aioseo-toggle {
				color: $black;
				font-size: 16px;
				font-weight: 600;
			}
		}
	}

	.go-back {
		a {
			color: $black2;
			font-size: 14px;
		}
	}
}
</style>