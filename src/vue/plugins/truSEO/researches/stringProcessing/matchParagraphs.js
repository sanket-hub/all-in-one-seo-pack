import map from 'lodash/map'
import flatMap from 'lodash/flatMap'
import filter from 'lodash/filter'

import { getBlocks } from '../helpers/html'

/**
 * Matches the paragraphs in <p>-tags and returns the text in them.
 * @param {string} text The text to match paragraph in.
 * @returns {Array} An array containing all paragraphs texts.
 */
var getParagraphsInTags = function (text) {
	var paragraphs = [],
		// Matches everything between the <p> and </p> tags.
	 regex = /<p(?:[^>]+)?>(.*?)<\/p>/ig,
	 match

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
	var paragraphs = getParagraphsInTags(text)

	if (0 < paragraphs.length) {
		return paragraphs
	}

	// If no <p> tags found, split on double linebreaks.
	var blocks = getBlocks(text)

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