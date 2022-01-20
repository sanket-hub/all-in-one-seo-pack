import map from 'lodash/map'
import flatMap from 'lodash/flatMap'
import filter from 'lodash/filter'

import { getBlocks } from '../helpers/html'

/**
 * Matches the paragraphs in <p>-tags and returns the text in them.
 * @param {string} text The text to match paragraph in.
 * @returns {Array} An array containing all paragraphs texts.
 */
const getParagraphsInTags = function (text) {
	const paragraphs = []
	// Get paragraph content by matching everything between <p> tags.
	// We'll also include shortcodes as those aren't wrapped in any tags and we want to consider them when looking for keyphrases.
	const regex = /(<p(?:[^>]+)?>(.*?)<\/p>|\[.*](.*?)\[.*])/ig

	let match
	while (null !== (match = regex.exec(text))) {
		paragraphs.push(match)
	}

	// Returns only the text from within the paragraph tags.
	return map(paragraphs, function (paragraph) {
		return paragraph[1]
	})
}

/**
 * Returns an array with all paragraphs from the text.
 * @param {string} text The text to match paragraph in.
 * @returns {Array} The array containing all paragraphs from the text.
 */
export default function (text) {
	let paragraphs = getParagraphsInTags(text)

	if (0 < paragraphs.length) {
		return paragraphs
	}

	// If no <p> tags found, split on double linebreaks.
	let blocks = getBlocks(text)

	blocks = filter(blocks, function (block) {
		// Match explicit paragraph tags, or if a block has no HTML tags.
		return 0 !== block.indexOf('<h')
	})

	paragraphs = flatMap(blocks, function (block) {
		return block.split('\n\n')
	})

	if (0 < paragraphs.length) {
		return paragraphs
	}

	// If no paragraphs are found, return an array containing the entire text.
	return [ text ]
}