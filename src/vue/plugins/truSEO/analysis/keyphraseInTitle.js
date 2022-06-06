import wordMatch from '../researches/stringProcessing/matchTextWithWord'
import { __ } from '@wordpress/i18n'
import { td } from '@/vue/plugins/constants'

const scores = {
	noMatches : 3,
	matches   : 9
}

function keyphraseInTitle (title, keyphrase) {
	if (!title) {
		return {}
	}

	const keywordMatched = wordMatch(title, keyphrase, window.aioseo.locale || 'en_US')

	if (0 < keywordMatched.count) {
		return {
			title       : __('Focus keyphrase in SEO title', td),
			description : __('Focus keyphrase found in SEO title.', td),
			score       : scores.matches,
			maxScore    : scores.matches,
			error       : 0
		}
	}

	return {
		title       : __('Focus keyphrase in SEO title', td),
		description : __('Focus keyphrase not found in SEO title.', td),
		score       : scores.noMatches,
		maxScore    : scores.matches,
		error       : 1
	}
}

export default keyphraseInTitle