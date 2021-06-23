import transitionWordsEnglishFactory from "../english/transitionWords.js";
const transitionWordsEnglish = transitionWordsEnglishFactory().allWords;
import twoPartTransitionWordsEnglish from "../english/twoPartTransitionWords.js";

import transitionWordsGermanFactory from "../german/transitionWords.js";
const transitionWordsGerman = transitionWordsGermanFactory().allWords;
import twoPartTransitionWordsGerman from "../german/twoPartTransitionWords.js";

import transitionWordsFrenchFactory from "../french/transitionWords.js";
const transitionWordsFrench = transitionWordsFrenchFactory().allWords;
import twoPartTransitionWordsFrench from "../french/twoPartTransitionWords.js";

import transitionWordsSpanishFactory from "../spanish/transitionWords.js";
const transitionWordsSpanish = transitionWordsSpanishFactory().allWords;
import twoPartTransitionWordsSpanish from "../spanish/twoPartTransitionWords.js";

import transitionWordsDutchFactory from "../dutch/transitionWords.js";
const transitionWordsDutch = transitionWordsDutchFactory().allWords;
import twoPartTransitionWordsDutch from "../dutch/twoPartTransitionWords.js";

import transitionWordsItalianFactory from "../italian/transitionWords.js";
const transitionWordsItalian = transitionWordsItalianFactory().allWords;
import twoPartTransitionWordsItalian from "../italian/twoPartTransitionWords.js";

import transitionWordsPortugueseFactory from "../portuguese/transitionWords.js";
const transitionWordsPortuguese = transitionWordsPortugueseFactory().allWords;
import twoPartTransitionWordsPortuguese from "../portuguese/twoPartTransitionWords.js";

import transitionWordsRussianFactory from "../russian/transitionWords.js";
const transitionWordsRussian = transitionWordsRussianFactory().allWords;
import twoPartTransitionWordsRussian from "../russian/twoPartTransitionWords.js";

import transitionWordsCatalanFactory from "../catalan/transitionWords.js";
const transitionWordsCatalan = transitionWordsCatalanFactory().allWords;
import twoPartTransitionWordsCatalan from "../catalan/twoPartTransitionWords.js";

import transitionWordsPolishFactory from "../polish/transitionWords.js";
const transitionWordsPolish = transitionWordsPolishFactory().allWords;
import twoPartTransitionWordsPolish from "../polish/twoPartTransitionWords.js";
import transitionWordsSwedishFactory from "../swedish/transitionWords.js";
const transitionWordsSwedish = transitionWordsSwedishFactory().allWords;
import twoPartTransitionWordsSwedish from "../swedish/twoPartTransitionWords.js";

import transitionWordsHungarianFactory from "../hungarian/transitionWords.js";
const transitionWordsHungarian = transitionWordsHungarianFactory().allWords;
import twoPartTransitionWordsHungarian from "../hungarian/twoPartTransitionWords.js";

import transitionWordsIndonesianFactory from "../indonesian/transitionWords.js";
const transitionWordsIndonesian = transitionWordsIndonesianFactory().allWords;
import twoPartTransitionWordsIndonesian from "../indonesian/twoPartTransitionWords.js";

import getLanguage from "./getLanguage.js";

import transitionWordsArabicFactory from "../arabic/transitionWords.js";
const transitionWordsArabic = transitionWordsArabicFactory().allWords;
import twoPartTransitionWordsArabic from "../arabic/twoPartTransitionWords.js";

/**
 * Returns transition words for a specific locale.
 *
 * @param {string} locale The locale to return function words for.
 *
 * @returns {Object} The function words for a locale.
 */
export default function( locale ) {
	switch ( getLanguage( locale ) ) {
		case "de":
			return {
				transitionWords: transitionWordsGerman,
				twoPartTransitionWords: twoPartTransitionWordsGerman,
			};
		case "es":
			return {
				transitionWords: transitionWordsSpanish,
				twoPartTransitionWords: twoPartTransitionWordsSpanish,
			};
		case "fr":
			return {
				transitionWords: transitionWordsFrench,
				twoPartTransitionWords: twoPartTransitionWordsFrench,
			};
		case "nl":
			return {
				transitionWords: transitionWordsDutch,
				twoPartTransitionWords: twoPartTransitionWordsDutch,
			};
		case "it":
			return {
				transitionWords: transitionWordsItalian,
				twoPartTransitionWords: twoPartTransitionWordsItalian,
			};
		case "pt":
			return {
				transitionWords: transitionWordsPortuguese,
				twoPartTransitionWords: twoPartTransitionWordsPortuguese,
			};
		case "ru":
			return {
				transitionWords: transitionWordsRussian,
				twoPartTransitionWords: twoPartTransitionWordsRussian,
			};
		case "ca":
			return {
				transitionWords: transitionWordsCatalan,
				twoPartTransitionWords: twoPartTransitionWordsCatalan,
			};
		case "pl":
			return {
				transitionWords: transitionWordsPolish,
				twoPartTransitionWords: twoPartTransitionWordsPolish,
			};
		case "sv":
			return {
				transitionWords: transitionWordsSwedish,
				twoPartTransitionWords: twoPartTransitionWordsSwedish,
			};
		case "hu":
			return {
				transitionWords: transitionWordsHungarian,
				twoPartTransitionWords: twoPartTransitionWordsHungarian,
			};
		case "id":
			return {
				transitionWords: transitionWordsIndonesian,
				twoPartTransitionWords: twoPartTransitionWordsIndonesian,
			};
		case "ar":
			return {
				transitionWords: transitionWordsArabic,
				twoPartTransitionWords: twoPartTransitionWordsArabic,
			};
		default:
		case "en":
			return {
				transitionWords: transitionWordsEnglish,
				twoPartTransitionWords: twoPartTransitionWordsEnglish,
			};
	}
}
