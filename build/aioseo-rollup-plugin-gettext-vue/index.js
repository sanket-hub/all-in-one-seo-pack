const { createFilter } = require('rollup-pluginutils')
const { GettextExtractor } =  require('gettext-extractor')
const pluralForm = require('plural-forms')
const { SourceMapGenerator } = require('source-map')
const fs = require('fs')

const decorateExtractorWithPlurals = require('./decorateExtractorWithPlurals.js')
const callExpressionWithLiteral = require('./callExpressionWithLiteral.js')
const decorateJsParserWithReplacer = require('./decorateJsParserWithReplacer.js')
const config = require('./config.js')

const cacheFilesParse = {}

function i18n (options = {}) {
	const filter = createFilter(options.include, options.exclude)

	const languageFiles = config.defaultLanguage
	const language      = languageFiles
	const extractor     = decorateExtractorWithPlurals(new GettextExtractor())
	const jsParser      = extractor.createJsParser(config.optionsArray.map(el => {
		return callExpressionWithLiteral(el.calleeNames, el.extractorOptions, options)
	}))
	const vueParser = decorateJsParserWithReplacer(jsParser)

	let sourcemap

	return {
		name : 'rollup-plugin-gettext-vue',
		buildStart (bundleOpts) {
			sourcemap = 'sourcemap' in options
				? options.sourcemap
				: false !== bundleOpts.sourcemap
		},
		intro () {
			const pluralFunc = pluralForm.getPluralFunc(language)
			const nplurals = pluralForm.getNPlurals(language)
			let results = 'const PLURAL = ' + config.calleeFunctions.PLURAL

			// add glogal functions
			results = results.replace('PLURALFUNC', pluralFunc.toString()).replace('NPLURALS', nplurals)
			config.optionsArray.forEach(function (el) {
				results += '\n' + 'const ' + el.globalName + ' = ' + el.calleeFuncBody
			})

			return results
		},
		transform (code, id) {
			if (!filter(id)) {
				return
			}

			if (!cacheFilesParse[id]) {
				vueParser.parseSourceFile(code, id)
				cacheFilesParse[id] = vueParser
			}

			return cacheFilesParse[id].replaceMessageNodes(code, id, false)
				.then(function (source) {
					const map = sourcemap ? new SourceMapGenerator({ file: id }) : null

					return {
						code : source,
						map  : map.toString()
					}
				})
				.catch(() => {})
		},
		buildEnd () {
			if (options.output) {
				let phpContents = '<?php\n// phpcs:ignore Generic.Files.LineLength.MaxExceeded\n/* THIS IS A GENERATED FILE. DO NOT EDIT DIRECTLY. */\n$generated_i18n_strings = ['

				extractor.getMessages().sort().forEach(message => {
					let newString      = '',
						td             = null,
						additionalData = {},
						commentFound   = false
					message.references.sort().forEach(reference => {
						reference    = reference = `/src/${reference.split('/src/').pop()}`
						newString += `\n\t// Reference: ${reference}`
					})

					const textDomains = []
					message.comments.sort().forEach(comment => {
						if ('string' !== typeof comment) {
							additionalData = comment
							// We know this is our additional data object.
							if (additionalData.textDomain) {
								textDomains.push(additionalData.textDomain)
							}
							return
						}

						let duplicate = ''
						if (commentFound) {
							duplicate = ' [DUPLICATE]'
							console.error('Translation string has more than one translator comment!', message.text)
						}

						commentFound = true
						newString += `\n\t// Translators:${duplicate} ${comment}`
					})

					if (!additionalData.textDomain && !options.textDomains[additionalData.textDomain]) {
						return
					}

					td = options.textDomains[additionalData.textDomain]

					// The text domain wasn't found, bail!
					if (!td) {
						return
					}

					phpContents += newString

					const text       = message.text.replace(/'/g, '\\\'')
					const textPlural = message.textPlural ? message.textPlural.replace(/'/g, '\\\'') : null

					if (message.textPlural) {
						if (message.context) {
							phpContents += `\n\t_nx( '${text}', '${textPlural}', 0, '${message.context}', '${td}' ),\n`
							return
						}

						phpContents += `\n\t_n( '${text}', '${textPlural}', 0, '${td}' ),\n`
						return
					}

					if (!message.textPlural && message.context) {
						phpContents += `\n\t_x( '${text}', '${message.context}', '${td}' ),\n`
						return
					}

					phpContents += `\n\t__( '${text}', '${td}' ),\n`
				})

				phpContents += '];'

				fs.writeFileSync(options.output, phpContents)

				// This was how we originally output to a pot file, but we want wordpress to handle this instead.
				// const npluralsFiles = pluralForm.getNPlurals(languageFiles)
				// // const headers = {
				// //   'X-Generator' : 'AIOSEO'
				// // }

				// extractor.savePotFile(options.output, headers, npluralsFiles)
			}

			extractor.printStats()
		}
	}
}

module.exports = i18n