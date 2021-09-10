const version = 'Lite'
const file = `languages/aioseo-${version.toLowerCase()}.pot`

const { po } = require('gettext-parser')
const { writeFileSync, readFile } = require('fs')

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