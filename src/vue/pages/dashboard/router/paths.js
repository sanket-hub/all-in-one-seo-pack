import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "dashboard-[request]" */ '@/vue/pages/dashboard/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/'
	},
	{
		path      : '/',
		name      : 'dashboard',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_admin',
			name   : __('Dashboard', td)
		}
	}
]