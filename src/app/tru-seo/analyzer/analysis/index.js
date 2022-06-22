// @TODO: We may possibly add these back in, so let's leave for now.
import lengthContent from './lengthContent'
import keyphraseLength from './keyphraseLength'
import keyphraseInTitle from './keyphraseInTitle'
import keyphraseInBeginningTitle from './keyphraseBeginningTitle'
import keyphraseInDescription from './keyphraseInDescription'
import keyphraseInURL from './keyphraseInURL'
import keyphraseInContent from './keyphraseInContent'
import keyphraseInIntroduction from './keyphraseInIntroduction'
import keyphraseInSubHeadings from './keyphraseInSubHeadings'
import keyphraseInImageAlt from './keyphraseInImageAlt'
import titleLength from './titleLength'
import metadescriptionLength from './metadescriptionLength'
import contentHasAssets from './contentHasAssets'
import paragraphLength from './paragraphLength'
import sentenceLength from './sentenceLength'
import passiveVoice from './passiveVoice'
import transitionWords from './transitionWords'
import consecutiveSentences from './consecutiveSentences'
import subheadingsDistribution from './subheadingsDistribution'
import calculateFleschReading from './calculateFleschReading'
import isInternalLink from './isInternalLink'
import isExternalLink from './isExternalLink'
// import keyphraseDensity from './keyphraseDensity'
// import titleHasNumber from './titleHasNumber'
// import titleHasPowerWords from './titleHasPowerWords'
// import titleSentiment from './titleSentiment'
// import isExternalLinkNoFollow from './isExternalLinkNoFollow'

export const analyzers = {
	keyphraseInTitle,
	keyphraseInDescription,
	keyphraseInURL,
	keyphraseInIntroduction,
	keyphraseInSubHeadings,
	keyphraseInImageAlt,
	keyphraseInContent,
	keyphraseInBeginningTitle,
	keyphraseLength,
	// keyphraseDensity
	metadescriptionLength,
	lengthContent,
	isInternalLink,
	isExternalLink,
	// isExternalLinkNoFollow
	titleLength,
	// titleHasNumber,
	// titleHasPowerWords,
	// titleSentiment
	contentHasAssets,
	paragraphLength,
	sentenceLength,
	passiveVoice,
	transitionWords,
	consecutiveSentences,
	subheadingsDistribution,
	calculateFleschReading
}