export const VideoSitemap = {
	data () {
		return {
			strings : {
				customFieldSupport : this.$t.__('Custom Field Support', this.$td),
				exclude            : this.$t.__('Exclude Pages/Posts', this.$td),
				video              : this.$t.__('Video Sitemap', this.$td),
				description        : this.$t.__('The Video Sitemap works in much the same way as the XML Sitemap module, it generates an XML Sitemap specifically for video content on your site. Search engines use this information to display rich snippet information in search results.', this.$td),
				enableSitemap      : this.$t.__('Enable Sitemap', this.$td),
				openSitemap        : this.$t.__('Open Video Sitemap', this.$td),
				noIndexDisplayed   : this.$t.__('Noindexed content will not be displayed in your sitemap.', this.$td),
				doYou404           : this.$t.__('Do you get a blank sitemap or 404 error?', this.$td),
				ctaButtonText      : this.$t.__('Upgrade to Pro and Unlock Video Sitemaps', this.$td),
				ctaHeader          : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Video Sitemaps are only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				),
				thisFeatureRequires : this.$t.__('This feature requires one of the following plans:', this.$td)
			}
		}
	}
}