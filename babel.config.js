const version = 'Lite'
const td      = 'td'
module.exports = {
	plugins : [
		[
			'./build/babel-plugin-makepot-custom/index.js',
			{
				td,
				output : `languages/aioseo-${version.toLowerCase()}.pot`
			}
		],
		[
			'component', {
				libraryName      : 'maz-ui',
				styleLibraryName : 'css'
			}
		]
	],
	presets : [ '@vue/cli-plugin-babel/preset' ]
}