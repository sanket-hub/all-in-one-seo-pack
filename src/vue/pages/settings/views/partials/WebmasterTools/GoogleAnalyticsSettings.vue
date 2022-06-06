<template>
	<grid-column class="tool-settings tool-settings-google-analytics">
		<template v-if="!gaActivated && showMiPromo && !gaDeprecated">
			<template
				v-for="(setting, index) in tool.settings"
			>
				<div
					v-if="shouldDisplaySetting(setting)"
					:key="index"
				>
					<core-settings-row
						noHorizontalMargin
						align-small
					>
						<template #name>
							{{ setting.label }}
						</template>

						<template #content>
							<div class="d-flex">
								<template
									v-if="!setting.parent"
								>
									<base-input
										size="small"
										@blur="maybeUpdateId(setting.option)"
										v-model="options.webmasterTools[setting.option]"
									/>
								</template>

								<template
									v-if="setting.parent && (!setting.pro || !isUnlicensed)"
								>
									<base-input
										v-if="'input' === setting.type || !setting.type"
										size="small"
										v-model="options.deprecated.webmasterTools[setting.parent][setting.option]"
										:placeholder="setting.placeholder"
										:disabled="isUnlicensed && setting.pro"
									/>
									<base-toggle
										v-if="'toggle' === setting.type"
										v-model="options.deprecated.webmasterTools[setting.parent][setting.option]"
										:disabled="isUnlicensed && setting.pro"
									/>
									<base-radio-toggle
										v-if="'radio-toggle' === setting.type"
										v-model="options.deprecated.webmasterTools[setting.parent][setting.option]"
										:name="setting.option"
										:options="setting.options"
										:disabled="isUnlicensed && setting.pro"
									/>
									<base-textarea
										v-if="'textarea' === setting.type"
										v-model="options.deprecated.webmasterTools[setting.parent][setting.option]"
										:min-height="100"
										:disabled="isUnlicensed && setting.pro"
									/>
									<grid-row
										v-if="'multicheck' === setting.type"
									>
										<grid-column
											md="4"
											v-for="(option, index) in setting.options"
											:key="index"
										>
											<base-checkbox
												size="medium"
												:value="getValue(setting, option)"
												@input="checked => updateValue(checked, setting, option)"
											>
												{{ option.label }}
											</base-checkbox>
										</grid-column>
									</grid-row>
								</template>
							</div>
							<p class="aioseo-description" v-html="setting.description" />

							<br>

							<core-alert
								v-if="setting.showMiPromo && showMiPromo"
								type="blue"
							>
								<div v-if="prefersEm" v-html="emPromo" />
								<div v-else v-html="miPromo" />
								<br>
								<base-button
									v-if="!$aioseo.plugins.miLite.canInstall"
									type="blue"
									size="medium"
									tag="a"
									target="_blank"
									:href="$aioseo.plugins.miLite.wpLink"
								>
									<svg-external /> {{ strings.installMi }}
								</base-button>
								<base-button
									v-if="$aioseo.plugins.miLite.canInstall"
									:loading="installingPlugin"
									:type="miInstalled ? 'green' : 'blue'"
									size="medium"
									@click="installMi"
								>
									<span
										v-if="miInstalled"
									>{{ strings.miInstalled }}</span>
									<span
										v-if="!miInstalled"
									>{{ strings.installMi }}</span>
								</base-button>
							</core-alert>
						</template>
					</core-settings-row>
				</div>
			</template>
		</template>

		<template v-if="gaActivated || !showMiPromo || gaDeprecated">
			<div class="mi-alert">
				<core-alert
					type="blue"
				>
					<div v-if="$aioseo.plugins.miLite.activated || $aioseo.plugins.miPro.activated">{{ strings.miHandlesGa }}</div>
					<div v-if="$aioseo.plugins.emLite.activated || $aioseo.plugins.emPro.activated">{{ strings.emHandlesGa }}</div>
					<div v-if="gaDeprecated && !gaActivated && prefersEm" v-html="emPromo" />
					<div v-if="gaDeprecated && !gaActivated && !prefersEm" v-html="miPromo" />
					<br>
					<base-button
						type="blue"
						size="medium"
						tag="a"
						:href="$aioseo.urls.aio.monsterinsights"
					>
						<template v-if="gaActivated || !showMiPromo">
							{{ strings.manageGa }}
						</template>
						<template v-else>
							{{ strings.startGa }}
						</template>
					</base-button>
				</core-alert>
			</div>
		</template>
	</grid-column>
</template>

