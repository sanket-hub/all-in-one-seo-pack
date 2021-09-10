<template>
	<div class="aioseo-getting-started">
		<core-getting-started
			v-if="$allowed('aioseo_setup_wizard')"
			disable-close
		/>

		<cta
			v-if="!$isPro"
			class="aioseo-getting-started-cta"
			:type="2"
			:floating="false"
			:button-text="strings.cta.button"
			:cta-link="$links.utmUrl('getting-started', 'main-cta')"
			:learn-more-link="$links.getUpsellUrl('getting-started', 'main-cta', 'home')"
			:feature-list="strings.cta.features"
			:showLink="false"
		>
			<template slot="header-text">
				{{ strings.cta.header }}
			</template>

			<template slot="description">
				{{ upgradeToday }}
			</template>

			<template #featured-image>
				<img src="@/vue/assets/images/upsells/news-sitemap.png" />
			</template>
		</cta>

		<!--div class="aioseo-getting-started-videos">
			<grid-row class="header">
				<grid-column
					class="header-title"
					sm="6"
					md="6"
				>
					{{ strings.videos.title }}
				</grid-column>

				<grid-column
					class="header-link"
					sm="6"
					md="6"
				>
					<a
						:href="strings.videos.linkUrl"
						target="_blank"
					>
						{{ strings.videos.linkText }} →
					</a>
				</grid-column>
			</grid-row>

			<grid-row class="videos">
				<grid-column
					sm="12"
					md="6"
					v-for="(video, index) in videos"
					:key="index"
				>
					<a
						class="video"
						target="_blank"
						:href="video.url"
						:title="video.title"
					>
						<img src="@/vue/assets/images/about/thumbnail.jpg" />
						<div>{{ video.title }}</div>
					</a>
				</grid-column>
			</grid-row>
		</div-->

		<div class="aioseo-getting-started-documentation">
			<grid-row class="header">
				<grid-column
					class="header-title"
					sm="6"
					md="6"
				>
					{{ strings.documentation.title }}
				</grid-column>

				<grid-column
					sm="6"
					md="6"
					class="header-link"
				>
					<a
						:href="strings.documentation.linkUrl"
						target="_blank"
					>
						{{ strings.documentation.linkText }} →
					</a>
				</grid-column>
			</grid-row>

			<grid-row class="docs">
				<grid-column
					class="doc"
					v-for="(doc, index) in docs"
					:key="index"
					sm="12"
					md="6"
				>
					<div class="d-flex">
						<svg-book/>
						<a
							:href="doc.url"
							target="_blank"
						>
							{{ doc.title }}
						</a>
					</div>
				</grid-column>
			</grid-row>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			strings : {
				cta : {
					// Translators: 1 - The plugin short name ("AIOSEO"), 2 - "Pro" string.
					title    : this.$t.sprintf(this.$t.__('Get %1$s %2$s and Unlock all the Powerful Features', this.$td), process.env.VUE_APP_SHORT_NAME, this.$t.__('Pro', this.$td)),
					// Translators: 1 - The plugin short name ("AIOSEO"), 2 - "Pro" string.
					header   : this.$t.sprintf(this.$t.__('Get %1$s %2$s and Unlock all the Powerful Features.', this.$td), process.env.VUE_APP_SHORT_NAME, this.$t.__('Pro', this.$td)),
					// Translators: 1 - "Pro".
					button   : this.$t.sprintf(this.$t.__('Upgrade to %1$s Today', this.$td), 'Pro'),
					features : [
						this.$t.__('Smart Schema', this.$td),
						this.$t.__('Local SEO', this.$td),
						this.$t.__('Advanced support for e-commerce', this.$td),
						this.$t.__('Video SEO Module', this.$td),
						this.$t.__('SEO for Categories, Tags and Custom Taxonomies', this.$td),
						this.$t.__('Social Meta for Categories, Tags and Custom Taxonomies', this.$td),
						this.$t.__('Advanced Google Analytics tracking', this.$td),
						this.$t.__('Greater control over display settings', this.$td),
						this.$t.__('Ad free (no banner adverts)', this.$td)
					]
				},
				videos : {
					title    : this.$t.__('Video Tutorials', this.$td),
					linkText : this.$t.__('View all video tutorials', this.$td),
					linkUrl  : 'https://changeme'
				},
				documentation : {
					// Translators: 1 - The plugin short name ("AIOSEO").
					title    : this.$t.sprintf(this.$t.__('%1$s Documentation', this.$td), process.env.VUE_APP_SHORT_NAME),
					linkText : this.$t.__('See our full documentation', this.$td),
					linkUrl  : this.$links.getDocUrl('home')
				}
			},
			videos : {
				video1 : {
					title : this.$t.__('Basic Guide to Google Analytics', this.$td),
					url   : 'https://changeme'
				},
				video2 : {
					title : this.$t.__('Basic Guide to Google Search Console', this.$td),
					url   : 'https://changeme'
				},
				video3 : {
					title : this.$t.__('Best Practices for Domains and URLs', this.$td),
					url   : 'https://changeme'
				},
				video4 : {
					title : this.$t.__('How to Control Search Results', this.$td),
					url   : 'https://changeme'
				},
				video5 : {
					// Translators: 1 - The plugin short name ("AIOSEO Pro"), 2 - "Pro" string.
					title : this.$t.sprintf(this.$t.__('Installing %1$s %2$s', this.$td), process.env.VUE_APP_SHORT_NAME, this.$t.__('Pro', this.$td)),
					url   : 'https://changeme'
				},
				video6 : {
					title : this.$t.__('Optimizing your Content Headings', this.$td),
					url   : 'https://changeme'
				}
			},
			docs : {
				doc1 : {
					title : 'How do I get Google to show sitelinks for my site?',
					url   : this.$links.getDocUrl('showSitelinks')
				},
				doc2 : {
					title : 'How do I use your API code examples?',
					url   : this.$links.getDocUrl('apiCodeExamples')
				},
				doc3 : {
					title : 'What are media attachments and should I submit them to search engines?',
					url   : this.$links.getDocUrl('whatAreMediaAttachments')
				},
				doc4 : {
					title : 'When to use NOINDEX or the robots.txt?',
					url   : this.$links.getDocUrl('whenToUseNoindex')
				},
				doc5 : {
					title : 'How do I troubleshoot issues with AIOSEO?',
					url   : this.$links.getDocUrl('troubleshootIssues')
				},
				doc6 : {
					title : 'How does the import process for SEO data work?',
					url   : this.$links.getDocUrl('importProcessSeoData')
				},
				doc7 : {
					title : 'Installation instructions for AIOSEO Pro',
					url   : this.$links.getDocUrl('installAioseoPro')
				},
				doc8 : {
					title : 'What are the minimum requirements for All in One SEO?',
					url   : this.$links.getDocUrl('minimumRequirements')
				}
			}
		}
	},
	computed : {
		upgradeToday () {
			// Translators: 1 - Plugin short name ("AIOSEO"), 2 "Pro".
			return this.$t.sprintf(this.$t.__('%1$s %2$s comes with many additional features to help take your site\'s SEO to the next level!', this.$td), process.env.VUE_APP_SHORT_NAME, 'Pro')
		}
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-getting-started {
	.aioseo-getting-started-cta,
	.aioseo-getting-started-videos,
	.aioseo-getting-started-documentation {
		margin-top: 30px;
		background: #fff;
		width: 100%;
		padding: 40px;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
		border: 1px solid $border;
		color: $black;
		a {
			text-decoration: none;
		}
	}
	.aioseo-getting-started-videos,
	.aioseo-getting-started-documentation {
		.header {
			align-items: center;
			font-weight: bold;
			.header-title {
				font-size: 24px;
			}
			.header-link {
				// This is needed to override the text-align value of the grid row.
				display: flex;
				justify-content: flex-end;
				a {
					text-decoration: underline;
					color: $blue;
				}
				@media screen and (max-width: 782px) {
					justify-content: start !important;
				}
			}
		}
		.videos,
		.docs {
			margin: 32px 0;
			font-weight: bold;
			font-size: 16px;
			color: $black;
		}
	}
	.aioseo-getting-started-videos {
		.videos {
			div {
				padding: 5px 16px 5px 0;
			}
			.video {
				display: flex;
				align-items: center;
				padding: 16px;
				background-color: $box-background;
				color: $black;
				img {
					flex: 1 1 auto;
					max-width: 180px;
					max-height: 100px;
				}
				div {
					flex: 2 2 auto;
					margin: 0 0 0 30px;
				}
				@media screen and (max-width: 520px) {
					flex-direction: column;
					img {
						margin: 0 0 10px 0;
						max-width: 100%;
					}
					div {
						margin: 0;
						text-align: center;
					}
				}
			}
		}
	}
	.aioseo-getting-started-documentation {
		.docs {
			.d-flex {
				align-items: flex-start;
			}
			.doc {
				svg {
					margin: 0 5px 0 0;
					width: 18px;
					min-width: 18px;
					min-height: 20px;
					color: $blue;
				}
				a {
					color: $black;
				}
			}
		}
	}
}
</style>