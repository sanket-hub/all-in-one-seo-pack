const path                 = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	base : {
		node : {
			setImmediate : false
		}
	},
	modules : {
		eslint : {
			enforce : 'pre',
			test    : /\.js$/,
			exclude : /node_modules/,
			loader  : 'eslint-loader',
			options : {
				emitError   : true,
				emitWarning : true,
				fix         : true
			}
		},
		babel : {
			test    : /\.js$/,
			exclude : /(node_modules)/,
			use     : {
				loader  : 'babel-loader',
				options : {
					babelrc    : false,
					configFile : false,
					presets    : [ [ '@babel/preset-env', { loose: true } ], require.resolve('@wordpress/babel-preset-default') ],
					plugins    : [
						'transform-class-properties'
					]
				}
			}
		},
		css : {
			test : /\.scss$/,
			use  : [
				MiniCssExtractPlugin.loader,
				{
					loader  : 'css-loader', // translates CSS into CommonJS
					options : { importLoaders: 1 }
				},
				{
					loader  : 'sass-loader', // compiles sass to css.
					options : {
						sassOptions : {
							includePaths : [ path.resolve(__dirname, './assets/scss') ]
						}
					}
				}
			]
		}
	},
	notifier : {
		title           : 'Dev Build',
		// logo            : path.resolve('../themes/omappv4/assets/images/login-archie.png'),
		warningSound    : 'Funk',
		failureSound    : 'Funk',
		successSound    : 'Pop',
		suppressSuccess : true // Will only output success sound when watch starts (if successful), or when broken build is corrected.
	}
}