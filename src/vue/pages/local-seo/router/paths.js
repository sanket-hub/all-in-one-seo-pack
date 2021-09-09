import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "local-seo-[request]" */ '@/vue/pages/local-seo/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/locations'
	},
	{
		path      : '/locations',
		name      : 'locations',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_local_seo_settings',
			name   : __('Locations', td)
		}
	},
	{
		path      : '/opening-hours',
		name      : 'opening-hours',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_local_seo_settings',
			name   : __('Opening Hours', td)
		}
	},
	{
		path      : '/maps',
		name      : 'maps',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_local_seo_settings',
			name   : __('Maps', td)
		}
	}
]