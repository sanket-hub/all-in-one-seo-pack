import filter from 'lodash/filter'
import inRange from 'lodash/inRange'
import getSubheadingTextLengths from '../researches/helpers/getSubheadingTextLengths'
import isTextTooLong from '../researches/helpers/isValueTooLong'
import { getSubheadings } from '../researches/stringProcessing/getSubheadings'
import getWords from '../researches/stringProcessing/getWords'
import { __, sprintf } from '@wordpress/i18n'
const td = process.env.VUE_APP_TEXTDOMAIN

const parameters = {
	recommendedMaximumWordCount : 300,
	slightlyTooMany             : 300,
	farTooMany                  : 350
}
const scores = {
	goodShortTextNoSubheadings : 9,
	goodSubheadings            : 9,
	okSubheadings              : 6,
	badSubheadings             : 3,
	badLongTextNoSubheadings   : 2
}

function checkSubheadings (content) {
	const subheadings = getSubheadings(content)
	return 0 < subheadings.length
}

function getTooLongSubheadingTexts (subheadingTextsLength) {
	return filter(subheadingTextsLength, subheading => isTextTooLong(parameters.recommendedMaximumWordCount, subheading.wordCount))
}

function subheadingsDistribution (content) {
	if (!content) {
		return {}
	}

	let subheadingTextsLength = getSubheadingTextLengths(content)
	subheadingTextsLength = subheadingTextsLength.sort((a, b) => b.wordCount - a.wordCount)

	const hasSubheadings     = checkSubheadings(content)
	const textLength         = getWords(content).length
	const tooLongTextsNumber = getTooLongSubheadingTexts(subheadingTextsLength).length

	if (300 < textLength) {
		if (hasSubheadings) {
			const longestSubheadingTextLength = subheadingTextsLength[0].wordCount

			if (longestSubheadingTextLength <= parameters.slightlyTooMany) {
				return {
					title       : __('Subheading distribution', td),
					description : __('Great job!', td),
					score       : scores.goodSubheadings,
					maxScore    : 9,
					error       : 0
				}
			}

			if (inRange(longestSubheadingTextLength, parameters.slightlyTooMany, parameters.farTooMany)) {
				return {
					title       : __('Subheading distribution', td),
					// Translators: 1 - Expand to the number of text sections not separated by subheadings, 2 - expands to the recommended number of words following a subheading.
					description : sprintf(__('%1$d section of your text is longer than %2$d words and is not separated by any subheadings. Add subheadings to improve readability.', td), tooLongTextsNumber, parameters.recommendedMaximumWordCount), // @TODO: [V4+] PLURAL
					score       : scores.okSubheadings,
					maxScore    : 9,
					error       : 1
				}
			}

			return {
				title       : __('Subheading distribution', td),
				// Translators: 1 - Expand to the number of text sections not separated by subheadings, 2 - expands to the recommended number of words following a subheading.
				description : sprintf(__('%1$d section of your text is longer than %2$d words and is not separated by any subheadings. Add subheadings to improve readability.', td), tooLongTextsNumber, parameters.recommendedMaximumWordCount), // @TODO: [V4+] PLURAL
				score       : scores.badSubheadings,
				maxScore    : 9,
				error       : 1
			}
		}

		return {
			title       : __('Subheading distribution', td),
			description : __('You are not using any subheadings, although your text is rather long. Try and add some subheadings.', td),
			score       : scores.badLongTextNoSubheadings,
			maxScore    : 9,
			error       : 1
		}
	}

	if (hasSubheadings) {
		return {
			title       : __('Subheading distribution', td),
			description : __('Great job!', td),
			score       : scores.goodSubheadings,
			maxScore    : 9,
			error       : 0
		}
	}

	return {
		title       : __('Subheading distribution', td),
		description : __('You are not using any subheadings, but your text is short enough and probably doesn\'t need them.', td),
		score       : scores.goodShortTextNoSubheadings,
		maxScore    : 9,
		error       : 0
	}
}

export default subheadingsDistribution