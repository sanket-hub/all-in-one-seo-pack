<template>
	<grid-column class="tool-settings tool-settings-google-analytics">
		<template v-if="!gaActivated && showMiPromo && !gaDeprecated">
			<div
				v-for="(setting, index) in filteredSettings"
				:key="index"
			>
				<core-settings-row
					noHorizontalMargin
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
											:modelValue="getValue(setting, option)"
											@update:modelValue="checked => updateValue(checked, setting, option)"
										>
											{{ option.label }}
										</base-checkbox>
									</grid-column>
								</grid-row>
							</template>
						</div>

						<p
							class="aioseo-description"
							v-html="setting.description"
						/>

						<br>

						<core-alert
							v-if="setting.showMiPromo && showMiPromo"
							type="blue"
						>
							<div
								v-if="prefersEm"
								v-html="emPromo"
							/>

							<div
								v-else
								v-html="miPromo"
							/>

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

		<template v-if="gaActivated || !showMiPromo || gaDeprecated">
			<div class="mi-alert">
				<core-alert
					type="blue"
				>
					<div
						v-if="$aioseo.plugins.miLite.activated || $aioseo.plugins.miPro.activated"
					>
						{{ strings.miHandlesGa }}
					</div>

					<div
						v-if="$aioseo.plugins.emLite.activated || $aioseo.plugins.emPro.activated"
					>
						{{ strings.emHandlesGa }}
					</div>

					<div
						v-if="gaDeprecated && !gaActivated && prefersEm"
						v-html="emPromo"
					/>

					<div
						v-if="gaDeprecated && !gaActivated && !prefersEm"
						v-html="miPromo"
					/>

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
import { MiOrEm, WebmasterTools } from '@/vue/pages/settings/mixins'

import BaseCheckbox from '@/vue/components/common/base/Checkbox'
import BaseRadioToggle from '@/vue/components/common/base/RadioToggle'
import BaseTextarea from '@/vue/components/common/base/Textarea'
import CoreAlert from '@/vue/components/common/core/alert/Index'
import CoreSettingsRow from '@/vue/components/common/core/SettingsRow'
import GridColumn from '@/vue/components/common/grid/Column'
import GridRow from '@/vue/components/common/grid/Row'
import SvgExternal from '@/vue/components/common/svg/External'

export default {
	components : {
		BaseCheckbox,
		BaseRadioToggle,
		BaseTextarea,
		CoreAlert,
		CoreSettingsRow,
		GridColumn,
		GridRow,
		SvgExternal
	},
	mixins : [ MiOrEm, WebmasterTools ],
	data () {
		return {
			strings : {
				miLink : this.$t.sprintf(
					'<strong>%1$s</strong>',
					this.$t.__('Click here', this.$td)
				),
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
		gaDeprecated () {
			return !this.$aioseo.internalOptions.internal.deprecatedOptions.includes('googleAnalytics') &&
				!this.$aioseo.options.deprecated.webmasterTools.googleAnalytics.id &&
				!this.$aioseo.options.deprecated.webmasterTools.googleAnalytics.gtmContainerId
		},
		filteredSettings () {
			return this.tool.settings.filter(setting => this.shouldDisplaySetting(setting))
		}
	},
	methods : {
		updateValue (checked, setting, option) {
			if (checked) {
				const users = this.options.deprecated.webmasterTools[setting.parent][setting.option]
				users.push(option.value)
				this.options.deprecated.webmasterTools[setting.parent][setting.option] = users
				return
			}

			const index = this.options.deprecated.webmasterTools[setting.parent][setting.option].findIndex(t => t === option.value)
			if (-1 !== index) {
				this.options.deprecated.webmasterTools[setting.parent][setting.option].splice(index, 1)
			}
		},
		getValue (setting, option) {
			return this.options.deprecated.webmasterTools[setting.parent][setting.option].includes(option.value)
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
	}
}
</script>

<style lang="scss">
.tool-settings-google-analytics {
	.mi-alert {
		font-size: 16px;

		.aioseo-alert.blue {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: 12px;
			margin-top: 0;
			min-width: 100%;
			max-width: 100%;
		}
	}
}
</style>