const fs                   = require('fs')
const os                   = require('os')
const webpack              = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackRTLPlugin     = require('webpack-rtl-plugin')

// Get the version from the env variable.
const version = 'Lite'

const pageKeys = [
	'about',
	'connect',
	'connect-pro',
	'dashboard',
	'feature-manager',
	// 'internal-links',
	'local-business-seo',
	'local-seo',
	'monsterinsights',
	'post-settings',
	'posts-table',
	'redirects',
	'search-appearance',
	'seo-analysis',
	'settings',
	'setup-wizard',
	'sitemaps',
	'social-networks',
	'tools'
]

const standaloneKeys = [
	'app',
	'notifications',
	'publish-panel',
	'flyout-menu'
]

const pages = () => {
	const pages = {}
	pageKeys.forEach(key => {
		pages[key] = entry(key, 'pages')
	})

	return pages
}

const standalones = () => {
	const standalones = {}
	standaloneKeys.forEach(key => {
		standalones[key] = entry(key, 'standalone')
	})

	return standalones
}

const entry = (key, context = 'pages') => {
	return {
		entry    : `src/vue/${context}/${key}/main.js`,
		template : 'public/index.html',
		filename : 'app' === key ? 'index.html' : `${key}.html`,
		chunks   : [ 'chunk-common', 'chunk-vendors', key ]
	}
}

const pluginsConfig = [
	new webpack.NormalModuleReplacementPlugin(/(.*)AIOSEO_VERSION(\.*)/, resource => {
		resource.request = resource.request.replace(/AIOSEO_VERSION/, version.toLowerCase())
	}),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	new MiniCssExtractPlugin({
		ignoreOrder : true
	})
]

if (!process.env.AIOSEO_LOCAL_DEV) {
	pluginsConfig.push(new WebpackRTLPlugin())
}

let https = false
try {
	/*
	Generate Cert files via:
	`mkcert aioseo.local`
	 */
	if (fs.existsSync('./' + process.env.VUE_APP_CRT_DOMAIN + '-key.pem')) {
		https = {
			key  : fs.readFileSync('./' + process.env.VUE_APP_CRT_DOMAIN + '-key.pem'),
			cert : fs.readFileSync('./' + process.env.VUE_APP_CRT_DOMAIN + '.pem'),
			ca   : fs.readFileSync(process.env.VUE_APP_CRT_ROOT_CA)
		}
	}
} catch (err) {
	console.log(err)
}

module.exports = {
	runtimeCompiler     : true,
	publicPath          : process.env[`VUE_APP_WP_${version.toUpperCase()}`] || '/',
	assetsDir           : '',
	outputDir           : `dist/${version}/assets`,
	filenameHashing     : false,
	productionSourceMap : false,
	configureWebpack    : () => {
		const plugins = pluginsConfig
		return {
			module : {
				noParse : /node_modules\/lodash\/lodash\.js/
			},
			plugins,
			// devtool   : 'source-map',
			devServer : {
				clientLogLevel : 'silent',
				port           : process.env.VUE_APP_WP_PORT || 8082,
				headers        : {
					'Access-Control-Allow-Origin'  : '*',
					'Access-Control-Allow-Methods' : '*',
					'Access-Control-Allow-Headers' : '*'
				},
				disableHostCheck : true,
				host             : process.env.VUE_APP_CRT_DOMAIN,
				https
			},
			output : {
				jsonpFunction : 'aioseopjsonp'
			}
		}
	},
	css : {
		// Enable CSS source maps.
		sourceMap     : 'dev' === process.env.ENV,
		loaderOptions : {
			sass : {
				prependData : `
					@import "@/vue/assets/scss/app/variables.scss";
				`
			}
		},
		extract : {
			filename      : 'css/[name].css',
			chunkFilename : 'css/[name].css'
		}
	},
	pages : {
		...pages(),
		...standalones()
	},
	chainWebpack : config => {
		config.optimization.splitChunks({
			automaticNameDelimiter : '_',
			cacheGroups            : {
				// ...pageKeys.map(key => ({
				//  name     : 'chunk-vendors',
				//  priority : -10,
				//  chunks   : (chunk) => key === chunk.name,
				//  test     : /[\\/]node_modules[\\/]/,
				//  enforce  : true
				// })),
				vendors : {
					name     : 'chunk-vendors',
					priority : -10,
					chunks   : (chunk) => chunk.name,
					test     : /[\\/]node_modules[\\/]/,
					enforce  : true
				},
				common : {
					name               : 'chunk-common',
					priority           : -20,
					chunks             : 'initial',
					minChunks          : 2,
					reuseExistingChunk : true,
					enforce            : true
				}
			}
		})
	},
	parallel : !('linux' === process.platform && os.release().includes('Microsoft'))
}