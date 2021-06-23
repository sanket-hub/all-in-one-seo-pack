import getSentences from "../stringProcessing/getSentences";

/**
 * Returns the sentences from a paper.
 *
 * @param {Paper} paper The paper to analyze.
 *
 * @returns {Array} Sentences found in the paper.
 */
export default function( text ) {
	return getSentences( text );
}
