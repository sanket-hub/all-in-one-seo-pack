import { __ } from '@wordpress/i18n'

const td       = import.meta.env.VITE_TEXTDOMAIN
const loadView = view => {
	return () => import(`../views/${view}.vue`)
}

export default [
	{
		path     : '/:pathMatch(.*)*',
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
	},
	{
		path      : '/snippets',
		name      : 'wp-code',
		component : loadView('Main'),
		meta      : {
			access : 'aioseo_tools_settings',
			name   : __('Code Snippets', td)
		}
	}
]