import includes from 'lodash/includes'
import { __ } from '@wordpress/i18n'
const td = process.env.VUE_APP_TEXTDOMAIN

const scores = {
	noMatches : 1,
	matches   : 5
}

function removePunctuation (keyphrase) {
	const pattern = new RegExp('\\p{P}', 'gmu')
	return keyphrase.replace(pattern, '')
}

function keyphraseInURL (url, keyphrase) {
	if (!url) {
		return {}
	}

	const permalink = url.replace(/\s/g, '-')
	const keyphraseLower = removePunctuation(keyphrase)
		.toLowerCase()
		.replace(/\s/g, '-')
	const hasKeyword = includes(permalink, keyphraseLower)

	if (hasKeyword) {
		return {
			title       : __('Focus Keyphrase in URL', td),
			description : __('Focus Keyphrase used in the URL.', td),
			score       : scores.matches,
			maxScore    : scores.matches,
			error       : 0
		}
	}

	return {
		title       : __('Focus Keyphrase in URL', td),
		description : __('Focus Keyphrase not found in the URL.', td),
		score       : scores.noMatches,
		maxScore    : scores.matches,
		error       : 1
	}
}

export default keyphraseInURL