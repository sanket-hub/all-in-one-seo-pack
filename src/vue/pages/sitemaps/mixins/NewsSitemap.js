export const NewsSitemap = {
	data () {
		return {
			strings : {
				news               : this.$t.__('News Sitemap', this.$td),
				setPublicationName : this.$t.__('Set Publication Name', this.$td),
				exclude            : this.$t.__('Exclude Pages/Posts', this.$td),
				description        : this.$t.__('Our Google News Sitemap lets you control which content you submit to Google News and only contains articles that were published in the last 48 hours. In order to submit a News Sitemap to Google, you must have added your site to Google’s Publisher Center and had it approved.', this.$td),
				enableSitemap      : this.$t.__('Enable Sitemap', this.$td),
				openSitemap        : this.$t.__('Open News Sitemap', this.$td),
				noIndexDisplayed   : this.$t.__('Noindexed content will not be displayed in your sitemap.', this.$td),
				doYou404           : this.$t.__('Do you get a blank sitemap or 404 error?', this.$td),
				ctaButtonText      : this.$t.__('Upgrade to Pro and Unlock News Sitemaps', this.$td),
				ctaHeader          : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('News Sitemaps are only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				)
			}
		}
	}
}