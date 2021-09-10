import partition from 'lodash/partition'
import sortBy from 'lodash/sortBy'
import getSentenceBeginnings from '../researches/helpers/getSentenceBeginnings'
import { __, sprintf } from '@wordpress/i18n'
const td = process.env.VUE_APP_TEXTDOMAIN

const maximumConsecutiveDuplicates = 2

function groupSentenceBeginnings (sentenceBeginnings) {
	const tooOften = partition(sentenceBeginnings, word => word.count > maximumConsecutiveDuplicates)

	if (0 === tooOften[0].length) {
		return { total: 0 }
	}

	const sortedCounts = sortBy(tooOften[0], word => word.count)

	return { total: tooOften[0].length, lowestCount: sortedCounts[0].count }
}

export default function consecutiveSentences (content) {
	if (!content) {
		return {}
	}

	const sentenceBeginnings        = getSentenceBeginnings(content, window.aioseo.locale || 'en_US')
	const groupedSentenceBeginnings = groupSentenceBeginnings(sentenceBeginnings)

	if (0 < groupedSentenceBeginnings.total) {
		return {
			title       : __('Consecutive sentences', td),
			// Translators: 1 - Number of sentences.
			description : sprintf(__('The text contains %1$d consecutive sentences starting with the same word. Try to mix things up!', td), groupedSentenceBeginnings.lowestCount),
			score       : 3,
			maxScore    : 9,
			error       : 1
		}
	}

	return {
		title       : __('Consecutive sentences', td),
		description : __('There is enough variety in your sentences. That\'s great!', td),
		score       : 9,
		maxScore    : 9,
		error       : 0
	}
}