<template>
	<div class="aioseo-dashboard">
		<core-main
			:page-name="strings.pageName"
			:show-tabs="false"
			:show-save-button="false"
		>
			<div>
				<div
					v-if="settings.showSetupWizard && $allowed('aioseo_setup_wizard')"
					class="dashboard-getting-started"
				>
					<core-getting-started />
				</div>

				<grid-row>
					<grid-column
						md="6"
					>
						<core-card
							slug="dashboardSeoSiteScore"
							:header-text="strings.seoSiteScore"
						>
							<core-seo-site-score />
						</core-card>

						<grid-row v-if="quickLinks.length > 0">
							<grid-column>
								<div class="aioseo-quicklinks-title">
									{{ strings.quicklinks }}

									<core-tooltip>
										<svg-circle-question-mark />

										<template #tooltip>
											{{ strings.quicklinksTooltip }}
										</template>
									</core-tooltip>
								</div>
							</grid-column>

							<grid-column
								v-for="(link, index) in quickLinks"
								:key="index"
								lg="6"
								class="aioseo-quicklinks-cards"
							>
								<core-feature-card
									:feature="link"
									:can-activate="false"
									:can-manage="$allowed(link.access)"
									static-card
								>
									<template #title>
										<component
											:is="link.icon"
										/>
										{{ link.name }}
									</template>

									<template #description>
										{{ link.description }}
									</template>
								</core-feature-card>
							</grid-column>
						</grid-row>
					</grid-column>

					<grid-column
						md="6"
					>
						<core-card
							class="dashboard-notifications"
							slug="dashboardNotifications"
						>
							<template #header>
								<div
									class="notifications-count"
									v-if="notificationsCount"
								>
									({{ notificationsCount }})
								</div>
								<div>{{ notificationTitle }}</div>

								<a
									class="show-dismissed-notifications"
									v-if="dismissed"
									href="#"
									@click.prevent="dismissed = false"
								>{{ strings.activeNotifications }}</a>
							</template>

							<core-notification-cards
								:notifications="filteredNotifications"
								:dismissedCount="dismissedNotificationsCount"
								@toggle-dismissed="dismissed = !dismissed"
							>
								<template #no-notifications>
									<div class="no-dashboard-notifications">
										<div>
											{{ strings.noNewNotificationsThisMoment }}
										</div>
										<a
											v-if="dismissedNotificationsCount"
											href="#"
											@click.prevent="dismissed = true"
										>{{ strings.seeAllDismissedNotifications }}</a>
									</div>
								</template>
							</core-notification-cards>

							<div
								v-if="filteredNotifications.length && (!dismissed || 3 < filteredNotifications.length)"
								class="notification-footer"
							>
								<div class="more-notifications">
									<template
										v-if="notifications.length > visibleNotifications"
									>
										<a href="#" @click.stop.prevent="toggleNotifications">{{ moreNotifications }}</a>
										<a href="#" @click.stop.prevent="toggleNotifications" class="no-underline">&rarr;</a>
									</template>
								</div>

								<div
									v-if="!dismissed"
									class="dismiss-all"
								>
									<a
										v-if="notifications.length"
										href="#"
										class="dismiss"
										@click.stop.prevent="processDismissAllNotifications"
									>{{ strings.dismissAll }}</a>
								</div>
							</div>
						</core-card>

						<core-card
							class="dashboard-support"
							slug="dashboardSupport"
							:header-text="strings.support"
						>
							<div
								v-for="(option, index) in supportOptions"
								:key="index"
								class="aioseo-settings-row"
							>
								<a
									:href="option.link"
									:target="option.blank ? '_blank' : null"
								>
									<component
										:is="option.icon"
									/>
									{{ option.text }}
								</a>
							</div>
						</core-card>

						<cta
							v-if="isUnlicensed"
							class="dashboard-cta"
							:type="3"
							:floating="false"
							:cta-link="$links.utmUrl('dashboard-cta')"
							:feature-list="[
								strings.smartSchema,
								strings.localSeo,
								strings.advancedSupportForEcommerce,
								strings.advancedGATracking,
								strings.videoSeoModule,
								strings.greaterControlOverDisplay,
								strings.seoForCats,
								strings.socialMetaCats,
								strings.adFree
							]"
							:button-text="strings.ctaButton"
							:learn-more-link="$links.getUpsellUrl('dashboard-cta', null, 'home')"
						>
							<template #header-text>
								{{ strings.ctaHeaderText }}
							</template>
						</cta>
					</grid-column>
				</grid-row>
			</div>
		</core-main>
	</div>
</template>

