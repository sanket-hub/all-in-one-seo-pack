import getParagraphs from '../researches/helpers/getParagraphs'
import { __ } from '@wordpress/i18n'
const td = process.env.VUE_APP_TEXTDOMAIN

const scores = {
	incorrect     : 0,
	correctLength : 5
}

function paragraphLength (content) {
	if (!content) {
		return {}
	}

	const hasBigParagraphs = getParagraphs(content)
		.some((paragraph) => 120 < paragraph.wordCount)

	if (hasBigParagraphs) {
		return {
			title       : __('Paragraphs length', td),
			description : __('At least one paragraph is long. Consider using short paragraphs.', td),
			score       : scores.incorrect,
			maxScore    : scores.correctLength,
			error       : 1
		}
	}
	return {
		title       : __('Paragraphs length', td),
		description : __('You are using short paragraphs.', td),
		score       : scores.correctLength,
		maxScore    : scores.correctLength,
		error       : 0
	}
}

export default paragraphLength