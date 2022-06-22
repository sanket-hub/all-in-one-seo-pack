import { count } from '@/vue/plugins/wordcount'
import { map, inRange } from 'lodash-es'
import escapeRegex from '../researches/helpers/escapeRegex'
import { cleanTagsOnly } from '../researches/helpers/cleanText'
import getKeyphraseType from '../researches/helpers/getKeyphraseType'
import { __, sprintf } from '@wordpress/i18n'
import { td } from '@/vue/plugins/constants'

const scores = {
	fail : 0,
	fair : 3,
	good : 6,
	best : 9
}

function keyphraseDensity (text, keyphrase, type) {
	if (!text) {
		return {}
	}

	const keyphraseType = getKeyphraseType(type)
	const regex = new RegExp(map([ keyphrase ], escapeRegex).join('|'), 'gi')
	const wordCount = count(text, 'words')
	const keyphraseMatches = (cleanTagsOnly(text).match(regex) || []).length
	const keywordDensity = ((keyphraseMatches / wordCount) * 100).toFixed(2)
	const title =  sprintf(
		// Translators: 1 - Focus Keyphrase or Keyphrase.
		__('%1$s density', td),
		keyphraseType
	)

	if (0.5 > keywordDensity) {
		return {
			title       : title,
			description : sprintf(
				// Translators: 1 - Focus Keyphrase or Keyphrase, 2 - Keyphrase Density Number, 3 - Keyphrase Matches Number.
				__('%1$s Density is %2$s which is low, the Keyphrase appears %3$s times.', td),
				keyphraseType,
				keywordDensity,
				keyphraseMatches
			),
			score    : scores.fail,
			type     : 'low',
			maxScore : scores.best,
			error    : 1
		}
	}
	if (2.5 < keywordDensity) {
		return {
			title       : title,
			description : sprintf(
				// Translators: 1 - Focus Keyphrase or Keyphrase, 2 - Keyphrase Density Number, 3 - Keyphrase Matches Number.
				__('%1$s Density is %2$s which is high, the Keyphrase appears %3$s times.', td),
				keyphraseType,
				keywordDensity,
				keyphraseMatches
			),
			type     : 'high',
			score    : scores.fail,
			maxScore : scores.best,
			error    : 1
		}
	}
	if (inRange(keywordDensity, 0.5, 0.75)) {
		return {
			title       : title,
			description : sprintf(
				// Translators: 1 - Focus Keyphrase or Keyphrase, 2 - Keyphrase Density Number, 3 - Keyphrase Matches Number.
				__('%1$s Density is %2$s, the Keyphrase appears %3$s times.', td),
				keyphraseType,
				keywordDensity,
				keyphraseMatches
			),
			type     : 'fair',
			score    : scores.fair,
			maxScore : scores.best,
			error    : 1
		}
	}
	if (inRange(keywordDensity, 0.76, 1.0)) {
		return {
			title       : title,
			description : sprintf(
				// Translators: 1 - Focus Keyphrase or Keyphrase, 2 - Keyphrase Density Number, 3 - Keyphrase Matches Number.
				__('%1$s Density is %2$s, the Keyphrase appears %3$s times.', td),
				keyphraseType,
				keywordDensity,
				keyphraseMatches
			),
			type     : 'good',
			score    : scores.good,
			maxScore : scores.best,
			error    : 1
		}
	}
	return {
		title       : title,
		description : sprintf(
			// Translators: 1 - Focus Keyphrase or Keyphrase, 2 - Keyphrase Density Number, 3 - Keyphrase Matches Number.
			__('%1$s Density is %2$s, the Keyphrase appears %3$s times.', td),
			keyphraseType,
			keywordDensity,
			keyphraseMatches
		),
		type     : 'best',
		score    : scores.best,
		maxScore : scores.best,
		error    : 0
	}
}

export default keyphraseDensity