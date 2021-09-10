import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "search-appearance-[request]" */ '@/vue/pages/search-appearance/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/global-settings'
	},
	{
		path      : '/global-settings',
		name      : 'global-settings',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_search_appearance_settings',
			name   : __('Global Settings', td)
		}
	},
	{
		path      : '/content-types',
		name      : 'content-types',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_search_appearance_settings',
			name   : __('Content Types', td)
		}
	},
	{
		path      : '/taxonomies',
		name      : 'taxonomies',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_search_appearance_settings',
			name   : __('Taxonomies', td)
		}
	},
	{
		path      : '/media',
		name      : 'media',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_search_appearance_settings',
			name   : __('Image SEO', td)
		}
	},
	{
		path      : '/archives',
		name      : 'archives',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_search_appearance_settings',
			name   : __('Archives', td)
		}
	},
	{
		path      : '/advanced',
		name      : 'advanced',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_search_appearance_settings',
			name   : __('Advanced', td)
		}
	}
]