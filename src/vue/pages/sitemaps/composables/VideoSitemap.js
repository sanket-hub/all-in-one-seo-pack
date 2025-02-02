import { __, sprintf } from '@wordpress/i18n'

const td = import.meta.env.VITE_TEXTDOMAIN

export const useVideoSitemap = () => {
	const strings = {
		customFieldSupport : __('Custom Field Support', td),
		exclude            : __('Exclude Pages/Posts', td),
		video              : __('Video Sitemap', td),
		description        : __('The Video Sitemap works in much the same way as the XML Sitemap module, it generates an XML Sitemap specifically for video content on your site. Search engines use this information to display rich snippet information in search results.', td),
		enableSitemap      : __('Enable Sitemap', td),
		openSitemap        : __('Open Video Sitemap', td),
		noIndexDisplayed   : __('Noindexed content will not be displayed in your sitemap.', td),
		doYou404           : __('Do you get a blank sitemap or 404 error?', td),
		ctaButtonText      : __('Upgrade to Pro and Unlock Video Sitemaps', td),
		ctaHeader          : sprintf(
			// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
			__('Video Sitemaps are only available for licensed %1$s %2$s users.', td),
			import.meta.env.VITE_SHORT_NAME,
			'Pro'
		),
		linksPerSitemap      : __('Links Per Sitemap', td),
		maxLinks             : __('Allows you to specify the maximum number of posts in a sitemap (up to 50,000).', td),
		enableSitemapIndexes : __('Enable Sitemap Indexes', td)
	}

	return {
		strings
	}
}