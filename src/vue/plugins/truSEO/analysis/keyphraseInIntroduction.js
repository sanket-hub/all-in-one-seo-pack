import matchParagraphs from '../researches/stringProcessing/matchParagraphs.js'
import wordMatch from '../researches/stringProcessing/matchTextWithWord'
import reject from 'lodash/reject'
import isEmpty from 'lodash/isEmpty'
import getKeyphraseType from '../researches/helpers/getKeyphraseType'
import { __, sprintf } from '@wordpress/i18n'
const td = process.env.VUE_APP_TEXTDOMAIN

const scores = {
	noContent : 0,
	noMatches : 3,
	matches   : 9
}

function keyphraseInIntroduction (content, keyphrase, type) {
	if (!content) {
		return {}
	}

	const keyphraseType = getKeyphraseType(type)
	// Translators: 1 - Focus Keyphrase or Keyphrase.
	const title =  sprintf(__('%1$s in introduction', td), keyphraseType)

	if (!content) {
		return {
			title       : title,
			description : __('No content added yet.', td),
			score       : scores.noContent,
			maxScore    : scores.matches,
			error       : 1
		}
	}

	let paragraphs = matchParagraphs(content)
	paragraphs = reject(paragraphs, isEmpty)

	const keywordMatched = wordMatch(paragraphs[0], keyphrase, window.aioseo.locale || 'en_US')
	if (0 < keywordMatched.count) {
		return {
			title       : title,
			// Translators: 1 - Focus Keyphrase or Keyphrase.
			description : sprintf(__('Your %1$s appears in the first paragraph. Well done!', td), keyphraseType),
			score       : scores.matches,
			maxScore    : scores.matches,
			error       : 0
		}
	}

	return {
		title       : title,
		// Translators: 1 - Focus Keyphrase or Keyphrase.
		description : sprintf(__('Your %1$s does not appear in the first paragraph. Make sure the topic is clear immediately.', td), keyphraseType),
		score       : scores.noMatches,
		maxScore    : scores.matches,
		error       : 1
	}
}

export default keyphraseInIntroduction