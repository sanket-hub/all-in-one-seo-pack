import { partition, sortBy } from 'lodash-es'
import getSentenceBeginnings from '../researches/helpers/getSentenceBeginnings'
import { __, sprintf } from '@wordpress/i18n'
import { td } from '@/vue/plugins/constants'

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
			description : sprintf(
				// Translators: 1 - Number of sentences.
				__('The text contains %1$d consecutive sentences starting with the same word. Try to mix things up!', td),
				groupedSentenceBeginnings.lowestCount
			),
			score    : 3,
			maxScore : 9,
			error    : 1
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