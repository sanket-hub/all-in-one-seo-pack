const Promise = require('bluebird')
const validate1 = require('gettext-extractor/dist/utils/validate')
const parser1 = require('gettext-extractor/dist/parser')
const ts = require('typescript')
const config = require('./config.js')

module.exports = function (jsParser) {
	jsParser.parseSourceFile = function (source, fileName, options = {}) {
		validate1.Validate.required.string({ source })
		validate1.Validate.optional.nonEmptyString({ fileName })
		this.validateParseOptions(options)

		if (!this.extractors.length) {
			throw new Error('Missing extractor functions. Provide them when creating the parser or dynamically add extractors using \'addExtractor()\'')
		}
		if (options && options.transformSource) {
			source = options.transformSource(source)
		}

		const messages = jsParser.parseSource(source, fileName || jsParser.STRING_LITERAL_FILENAME, options)
		for (const message of messages) {
			this.builder.addMessage(message)
		}

		this.stats && this.stats.numberOfParsedFiles++
		if (messages.length) {
			this.stats && this.stats.numberOfParsedFilesWithMessages++
		}

		return source
	}

	jsParser.parseSource = function (source, fileName, options = {}) {
		const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, options.scriptKind)
		return jsParser.parseNodeSource(sourceFile, sourceFile, options.lineNumberStart || 1)
	}

	jsParser.parseNodeSource = function (node, sourceFile, lineNumberStart) {
		let messages = []
		const addMessageCallback = parser1.Parser.createAddMessageCallback(messages, sourceFile.fileName, () => {
			const location = sourceFile.getLineAndCharacterOfPosition(node.getStart())
			return lineNumberStart + location.line
		})
		const replaceCallExpression = function (msg) {
			addMessageCallback(msg)
			jsParser.addReplaceMessageNode(msg, node, sourceFile.fileName)
		}
		for (const extractor of jsParser.extractors) {
			extractor(node, sourceFile, replaceCallExpression)
		}
		ts.forEachChild(node, n => {
			messages = messages.concat(jsParser.parseNodeSource(n, sourceFile, lineNumberStart))
		})

		// Parsing and enumeration of string literals.
		if (0 < node.getStart() && (ts.isStringLiteral(node) || ts.isRegularExpressionLiteral(node))) {
			const text = ts.isRegularExpressionLiteral(node) ? node.getText().slice(1) : node.text
			const srcText = ts.createSourceFile(sourceFile.fileName, text, ts.ScriptTarget.Latest, true)
			const lineNumberStartText = lineNumberStart + sourceFile.getLineAndCharacterOfPosition(node.getStart()).line
			ts.forEachChild(srcText, n => {
				messages = messages.concat(jsParser.parseNodeSource(n, srcText, lineNumberStartText))
			})
		}

		return messages
	}

	jsParser.addReplaceMessageNode = function (message, node, fileName) {
		if (!jsParser.replacements) { jsParser.replacements = [] }

		jsParser.replacements.push({ message, node, fileName })
	}

	jsParser.replaceMessageNodes = function (source, fileName, translationObj) {
		if (!jsParser.replacements) {
			return Promise.reject('Replacements is empty') // eslint-disable-line
		}

		return new Promise(function (resolve) {
			const resmsg = {}
			const translations = {}

			// transform items to { 'context:text': item }
			translationObj && translationObj.items.forEach(item => {
				translations[(item.msgctxt ? item.msgctxt + ':' : '') + item.msgid] = item
			})

			jsParser.replacements.forEach(function (item) {
				if (0 <= fileName.replace(/\\/g, '/').indexOf(item.fileName)) {
					const replaceItem = getItemToReplace(item.node, item.message, translations)
					if (!resmsg[replaceItem.srcTxt]) {
						resmsg[replaceItem.srcTxt] = replaceItem.dstStr
					}
				}
			})

			for (const srcTxt in resmsg) {
				const regTxt = new RegExp(srcTxt.replace(/([\^$()[\]{}*.+?|\\])/gi, '\\$1'), 'g')
				const dstStr = resmsg[srcTxt]
				source = source.replace(regTxt, dstStr)
			}

			resolve(source)
		})
	}

	return jsParser
}

function getItemToReplace (node, message, translations) {
	const poitem = translations[(message.context ? message.context + ':' : '') + message.text] || false
	let resultText

	if (message.textPlural) {
		resultText = resolveNGettext(node, message, poitem)
	} else {
		resultText = resolveGettext(node, message, poitem)
	}

	return {
		srcTxt : node.getText(),
		dstStr : resultText
	}
}

function resolveGettext (node, message, item) {
	const argsNum = message.context ? 1 : 0
	let resultText

	if (item) {
		const text = (1 < item.nplurals ? item.msgstr[0] : item.msgstr) || item.msgid
		const isSingleQuote = 39 === node.arguments[argsNum].getText().charCodeAt(0)
		resultText = ts.getLiteralText(ts.createLiteral(text, isSingleQuote), '', true, false)
	} else {
		resultText = node.arguments[argsNum].getText()
	}

	return resultText
}

function resolveNGettext (node, message, item) {
	let argumentsArray = item ? (1 < item.nplurals && item.msgstr[0] ? item.msgstr : [ item.msgid, item.msgid_plural ]) : []
	const allCallNames = node.expression.getText()
	const callName = !ts.isIdentifier(node.expression) ? node.expression.name.getText() : node.expression.getText()

	if (!argumentsArray.length) { return node.getText() }

	argumentsArray = argumentsArray.map(function (el) {
		return ts.getLiteralText(ts.createStringLiteral(el), '', true, false)
	})

	if (0 <= config.calleeNames.npgettext.indexOf(callName)) {
		argumentsArray.unshift('') // add content argument for ngettext function
	}

	// for number to call ngettext
	argumentsArray.push(ts.getLastChild(node).getText())

	return allCallNames + '(' + argumentsArray.join(',') + ')'
}