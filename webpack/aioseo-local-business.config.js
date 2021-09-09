const merge = require('webpack-merge')
const config = require('./prod.config.js')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const localBusinessConfig = merge(config.prod, {
	output : {
		path : path.resolve(__dirname, './../../aioseo-local-business/dist/assets/')
	},
	plugins : [
		new CopyPlugin([
			{
				from : './../aioseo-local-business/assets/js/js-api-loader.js',
				to   : 'js'
			}
		])
	]
})

localBusinessConfig.entry = {
	'js/map'        : './../aioseo-local-business/assets/js/map.js',
	'business-info' : './../aioseo-local-business/assets/scss/business-info.scss',
	'opening-hours' : './../aioseo-local-business/assets/scss/opening-hours.scss',
	'location-map'  : './../aioseo-local-business/assets/scss/location-map.scss'
}

module.exports = {
	config : localBusinessConfig
}