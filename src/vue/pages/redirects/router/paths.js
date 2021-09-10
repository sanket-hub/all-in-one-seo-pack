import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "redirects-[request]" */ '@/vue/pages/redirects/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/redirects'
	},
	{
		path      : '/redirects',
		name      : 'redirects',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_redirects_settings',
			name   : __('Redirects', td)
		}
	},
	{
		path      : '/full-site-redirect',
		name      : 'full-site-redirect',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_redirects_settings',
			name   : __('Full Site Redirect', td)
		}
	},
	{
		path      : '/logs',
		name      : 'logs',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_redirects_settings',
			name   : __('Logs', td)
		}
	},
	{
		path      : '/404-logs',
		name      : 'logs-404',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_redirects_settings',
			name   : __('404 Logs', td)
		}
	},
	{
		path      : '/import-export',
		name      : 'import-export',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_redirects_settings',
			name   : __('Import / Export', td)
		}
	},
	{
		path      : '/settings',
		name      : 'settings',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_redirects_settings',
			name   : __('Settings', td)
		}
	}
]