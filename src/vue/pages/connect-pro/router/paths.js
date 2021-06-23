import { __, sprintf } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "connect-pro-[request]" */ '@/vue/pages/connect-pro/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/'
	},
	{
		path      : '/',
		name      : 'main',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_manage_seo',
			// Translators: 1 - The plugin short name ("AIOSEO").
			name   : sprintf(__('Connect with %1$s', td), process.env.VUE_APP_SHORTNAME)
		}
	}
]