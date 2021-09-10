/** @module stringProcessing/countSyllables */

import syllableMatchers from '../../config/syllables.js'

import getWords from '../getWords.js'

import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'
import map from 'lodash/map'
import sum from 'lodash/sum'
import memoize from 'lodash/memoize'
import flatMap from 'lodash/flatMap'

import SyllableCountIterator from '../../helpers/syllableCountIterator.js'
import DeviationFragment from './DeviationFragment'

/**
 * Counts vowel groups inside a word.
 *
 * @param {string} word A text with words to count syllables.
 * @param {string} locale The locale to use for counting syllables.
 * @returns {number} the syllable count.
 */
var countVowelGroups = function (word, locale) {
		var numberOfSyllables = 0,
	 vowelRegex = new RegExp('[^' + syllableMatchers(locale).vowels + ']', 'ig'),
	 foundVowels = word.split(vowelRegex),
	 filteredWords = filter(foundVowels, function (vowel) {
				return '' !== vowel
			})
		numberOfSyllables += filteredWords.length

		return numberOfSyllables
	},

	/**
 * Counts the syllables using vowel exclusions. These are used for groups of vowels that are more or less
 * than 1 syllable.
 *
 * @param {string} word The word to count syllables of.
 * @param {string} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found in the given word.
 */
	countVowelDeviations = function (word, locale) {
		var syllableCountIterator = new SyllableCountIterator(syllableMatchers(locale))
		return syllableCountIterator.countSyllables(word)
	},

	/**
 * Returns the number of syllables for the word if it is in the list of full word deviations.
 *
 * @param {string} word The word to retrieve the syllables for.
 * @param {string} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found.
 */
	countFullWordDeviations = function (word, locale) {
		var fullWordDeviations = syllableMatchers(locale).deviations.words.full,

	 deviation = find(fullWordDeviations, function (fullWordDeviation) {
				return fullWordDeviation.word === word
			})

		if (!isUndefined(deviation)) {
			return deviation.syllables
		}

		return 0
	}

/**
 * Creates an array of deviation fragments for a certain locale.
 *
 * @param {Object} syllableConfig Syllable config for a certain locale.
 * @returns {DeviationFragment[]} A list of deviation fragments
 */
function createDeviationFragments (syllableConfig) {
	var deviationFragments = [],

	 deviations = syllableConfig.deviations

	if (!isUndefined(deviations.words) && !isUndefined(deviations.words.fragments)) {
		deviationFragments = flatMap(deviations.words.fragments, function (fragments, fragmentLocation) {
			return map(fragments, function (fragment) {
				fragment.location = fragmentLocation

				return new DeviationFragment(fragment)
			})
		})
	}

	return deviationFragments
}

var createDeviationFragmentsMemoized = memoize(createDeviationFragments),

	/**
 * Counts syllables in partial exclusions. If these are found, returns the number of syllables  found, and the modified word.
 * The word is modified so the excluded part isn't counted by the normal syllable counter.
 *
 * @param {string} word The word to count syllables of.
 * @param {string} locale The locale to use for counting syllables.
 * @returns {Object} The number of syllables found and the modified word.
 */
	countPartialWordDeviations = function (word, locale) {
		var deviationFragments = createDeviationFragmentsMemoized(syllableMatchers(locale)),
	 remainingParts = word,
	 syllableCount = 0

		forEach(deviationFragments, function (deviationFragment) {
			if (deviationFragment.occursIn(remainingParts)) {
				remainingParts = deviationFragment.removeFrom(remainingParts)
				syllableCount += deviationFragment.getSyllables()
			}
		})

		return { word: remainingParts, syllableCount: syllableCount }
	},

	/**
 * Count the number of syllables in a word, using vowels and exceptions.
 *
 * @param {string} word The word to count the number of syllables of.
 * @param {string} locale The locale to use for counting syllables.
 * @returns {number} The number of syllables found in a word.
 */
	countUsingVowels = function (word, locale) {
		var syllableCount = 0

		syllableCount += countVowelGroups(word, locale)
		syllableCount += countVowelDeviations(word, locale)

		return syllableCount
	},

	/**
 * Counts the number of syllables in a word.
 *
 * @param {string} word The word to count syllables of.
 * @param {string} locale The locale of the word.
 * @returns {number} The syllable count for the word.
 */
	countSyllablesInWord = function (word, locale) {
		var syllableCount = 0,

	 fullWordExclusion = countFullWordDeviations(word, locale)
		if (0 !== fullWordExclusion) {
			return fullWordExclusion
		}

		var partialExclusions = countPartialWordDeviations(word, locale)
		word = partialExclusions.word
		syllableCount += partialExclusions.syllableCount
		syllableCount += countUsingVowels(word, locale)

		return syllableCount
	},

	/**
 * Counts the number of syllables in a text per word based on vowels.
 * Uses exclusion words for words that cannot be matched with vowel matching.
 *
 * @param {string} text The text to count the syllables of.
 * @param {string} locale The locale to use for counting syllables.
 * @returns {int} The total number of syllables found in the text.
 */
	countSyllablesInText = function (text, locale) {
		text = text.toLocaleLowerCase()
		var words = getWords(text),

	 syllableCounts = map(words,  function (word) {
				return countSyllablesInWord(word, locale)
			})

		return sum(syllableCounts)
	}

export default countSyllablesInText