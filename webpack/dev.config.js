const merge                = require('webpack-merge')
const config               = require('./base.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(config.base, {
	mode    : 'development',
	devtool : 'source-map',
	module  : {
		rules : [
			config.modules.eslint,
			config.modules.babel,
			config.modules.css
		]
	},
	plugins : [
		new MiniCssExtractPlugin({
			filename      : 'css/[name].css',
			chunkFilename : 'css/[id].css'
		})
	]
})