<script>
import { Notifications } from '@/vue/mixins'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
	mixins : [ Notifications ],
	data () {
		return {
			dismissed            : false,
			visibleNotifications : 3,
			strings              : {
				smartSchema                  : this.$t.__('Smart Schema', this.$td),
				localSeo                     : this.$t.__('Local SEO', this.$td),
				advancedSupportForEcommerce  : this.$t.__('Advanced support for e-commerce', this.$td),
				advancedGATracking           : this.$t.__('Advanced Google Analytics tracking', this.$td),
				videoSeoModule               : this.$t.__('Video SEO Module', this.$td),
				greaterControlOverDisplay    : this.$t.__('Greater control over display settings', this.$td),
				seoForCats                   : this.$t.__('SEO for Categories, Tags and Custom Taxonomies', this.$td),
				socialMetaCats               : this.$t.__('Social meta for Categories, Tags and Custom Taxonomies', this.$td),
				adFree                       : this.$t.__('Ad free (no banner adverts)', this.$td),
				pageName                     : this.$t.__('Dashboard', this.$td),
				noNewNotificationsThisMoment : this.$t.__('There are no new notifications at this moment.', this.$td),
				seeAllDismissedNotifications : this.$t.__('See all dismissed notifications.', this.$td),
				seoSiteScore                 : this.$t.__('SEO Site Score', this.$td),
				support                      : this.$t.__('Support', this.$td),
				// Translators: 1 - The plugin name ("All in One SEO").
				readSeoUserGuide             : this.$t.sprintf(this.$t.__('Read the %1$s user guide', this.$td), process.env.VUE_APP_NAME),
				accessPremiumSupport         : this.$t.__('Access our Premium Support', this.$td),
				viewChangelog                : this.$t.__('View the Changelog', this.$td),
				watchVideoTutorials          : this.$t.__('Watch video tutorials', this.$td),
				gettingStarted               : this.$t.__('Getting started? Read the Beginners Guide', this.$td),
				quicklinks                   : this.$t.__('Quicklinks', this.$td),
				quicklinksTooltip            : this.$t.__('You can use these quicklinks to quickly access our settings pages to adjust your site\'s SEO settings.', this.$td),
				searchAppearance             : this.$t.__('Search Appearance', this.$td),
				manageSearchAppearance       : this.$t.__('Configure how your website content will look in Google, Bing and other search engines.', this.$td),
				seoAnalysis                  : this.$t.__('SEO Analysis', this.$td),
				manageSeoAnalysis            : this.$t.__('Check how your site scores with our SEO analyzer and compare against your competitor\'s site.', this.$td),
				manageLocalSeo               : this.$t.__('Improve local SEO rankings with schema for business address, open hours, contact, and more.', this.$td),
				socialNetworks               : this.$t.__('Social Networks', this.$td),
				manageSocialNetworks         : this.$t.__('Setup Open Graph for Facebook, Twitter, etc. to show the right content / thumbnail preview.', this.$td),
				tools                        : this.$t.__('Tools', this.$td),
				manageTools                  : this.$t.__('Fine-tune your site with our powerful tools including Robots.txt editor, import/export and more.', this.$td),
				sitemap                      : this.$t.__('Sitemaps', this.$td),
				manageSitemap                : this.$t.__('Manage all of your sitemap settings, including XML, Video, News and more.', this.$td),
				// Translators: 1 - The plugin short name ("AIOSEO"), 2 - "Pro".
				ctaHeaderText                : this.$t.sprintf(this.$t.__('Get more features in %1$s %2$s:', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro'),
				// Translators: 1 - "Pro", 2 - A percentage ("50%").
				ctaButton                    : this.$t.sprintf(this.$t.__('Upgrade to %1$s and Save %2$s', this.$td), 'Pro', '50%'),
				dismissAll                   : this.$t.__('Dismiss All', this.$td),
				relaunchSetupWizard          : this.$t.__('Relaunch Setup Wizard', this.$td)
			}
		}
	},
	computed : {
		...mapGetters([ 'isUnlicensed' ]),
		...mapState([ 'settings' ]),
		moreNotifications () {
			// Translators: 1 - A number representing the remaining notifications.
			return this.$t.sprintf(this.$t.__('You have %1$s more notifications', this.$td), this.remainingNotificationsCount)
		},
		remainingNotificationsCount () {
			return this.notifications.length - this.visibleNotifications
		},
		filteredNotifications () {
			const notifications = [ ...this.notifications ]
			return notifications.splice(0, this.visibleNotifications)
		},
		supportOptions () {
			const options = [
				{ icon: 'svg-book', text: this.strings.readSeoUserGuide, link: this.$links.utmUrl('dashboard-support-box', 'user-guide', 'doc-categories/getting-started/'), blank: true },
				{ icon: 'svg-message', text: this.strings.accessPremiumSupport, link: this.$links.utmUrl('dashboard-support-box', 'premium-support', 'contact/'), blank: true },
				{ icon: 'svg-history', text: this.strings.viewChangelog, link: this.$links.utmUrl('dashboard-support-box', 'changelog', 'changelog/'), blank: true },
				// { icon: 'svg-video-camera', text: this.strings.watchVideoTutorials, link: this.$links.utmUrl('dashboard-support-box', 'video-tutorials', 'doc-type/videos/'), blank: true },
				{ icon: 'svg-book', text: this.strings.gettingStarted, link: this.$links.utmUrl('dashboard-support-box', 'beginners-guide', 'docs/quick-start-guide/'), blank: true }
			]

			if (!this.$allowed('aioseo_setup_wizard')) {
				return options
			}

			return this.settings.showSetupWizard
				? options
				: options.concat({
					icon  : 'svg-rocket',
					text  : this.strings.relaunchSetupWizard,
					link  : this.$aioseo.urls.aio.wizard,
					blank : false
				})
		},
		quickLinks () {
			return [
				{
					icon        : 'svg-title-and-meta',
					description : this.strings.manageSearchAppearance,
					name        : this.strings.searchAppearance,
					manageUrl   : this.$aioseo.urls.aio.searchAppearance,
					access      : 'aioseo_search_appearance_settings'
				},
				{
					icon        : 'svg-clipboard-checkmark',
					description : this.strings.manageSeoAnalysis,
					name        : this.strings.seoAnalysis,
					manageUrl   : this.$aioseo.urls.aio.seoAnalysis,
					access      : 'aioseo_seo_analysis_settings'
				},
				{
					icon        : 'svg-location-pin',
					description : this.strings.manageLocalSeo,
					name        : this.strings.localSeo,
					manageUrl   : this.$aioseo.urls.aio.localSeo,
					access      : 'aioseo_local_seo_settings'
				},
				{
					icon        : 'svg-share',
					description : this.strings.manageSocialNetworks,
					name        : this.strings.socialNetworks,
					manageUrl   : this.$aioseo.urls.aio.socialNetworks,
					access      : 'aioseo_social_networks_settings'
				},
				{
					icon        : 'svg-build',
					description : this.strings.manageTools,
					name        : this.strings.tools,
					manageUrl   : this.$aioseo.urls.aio.tools,
					access      : 'aioseo_tools_settings'
				},
				{
					icon        : 'svg-sitemaps-pro',
					description : this.strings.manageSitemap,
					name        : this.strings.sitemap,
					manageUrl   : this.$aioseo.urls.aio.sitemaps,
					access      : 'aioseo_sitemap_settings'
				}
			].filter(link => this.$allowed(link.access))
		}
	},
	methods : {
		...mapActions([ 'dismissNotifications' ]),
		processDismissAllNotifications () {
			const slugs = []
			this.notifications.forEach(notification => {
				slugs.push(notification.slug)
			})
			this.dismissNotifications(slugs)
		}
	}
}
</script>

<style lang="scss">
.aioseo-dashboard {
	.dashboard-getting-started {
		padding-top: 1px;
		margin-bottom: 20px;

		> div {
			margin-top: 19px;
		}
	}

	.aioseo-card {
		margin: 10px 0 20px;
	}

	.dashboard-notifications {
		.notifications-count {
			margin-right: 5px;

			&+ div {
				flex: 1;
			}
		}

		.no-dashboard-notifications {
			padding-top: 0;
			font-size: 16px;
			color: $black;
			text-align: center;

			> div {
				font-weight: 600;
				margin-bottom: 10px;
			}

			a {
				color: $black2;
				font-size: 14px;
			}
		}

		.show-dismissed-notifications {
			margin: 0 5px;
			font-size: 16px;
			color: $black2;
		}

		.aioseo-notification-cards {
			.aioseo-notification {
				&:last-child {
					> div {
						padding-bottom: 0;
					}
				}
			}
		}

		.notification-footer {
			margin-top: 10px;
			padding-top: 20px;
			border-top: 1px solid $border;
			display: flex;

			.more-notifications {
				flex: 1;

				a {
					margin-right: 5px;
					font-weight: 600;
					font-size: 14px;
				}
			}

			a.dismiss {
				color: $placeholder-color;
				font-size: 14px;
			}
		}
	}

	.dashboard-support {
		.aioseo-settings-row {
			margin-bottom: 25px;
			padding-bottom: 25px;

			a {
				display: flex;
				align-items: center;
				font-size: 16px;
				font-weight: 600;
				color: $black;
				text-decoration: none;

				&:hover {
					color: $blue;
				}
			}

			svg {
				color: $blue;
				width: 24px;
				height: 24px;
				margin: -5px 10px 0 0;
			}
		}
	}

	.aioseo-quicklinks-title {
		font-size: 18px;
		color: $black;
		font-weight: 600;
		display: flex;
		align-items: center;

		svg {
			width: 16px;
			height: 16px;
			color: $placeholder-color;
		}
	}

	.aioseo-quicklinks-cards {
		.aioseo-feature-card {
			.feature-card-header {
				font-size: 16px;
			}

			.feature-card-description {
				font-size: 14px;

				.learn-more {
					font-size: 16px;
				}
			}
		}
	}

	.dashboard-cta {
		margin-top: 20px;
	}
}
</style>