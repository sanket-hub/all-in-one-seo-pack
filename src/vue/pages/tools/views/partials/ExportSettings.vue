<template>
	<core-card
		class="aioseo-export-settings"
		slug="exportSettings"
		:toggles="false"
		no-slide
		:header-text="strings.exportSettings"
	>
		<template #header-icon>
			<svg-upload />
		</template>

		<div class="export-settings aioseo-settings-row">
			<grid-row>
				<grid-column
					class="export-all"
				>
					<base-checkbox
						size="medium"
						v-model="options.all"
					>
						{{ strings.allSettings }}
					</base-checkbox>
				</grid-column>
				<grid-column
					v-for="(setting, index) in settings"
					:key="index"
					sm="6"
				>
					<base-checkbox
						v-if="!options.all"
						size="medium"
						v-model="options[setting.value]"
					>
						{{ setting.label }}
					</base-checkbox>

					<base-checkbox
						v-if="'all' !== setting.value && options.all"
						size="medium"
						:value="true"
						disabled
					>
						{{ setting.label }}
					</base-checkbox>
				</grid-column>
			</grid-row>
		</div>

		<div class="export-post-types">
			<grid-row>
				<grid-column
					class="export-all"
				>
					<base-checkbox
						size="medium"
						v-model="postOptions.all"
					>
						{{ strings.allPostTypes }}
					</base-checkbox>
				</grid-column>
				<grid-column
					v-for="(postType, index) in $aioseo.postData.postTypes"
					:key="index"
					sm="6"
				>
					<base-checkbox
						v-if="!postOptions.all"
						size="medium"
						v-model="postOptions[postType.name]"
					>
						{{ postType.label }}
					</base-checkbox>

					<base-checkbox
						v-if="'all' !== postType.name && postOptions.all"
						size="medium"
						:value="true"
						disabled
					>
						{{ postType.label }}
					</base-checkbox>
				</grid-column>
			</grid-row>
		</div>

		<base-button
			type="blue"
			size="medium"
			class="import"
			@click="processExportSettings"
			:disabled="!canExport"
			:loading="loading"
		>
			{{ strings.exportSettings }}
		</base-button>
	</core-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data () {
		return {
			options     : {},
			postOptions : {},
			loading     : false,
			strings     : {
				exportSettings : this.$t.__('Export Settings', this.$td),
				allSettings    : this.$t.__('Export All Settings', this.$td),
				allPostTypes   : this.$t.__('Export All Post Types', this.$td)
			}
		}
	},
	computed : {
		settings () {
			const settings = [
				{ value: 'webmasterTools', label: this.$t.__('Webmaster Tools', this.$td) },
				{ value: 'rssContent', label: this.$t.__('RSS Content', this.$td) },
				{ value: 'advanced', label: this.$t.__('Advanced', this.$td) },
				{ value: 'searchAppearance', label: this.$t.__('Search Appearance', this.$td) },
				{ value: 'socialNetworks', label: this.$t.__('Social Networks', this.$td) },
				{ value: 'sitemap', label: this.$t.__('Sitemaps', this.$td) },
				{ value: 'redirects', label: this.$t.__('Redirects', this.$td) },
				{ value: 'breadcrumbs', label: this.$t.__('Breadcrumbs', this.$td) },
				{ value: 'tools', label: this.$t.__('Tools', this.$td) }
			]

			if (this.$isPro) {
				settings.push({ value: 'accessControl', label: this.$t.__('Access Control', this.$td) })
			}

			if (!this.isUnlicensed && this.showImageSeoReset) {
				settings.push({ value: 'image', label: this.$t.__('Image SEO', this.$td) })
			}

			if (!this.isUnlicensed && this.showLocalBusinessReset) {
				settings.push({ value: 'localBusiness', label: this.$t.__('Local Business SEO', this.$td) })
			}

			return settings
		},
		canExport () {
			const passed = []
			Object.keys(this.options).forEach(key => {
				passed.push(this.options[key])
			})

			Object.keys(this.postOptions).forEach(key => {
				passed.push(this.postOptions[key])
			})
			return passed.some(a => a)
		}
	},
	methods : {
		...mapActions([ 'exportSettings' ]),
		processExportSettings () {
			const settings = []
			if (this.options.all) {
				if (this.$isPro) {
					// Includes the license key.
					settings.push('general')
				}
				settings.push('internal')
				this.settings
					.filter(setting => 'all' !== setting.value)
					.forEach(setting => {
						settings.push(setting.value)
					})
			} else {
				Object.keys(this.options).forEach(key => {
					if (this.options[key]) {
						settings.push(key)
					}
				})
			}

			const postOptions = []
			if (this.postOptions.all) {
				this.$aioseo.postData.postTypes
					.forEach(postType => {
						postOptions.push(postType.name)
					})
			} else {
				Object.keys(this.postOptions).forEach(key => {
					if (this.postOptions[key]) {
						postOptions.push(key)
					}
				})
			}

			this.loading = true
			this.exportSettings({
				settings,
				postOptions
			})
				.then(response => {
					this.loading     = false
					this.options     = {}
					this.postOptions = {}
					const blob       = new Blob([ JSON.stringify(response.body.settings) ], { type: 'application/json' })
					const link       = document.createElement('a')
					link.href        = URL.createObjectURL(blob)
					link.download    = `aioseo-export-settings-${this.$moment().format('YYYY-MM-DD')}.json`
					link.click()
					URL.revokeObjectURL(link.href)
				})
		}
	}
}
</script>

<style lang="scss">
.aioseo-export-settings {
	flex: 1;
	font-size: 16px;

	.aioseo-select {
		max-width: 330px;
	}
	.aioseo-button.import {
		margin-top: 24px;
	}

	.export-settings {
		.aioseo-row {
			padding-bottom: 15px;
			margin-bottom: 10px;
		}

		.export-all {
			margin-bottom: 15px;
			font-weight: 700;
		}
	}

	.export-post-types {
		.export-all {
			margin-bottom: 15px;
			font-weight: 700;
		}
	}
}
</style>