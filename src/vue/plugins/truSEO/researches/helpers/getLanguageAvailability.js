import indexOf from 'lodash/indexOf'

import getLanguage from './getLanguage.js'

/**
 * Checks whether the language of the locale is available.
 *
 * @param {string} locale The locale to get the language from.
 * @param {Array} languages The list of languages to match.
 * @returns {boolean} Returns true if the language is found in the array.
 */
export default function (locale, languages) {
	var language = getLanguage(locale)
	return -1 < indexOf(languages, language)
}