<script>
import { mapActions } from 'vuex'
import { WebmasterTools } from '@/vue/pages/settings/mixins'
import BaseCheckbox from '@/vue/components/common/base/Checkbox'
import BaseRadioToggle from '@/vue/components/common/base/RadioToggle'
import BaseTextarea from '@/vue/components/common/base/Textarea'
import CoreAlert from '@/vue/components/common/core/alert/Index.vue'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
export default {
	components : {
		BaseCheckbox,
		BaseRadioToggle,
		BaseTextarea,
		CoreAlert,
		CoreSettingsRow,
		GridColumn,
		GridRow
	},
	mixins : [ WebmasterTools ],
	data () {
		return {
			installingPlugin : false,
			miInstalled      : false,
			showMiPromo      : true,
			strings          : {
				miLink : this.$t.sprintf(
					'<strong>%1$s</strong>',
					this.$t.__('Click here', this.$td)
				),
				installMi : this.$t.sprintf(
					// Translators: 1 - The addon or plugin name.
					this.$t.__('Install %1$s', this.$td),
					'MonsterInsights'
				),
				miInstalled : this.$t.__('Success!', this.$td),
				miHandlesGa : this.$t.sprintf(
					// Translators: 1 - The name of one of our partner plugins.
					this.$t.__('Google Analytics is now handled by %1$s.', this.$td),
					'MonsterInsights'
				),
				emHandlesGa : this.$t.sprintf(
					// Translators: 1 - The name of one of our partner plugins.
					this.$t.__('Google Analytics is now handled by %1$s.', this.$td),
					'ExactMetrics'
				),
				manageGa : this.$t.__('Manage Google Analytics', this.$td),
				startGa  : this.$t.__('Get Started', this.$td)
			}
		}
	},
	methods : {
		...mapActions([ 'installPlugins', 'upgradePlugins' ]),
		updateValue (checked, setting, option) {
			if (checked) {
				const users = this.options.deprecated.webmasterTools[setting.parent][setting.option]
				users.push(option.value)
				this.$set(this.options.deprecated.webmasterTools[setting.parent], setting.option, users)
				return
			}

			const index = this.options.deprecated.webmasterTools[setting.parent][setting.option].findIndex(t => t === option.value)
			if (-1 !== index) {
				this.$delete(this.options.deprecated.webmasterTools[setting.parent][setting.option], index)
			}
		},
		getValue (setting, option) {
			return this.options.deprecated.webmasterTools[setting.parent][setting.option].includes(option.value)
		},
		installMi () {
			this.installingPlugin = true
			this.installPlugins([
				{
					plugin : 'miLite',
					type   : 'plugin'
				}
			])
				.then(response => {
					this.installingPlugin = false
					if (response.body.failed.length) {
						this.miInstalledFailed = true
						return
					}

					this.miInstalled      = true
					setTimeout(() => {
						this.showMiPromo = false

						// Update the active status globally.
						this.$aioseo.plugins.miLite.activated  = true
						window.aioseo.plugins.miLite.activated = true
					}, 3000)
				})
				.catch(error => {
					console.error(error)
				})
		},
		shouldDisplaySetting (setting) {
			// Pro checks first.
			if (this.isUnlicensed && setting.pro) {
				return false
			}

			if (!setting.displayIf) {
				return true
			}

			if ('string' === typeof setting.displayIf) {
				return setting.displayIf.startsWith('!')
					? !this.options.deprecated.webmasterTools[setting.parent][setting.displayIf.replace('!', '')]
					: this.options.deprecated.webmasterTools[setting.parent][setting.displayIf]
			}

			if (Array.isArray(setting.displayIf)) {
				const passed = []
				setting.displayIf.forEach(display => {
					passed.push(display.startsWith('!')
						? !this.options.deprecated.webmasterTools[setting.parent][display.replace('!', '')]
						: this.options.deprecated.webmasterTools[setting.parent][display]
					)
				})

				return passed.every(a => a)
			}

			return false
		}
	},
	computed : {
		miPromo () {
			return this.$t.sprintf(
				// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
				this.$t.__('We recommend using the %1$sFree MonsterInsights%2$s plugin to get the most out of Google Analytics.', this.$td),
				'<strong>',
				'</strong>'
			)
		},
		emPromo () {
			return this.$t.sprintf(
				// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
				this.$t.__('We recommend using the %1$sFree ExactMetrics%2$s plugin to get the most out of Google Analytics.', this.$td),
				'<strong>',
				'</strong>'
			)
		},
		gaActivated () {
			return this.$aioseo.plugins.miLite.activated ||
				this.$aioseo.plugins.emLite.activated ||
				this.$aioseo.plugins.miPro.activated ||
				this.$aioseo.plugins.emPro.activated
		},
		gaDeprecated () {
			return !this.$aioseo.internalOptions.internal.deprecatedOptions.includes('googleAnalytics') &&
				!this.$aioseo.options.deprecated.webmasterTools.googleAnalytics.id &&
				!this.$aioseo.options.deprecated.webmasterTools.googleAnalytics.gtmContainerId
		},
		prefersEm () {
			return (this.$aioseo.plugins.emLite.installed ||
				this.$aioseo.plugins.emPro.installed) &&
				(!this.$aioseo.plugins.miLite.installed &&
				!this.$aioseo.plugins.miPro.installed)
		}
	}
}
</script>

<style lang="scss">
.tool-settings-google-analytics {
	.mi-alert {
		font-size: 16px;

		.aioseo-alert {
			display: flex;
			align-items: center;
			min-width: 100%;
			max-width: 100%;

			> div:first-child {
				flex: 1 0 auto;
			}
		}
	}
}
</style>