<template>
	<div class="aioseo-wizard-category">
		<wizard-header />
		<wizard-container>

			<wizard-body>
				<wizard-steps />

				<div class="header">
					{{ strings.category }}
				</div>

				<div class="description">{{ strings.selectCategory }}</div>

				<div class="categories">
					<grid-row>
						<grid-column
							v-for="(category, index) in categories"
							:key="index"
							md="6"
						>
							<base-highlight-toggle
								type="radio"
								:active="isActive(category)"
								name="category"
								:value="getValue(category)"
								@input="checked => updateValue(checked, category)"
							>
								<component
									:is="category.icon"
									v-if="category.icon"
									class="icon"
								/>
								{{ category.name }}
							</base-highlight-toggle>
						</grid-column>
					</grid-row>

					<base-highlight-toggle
						class="other-category"
						type="radio"
						:active="isActive(otherCategory)"
						name="category"
						:value="getValue(otherCategory)"
						@input="checked => updateValue(checked, otherCategory)"
					>
						<component
							:is="otherCategory.icon"
							v-if="otherCategory.icon"
							class="icon"
						/>
						{{ otherCategory.name }}

						<base-input
							v-if="selected.length"
							:disabled="'other' !== selected[0].value"
							size="medium"
							v-model="category.categoryOther"
							:placeholder="strings.enterYourAnswer"
							ref="other-category"
						/>
					</base-highlight-toggle>
				</div>

				<div v-if="loaded" class="site-info">
					<div class="site-title aioseo-settings-row no-border">
						<div class="settings-name">
							<div class="name small-margin">{{ strings.siteTitle }}</div>
						</div>
						<core-html-tags-editor
							v-model="category.siteTitle"
							:line-numbers="false"
							single
							tags-context="homePage"
							:default-tags="[
								'site_title',
								'separator_sa',
								'tagline'
							]"
						/>
					</div>

					<div class="site-description aioseo-settings-row no-border no-margin small-padding">
						<div class="settings-name">
							<div class="name small-margin">{{ strings.metaDescription }}</div>
						</div>
						<core-html-tags-editor
							v-model="category.metaDescription"
							:line-numbers="false"
							description
							tags-context="homePage"
							:default-tags="[
								'site_title',
								'separator_sa',
								'tagline'
							]"
						/>
					</div>
				</div>

				<template #footer>
					<div class="go-back">
						<router-link :to="getPrevLink" class="no-underline">&larr;</router-link>
						&nbsp;
						<router-link :to="getPrevLink">{{ strings.goBack }}</router-link>
					</div>
					<div class="spacer"></div>
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
import { Wizard } from '@/vue/mixins'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
	mixins : [ Wizard ],
	data () {
		return {
			loaded           : false,
			titleCount       : 0,
			descriptionCount : 0,
			loading          : false,
			stage            : 'category',
			strings          : {
				category        : this.$t.__('Which category best describes your website?', this.$td),
				selectCategory  : this.$t.__('Select a category to help us narrow down the SEO options that work best for you and your site.', this.$td),
				enterYourAnswer : this.$t.__('Enter your answer', this.$td),
				siteTitle       : this.$t.__('Home Page Title', this.$td),
				metaDescription : this.$t.__('Home Page Meta Description', this.$td)
			},
			categories : [
				{ value: 'blog', name: this.$t.__('Blog', this.$td), icon: 'svg-blog' },
				{ value: 'news-channel', name: this.$t.__('News Channel', this.$td), icon: 'svg-news-channel' },
				{ value: 'online-store', name: this.$t.__('Online Store', this.$td), icon: 'svg-online-store' },
				{ value: 'small-offline-business', name: this.$t.__('Small Offline Business', this.$td), icon: 'svg-local-business' },
				{ value: 'corporation', name: this.$t.__('Corporation', this.$td), icon: 'svg-corporation' },
				{ value: 'portfolio', name: this.$t.__('Portfolio', this.$td), icon: 'svg-image-seo' }
			],
			otherCategory : { value: 'other', name: this.$t.__('Other:', this.$td), icon: 'svg-pencil', valueInput: null },
			selected      : []
		}
	},
	watch : {
		selected (newVal) {
			this.category.category = newVal[0].value

			const features = [
				'optimized-search-appearance',
				'analytics',
				'image-seo',
				'sitemaps',
				'redirects'
			]

			// Let's preselect some features based on the category set.
			switch (newVal[0].value) {
				case 'blog':
				case 'portfolio':
				case 'other':
					break
				case 'news-channel':
					features.push('news-sitemap')
					features.push('video-sitemap')
					break
				case 'online-store':
					features.push('video-sitemap')
					break
				case 'small-offline-business':
					features.push('local-seo')
					features.push('video-sitemap')
					break
				case 'corporation':
					features.push('local-seo')
					features.push('news-sitemap')
					features.push('video-sitemap')
					break
			}

			this.updateFeatures(features)
		}
	},
	computed : {
		...mapState([ 'options' ]),
		...mapState('wizard', [ 'category' ])
	},
	methods : {
		...mapMutations('wizard', [ 'updateFeatures' ]),
		...mapActions('wizard', [ 'saveWizard' ]),
		updateValue (checked, category) {
			this.selected = []
			if (checked) {
				this.selected.push(category)

				if ('other' === category.value) {
					this.$nextTick(() => {
						this.$refs['other-category'].$el.querySelector('input').focus()
					})
				}
			}
		},
		getValue (category) {
			return this.selected.includes(category)
		},
		isActive (category) {
			const index = this.selected.findIndex(c => c.value === category.value)
			if (-1 !== index) {
				return true
			}

			return false
		},
		saveAndContinue () {
			this.loading = true
			this.saveWizard('category')
				.then(() => {
					this.$router.push(this.getNextLink)
				})
		}
	},
	mounted () {
		this.selected.push(this.categories[0])

		if (!this.category.siteTitle && this.options.searchAppearance.global.siteTitle) {
			this.category.siteTitle = this.options.searchAppearance.global.siteTitle
		}

		if (!this.category.metaDescription && this.options.searchAppearance.global.metaDescription) {
			this.category.metaDescription = this.options.searchAppearance.global.metaDescription
		}

		this.loaded = true
	}
}
</script>

<style lang="scss">
.aioseo-wizard-category {
	font-size: 16px;

	.header {
		font-size: 24px;
		color: $black;
		font-weight: 600;
	}

	.description {
		margin-top: 20px;
		font-size: 16px;
		color: $black2;
		margin-bottom: 50px;
	}

	.categories {
		color: $black2-hover;

		svg.icon {
			width: 20px;
			height: 20px;
			margin-right: 10px;
		}

		.other-category {
			.aioseo-input {
				margin-left: 10px;

				input {
					border: none;

					&:focus {
						box-shadow: none;
						outline: none;
					}
				}
			}
		}
	}

	.site-info {
		margin-top: 56px;

		> div:not(:first-child) {
			margin-top: 30px;
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