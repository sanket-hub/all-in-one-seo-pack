const { po } = require('gettext-parser')
const { writeFileSync, readFile } = require('fs')

module.exports = function uniquePot () {
	return {
		name    : 'uniquePot',
		visitor : {
			FunctionDeclaration : {
				enter () {},
				exit (path, state) {
					const file = `languages/aioseo-${state.opts.version.toLowerCase()}.pot`

					function cleanUnique () {
						readFile(file, function (err, data) {
							if (err) {
								console.log(err)
								return
							}

							const fileRead = po.parse(data)
							writeFileSync(file, po.compile(fileRead))
						})
					}

					cleanUnique()
				}
			}
		}
	}
}