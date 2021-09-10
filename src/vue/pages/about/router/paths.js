import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "about-[request]" */ '@/vue/pages/about/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/about-us'
	},
	{
		path      : '/about-us',
		name      : 'about-us',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_about_us_page',
			name   : __('About Us', td)
		}
	},
	{
		path      : '/getting-started',
		name      : 'getting-started',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_about_us_page',
			name   : __('Getting Started', td)
		}
	},
	{
		path      : '/lite-vs-pro',
		name      : 'lite-vs-pro',
		component : loadView('Main'),
		meta      : {
			access  : 'aioseo_about_us_page',
			name    : __('Lite vs. Pro', td),
			display : 'lite'
		}
	}
]