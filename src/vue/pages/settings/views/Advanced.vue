<template>
	<div class="aioseo-advanced">
		<core-card
			slug="advanced"
			:header-text="strings.advanced"
		>
			<core-settings-row
				:name="strings.truSeo"
			>
				<template #content>
					<base-toggle
						v-model="options.advanced.truSeo"
					/>

					<div class="aioseo-description">
						{{ strings.truSeoDescription }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.headlineAnalyzer"
			>
				<template #content>
					<base-toggle
						v-model="options.advanced.headlineAnalyzer"
					/>

					<div class="aioseo-description">
						{{ strings.headlineAnalyzerDescription }}
					</div>
				</template>
			</core-settings-row>

			<!--core-settings-row
				:name="strings.seoAnalysis"
			>
				<template #content>
					<base-toggle
						v-model="options.advanced.seoAnalysis"
					/>
				</template>
			</core-settings-row-->

			<core-settings-row
				:name="strings.postTypeColumns"
			>
				<template #content>
					<base-checkbox
						size="medium"
						v-model="options.advanced.postTypes.all"
					>
						{{ strings.includeAllPostTypes }}
					</base-checkbox>

					<core-post-type-options
						v-if="!options.advanced.postTypes.all"
						:options="options.advanced"
						type="postTypes"
					/>

					<div class="aioseo-description">
						{{ strings.selectPostTypes }}

						<span
							v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'selectPostTypesColumns', true)"
						/>
					</div>
				</template>
			</core-settings-row>

			<core-settings-row>
				<template #name>
					{{ strings.taxonomyColumns }}
					<core-pro-badge
						v-if="isUnlicensed"
					/>
				</template>
				<template #content>
					<base-checkbox
						v-if="isUnlicensed"
						disabled
						size="medium"
						:value="true"
					>
						{{ strings.includeAllTaxonomies }}
					</base-checkbox>

					<base-checkbox
						v-if="!isUnlicensed"
						size="medium"
						v-model="options.advanced.taxonomies.all"
					>
						{{ strings.includeAllTaxonomies }}
					</base-checkbox>

					<core-post-type-options
						v-if="!options.advanced.taxonomies.all && !isUnlicensed"
						:options="options.advanced"
						type="taxonomies"
					/>

					<div class="aioseo-description">
						{{ strings.selectTaxonomies }}

						<span
							v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'selectTaxonomiesColumns', true)"
						/>
					</div>

					<core-alert
						class="inline-upsell"
						v-if="isUnlicensed"
						type="blue"
					>
						<div v-html="strings.taxonomyColumnsUpsell" />
					</core-alert>
				</template>
			</core-settings-row>

			<core-settings-row
				align
			>
				<template #name>
					{{ strings.adminBarMenu }}
					<core-pro-badge
						v-if="isUnlicensed"
					/>
				</template>

				<template #content>
					<base-radio-toggle
						:disabled="isUnlicensed"
						v-model="adminBarMenu"
						name="adminBarMenu"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.hide, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.show, value: true }
						]"
					/>

					<div class="aioseo-description">
						{{ strings.adminBarMenuDescription }}
					</div>

					<core-alert
						class="inline-upsell"
						v-if="isUnlicensed"
						type="blue"
					>
						<div v-html="strings.adminBarMenuUpsell" />
					</core-alert>
				</template>
			</core-settings-row>

			<core-settings-row
				align
			>
				<template #name>
					{{ strings.dashboardWidget }}
					<core-pro-badge
						v-if="isUnlicensed"
					/>
				</template>
				<template #content>
					<base-radio-toggle
						:disabled="isUnlicensed"
						v-model="dashboardWidget"
						name="dashboardWidget"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.hide, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.show, value: true }
						]"
					/>

					<div class="aioseo-description">
						{{ strings.dashboardWidgetDescription }}
					</div>

					<core-alert
						class="inline-upsell"
						v-if="isUnlicensed"
						type="blue"
					>
						<div v-html="strings.dashboardWidgetUpsell" />
					</core-alert>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.announcements"
				align
			>
				<template #content>
					<base-radio-toggle
						v-model="options.advanced.announcements"
						name="announcements"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.hide, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.show, value: true }
						]"
					/>

					<div class="aioseo-description">
						{{ strings.announcementsDescription }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				align
				v-if="$isPro"
			>
				<template #name>
					{{ strings.automaticUpdates }}
				</template>
				<template #content>
					<base-radio-toggle
						v-model="options.advanced.autoUpdates"
						name="autoUpdates"
						:options="[
							{ label: strings.all, value: 'all' },
							{ label: strings.minor, value: 'minor' },
							{ label: strings.none, value: 'none', activeClass: 'dark' }
						]"
					/>

					<div class="aioseo-description">
						<span v-if="'all' === options.advanced.autoUpdates">{{ strings.allDescription }}</span>
						<span v-if="'minor' === options.advanced.autoUpdates">{{ strings.minorDescription }}</span>
						<span v-if="'none' === options.advanced.autoUpdates">{{ strings.noneDescription }}</span>
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				v-if="!$isPro"
			>
				<template #name>
					{{ strings.usageTracking }}
					<core-tooltip>
						<svg-circle-question-mark />

						<template #tooltip>
							<div v-html="strings.usageTrackingTooltip" />
						</template>
					</core-tooltip>
				</template>
				<template #content>
					<base-toggle
						v-model="options.advanced.usageTracking"
					/>

					<div class="aioseo-description">
						{{ strings.usageTrackingDescription }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.uninstallAioseo"
			>
				<template #content>
					<base-toggle
						v-model="options.advanced.uninstall"
					/>

					<div class="aioseo-description">
						{{ strings.uninstallAioseoDescription }}
					</div>
				</template>
			</core-settings-row>
		</core-card>
	</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
	data () {
		return {
			strings : {
				advanced                    : this.$t.__('Advanced Settings', this.$td),
				truSeo                      : this.$t.__('TruSEO Score & Content', this.$td),
				truSeoDescription           : this.$t.__('Enable our TruSEO score to help you optimize your content for maximum traffic.', this.$td),
				headlineAnalyzer            : this.$t.__('Headline Analyzer', this.$td),
				headlineAnalyzerDescription : this.$t.__('Enable our Headline Analyzer to help you write irresistible headlines and rank better in search results.', this.$td),
				seoAnalysis                 : this.$t.__('SEO Analysis', this.$td),
				postTypeColumns             : this.$t.__('Post Type Columns', this.$td),
				includeAllPostTypes         : this.$t.__('Include All Post Types', this.$td),
				// Translators: 1 - Plugin Short Name ("AIOSEO").
				selectPostTypes             : this.$t.sprintf(this.$t.__('Select which Post Types you want to use the %1$s columns with.', this.$td), process.env.VUE_APP_SHORT_NAME),
				usageTracking               : this.$t.__('Usage Tracking', this.$td),
				adminBarMenu                : this.$t.__('Admin Bar Menu', this.$td),
				// Translators: 1 - Plugin Short Name ("AIOSEO").
				adminBarMenuDescription     : this.$t.sprintf(this.$t.__('This adds %1$s to the admin toolbar for easy access to your SEO settings.', this.$td), process.env.VUE_APP_SHORT_NAME),
				dashboardWidget             : this.$t.__('Dashboard Widget', this.$td),
				dashboardWidgetDescription  : this.$t.__('This displays an SEO News widget on the dashboard.', this.$td),
				announcements               : this.$t.__('Announcements', this.$td),
				announcementsDescription    : this.$t.__('This allows you to hide plugin announcements and update details.', this.$td),
				automaticUpdates            : this.$t.__('Automatic Updates', this.$td),
				all                         : this.$t.__('All (recommended)', this.$td),
				allDescription              : this.$t.__('You are getting the latest features, bugfixes, and security updates as they are released.', this.$td),
				minor                       : this.$t.__('Minor Only', this.$td),
				minorDescription            : this.$t.__('You are getting bugfixes and security updates, but not major features.', this.$td),
				none                        : this.$t.__('None', this.$td),
				noneDescription             : this.$t.__('You will need to manually update everything.', this.$td),
				usageTrackingDescription    : this.$t.__('By allowing us to track usage data we can better help you because we know with which WordPress configurations, themes and plugins we should test.', this.$td),
				// Translators: 1 - Opening HTML link and bold tag, 2 - Closing HTML link and bold tag.
				usageTrackingTooltip        : this.$t.sprintf(this.$t.__('Complete documentation on usage tracking is available %1$shere%2$s.', this.$td), this.$t.sprintf('<strong><a href="%1$s" target="_blank">', this.$links.getDocUrl('usageTracking')), '</a></strong>'),
				// Translators: 1 - The plugin name ("All in One SEO"), 2 - "Learn more".
				adminBarMenuUpsell          : this.$t.sprintf(this.$t.__('This Admin Bar feature is only available for licensed %1$s users. %2$s', this.$td), `<strong>${process.env.VUE_APP_SHORT_NAME} Pro</strong>`, this.$links.getUpsellLink('general-settings-advanced', this.$constants.GLOBAL_STRINGS.learnMore, 'admin-bar-menu', true)),
				// Translators: 1 - The plugin name ("All in One SEO"), 2 - "Learn more".
				dashboardWidgetUpsell       : this.$t.sprintf(this.$t.__('The Dashboard Widget feature is only available for licensed %1$s users. %2$s', this.$td), `<strong>${process.env.VUE_APP_SHORT_NAME} Pro</strong>`, this.$links.getUpsellLink('general-settings-advanced', this.$constants.GLOBAL_STRINGS.learnMore, 'dashboard-widget', true)),
				taxonomyColumns             : this.$t.__('Taxonomy Columns', this.$td),
				includeAllTaxonomies        : this.$t.__('Include All Taxonomies', this.$td),
				// Translators: 1 - Plugin Short Name ("AIOSEO").
				selectTaxonomies            : this.$t.sprintf(this.$t.__('Select which Taxonomies you want to use the %1$s columns with.', this.$td), process.env.VUE_APP_SHORT_NAME),
				// Translators: 1 - The plugin short name name ("AIOSEO"), 2 - "Learn more".
				taxonomyColumnsUpsell       : this.$t.sprintf(this.$t.__('This feature is only for licensed %1$s users. %2$s', this.$td), `<strong>${process.env.VUE_APP_SHORT_NAME} Pro</strong>`, this.$links.getUpsellLink('general-settings-advanced', this.$constants.GLOBAL_STRINGS.learnMore, 'taxonomy-columns', true)),
				// Translators: 1 - Plugin Short Name ("AIOSEO").
				uninstallAioseo             : this.$t.sprintf(this.$t.__('Uninstall %1$s', this.$td), process.env.VUE_APP_SHORT_NAME),
				// Translators: 1 - Plugin Short Name ("AIOSEO").
				uninstallAioseoDescription  : this.$t.sprintf(this.$t.__('Check this if you would like to remove ALL %1$s data upon plugin deletion. All settings and SEO data will be unrecoverable.', this.$td), process.env.VUE_APP_SHORT_NAME)
			}
		}
	},
	computed : {
		...mapGetters([ 'settings', 'isUnlicensed' ]),
		...mapState([ 'options' ]),
		adminBarMenu : {
			get () {
				return !this.isUnlicensed ? this.options.advanced.adminBarMenu : true
			},
			set (newValue) {
				this.options.advanced.adminBarMenu = newValue
			}
		},
		dashboardWidget : {
			get () {
				return !this.isUnlicensed ? this.options.advanced.dashboardWidget : true
			},
			set (newValue) {
				this.options.advanced.dashboardWidget = newValue
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-advanced {
	.inline-upsell {
		display: inline-flex;

		margin-top: 20px;
	}
}
</style>