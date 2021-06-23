import { __ } from '@wordpress/i18n'

const td       = process.env.VUE_APP_TEXTDOMAIN
const loadView = view => {
	return () => import(/* webpackChunkName: "tools-[request]" */ '@/vue/pages/tools/views/' + view + '.vue')
}

export default [
	{
		path     : '*',
		redirect : '/robots-editor'
	},
	{
		path      : '/robots-editor',
		name      : 'robots-editor',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : __('Robots.txt Editor', td)
		}
	},
	{
		path      : '/htaccess-editor',
		name      : 'htaccess-editor',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : __('.htaccess Editor', td)
		}
	},
	{
		path      : '/bad-bot-blocker',
		name      : 'bad-bot-blocker',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : __('Bad Bot Blocker', td)
		}
	},
	{
		path      : '/import-export',
		name      : 'import-export',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : __('Import/Export', td)
		}
	},
	{
		path      : '/database-tools',
		name      : 'database-tools',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : __('Database Tools', td)
		}
	},
	{
		path      : '/system-status',
		name      : 'system-status',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : __('System Status', td)
		}
	},
	{
		path      : '/debug',
		name      : 'debug',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : 'Debug'
		}
	}
]