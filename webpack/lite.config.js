const merge  = require('webpack-merge')
const config = require('./prod.config.js')
const path   = require('path')

module.exports = merge(config.prod, {
	entry : {
		plugins             : './src/app/plugins/Plugins.js',
		'aioseo-admin-bar'  : './src/vue/assets/scss/app/admin-bar.scss',
		'headline-analyzer' : [ './src/react/headline-analyzer/index.js', './src/react/assets/scss/main.scss' ]
	},
	output : {
		filename : 'js/[name].js',
		path     : path.resolve(__dirname, '../dist/Lite/assets/')
	}
})