const merge  = require('webpack-merge')
const config = require('./prod.config.js')
const path   = require('path')

module.exports = merge(config.prod, {
	output : {
		filename : 'js/[name].js',
		path     : path.resolve(__dirname, '../dist/Lite/assets/')
	}
})