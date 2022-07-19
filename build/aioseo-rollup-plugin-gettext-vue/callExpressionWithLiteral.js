const ts        = require('typescript')
const validate1 = require('gettext-extractor/dist/utils/validate')
const content1  = require('gettext-extractor/dist/utils/content')
const common1   = require('gettext-extractor/dist/js/extractors/common')
const utils1    = require('gettext-extractor/dist/js/utils')
const comments1 = require('gettext-extractor/dist/js/extractors/comments')

module.exports = function (calleeName, options, globalOptions) {
	validate1.Validate.required.argument({ calleeName })

	const calleeNames = [].concat(calleeName)

	for (const name of calleeNames) {
		if ('string' !== typeof name || 0 === name.length) {
			throw new TypeError('Argument \'calleeName\' must be a non-empty string or an array containing non-empty strings')
		}
	}

	common1.validateOptions(options)
	content1.validateContentOptions(options)

	const contentOptions = {
		trimWhiteSpace      : false,
		preserveIndentation : true,
		replaceNewLines     : false
	}

	if (options.content) {
		if (options.content.trimWhiteSpace !== undefined) {
			contentOptions.trimWhiteSpace = options.content.trimWhiteSpace
		}
		if (options.content.preserveIndentation !== undefined) {
			contentOptions.preserveIndentation = options.content.preserveIndentation
		}
		if (options.content.replaceNewLines !== undefined) {
			contentOptions.replaceNewLines = options.content.replaceNewLines
		}
	}

	return (node, sourceFile, addMessage) => {
		if (node.kind !== ts.SyntaxKind.CallExpression) {
			return
		}

		const callExpression = node
		const matches = calleeNames.reduce((matchFound, name) => (matchFound || utils1.JsUtils.calleeNameMatchesCallExpression(name, callExpression)), false)
		if (!matches) {
			return
		}

		const message = extractArguments(callExpression, options.arguments, contentOptions)
		if (!message) {
			return
		}

		if (!message.textDomain) {
			console.error('\n', 'Missing a textdomain: ', message)
			return
		}

		if (!globalOptions.recognizedTextDomains[message.textDomain]) {
			const lineInfo = sourceFile.getLineAndCharacterOfPosition(node.getStart())
			console.error('\n', 'Invalid textdomain: ', message, `${sourceFile.fileName}:${lineInfo.line}:${lineInfo.character}`)
			return
		}

		message.comments = comments1.JsCommentUtils.extractComments(callExpression, sourceFile, options.comments)

		// Since the original gettext-extractor doesn't support textdomains,
		// we want to push it to the comments here and extract it later.
		message.comments.push({ textDomain: message.textDomain })

		addMessage(message)
	}
}

function extractArguments (callExpression, argumentMapping, contentOptions) {
	const callArguments    = callExpression.arguments
	const contextArgument  = callArguments[argumentMapping.context]
	let textArgument       = callArguments[argumentMapping.text],
		textPluralArgument = callArguments[argumentMapping.textPlural],
		textDomainArgument = callArguments[argumentMapping.textDomain],
		textNumberArgument = callArguments[argumentMapping.textNumber]

	// For literal.
	if (textArgument && !isTextLiteral(textArgument)) {
		textArgument = createStringLiteral(textArgument.getText())
	}

	if (textPluralArgument && !isTextLiteral(textPluralArgument)) {
		textPluralArgument = createStringLiteral(textPluralArgument.getText())
	}

	if (textDomainArgument && !isTextLiteral(textDomainArgument)) {
		textDomainArgument = createStringLiteral(textDomainArgument.getText())
	}

	if (textNumberArgument && !isTextLiteral(textNumberArgument)) {
		textNumberArgument = createStringLiteral(textNumberArgument.getText())
	}

	textArgument       = checkAndConcatenateStrings(textArgument)
	textPluralArgument = checkAndConcatenateStrings(textPluralArgument)
	textDomainArgument = checkAndConcatenateStrings(textDomainArgument)
	textNumberArgument = checkAndConcatenateStrings(textNumberArgument)
	const textPluralValid = 'number' !== typeof argumentMapping.textPlural || isTextLiteral(textPluralArgument)
	if (isTextLiteral(textArgument) && textPluralValid) {
		const message = {
			text : content1.normalizeContent(textArgument.text, contentOptions)
		}
		if (isTextLiteral(textDomainArgument)) {
			message.textDomain = content1.normalizeContent(textDomainArgument.text, contentOptions)
		}
		if (isTextLiteral(textNumberArgument)) {
			message.textNumber = content1.normalizeContent(textNumberArgument.text, contentOptions)
		}
		if (isTextLiteral(textPluralArgument)) {
			message.textPlural = content1.normalizeContent(textPluralArgument.text, contentOptions)
		}
		if (isTextLiteral(contextArgument)) {
			message.context = content1.normalizeContent(contextArgument.text, contentOptions)
		}
		return message
	}
	return null
}
function isTextLiteral (expression) {
	return expression && (expression.kind === ts.SyntaxKind.StringLiteral || expression.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral)
}
function isParenthesizedExpression (expression) {
	return expression && expression.kind === ts.SyntaxKind.ParenthesizedExpression
}
function isBinaryExpression (expression) {
	return expression && expression.kind === ts.SyntaxKind.BinaryExpression
}
function createStringLiteral (text) {
	const node = ts.createNode(ts.SyntaxKind.StringLiteral, -1, -1)
	node.text = text
	return node
}
function getAdditionExpression (expression) {
	while (isParenthesizedExpression(expression)) {
		expression = expression.expression
	}
	if (isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.PlusToken) {
		return expression
	}
	return null
}
function checkAndConcatenateStrings (expression) {
	let addition
	if (!expression || !(addition = getAdditionExpression(expression))) {
		return expression
	}
	const concatenated = createStringLiteral('')
	if (processStringAddition(addition, concatenated)) {
		return concatenated
	}
	return expression
}
function processStringAddition (expression, concatenated) {
	const leftAddition  = getAdditionExpression(expression.left)
	const rightAddition = getAdditionExpression(expression.right)
	if (isTextLiteral(expression.left)) {
		concatenated.text += expression.left.text
	} else if (leftAddition) {
		if (!processStringAddition(leftAddition, concatenated)) {
			return false
		}
	} else {
		return false
	}
	if (isTextLiteral(expression.right)) {
		concatenated.text += expression.right.text
		return true
	} else if (rightAddition) {
		return processStringAddition(rightAddition, concatenated)
	} else {
		return false
	}
}