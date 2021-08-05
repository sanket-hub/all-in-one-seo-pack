<template>
	<div class="aioseo-about-us">

		<div class="aioseo-about-us-welcome">
			<div class="welcome-intro">
				<div>{{ strings.welcome.p1 }}</div>
				<div>{{ strings.welcome.p2 }}</div>
				<div>{{ strings.welcome.p3 }}</div>
				<div>{{ strings.welcome.p4 }}</div>
				<div>{{ strings.welcome.p5 }}</div>
			</div>

			<div class="welcome-image">
				<figure>
					<img src="@/vue/assets/images/about/team.jpg" :alt="strings.welcome.imageCaption"/>
					<figcaption>{{ strings.welcome.imageCaption }}</figcaption>
				</figure>
			</diV>
		</div>

		<div class="aioseo-about-us-plugins">
			<grid-row>
				<grid-column
					sm="12"
					md="6"
					v-for="(plugin, pluginName) in localPlugins"
					:key="pluginName"
					:id="pluginName"
					class="plugin"
				>
					<div class="plugin-main">
						<div>
							<img :src="plugins[pluginName].icon" />
						</div>
						<div>
							<div class="main-name">{{ plugins[pluginName].name }}</div>
							<div>{{ plugins[pluginName].description }}</div>
						</div>
					</div>

					<div class="plugin-footer">
						<div class="footer-status">
							<div class="footer-status-label">{{ strings.plugins.status }}</div>
							<div
								v-if="!plugins[pluginName].installed"
								class="footer-status footer-status-not-installed"
							>
								{{ strings.plugins.statuses.notInstalled }}
							</div>
							<div
								v-if="plugins[pluginName].installed && !plugins[pluginName].activated"
								class="footer-status footer-status-deactivated"
							>
								{{ strings.plugins.statuses.deactivated }}
							</div>
							<div
								v-if="plugins[pluginName].installed && plugins[pluginName].activated"
								class="footer-status footer-status-activated"
							>
								{{ strings.plugins.statuses.activated }}
							</div>
						</div>

						<div class="footer-action">
							<base-button
								v-if="!plugins[pluginName].installed && plugins[pluginName].canInstall"
								type="blue"
								@click="activate(pluginName)"
								:loading="plugins[pluginName].loading"
							>
								{{ strings.plugins.actions.install }}
							</base-button>

							<base-button
								v-if="!plugins[pluginName].installed && !plugins[pluginName].canInstall"
								type="blue"
								tag="a"
								target="_blank"
								:href="plugin.wpLink"
							>
								<svg-external /> {{ strings.plugins.actions.install }}
							</base-button>

							<base-button
								v-if="plugins[pluginName].installed && !plugins[pluginName].activated"
								type="green"
								:disabled="!plugins[pluginName].canActivate"
								@click="activate(pluginName)"
								:loading="plugins[pluginName].loading"
							>
								{{ strings.plugins.actions.activate }}
							</base-button>

							<base-button
								v-if="plugins[pluginName].installed && plugins[pluginName].activated && 0 !== plugin.adminUrl.length"
								type="gray"
								tag="a"
								:href="plugin.adminUrl"
							>
								{{ strings.plugins.actions.manage }}
							</base-button>
						</div>
					</div>
				</grid-column>
			</grid-row>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data () {
		return {
			localPlugins : [],
			strings      : {
				welcome : {
					// Translators: 1 - The plugin name ("All in One SEO"), 2 - Same as previous.
					p1           : this.$t.sprintf(this.$t.__('Welcome to %1$s, the original SEO plugin for WordPress. At %2$s, we build software that helps you rank your website in search results and gain organic traffic.', this.$td), process.env.VUE_APP_NAME, process.env.VUE_APP_NAME),
					p2           : this.$t.__('Over the years, we found that most other WordPress SEO plugins were bloated, buggy, slow, and very hard to use. So we designed our plugin as an easy and powerful tool.', this.$td),
					p3           : this.$t.__('Our goal is to take the pain out of optimizing your website for search engines.', this.$td),
					// Translators: 1 - The plugin name ("All in One SEO"), 2 - Company name ("Awesome Motive").
					p4           : this.$t.sprintf(this.$t.__('%1$s is brought to you by %2$s, the same team that’s behind the largest WordPress resource site, WPBeginner, the most popular lead-generation software, OptinMonster, the best WordPress analytics plugin, MonsterInsights and many more.', this.$td), process.env.VUE_APP_NAME, 'Awesome Motive'),
					p5           : this.$t.__('Yup, we know a thing or two about building awesome products that customers love.', this.$td),
					// Translators: 1 - Company name ("Awesome Motive").
					imageCaption : this.$t.sprintf(this.$t.__('The %1$s Team', this.$td), 'Awesome Motive')
				},
				plugins : {
					actions : {
						install  : this.$t.__('Install Plugin', this.$td),
						activate : this.$t.__('Activate', this.$td),
						manage   : this.$t.__('Manage', this.$td)
					},
					status   : this.$t.__('Status:', this.$td),
					statuses : {
						activated    : this.$t.__('Activated', this.$td),
						deactivated  : this.$t.__('Deactivated', this.$td),
						notInstalled : this.$t.__('Not Installed', this.$td)
					}
				}
			},
			pluginData : {
				optinMonster : {
					name        : 'OptinMonster',
					description : this.$t.__('Our high-converting optin forms like Exit-Intent® popups, Fullscreen Welcome Mats, and Scroll boxes help you dramatically boost conversions and get more email subscribers.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/om.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				wpForms : {
					name        : 'WPForms',
					description : this.$t.__('WPForms allows you to create beautiful contact forms for your site in minutes, not hours!', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/wpforms.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				wpFormsPro : {
					name       : 'WPForms Pro',
					free       : 'wpForms',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				miLite : {
					name        : 'MonsterInsights',
					description : this.$t.__('MonsterInsights makes it “effortless” to properly connect your WordPress site with Google Analytics, so you can start making data-driven decisions to grow your business.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/mi.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				miPro : {
					name       : 'MonsterInsights Pro',
					free       : 'miLite',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				emLite : {
					name        : 'ExactMetrics',
					description : this.$t.__('The ExactMetrics Google Analytics for WordPress plugin helps you properly setup all the powerful Google Analytics tracking features without writing any code or hiring a developer.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/em.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				emPro : {
					name       : 'ExactMetrics Pro',
					free       : 'emLite',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				wpMail : {
					name        : 'WP Mail SMTP',
					description : this.$t.__('Make sure your website\'s emails reach the inbox. Our goal is to make email deliverability easy and reliable. Trusted by over 2 million websites.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/smtp.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				wpMailPro : {
					name       : 'WP Mail SMTP Pro',
					free       : 'wpMail',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				seedProd : {
					name        : 'SeedProd Coming Soon',
					description : this.$t.__('Create a simple Coming Soon Page, Under Construction or Maintenance Mode Page. Work on your site in private while visitors see a “Coming Soon” or “Maintenance Mode” page.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/sp.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				seedProdPro : {
					name       : 'SeedProd Coming Soon Pro',
					free       : 'seedProd',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				trustPulse : {
					name        : 'TrustPulse',
					description : this.$t.__('TrustPulse uses FOMO (Fear of Missing Out) to boost your sales and conversions with social proof notifications. Use it to boost sales on your Woocommerce store, increase signups on your membership site, get more email subscribers, and more.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/tp.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				rafflePress : {
					name        : 'RafflePress',
					description : this.$t.__('Turn your visitors into brand ambassadors! Easily grow your email list, website traffic, and social media followers with powerful viral giveaways & contests.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/rafflepress.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				rafflePressPro : {
					name       : 'RafflePress Pro',
					free       : 'rafflePress',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				facebookFeed : {
					name        : 'Facebook Feed',
					description : this.$t.__('Display completely customizable Facebook feeds of any public Facebook page or Group.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/ff.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				facebookFeedPro : {
					name       : 'Facebook Feed Pro',
					free       : 'facebookFeed',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				instagramFeed : {
					name        : 'Instagram Feed',
					description : this.$t.__('Display beautifully clean, customizable, and responsive Instagram feeds from multiple Instagram accounts.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/if.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				instagramFeedPro : {
					name       : 'Instagram Feed Pro',
					free       : 'instagramFeed',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				twitterFeed : {
					name        : 'Twitter Feed',
					description : this.$t.__('Display completely customizable, responsive and search engine crawlable Twitter feeds on your website.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/tf.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				twitterFeedPro : {
					name       : 'Twitter Feed Pro',
					free       : 'twitterFeed',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				},
				youTubeFeed : {
					name        : 'Feeds for YouTube',
					description : this.$t.__('The Feeds for YouTube plugin allows you to display customizable YouTube feeds from any YouTube channel.', this.$td),
					icon        : require('@/vue/assets/images/about/plugins/yf.png'),
					installed   : false,
					canInstall  : false,
					activated   : false,
					loading     : false
				},
				youTubeFeedPro : {
					name       : 'Feeds for YouTube Pro',
					free       : 'youTubeFeed',
					installed  : false,
					canInstall : false,
					activated  : false,
					loading    : false
				}
			}
		}
	},
	methods : {
		...mapActions([ 'installPlugins' ]),
		activate (pluginName) {
			this.plugins[pluginName].loading = true
			this.installPlugins([
				{
					plugin : pluginName,
					type   : 'plugin'
				}
			]).then((response) => {
				this.plugins[pluginName].loading = false
				if (Object.keys(response.body.completed).length) {
					this.plugins[pluginName].installed = true
					this.plugins[pluginName].activated = true
				}
			})
				.catch(error => {
					this.plugins[pluginName].loading = false
					console.error(`Unable to install ${pluginName}: ${error}`)
				})
		}
	},
	computed : {
		plugins () {
			// Get description and logo for premium versions from free versions.
			Object.keys(this.localPlugins).forEach(pluginName => {
				if (this.pluginData[pluginName].free) {
					this.pluginData[pluginName].description = this.pluginData[this.pluginData[pluginName].free].description
					this.pluginData[pluginName].icon        = this.pluginData[this.pluginData[pluginName].free].icon
				}
			})
			return this.pluginData
		}
	},
	mounted () {
		this.localPlugins = { ...this.$aioseo.plugins }

		// Set installation and activation status for each plugin.
		Object.keys(this.localPlugins).forEach(pluginName => {
			this.pluginData[pluginName].installed   = this.localPlugins[pluginName].installed
			this.pluginData[pluginName].canInstall  = this.localPlugins[pluginName].canInstall
			this.pluginData[pluginName].canActivate = this.localPlugins[pluginName].canActivate
			this.pluginData[pluginName].activated   = this.localPlugins[pluginName].activated
			// Don't render free version if premium version is installed.
			if (this.plugins[pluginName].free) {
				if (this.localPlugins[pluginName].installed) {
					delete this.localPlugins[this.plugins[pluginName].free]
				} else {
					delete this.localPlugins[pluginName]
				}
			}
		})
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-about-us {
	.aioseo-about-us-welcome,
	.aioseo-about-us-plugins {
		margin-top: 30px;
		width: 100%;
	}
	.aioseo-about-us-welcome,
	.aioseo-about-us-plugins .plugin .plugin-main,
	.aioseo-about-us-plugins .plugin .plugin-footer {
		background-color: #fff;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
		border: 1px solid $border;
	}
	.aioseo-about-us-welcome {
		display: flex;
		padding: 40px;
		font-size: 16px;
		color: $black;
		@media only screen and (max-width: 1042px) {
			flex-direction: column;
		}
		.welcome-intro {
			flex: 2 2 auto;
			div {
				margin: 24px 0;
				line-height: 150%;
				&:first-of-type {
					font-size: 18px;
					font-weight: bold;
				}

			}
		}
		.welcome-image {
			text-align: center;
			@media only screen and (max-width: 600px) {
				figure {
					margin: 0;
				}
			}
			img {
				max-width: 100%;
			}
			figcaption {
				margin: 19px 0;
				color: $placeholder-color;
			}
		}
	}
	.aioseo-about-us-plugins {
		.plugin {
			display: flex;
			flex-direction: column;
			font-size: 14px;

			.plugin-main {
				display: flex;
				flex-direction: row;
				padding: 30px 30px 20px;
				flex-grow: 1;

				img {
					margin: 0 30px 0 0;
					max-width: 50px;
					max-height: 50px;
				}

				.main-name {
					margin: 0 0 10px 0;
					font-size: 16px;
					font-weight: bold;
					color: $black;
				}
			}

			.plugin-footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20px 30px 20px 30px;

				.footer-status {
					font-weight: bold;

					div {
						display: inline-block;
						margin-right: 12px;
					}

					.footer-status-label {
						color: $placeholder-color;
					}

					.footer-status-not-installed {
						color: $black2;
					}

					.footer-status-deactivated {
						color: $red;
					}

					.footer-status-activated {
						color: $green;
					}
				}

				.footer-action {
					button,
					a {
						width: fit-content;
						height: fit-content;
						padding: 8px 12px;
						font-size: inherit;
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
	}
}
</style>