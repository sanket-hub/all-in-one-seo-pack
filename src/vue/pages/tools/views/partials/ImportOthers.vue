<template>
	<core-card
		id="aioseo-import-others"
		class="aioseo-import-others"
		slug="importOtherPlugins"
		:toggles="false"
		no-slide
		:header-text="strings.importSettingsFromOtherPlugins"
	>
		<template #header-icon>
			<svg-download />
		</template>

		<div class="aioseo-section-description">
			{{ strings.importOthersDescription }}
		</div>

		<core-alert
			class="import-success"
			v-if="importSuccess"
			type="green"
		>
			{{ importSuccessful }}
		</core-alert>

		<core-alert
			class="import-error"
			v-if="importError"
			type="red"
		>
			{{ importErrorMessage }}
		</core-alert>

		<base-select
			size="medium"
			v-model="plugin"
			:options="plugins"
			:placeholder="strings.selectPlugin"
		>
			<template #option="{ option }">
				<div class="import-plugin-label">
					<span class="plugin-label">{{ option.label }}</span>
					<span
						v-if="option.$isDisabled"
						class="plugin-status"
					>{{ strings.notInstalled }}</span>
				</div>
			</template>
		</base-select>

		<div
			v-if="plugin"
			class="import-settings"
		>
			<grid-row
				v-if="plugin.canImport"
			>
				<grid-column>
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
					xl="3"
					md="4"
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

			<core-alert
				v-if="!plugin.canImport"
				type="red"
			>
				{{ invalidVersion(plugin) }}
			</core-alert>
		</div>

		<base-button
			type="blue"
			size="medium"
			class="import"
			@click="processImportPlugin"
			:disabled="!plugin || !canImport"
			:loading="loading"
		>
			{{ strings.import }}
		</base-button>
	</core-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data () {
		return {
			importSuccess : false,
			importError   : false,
			options       : {},
			plugin        : null,
			loading       : false,
			strings       : {
				importSettingsFromOtherPlugins : this.$t.__('Import Settings From Other Plugins', this.$td),
				// Translators: 1 - The plugin short name ("AIOSEO").
				importOthersDescription        : this.$t.sprintf(this.$t.__('Choose a plugin to import SEO data directly into %1$s.', this.$td), process.env.VUE_APP_SHORT_NAME),
				selectPlugin                   : this.$t.__('Select a plugin...', this.$td),
				import                         : this.$t.__('Import', this.$td),
				allSettings                    : this.$t.__('All Settings', this.$td),
				notInstalled                   : this.$t.__('not installed', this.$td)
			}
		}
	},
	watch : {
		plugin () {
			this.importSuccess = false
			this.importError   = false
			this.options       = {}
		}
	},
	computed : {
		settings () {
			const settings = [
				{ value: 'settings', label: this.$t.__('SEO Settings', this.$td) },
				{ value: 'postMeta', label: this.$t.__('Post Meta', this.$td) }
			]

			if (this.$isPro) {
				settings.push({ value: 'termMeta', label: this.$t.__('Term Meta', this.$td) })
			}

			return settings
		},
		plugins () {
			const plugins = []
			this.$aioseo.importers.forEach(plugin => {
				plugins.push({
					value       : plugin.slug,
					label       : plugin.name,
					canImport   : plugin.canImport,
					version     : plugin.version,
					$isDisabled : !plugin.installed
				})
			})

			return plugins
		},
		canImport () {
			const passed = []
			Object.keys(this.options).forEach(key => {
				passed.push(this.options[key])
			})
			return passed.some(a => a)
		},
		importSuccessful () {
			// Translators: 1 - The name of the plugin being imported (e.g "Yoast SEO").
			return this.$t.sprintf(this.$t.__('%1$s was successfully imported!', this.$td), this.plugin.label)
		},
		importErrorMessage () {
			// Translators: 1 - The name of the plugin being imported (e.g "Yoast SEO").
			return this.$t.sprintf(this.$t.__('An error occurred while importing %1$s. Please try again.', this.$td), this.plugin.label)
		}
	},
	methods : {
		...mapActions([ 'importPlugins' ]),
		processImportPlugin () {
			this.importSuccess = false
			this.importError   = false
			this.loading       = true
			const settings     = []
			if (this.options.all) {
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

			this.importPlugins([
				{
					plugin : this.plugin.value,
					settings
				}
			])
				.then(() => {
					this.loading       = false
					this.importSuccess = true
					this.options       = {}
				})
				.catch(() => {
					this.loading     = false
					this.importError = true
					this.options     = {}
				})
		},
		invalidVersion (plugin) {
			// Translators: 1 - The name of the plugin (e.g. "Yoast SEO"), 2 - The version of the plugin (e.g. "10.2.3").
			return this.$t.sprintf(this.$t.__('We do not support importing from the currently installed version of %1$s (%2$s). Please upgrade to the latest version and try again.', this.$td), plugin.label, plugin.version)
		}
	}
}
</script>

<style lang="scss">
.aioseo-import-others {
	flex: 1;
	font-size: 16px;

	.import-success,
	.import-error {
		margin-bottom: 20px;
	}

	.aioseo-select {
		max-width: 330px;
	}
	.aioseo-button.import {
		margin-top: 24px;
	}

	.import-settings {
		margin-top: 20px;
	}

	.import-plugin-label {
		display: flex;

		span:first-child {
			flex: 1;
		}
	}
}
</style>