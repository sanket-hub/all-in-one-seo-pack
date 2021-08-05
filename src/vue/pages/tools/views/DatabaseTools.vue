<template>
	<div class="aioseo-tools-database-tools">
		<core-card
			slug="databaseTools"
			:header-text="strings.resetRestoreSettings"
		>
			<core-settings-row
				:name="strings.selectSettings"
			>
				<template #content>
					<core-alert
						class="reset-success"
						v-if="showSuccess"
						type="green"
					>
						{{ strings.resetSuccess }}
					</core-alert>

					<div class="reset-settings">
						{{ strings.selectSettingsToReset }}

						<br>
						<br>

						<grid-row
							class="settings"
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

						<base-button
							type="gray"
							size="medium"
							@click="showModal = true"
							:disabled="canReset"
						>
							{{ strings.resetSelectedSettings }}
						</base-button>
					</div>
				</template>
			</core-settings-row>
		</core-card>

		<core-card
			v-if="showLogs"
			slug="databaseToolsLogs"
			:header-text="strings.logs"
		>
			<template #tooltip>
				{{ strings.logsTooltip }}
			</template>

			<core-settings-row
				v-if="$aioseo.data.logSizes.logs404"
				:name="strings.logs404"
				align
			>
				<template #content>
					<base-button
						class="clear-log"
						type="gray"
						size="medium"
						:loading="'logs404' === loadingLog"
						:disabled="disabledLog('logs404')"
						@click="processClearLog('logs404')"
					>
						<span
							v-if="disabledLog('logs404')"
						>
							<svg-checkmark />
							{{ strings.cleared }}
						</span>
						<span
							v-if="!disabledLog('logs404')"
						>
							{{ strings.clear404Logs }}
						</span>
					</base-button>

					<div class="log-size">
						<span
							class="size-dot"
							:class="getSizeClass($aioseo.data.logSizes.logs404.original)"
						/>
						{{ $aioseo.data.logSizes.logs404.readable }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="$aioseo.data.logSizes.redirectLogs"
				:name="strings.redirectLogs"
				align
			>
				<template #content>
					<base-button
						class="clear-log"
						type="gray"
						size="medium"
						:loading="'redirectLogs' === loadingLog"
						:disabled="disabledLog('redirectLogs')"
						@click="processClearLog('redirectLogs')"
					>
						<span
							v-if="disabledLog('redirectLogs')"
						>
							<svg-checkmark />
							{{ strings.cleared }}
						</span>
						<span
							v-if="!disabledLog('redirectLogs')"
						>
							{{ strings.clearRedirectLogs }}
						</span>
					</base-button>

					<div class="log-size">
						<span
							class="size-dot"
							:class="getSizeClass($aioseo.data.logSizes.redirectLogs.original)"
						/>
						{{ $aioseo.data.logSizes.redirectLogs.readable }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="showBadBotBlockerLogs"
				:name="strings.badBotBlockerLogs"
				align
			>
				<template #content>
					<base-button
						class="clear-log"
						type="gray"
						size="medium"
						:loading="'badBotBlockerLog' === loadingLog"
						:disabled="disabledLog('badBotBlockerLog')"
						@click="processClearLog('badBotBlockerLog')"
					>
						<span
							v-if="disabledLog('badBotBlockerLog')"
						>
							<svg-checkmark />
							{{ strings.cleared }}
						</span>
						<span
							v-if="!disabledLog('badBotBlockerLog')"
						>
							{{ strings.clearBadBotBlockerLogs }}
						</span>
					</base-button>

					<div class="log-size">
						<span
							class="size-dot"
							:class="getSizeClass($aioseo.data.logSizes.badBotBlockerLog.original)"
						/>
						{{ $aioseo.data.logSizes.badBotBlockerLog.readable }}
					</div>
				</template>
			</core-settings-row>
		</core-card>

		<core-modal
			v-if="showModal"
			no-header
		>
			<template #body >
				<div class="aioseo-modal-body">
					<button
						class="close"
						@click.stop="showModal = false"
					>
						<svg-close @click="showModal = false" />
					</button>

					<h3>{{ strings.areYouSureReset }}</h3>
					<div class="reset-description"
						v-html="strings.actionCannotBeUndone"
					/>

					<base-button
						type="blue"
						size="medium"
						@click="processResetSettings"
						:loading="loading"
					>
						{{ strings.yesIHaveBackup }}
					</base-button>

					<base-button
						type="gray"
						size="medium"
						@click="showModal = false"
					>
						{{ strings.noBackup }}
					</base-button>
				</div>
			</template>
		</core-modal>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
	data () {
		return {
			clearedLogs : {
				badBotBlockerLogs : false,
				redirectLogs      : false,
				logs404           : false
			},
			showModal   : false,
			loading     : false,
			loadingLog  : null,
			showSuccess : false,
			options     : {},
			strings     : {
				resetRestoreSettings   : this.$t.__('Reset / Restore Settings', this.$td),
				selectSettings         : this.$t.__('Select Settings', this.$td),
				selectSettingsToReset  : this.$t.__('Select settings that you would like to reset:', this.$td),
				resetSelectedSettings  : this.$t.__('Reset Selected Settings to Default', this.$td),
				resetSuccess           : this.$t.__('Your settings have been reset successfully!', this.$td),
				areYouSureReset        : this.$t.__('Are you sure you want to reset the selected settings to default?', this.$td),
				// Translators: 1 - Opening bold tag. 2 - Closing bold tag.
				actionCannotBeUndone   : this.$t.sprintf(this.$t.__('This action cannot be undone. Before taking this action, we recommend that you make a %1$sfull website backup first%2$s.', this.$td), '<strong>', '</strong>'),
				yesIHaveBackup         : this.$t.__('Yes, I have a backup and want to reset the settings', this.$td),
				noBackup               : this.$t.__('No, I need to make a backup', this.$td),
				logs                   : this.$t.__('Logs', this.$td),
				badBotBlockerLogs      : this.$t.__('Bad Bot Blocker Logs', this.$td),
				cleared                : this.$t.__('Cleared', this.$td),
				clearBadBotBlockerLogs : this.$t.__('Clear Bad Bot Blocker Logs', this.$td),
				logs404                : this.$t.__('404 Logs', this.$td),
				clear404Logs           : this.$t.__('Clear 404 Logs', this.$td),
				redirectLogs           : this.$t.__('Redirect Logs', this.$td),
				clearRedirectLogs      : this.$t.__('Clear Redirect Logs', this.$td),
				// Translators: 1 - The plugin short name ("AIOSEO").
				allSettings            : this.$t.sprintf(this.$t.__('All %1$s Settings', this.$td), process.env.VUE_APP_SHORT_NAME),
				logsTooltip            : this.$t.__('Log sizes may fluctuate and not always be 100% accurate since the results can be cached. Also after clearing a log, it may not show as "0" since database tables also include additional information such as indexes that we don\'t clear.', this.$td)
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'addons' ]),
		settings () {
			const settings = [
				{
					value  : 'webmaster-tools',
					label  : this.$t.__('Webmaster Tools', this.$td),
					access : 'aioseo_general_settings'
				},
				{
					value  : 'rss-content',
					label  : this.$t.__('RSS Content', this.$td),
					access : 'aioseo_general_settings'
				},
				{
					value  : 'advanced',
					label  : this.$t.__('Advanced', this.$td),
					access : 'aioseo_general_settings'
				},
				{
					value  : 'search-appearance',
					label  : this.$t.__('Search Appearance', this.$td),
					access : 'aioseo_search_appearance_settings'
				},
				{
					value  : 'social',
					label  : this.$t.__('Social Networks', this.$td),
					access : 'aioseo_social_networks_settings'
				},
				{
					value  : 'sitemap',
					label  : this.$t.__('Sitemaps', this.$td),
					access : 'aioseo_sitemap_settings'
				},
				{
					value  : 'robots',
					label  : this.$t.__('Robots.txt', this.$td),
					access : 'aioseo_tools_settings'
				},
				{
					value  : 'breadcrumbs',
					label  : this.$t.__('Breadcrumbs', this.$td),
					access : 'aioseo_general_settings'
				}
			]

			if (window.aioseo.internalOptions.internal.deprecatedOptions.includes('badBotBlocker')) {
				settings.push({
					value  : 'blocker',
					label  : this.$t.__('Bad Bot Blocker', this.$td),
					access : 'aioseo_tools_settings'
				})
			}

			// if (this.$aioseo.data.server.apache) {
			//  settings.push({ value: 'htaccess', label: this.$t.__('.htaccess', this.$td) })
			// }

			if (this.$isPro) {
				settings.push({
					value  : 'access-control',
					label  : this.$t.__('Access Control', this.$td),
					access : 'aioseo_admin'
				})
			}

			if (!this.isUnlicensed && this.showImageSeoReset) {
				settings.push({
					value  : 'image',
					label  : this.$t.__('Image SEO', this.$td),
					access : 'aioseo_search_appearance_settings'
				})
			}

			if (!this.isUnlicensed && this.showLocalBusinessReset) {
				settings.push({
					value  : 'local-business',
					label  : this.$t.__('Local Business SEO', this.$td),
					access : 'aioseo_local_seo_settings'
				})
			}

			if (!this.isUnlicensed && this.showRedirectsReset) {
				settings.push({
					value  : 'redirects',
					label  : this.$t.__('Redirects', this.$td),
					access : 'aioseo_redirects_settings'
				})
			}

			return settings.filter(setting => this.$allowed(setting.access))
		},
		showImageSeoReset () {
			const addon = this.addons.find(item => 'aioseo-image-seo' === item.sku)
			return addon && addon.isActive && !addon.requiresUpgrade
		},
		showLocalBusinessReset () {
			const addon = this.addons.find(item => 'aioseo-local-business' === item.sku)
			return addon && addon.isActive && !addon.requiresUpgrade
		},
		showRedirectsReset () {
			const addon = this.addons.find(item => 'aioseo-redirects' === item.sku)
			return addon && addon.isActive && !addon.requiresUpgrade
		},
		canReset () {
			const passed = []
			Object.keys(this.options).forEach(key => {
				passed.push(this.options[key])
			})
			return !passed.some(a => a)
		},
		showLogs () {
			return this.showBadBotBlockerLogs || this.$aioseo.data.logSizes.redirectLogs || this.$aioseo.data.logSizes.logs404
		},
		showBadBotBlockerLogs () {
			return window.aioseo.internalOptions.internal.deprecatedOptions.includes('badBotBlocker')
		}
	},
	methods : {
		...mapActions([ 'resetSettings', 'clearLog' ]),
		processResetSettings () {
			const payload = []
			if (this.options.all) {
				this.settings
					.filter(setting => 'all' !== setting.value)
					.forEach(setting => {
						payload.push(setting.value)
					})
			} else {
				Object.keys(this.options).forEach(key => {
					if (this.options[key]) {
						payload.push(key)
					}
				})
			}

			this.loading = true
			this.resetSettings(payload)
				.then(() => {
					this.showModal   = false
					this.loading     = false
					this.showSuccess = true
					this.options     = {}
					setTimeout(() => {
						this.showSuccess = false
					}, 5000)
				})
		},
		getSizeClass (size) {
			let color = 'green'
			if (262144000 < size) {
				color = 'orange'
			} else if (1073741274 < size) {
				color = 'red'
			}

			return color
		},
		processClearLog (log) {
			this.loadingLog = log
			this.clearLog(log)
				.then(() => {
					this.loadingLog       = null
					this.clearedLogs[log] = true
				})
		},
		disabledLog (log) {
			return !this.$aioseo.data.logSizes[log].original || this.clearedLogs[log]
		}
	}
}
</script>

<style lang="scss">
.aioseo-tools-database-tools {
	.reset-success {
		margin-bottom: 16px;
	}

	.reset-settings {
		margin-top: 0;
		font-size: 16px;
		color: $black;

		.aioseo-button {
			margin-top: 10px;
		}
	}

	.aioseo-modal-body {
		padding: 20px 50px 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;

		h3 {
			font-size: 20px;
			margin-bottom: 16px;
		}

		.reset-description {
			font-size: 16px;
			color: $black;
			margin-bottom: 16px;
			text-align: center;
			max-width: 515px;
		}

		button.close {
			position: absolute;
			right: 11px;
			top: 11px;
			width: 24px;
			height: 24px;
			background-color: #fff;
			border: none;
			display: flex;
			align-items: center;

			svg.aioseo-close {
				cursor: pointer;
				width: 14px;
				height: 14px;
			}
		}

		.aioseo-description {
			max-width: 510px;
			text-align: center;
		}

		.aioseo-button:not(.close) {
			margin-top: 16px;
		}
	}

	.clear-log {
		svg {
			width: 12px;
			height: 12px;
			margin-right: 5px;
		}
	}

	.log-size {
		display: inline-flex;
		margin-left: 20px;
		height: 40px;
		background: $box-background;
		align-items: center;
		justify-content: center;
		padding: 0 15px;
		font-size: 15px;
		font-weight: 600;
		color: $black2;

		.size-dot {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			margin-right: 10px;

			&.green {
				background-color: $green;
			}

			&.orange {
				background-color: $orange;
			}

			&.red {
				background-color: $red;
			}
		}
	}
}
</style>