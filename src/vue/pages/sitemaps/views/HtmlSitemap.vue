<template>
	<div class="aioseo-html-sitemap">
		<core-card
			slug="htmlSitemap"
		>
			<template #header>
				{{ strings.title }}
			</template>

			<div class="aioseo-settings-row aioseo-section-description">
				{{ strings.description }}
				<span
					v-html="$links.getDocLink($constants.GLOBAL_STRINGS.learnMore, 'htmlSitemap', true)"
				/>
			</div>

			<core-settings-row
				:name="strings.enableSitemap"
			>
				<template #content>
					<base-toggle
						v-model="options.sitemap.html.enable"
					/>
				</template>
			</core-settings-row>

			<html-sitemap-display-info
				v-if="options.sitemap.html.enable"
				:label="strings.displayLabel"
				:displayOptions="displayOptions"
				:url="options.sitemap.html.pageUrl"
			/>
		</core-card>

		<core-card
			class="aioseo-html-sitemap-settings"
			v-if="options.sitemap.html.enable"
			slug="htmlSitemapSettings"
		>
			<template #header>
				{{ strings.settings }}
			</template>

			<core-settings-row
				:name="strings.postTypes"
			>
				<template #content>
					<base-checkbox
						size="medium"
						v-model="options.sitemap.html.postTypes.all"
					>
						{{ strings.includeAllPostTypes }}
					</base-checkbox>

					<core-post-type-options
						v-if="!options.sitemap.html.postTypes.all"
						:options="options.sitemap.html"
						type="postTypes"
						:excluded="[ 'attachment' ]"
					/>

					<div class="aioseo-description">
						{{ strings.selectPostTypes }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.taxonomies"
			>
				<template #content>
					<base-checkbox
						size="medium"
						v-model="options.sitemap.html.taxonomies.all"
					>
						{{ strings.includeAllTaxonomies }}
					</base-checkbox>

					<core-post-type-options
						v-if="!options.sitemap.html.taxonomies.all"
						:options="options.sitemap.html"
						type="taxonomies"
					/>

					<div class="aioseo-description">
						{{ strings.selectTaxonomies }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.sortOrder"
				class="aioseo-sort-order"
			>
				<template #content>
					<base-select
						size="medium"
						:options="sortOrders"
						:value="getSortOrder(options.sitemap.html.sortOrder)"
						@input="value => options.sitemap.html.sortOrder = value.value"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.sortDirection"
				class="aioseo-sort-direction"
			>
				<template #content>
					<base-select
						size="medium"
						:options="sortDirections"
						:value="getSortDirection(options.sitemap.html.sortDirection)"
						@input="value => options.sitemap.html.sortDirection = value.value"
					/>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.publicationDate"
			>
				<template #content>
					<base-radio-toggle
						v-model="options.sitemap.html.publicationDate"
						name="publicationDate"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.hide, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.show, value: true }
						]"
					/>

					<div class="aioseo-description">
						{{ strings.publicationDateDescription }}
					</div>
				</template>
			</core-settings-row>

			<core-settings-row
				:name="strings.compactArchives"
			>
				<template #content>
					<base-radio-toggle
						v-model="options.sitemap.html.compactArchives"
						name="compactArchives"
						:options="[
							{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
							{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
						]"
					/>

					<div class="aioseo-description" v-html="strings.compactArchivesDescription"/>
				</template>
			</core-settings-row>
		</core-card>

		<core-card
			slug="htmlSitemapAdvancedSettings"
			v-if="options.sitemap.html.enable"
			:toggles="options.sitemap.html.advancedSettings.enable"
		>
			<template #header>
				<base-toggle
					v-model="options.sitemap.html.advancedSettings.enable"
				/>

				{{ strings.advancedSettings }}
			</template>

			<div
				v-if="options.sitemap.html.advancedSettings.enable"
			>
				<!-- <core-settings-row
					:name="strings.nofollowLinks"
				>
					<template #content>
						<base-radio-toggle
							v-model="options.sitemap.html.advancedSettings.nofollowLinks"
							name="nofollow"
							:options="[
								{ label: $constants.GLOBAL_STRINGS.disabled, value: false, activeClass: 'dark' },
								{ label: $constants.GLOBAL_STRINGS.enabled, value: true }
							]"
						/>
					</template>
				</core-settings-row> -->

				<core-settings-row
					:name="strings.excludePostsPages"
					class="aioseo-exclude-pages-posts"
				>
					<template #content>
						<core-exclude-posts
							:options="options.sitemap.html.advancedSettings"
							type="posts"
						/>
					</template>
				</core-settings-row>

				<core-settings-row
					:name="strings.excludeTerms"
					class="aioseo-exclude-terms"
				>
					<template #content>
						<core-exclude-posts
							:options="options.sitemap.html.advancedSettings"
							type="terms"
						/>
					</template>
				</core-settings-row>
			</div>
		</core-card>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data () {
		return {
			sortOrders : [
				{ label: this.$t.__('Publish Date', this.$td), value: 'publish_date' },
				{ label: this.$t.__('Last Updated Date', this.$td), value: 'last_updated' },
				{ label: this.$t.__('Alphabetical', this.$td), value: 'alphabetical' },
				{ label: this.$t.__('Post/Term ID', this.$td), value: 'id' }
			],
			sortDirections : [
				{ label: this.$t.__('Ascending', this.$td), value: 'asc' },
				{ label: this.$t.__('Descending', this.$td), value: 'desc' }
			],
			displayOptions : {
				extra : {
					desc : this.$t.__('Display the sitemap on a dedicated page:', this.$td)
				},
				block : {
					copy : '',
					desc : this.$t.sprintf(
						// Translators: 1 - Opening HTML strong tag, 2 - The plugin short name ("AIOSEO"), 3 - Closing HTML strong tag.
						this.$t.__('To add this block, edit a page or post and search for the %1$s"%2$s - HTML Sitemap"%3$s block.', this.$td),
						'<strong>',
						process.env.VUE_APP_SHORT_NAME,
						'</strong>'
					)
				},
				shortcode : {
					copy : '[aioseo_html_sitemap]',
					desc : this.$t.sprintf(
						// Translators: 1 - Learn more link.
						this.$t.__('Use the following shortcode to display the HTML Sitemap. %1$s', this.$td),
						this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'htmlSitemapShortcode', true)
					)
				},
				widget : {
					copy : '',
					desc : this.$t.sprintf(
						// Translators: 1 - Opening HTML link tag, 2 - Closing HTML link tag, 3 - Opening HTML strong tag, 4 - The plugin short name ("AIOSEO"), 5 - Closing HTML strong tag, 6 - "Learn More" link.
						this.$t.__('To add this widget, visit the %1$swidgets page%2$s and look for the %3$s"%4$s - HTML Sitemap"%5$s widget.', this.$td),
						`<a href="${this.$aioseo.urls.admin.widgets}" target="_blank">`, '</a>',
						'<strong>',
						process.env.VUE_APP_SHORT_NAME,
						'</strong>'
					)
				},
				php : {
					copy : '<?php if( function_exists( \'aioseo_html_sitemap\' ) ) aioseo_html_sitemap(); ?>',
					desc : this.$t.sprintf(
						// Translators: 1 - Learn more link.
						this.$t.__('Use the following PHP code anywhere in your theme to display the sitemap. %1$s', this.$td),
						this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'htmlSitemapFunction', true)
					)
				}
			},
			strings : {
				title                      : this.$t.__('HTML Sitemap', this.$td),
				enableSitemap              : this.$t.__('Enable Sitemap', this.$td),
				settings                   : this.$t.__('HTML Sitemap Settings', this.$td),
				description                : this.$t.sprintf(this.$t.__('Using the custom-built tools below, you can add an HTML sitemap to your website and help visitors discover all your content. Adding an HTML sitemap to your website may also help search engines find your content more easily.', this.$td), process.env.VUE_APP_NAME),
				displayLabel               : this.$t.__('Display HTML Sitemap', this.$td),
				postTypes                  : this.$t.__('Post Types', this.$td),
				taxonomies                 : this.$t.__('Taxonomies', this.$td),
				includeAllPostTypes        : this.$t.__('Include All Post Types', this.$td),
				selectPostTypes            : this.$t.__('Select which Post Types appear in your sitemap.', this.$td),
				includeAllTaxonomies       : this.$t.__('Include All Taxonomies', this.$td),
				selectTaxonomies           : this.$t.__('Select which Taxonomies appear in your sitemap.', this.$td),
				sortOrder                  : this.$t.__('Sort Order', this.$td),
				sortDirection              : this.$t.__('Sort Direction', this.$td),
				publicationDate            : this.$t.__('Publication Date', this.$td),
				publicationDateDescription : this.$t.__('This setting only applies to posts and pages.', this.$td),
				compactArchives            : this.$t.__('Compact Archives', this.$td),
				compactArchivesDescription : this.$t.sprintf(
					// Translators: 1 - "Learn More" link.
					this.$t.__('This setting allows you to toggle between the regular sitemap or the compact date archive sitemap. %1$s', this.$td),
					this.$links.getDocLink(this.$constants.GLOBAL_STRINGS.learnMore, 'htmlSitemapCompactArchives', true)
				),
				advancedSettings  : this.$t.__('Advanced Settings', this.$td),
				// nofollowLinks              : this.$t.__('No Follow Links', this.$td),
				excludePostsPages : this.$t.__('Exclude Posts / Pages', this.$td),
				excludeTerms      : this.$t.__('Exclude Terms', this.$td)
			}
		}
	},
	computed : {
		...mapState([ 'options', 'internalOptions' ])
	},
	methods : {
		getSortOrder (option) {
			return this.sortOrders.find(o => o.value === option)
		},
		getSortDirection (option) {
			return this.sortDirections.find(o => o.value === option)
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-html-sitemap {
	.aioseo-html-sitemap-settings .aioseo-select.medium {
		max-width: 300px;
	}
}
</style>