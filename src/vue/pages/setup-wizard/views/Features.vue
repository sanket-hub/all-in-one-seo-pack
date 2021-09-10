<template>
	<div class="aioseo-wizard-features">
		<wizard-header />
		<wizard-container>
			<wizard-body>
				<wizard-steps />

				<div class="header">
					{{ strings.whichFeatures }}
				</div>

				<div class="description">
					{{ strings.description }}
				</div>

				<div
					v-for="(feature, index) in getFeatures"
					:key="index"
					class="feature-grid small-padding medium-margin"
				>
					<grid-row>
						<grid-column xs="11">
							<div class="settings-name">
								<div class="name small-margin">
									{{ feature.name }}
									<core-pro-badge v-if="needsUpsell(feature)" />
								</div>
								<div class="aioseo-description-text">
									{{ feature.description }}
								</div>
							</div>
						</grid-column>
						<grid-column xs="1">
							<base-checkbox
								round
								:class="{ 'no-clicks': feature.required }"
								:type="feature.required ? 'green' : 'blue'"
								:value="feature.required ? true : getValue(feature)"
								@click.native="event => preventUncheck(event, feature)"
								@input="checked => updateValue(checked, feature)"
							/>
						</grid-column>
					</grid-row>
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
			<div
				v-if="getPluginsText"
				class="plugins"
			>
				{{ getPluginsText }}
			</div>

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
			loading : false,
			stage   : 'features',
			strings : {
				whichFeatures : this.$t.__(
					'Which SEO features do you want to enable?',
					this.$td
				),
				description : this.$t.__(
					'We have already selected our recommended features based on your site category, but you can use the following features to fine-tune your site.',
					this.$td
				)
			}
		}
	},
	computed : {
		...mapState([ 'options' ]),
		...mapState('wizard', {
			additionalInformation : 'additionalInformation',
			presetFeatures        : 'features'
		}),
		showPluginsAll () {
			return this.presetFeatures.includes('analytics') &&
				(
					this.presetFeatures.includes('image-seo') ||
					this.presetFeatures.includes('news-sitemap') ||
					this.presetFeatures.includes('video-sitemap') ||
					this.presetFeatures.includes('local-seo') ||
					this.presetFeatures.includes('redirects')
				)
		},
		showPluginsAddons () {
			return !this.presetFeatures.includes('analytics') &&
				(
					this.presetFeatures.includes('image-seo') ||
					this.presetFeatures.includes('news-sitemap') ||
					this.presetFeatures.includes('video-sitemap') ||
					this.presetFeatures.includes('local-seo') ||
					this.presetFeatures.includes('redirects')
				)
		},
		showPluginsOnly () {
			return this.presetFeatures.includes('analytics') &&
				!this.presetFeatures.includes('image-seo') &&
				!this.presetFeatures.includes('news-sitemap') &&
				!this.presetFeatures.includes('video-sitemap') &&
				!this.presetFeatures.includes('local-seo') &&
				!this.presetFeatures.includes('redirects')
		},
		getPluginsText () {
			if (this.showPluginsOnly) {
				// Translators: 1 - A list of plugin names.
				return this.$t.sprintf(this.$t.__('The following plugins will be installed: %1$s', this.$td), this.getPluginNames)
			}

			if (this.showPluginsAddons) {
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - A list of plugin names.
				return this.$t.sprintf(this.$t.__('The following %1$s addons will be installed: %2$s', this.$td), process.env.VUE_APP_SHORT_NAME, this.getPluginNames)
			}

			if (this.showPluginsAll) {
				// Translators: 1 - Plugin short name ("AIOSEO"), 2 - A list of plugin names.
				return this.$t.sprintf(this.$t.__('The following plugins and %1$s addons will be installed: %2$s', this.$td), process.env.VUE_APP_SHORT_NAME, this.getPluginNames)
			}

			return null
		},
		getPluginNames () {
			const pluginNames = []
			if (this.presetFeatures.includes('analytics')) {
				pluginNames.push('MonsterInsights Free')
			}

			if (this.presetFeatures.includes('image-seo')) {
				pluginNames.push('Image SEO')
			}

			if (this.presetFeatures.includes('local-seo')) {
				pluginNames.push('Local Business SEO')
			}

			if (this.presetFeatures.includes('video-sitemap')) {
				pluginNames.push('Video Sitemap')
			}

			if (this.presetFeatures.includes('news-sitemap')) {
				pluginNames.push('News Sitemap')
			}

			if (this.presetFeatures.includes('redirects')) {
				pluginNames.push('Redirects')
			}

			return pluginNames.join(', ')
		},
		// Because we want translations for future options, we need to filter out ones we don't want showing right now.
		getFeatures () {
			return this.features
				// Hiding the following for now since we do not support them in this launch.
				.filter(f => 'breadcrumbs' !== f.value)
				.filter(f => 'internal-links' !== f.value)
				.filter(f => 'advanced-schema' !== f.value)
				.map(f => {
					f.selected = false
					if (this.presetFeatures.includes(f.value)) {
						f.selected = true
					}
					return f
				})
		}
	},
	methods : {
		...mapMutations('wizard', [ 'updateFeatures' ]),
		...mapActions('wizard', [ 'saveWizard' ]),
		preventUncheck (event, feature) {
			if (feature.required) {
				event.preventDefault()
				event.stopPropagation()
			}
		},
		getValue (feature) {
			return this.presetFeatures.includes(feature.value)
		},
		updateValue (checked, feature) {
			const features = [ ...this.presetFeatures ]

			if (checked) {
				features.push(feature.value)
				this.updateFeatures(features)
				return
			}

			const index = features.findIndex(f => f === feature.value)
			if (-1 !== index) {
				this.$delete(features, index)
			}

			this.updateFeatures(features)
		},
		saveAndContinue () {
			this.loading = true
			this.saveWizard('features')
				.then(() => {
					this.$router.push(this.getNextLink)
				})
		}
	}
}
</script>

<style lang="scss">
.aioseo-wizard-features {
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

	.feature-grid {
		padding: 16px 0;
		border-bottom: 1px solid $border;

		&:last-child {
			border-bottom: none;
		}

		.settings-name {
			color: $black;

			.name {
				font-weight: 600;
				display: flex;
				align-items: center;
				font-size: 18px;

				.aioseo-pro-badge {
					margin-left: 12px;
				}
			}

			.aioseo-description-text {
				max-width: 500px;
				color: $black2;
			}
		}

		.aioseo-col {
			display: flex;
			align-items: center;
		}
	}

	.plugins {
		margin-top: 16px;
		font-size: 14px;
		text-align: center;
		color: $black2;
	}

	.go-back {
		a {
			color: $black2;
			font-size: 14px;
		}
	}
}
</style>