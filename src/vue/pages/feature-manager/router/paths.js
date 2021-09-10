import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "feature-manager-[request]" */ '@/vue/pages/feature-manager/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/'
	},
	{
		path      : '/',
		name      : 'feature-manager',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_feature_manager_settings',
			name   : __('Feature Manager', td)
		}
	}
]