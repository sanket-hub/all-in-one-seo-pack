const webpack              = require('webpack')
const Uglify               = require('uglifyjs-webpack-plugin')
const Compress             = require('compression-webpack-plugin')
const moment               = require('moment')
const merge                = require('webpack-merge')
const config               = require('./base.config.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// Prod ESLint config override.
config.modules.eslint.options.failOnError   = true
config.modules.eslint.options.failOnWarning = true

// Prod Notifier config override.
config.notifier.title           = 'Production Build'
config.notifier.suppressSuccess = false // We want to know if we built successfully.

module.exports = {
	prod : merge(config.base, {
		mode   : 'production',
		module : {
			rules : [
				config.modules.eslint,
				config.modules.babel,
				config.modules.css
			]
		},
		plugins : [
			new Uglify({
				sourceMap     : false,
				uglifyOptions : {
					output : {
						comments : false
					}
				}
			}),
			new Compress(),
			new webpack.BannerPlugin('! built on ' + moment().format('dddd, MMMM Do YYYY, h:mm:ss a')),
			new MiniCssExtractPlugin({
				filename      : 'css/[name].css',
				chunkFilename : 'css/[id].css'
			})
		]
	})
}