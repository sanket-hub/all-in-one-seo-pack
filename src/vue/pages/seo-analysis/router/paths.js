import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "seo-analysis-[request]" */ '@/vue/pages/seo-analysis/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/seo-audit-checklist'
	},
	{
		path      : '/seo-audit-checklist',
		name      : 'seo-audit-checklist',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_seo_analysis_settings',
			name   : __('SEO Audit Checklist', td)
		}
	},
	{
		path      : '/analyze-competitor-site',
		name      : 'analyze-competitor-site',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_seo_analysis_settings',
			name   : __('Analyze Competitor Site', td)
		}
	}
]