import checkTooLongSentences from '../researches/stringProcessing/checkForTooLongSentences'
import countSentencesFromText from '../researches/helpers/countSentencesFromText'
import formatNumber from '../researches/helpers/formatNumber'
import { __, sprintf } from '@wordpress/i18n'
const td = process.env.VUE_APP_TEXTDOMAIN

const parameters = {
	recommendedWordCount : 20,
	slightlyTooMany      : 25,
	farTooMany           : 30
}
const scores = {
	incorrect       : 3,
	slightlyCorrect : 6,
	correctLength   : 9
}

function calculatePercentage (sentences) {
	let percentage = 0

	if (0 !== sentences.length) {
		const tooLongTotal = countTooLongSentences(sentences)

		percentage = formatNumber((tooLongTotal / sentences.length) * 100)
	}

	return percentage
}

function getTooLongSentences (sentences) {
	return checkTooLongSentences(sentences, parameters.recommendedWordCount)
}

function countTooLongSentences (sentences) {
	return getTooLongSentences(sentences).length
}

function sentenceLength (content) {
	if (!content) {
		return {}
	}

	const sentenceCount = countSentencesFromText(content)
	const percentage    = calculatePercentage(sentenceCount)

	// const sentenceObjects = getTooLongSentences(sentenceCount)  @TODO: [V4+] Get sentences that need improvement

	if (percentage <= parameters.slightlyTooMany) {
		return {
			title       : __('Sentences Length', td),
			description : __('Sentence length is looking great!', td),
			score       : scores.correctLength,
			maxScore    : scores.correctLength,
			error       : 0
		}
	}

	return {
		title       : __('Sentences Length', td),
		// Translators: 1 - Number of the sentences, 2 - Number of words, 3 - Recommended maximum of words.
		description : sprintf(__('%1$s of the sentences contain more than %2$s words, which is more than the recommended maximum of %3$s. Try to shorten the sentences.', td), `${percentage}%`, parameters.recommendedWordCount, `${parameters.slightlyTooMany}%`),
		score       : scores.slightlyCorrect,
		maxScore    : scores.correctLength,
		error       : 1
	}
}

export default sentenceLength