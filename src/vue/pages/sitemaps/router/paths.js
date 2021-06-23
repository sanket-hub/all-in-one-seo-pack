import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "sitemaps-[request]" */ '@/vue/pages/sitemaps/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/general-sitemap'
	},
	{
		path      : '/general-sitemap',
		name      : 'general-sitemap',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_sitemap_settings',
			name   : __('General Sitemap', td)
		}
	},
	{
		path      : '/video-sitemap',
		name      : 'video-sitemap',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_sitemap_settings',
			name   : __('Video Sitemap', td),
			pro    : true
		}
	},
	{
		path      : '/news-sitemap',
		name      : 'news-sitemap',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_sitemap_settings',
			name   : __('News Sitemap', td),
			pro    : true
		}
	},
	{
		path      : '/rss-sitemap',
		name      : 'rss-sitemap',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_sitemap_settings',
			name   : __('RSS Sitemap', td)
		}
	}
	// {
	//  path      : '/html-sitemap',
	//  name      : 'html-sitemap',
	//  component : loadView('Main'),
	//  meta      : {
	//      access : 'aioseo_sitemap_settings',
	//      name   : __('HTML Sitemap', td)
	//  }
	// }
]