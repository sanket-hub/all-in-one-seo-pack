const fs = require('fs')
const Pofile = require('pofile')
const validate1 = require('gettext-extractor/dist/utils/validate')

module.exports = function (extractor) {
	extractor.getPotString = function (headers = {}, nplurals) {
		validate1.Validate.optional.object({ headers })
		const po = new Pofile()
		po.items = this.getPofileItems(nplurals)
		po.headers = Object.assign({ 'Content-Type': 'text/plain; charset=UTF-8' }, headers)
		return po.toString()
	}

	extractor.savePotFile = function (fileName, headers, nplurals) {
		validate1.Validate.required.nonEmptyString({ fileName })
		validate1.Validate.optional.object({ headers })
		fs.writeFileSync(fileName, this.getPotString(headers, nplurals))
	}

	extractor.savePotFileAsync = function (fileName, headers, nplurals) {
		validate1.Validate.required.nonEmptyString({ fileName })
		validate1.Validate.optional.object({ headers })
		return new Promise((resolve, reject) => {
			fs.writeFile(fileName, this.getPotString(headers, nplurals), (error) => {
				if (error) {
					return reject(error)
				}
				resolve()
			})
		})
	}

	extractor.getPofileItems = function (nplurals) {
		return this.getMessages().map(message => {
			const item = new Pofile.Item({ nplurals: nplurals })
			item.msgid = message.text
			item.msgid_plural = message.textPlural
			item.msgctxt = message.context
			item.references = message.references.map(r => { return r.replace(process.cwd(), '.') }).sort((a, b) => a.localeCompare(b))
			item.extractedComments = message.comments
			return item
		})
	}

	return extractor
}