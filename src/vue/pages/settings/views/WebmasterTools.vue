<template>
	<div class="aioseo-webmaster-tools">
		<core-card
			slug="webmasterTools"
			:header-text="strings.webmasterToolsVerification"
		>
			<div class="webmaster-tools-description">
				Enter your verification codes below to activate webmaster tools.
			</div>

			<grid-row class="webmaster-tools-toggles">
				<grid-column
					class="tool-toggle"
					v-for="(tool, index) in tools"
					:key="`toggle_${index}`"
					sm="6"
					md="4"
					lg="3"
					:style="{ order: getOrder(tool) }"
				>
					<div
						@click="toggleActiveTool(tool.slug)"
						:class="[
							{ active: tool.slug === activeTool },
							{ connected: isConnected(tool) }
						]"
					>
						<img :src="tool.logo" />
						<div
							v-html="tool.name"
						/>
						<svg-circle-check-solid
							v-if="isConnected(tool)"
						/>
					</div>
				</grid-column>

				<transition-slide
					class="tool-settings-slide"
					:style="{ order: getOrder(tool, true) }"
					v-for="(tool, index) in tools"
					:key="`content_${index}`"
					:active="tool.slug === activeTool"
					@open-start="heightOkay = activeTool"
					@close-end="heightOkay = activeTool"
				>
					<grid-column class="tool-settings">
						<template
							v-if="'googleAnalytics' !== tool.slug || (notGaActivated && showMiPromo && !gaDeprecated)"
						>
							<template
								v-for="(setting, index) in tool.settings"
							>
								<div
									v-if="(heightOkay === tool.slug) && shouldDisplaySetting(setting)"
									:key="index"
								>
									<core-settings-row
										noSideMargin
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

						<template
							v-if="'googleAnalytics' === tool.slug && (gaActivated || !showMiPromo || gaDeprecated)"
						>
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
				</transition-slide>
			</grid-row>

			<grid-row class="webmaster-tools-spacer">
				<grid-column>
					<div />
				</grid-column>
			</grid-row>

			<core-settings-row
				:name="strings.miscellaneousVerification"
				align
			>
				<template #content>
					<core-alert-unfiltered-html />
					<base-editor
						:disabled="!$aioseo.user.unfilteredHtml"
						v-model="options.webmasterTools.miscellaneousVerification"
						line-numbers
						monospace
					/>

					<p
						class="aioseo-description"
						v-html="strings.miscellaneousVerificationDescription"
					/>
				</template>
			</core-settings-row>
		</core-card>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { MetaTag } from '@/vue/mixins'
