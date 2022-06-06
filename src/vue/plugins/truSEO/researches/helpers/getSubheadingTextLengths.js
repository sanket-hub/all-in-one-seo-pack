import getSubheadingTexts from '../stringProcessing/getSubheadingTexts'
import countWords from '../stringProcessing/countWords'
import { forEach } from 'lodash-es'

/**
 * Gets the subheadings from the text and returns the length of these subheading in an array.
 * @param {string} text The text to parse.
 * @returns {Array} The array with the length of each subheading.
 */
export default function (text) {
	const matches = getSubheadingTexts(text)

	const subHeadingTexts = []
	forEach(matches, function (subHeading) {
		subHeadingTexts.push({
			text      : subHeading,
			wordCount : countWords(subHeading)
		})
	})
	return subHeadingTexts
}