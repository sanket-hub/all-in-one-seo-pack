import wordMatch from '../researches/stringProcessing/matchTextWithWord'
import getKeyphraseType from '../researches/helpers/getKeyphraseType'
import { __, sprintf } from '@wordpress/i18n'
import { td } from '@/vue/plugins/constants'

const scores = {
	noMatches : 3,
	matches   : 9
}

function keyphraseInDescription (description, keyphrase, type) {
	if (!description) {
		return {}
	}

	const keyphraseType = getKeyphraseType(type)
	const keywordMatched = wordMatch(description, keyphrase, window.aioseo.locale || 'en_US')
	const title =  sprintf(
		// Translators: 1 - Focus Keyphrase or Keyphrase.
		__('%1$s in meta description', td),
		keyphraseType
	)

	if (0 < keywordMatched.count) {
		return {
			title       : title,
			description : sprintf(
				// Translators: 1 - Focus Keyphrase or Keyphrase.
				__('%1$s found in meta description.', td),
				keyphraseType
			),
			score    : scores.matches,
			maxScore : scores.matches,
			error    : 0
		}
	}

	return {
		title       : title,
		description : sprintf(
			// Translators: 1 - Focus Keyphrase or Keyphrase.
			__('%1$s not found in meta description.', td),
			keyphraseType
		),
		score    : scores.noMatches,
		maxScore : scores.matches,
		error    : 1
	}
}

export default keyphraseInDescription