export default {
	mixins : [ MetaTag ],
	data () {
		return {
			showMiPromo      : true,
			installingPlugin : false,
			miInstalled      : false,
			heightOkay       : false,
			activeTool       : null,
			columnsPerRow    : 4,
			strings          : {
				miscellaneousVerification            : this.$t.__('Miscellaneous Verification', this.$td),
				// Translators: 1 - "<head></head>".
				miscellaneousVerificationDescription : this.$t.sprintf(this.$t.__('The code above will be added between the %1$s tags on every page on your website.', this.$td), '<em>&lt;head&gt; &lt/head&gt;</em>'),
				webmasterToolsVerification           : this.$t.__('Webmaster Tools Verification', this.$td),
				miLink                               : this.$t.sprintf('<strong>%1$s</strong>', this.$t.__('Click here', this.$td)),
				// Translators: 1 - The addon or plugin name.
				installMi                            : this.$t.sprintf(this.$t.__('Install %1$s', this.$td), 'MonsterInsights'),
				miInstalled                          : this.$t.__('Success!', this.$td),
				// Translators: 1 - The name of one of our partner plugins.
				miHandlesGa                          : this.$t.sprintf(this.$t.__('Google Analytics is now handled by %1$s.', this.$td), 'MonsterInsights'),
				// Translators: 1 - The name of one of our partner plugins.
				emHandlesGa                          : this.$t.sprintf(this.$t.__('Google Analytics is now handled by %1$s.', this.$td), 'ExactMetrics'),
				manageGa                             : this.$t.__('Manage Google Analytics', this.$td),
				startGa                              : this.$t.__('Get Started', this.$td),
				// Translators: 1 - Learn more link.
				unfilteredHtmlError                  : this.$t.sprintf(this.$t.__('Your user account role does not have access to edit this field. %1$s', this.$td), this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'unfilteredHtml', true))
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'options', 'internalOptions' ]),
		miPromo () {
			// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
			return this.$t.sprintf(this.$t.__('We recommend using the %1$sFree MonsterInsights%2$s plugin to get the most out of Google Analytics.', this.$td), '<strong>', '</strong>')
		},
		emPromo () {
			// Translators: 1 - Opening HTML bold tag, 2 - Closing HTML bold tag.
			return this.$t.sprintf(this.$t.__('We recommend using the %1$sFree ExactMetrics%2$s plugin to get the most out of Google Analytics.', this.$td), '<strong>', '</strong>')
		},
		notGaActivated () {
			return !this.$aioseo.plugins.miLite.activated &&
				!this.$aioseo.plugins.emLite.activated &&
				!this.$aioseo.plugins.miPro.activated &&
				!this.$aioseo.plugins.emPro.activated
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
		},
		tools () {
			return [
				{
					slug     : 'googleSearchConsole',
					name     : this.$t.__('Google Search Console', this.$td),
					logo     : require('@/vue/assets/images/webmaster-tools/google.png'),
					settings : [
						{
							option      : 'google',
							label       : this.$t.__('Google Verification Code', this.$td),
							// Translators: 1 - "Google Search Console".
							description : this.$t.sprintf(this.$t.__('Get your Google verification code in %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Google Search Console', this.$td), 'googleSearchConsole'))
						}
					]
				},
				{
					slug     : 'bing',
					name     : this.$t.__('Bing Webmaster Tools', this.$td),
					logo     : require('@/vue/assets/images/webmaster-tools/bing.png'),
					settings : [
						{
							option      : 'bing',
							label       : this.$t.__('Bing Verification Code', this.$td),
							// Translators: 1 - "Bing Webmaster Tools".
							description : this.$t.sprintf(this.$t.__('Get your Bing verification code in %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Bing Webmaster Tools', this.$td), 'bingWebmasterVerification'))
						}
					]
				},
				{
					slug     : 'yandex',
					name     : this.$t.__('Yandex Webmaster Tools', this.$td),
					logo     : require('@/vue/assets/images/webmaster-tools/yandex.png'),
					settings : [
						{
							option      : 'yandex',
							label       : this.$t.__('Yandex Verification Code', this.$td),
							// Translators: 1 - "Yandex Webmaster Tools".
							description : this.$t.sprintf(this.$t.__('Get your Yandex verification code in %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Yandex Webmaster Tools', this.$td), 'yandexWebmasterVerification'))
						}
					]
				},
				{
					slug     : 'baidu',
					name     : this.$t.__('Baidu Webmaster Tools', this.$td),
					logo     : require('@/vue/assets/images/webmaster-tools/baidu.png'),
					settings : [
						{
							option      : 'baidu',
							label       : this.$t.__('Baidu Verification Code', this.$td),
							// Translators: 1 - "Baidu Webmaster Tools".
							description : this.$t.sprintf(this.$t.__('Get your Baidu verification code in %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Baidu Webmaster Tools', this.$td), 'baiduWebmasterVerification'))
						}
					]
				},
				{
					slug     : 'pinterest',
					name     : this.$t.__('Pinterest Site Verification', this.$td),
					logo     : require('@/vue/assets/images/webmaster-tools/pinterest.png'),
					settings : [
						{
							option      : 'pinterest',
							label       : this.$t.__('Pinterest Verification Code', this.$td),
							// Translators: 1 - "Pinterest account".
							description : this.$t.sprintf(this.$t.__('Get your Pinterest verification code in your %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Pinterest account', this.$td), 'pinterestSiteVerification'))
						}
					]
				},
				// @TODO: [V4+] Removed because of feature parity.
				// {
				//  slug     : 'alexa',
				//  name     : this.$t.__('Alexa Verification ID', this.$td),
				//  logo     : require('@/vue/assets/images/webmaster-tools/alexa.png'),
				//  settings : [
				//      {
				//          option      : 'alexa',
				//          label       : this.$t.__('Alexa Verification ID', this.$td),
				//          description : this.$t.sprintf(this.$t.__('Get your Alexa verification ID in your %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Alexa account', this.$td), 'CHANGEME'))
				//      }
				//  ]
				// },
				// {
				//  slug     : 'norton',
				//  name     : this.$t.sprintf(this.$t.__('Norton Safe Web%1$sVerification ID', this.$td), '<br>'),
				//  logo     : require('@/vue/assets/images/webmaster-tools/norton.png'),
				//  settings : [
				//      {
				//          option      : 'norton',
				//          label       : this.$t.__('Norton Verification ID', this.$td),
				//          description : this.$t.sprintf(this.$t.__('Get your Norton verification ID in your %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Norton account', this.$td), 'CHANGEME'))
				//      }
				//  ]
				// },
				{
					slug     : 'googleAnalytics',
					name     : this.$t.__('Google Analytics', this.$td),
					logo     : require('@/vue/assets/images/webmaster-tools/googleAnalytics.png'),
					settings : [
						{
							parent      : 'googleAnalytics',
							option      : 'id',
							placeholder : 'UA-XXXXXXXX-X',
							label       : this.$t.__('Google Analytics ID', this.$td),
							// Translators: 1 - "Google Analytics account".
							description : this.$t.sprintf(this.$t.__('Get your Google Analytics ID in your %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Google Analytics account', this.$td), 'googleAnalytics')),
							showMiPromo : true
						},
						{
							parent      : 'googleAnalytics',
							option      : 'advanced',
							label       : this.$t.__('Enable Advanced Analytics Options', this.$td),
							type        : 'toggle',
							displayIf   : [ 'id' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables Advanced Google Analytics options.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'advancedGoogleAnalytics', true))
						},
						{
							parent      : 'googleAnalytics',
							option      : 'trackingDomain',
							label       : this.$t.__('Tracking Domain', this.$td),
							displayIf   : [ 'id', 'advanced' ],
							// Translators: 1 - "http://", 2 - A link to our documentation, 3 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('Enter your domain name without the %1$s to set your cookie domain.%2$s%3$s', this.$td), 'http://', '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackingDomain', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'multipleDomains',
							label   : this.$t.__('Track Multiple Domains', this.$td),
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('Use this option to enable tracking of multiple or additional domains.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackMultipleDomains', true))
						},
						{
							parent      : 'googleAnalytics',
							option      : 'additionalDomains',
							label       : this.$t.__('Additional Domains', this.$td),
							type        : 'textarea',
							displayIf   : [ 'id', 'advanced', 'multipleDomains' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('Add a list of additional domains to track here. Enter one domain name per line without the http://.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'additionalDomains', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'anonymizeIp',
							label   : this.$t.__('Anonymize IP Addresses', this.$td),
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables support for IP Anonymization in Google Analytics.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'anonymizeIps', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'displayAdvertiserTracking',
							label   : this.$t.__('Display Advertiser Tracking', this.$td),
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables support for the Display Advertiser Features in Google Analytics.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'displayAdvertiserTracking', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'excludeUsers',
							label   : this.$t.__('Exclude Users from Tracking', this.$td),
							type    : 'multicheck',
							options : Object.keys(this.$aioseo.user.roles).map(key => {
								const role = this.$aioseo.user.roles[key]
								return {
									value : key,
									label : role
								}
							}),
							displayIf   : [ 'id', 'advanced' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('Exclude logged-in users from Google Analytics tracking by role.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'excludeUsers', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'enhancedLinkAttribution',
							label   : this.$t.__('Enhanced Link Attribution', this.$td),
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables support for the Enhanced Link Attribution in Google Analytics.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'enhancedLinkAttribution', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackOutboundLinks',
							label   : this.$t.__('Track Outbound Links', this.$td),
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking outbound links with Google Analytics.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackOutboundLinks', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'enhancedEcommerce',
							label   : this.$t.__('Enhanced Ecommerce', this.$td),
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables support for the Enhanced Ecommerce in Google Analytics.%1$s%2$s', this.$td), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'enhancedEcommerce', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackOutboundForms',
							label   : this.$t.__('Track Outbound Forms', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking outbound forms with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackOutboundForms', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackEvents',
							label   : this.$t.__('Track Events', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking events with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackEvents', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackUrlChanges',
							label   : this.$t.__('Track URL Changes', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking URL changes for single pages with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackUrlChanges', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackVisibility',
							label   : this.$t.__('Track Page Visibility', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking how long pages are in visible state with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackVisibility', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackMediaQueries',
							label   : this.$t.__('Track Media Queries', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking media queries with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackMediaQueries', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackImpressions',
							label   : this.$t.__('Track Elements Visibility', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking when elements are visible within the viewport with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackImpressions', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackScrollbar',
							label   : this.$t.__('Track Page Scrolling', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking how far down a user scrolls a page with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackScrollbar', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackSocial',
							label   : this.$t.__('Track Facebook and Twitter', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This enables tracking interactions with the official Facebook and Twitter widgets with Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackSocial', true))
						},
						{
							parent  : 'googleAnalytics',
							option  : 'trackCleanUrl',
							label   : this.$t.__('Ensure URL Consistency', this.$td),
							pro     : true,
							type    : 'radio-toggle',
							options : [
								{ label: this.$constants.GLOBAL_STRINGS.no, value: false, activeClass: 'dark' },
								{ label: this.$constants.GLOBAL_STRINGS.yes, value: true }
							],
							displayIf   : [ 'id', 'advanced', '!gtmContainerId' ],
							// Translators: 1 - A link to our documentation, 2 - HTML line break tag.
							description : this.$t.sprintf(this.$t.__('This ensures consistency in URL paths reported to Google Analytics.%1$s%2$s', this.$tdPro), '<br>', this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'trackCleanUrl', true))
						},
						{
							parent      : 'googleAnalytics',
							option      : 'gtmContainerId',
							label       : this.$t.__('Google Tag Manager Container ID', this.$td),
							pro         : true,
							placeholder : 'GTM-XXXXXX',
							// Translators: 1 - "Google Tag Manager account".
							description : this.$t.sprintf(this.$t.__('Get your Google Tag Manager ID in your %1$s.', this.$td), this.$links.getDocLink(this.$t.__('Google Tag Manager account', this.$tdPro), 'gtmContainerId'))
						}
					]
				}
			]
		}
	},
	methods : {
		...mapActions([ 'installPlugins' ]),
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
		getLinkWrapper (link, text) {
			return this.$t.sprintf('<a href="%1$s" target="_blank">%2$s</a>', link, text)
		},
		getOrder (tool, setting = false) {
			const index = this.tools.findIndex(t => t.slug === tool.slug)
			if (!setting) {
				return index
			}

			return this.getRow(this.columnsPerRow - 1, index)
		},
		getRow (row, index) {
			if ((index - 1) < row) {
				return row
			}

			return this.getRow(row + this.columnsPerRow, index)
		},
		toggleActiveTool (slug) {
			if (this.activeTool === slug) {
				this.activeTool = null
				return
			}

			this.activeTool = slug
		},
		maybeChangeColumnsPerRow () {
			// XS
			if (window.matchMedia('(max-width: 600px)').matches) {
				this.columnsPerRow = 1
			}

			// SM
			if (window.matchMedia('(min-width: 600px) and (max-width: 912px)').matches) {
				this.columnsPerRow = 2
			}

			// MD
			if (window.matchMedia('(min-width: 912px) and (max-width: 1042px)').matches) {
				this.columnsPerRow = 3
			}

			// LG
			if (window.matchMedia('(min-width: 1042px)').matches) {
				this.columnsPerRow = 4
			}
		},
		isConnected (tool) {
			return tool.settings[0].parent
				? (this.options.deprecated.webmasterTools[tool.settings[0].parent][tool.settings[0].option] && !this.$aioseo.plugins.miLite.activated)
				: this.options.webmasterTools[tool.settings[0].option]
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
	beforeDestroy () {
		window.removeEventListener('resize', this.maybeChangeColumnsPerRow)
	},
	mounted () {
		this.maybeChangeColumnsPerRow()

		this.$nextTick(() => this.tools.forEach(tool => {
			this.getOrder(tool)
			this.getOrder(tool, true)
		}))

		window.addEventListener('resize', this.maybeChangeColumnsPerRow)
	}
}
</script>

<style lang="scss">
.aioseo-webmaster-tools {
	.no-access {
		margin-bottom: 20px;
	}

	.webmaster-tools-description {
		font-size: 16px;
		margin-bottom: 30px;
	}

	.webmaster-tools-spacer {
		.aioseo-col {
			div {
				margin: 30px 0;
				border-bottom: 1px solid $border;
			}
		}
	}

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

	.tool-toggle {
		font-size: 16px;
		user-select: none;

		> div {
			cursor: pointer;
			height: 165px;
			border: 1px solid $border;
			border-radius: 3px;
			padding: 20px 20px 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: $black;
			text-align: center;
			position: relative;

			img {
				max-width: 100%;
				max-height: 100%;
				margin: 0 40px
			}

			&.connected {
				svg.aioseo-circle-check-solid {
					width: 21px;
					height: 21px;
					color: $green;
					position: absolute;
					top: 10px;
					right: 10px;
				}

				&.active {
					svg.aioseo-circle-check-solid {
						top: 9px;
						right: 9px;
					}
				}
			}

			&.active {
				padding: 19px 19px 38px;
				font-weight: 600;
				border: 2px solid $blue;
				box-shadow: 0px 5px 10px rgba(0, 90, 224, 0.1);

				&.connected {
					border-color: $green;
				}
			}
		}
	}

	.tool-settings-slide {
		width: 100%;

		.tool-settings {
			> div {
				padding: 15px;
				background-color: $box-background;
				border-radius: 3px;
				border-bottom: 1px solid $border;

				&:last-child {
					border-bottom: none;
				}
			}

			.aioseo-input {
				max-width: 440px;
				margin-right: 10px;
			}

			.aioseo-textarea-autosize {
				max-width: 400px;
			}

			.aioseo-button {
				svg.aioseo-external {
					width: 14px;
					height: 14px;
					margin-right: 10px;
				}
			}
		}
	}
}
</style>