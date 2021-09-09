const webpack                           = require('webpack')
const Uglify                            = require('uglifyjs-webpack-plugin')
const Compress                          = require('compression-webpack-plugin')
const moment                            = require('moment')
const merge                             = require('webpack-merge')
const config                            = require('./base.config.js')
const MiniCssExtractPlugin              = require('mini-css-extract-plugin')
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin')
const FixStyleOnlyEntriesPlugin         = require('webpack-fix-style-only-entries')

// Prod ESLint config override.
config.modules.eslint.options.failOnError   = true
config.modules.eslint.options.failOnWarning = true

// Prod Notifier config override.
config.notifier.title           = 'Production Build'
config.notifier.suppressSuccess = false // We want to know if we built successfully.

module.exports = {
	prod : merge(config.base, {
		entry : {
			plugins                 : './src/app/plugins/Plugins.js',
			'aioseo-admin-bar'      : './src/vue/assets/scss/app/admin-bar.scss',
			'link-format-block'     : './src/app/link-format/block/index.js',
			'link-format-block-old' : './src/app/link-format/block-old/index.js',
			'link-format-classic'   : './src/app/link-format/classic/index.js',
			'headline-analyzer'     : [ './src/react/headline-analyzer/index.js', './src/react/assets/scss/main.scss' ]
		},
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
			}),
			new DependencyExtractionWebpackPlugin({ injectPolyfill: true }),
			new FixStyleOnlyEntriesPlugin()
		]
	})
}