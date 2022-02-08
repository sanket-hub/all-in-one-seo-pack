import { analyzers } from './analysis'
import { isBlockEditor, getPostEditedContent, getPostEditedPermalink, getPostEditedTitle } from '@/vue/plugins/truSEO/components'

import store from '@/vue/store'
import forEach from 'lodash/forEach'

class TruSEO {
	postId                = null
	postTitle             = null
	postParsedTitle       = null
	postParsedDescription = null
	postDescription       = null
	keyphrases            = null
	postContent           = null
	postSlug              = null
	isAnalyzing           = false

	constructor () {
		this.initAnalysis()
	}

	initAnalysis () {
		this.analysis = analyzers
	}

	setSidebarButtonScore (score) {
		const button      = document.getElementById('aioseo-post-settings-sidebar-button')
		const postScore   = document.getElementById('aioseo-post-score')
		if (!button || !postScore) {
			return
		}
		button.className  = 80 < score ? 'score-green' : 50 < score ? 'score-orange' : 'score-red'
		if (!isBlockEditor()) {
			button.classList.add('aioseo-score-button', 'classic-editor')
			score = `${score}/100`
		}
		postScore.textContent = score
	}

	async calculateScore (element) {
		let scoreCounter    = 0,
			maxScoreCounter = 0,
			scorePercentage = 0

		forEach(element, analysis => {
			if (analysis.title && 0 <= analysis.score) {
				scoreCounter    += analysis.score
				maxScoreCounter += analysis.maxScore
			}
		})
		if (maxScoreCounter) {
			scorePercentage =  Math.round((scoreCounter * 100) / maxScoreCounter)
		}
		return scorePercentage
	}

	async calculateErrors (element) {
		let errorCounter = 0

		forEach(element, analysis => {
			if (0 < analysis.error) {
				errorCounter++
			}
		})
		return errorCounter
	}

	hasKeyphrases () {
		return this.hasFocusKeyphrase() || this.hasAdditionalKeyphrases()
	}

	hasFocusKeyphrase () {
		return !!(
			this.keyphrases &&
			this.keyphrases.focus &&
			this.keyphrases.focus.keyphrase
		)
	}

	hasAdditionalKeyphrases () {
		return !!(
			this.keyphrases &&
			this.keyphrases.additional &&
			this.keyphrases.additional.length
		)
	}

	parseTags (string) {
		if (!string) {
			return string
		}

		window.aioseo.tags.tags.forEach(tag => {
			// Pattern explained: Exact match of tag, not followed by any additional letter, number or underscore.
			// This allows us to have tags like: #post_link and #post_link_alt
			// and it will always replace the correct one.
			const regex = new RegExp(`#${tag.id}(?![a-zA-Z0-9_])`, 'g')

			// If this is the separator, use the most recent value from the props.
			if ('separator_sa' === tag.id && undefined !== this.separator) {
				string = string.replace(regex, this.separator)
			}

			string = string.replace(regex, tag.value)
		})

		return string.replace(/<(?:.|\n)*?>/gm, ' ').replace(/\s/g, ' ')
	}

	/**
	 * Runs the content analysis.
	 *
	 * @param {int}     postId       The Post ID.
	 * @param {boolean} useSavedData Use saved data. Or not.
	 * @param {Object}  postData     The postData of the currentPost.
	 * @param {string}  content      The post content.
	 * @param {string}  slug         The post slug.
	 *
	 * @returns {null} Returns nothing.
	 */
	async runAnalysis (
		{
			postId,
			useSavedData = false,
			postData = { ...store.state.currentPost },
			content = getPostEditedContent(),
			slug = getPostEditedPermalink()
		}
	) {
		if (
			!store.state.options.advanced ||
			!store.state.options.advanced.truSeo ||
			!store.state.currentPost.page_analysis ||
			this.isAnalyzing
		) {
			return
		}

		this.isAnalyzing           = true
		this.postId                = postId
		this.postContent           = content
		this.postSlug              = slug
		this.postTitle             = postData.title || postData.metaDefaults.title || '#post_title'
		this.postParsedTitle       = this.parseTags(this.postTitle)
		this.postDescription       = postData.description || postData.metaDefaults.description
		this.postParsedDescription = this.parseTags(this.postDescription)
		this.keyphrases            = (postData.keyphrases) ? postData.keyphrases : null

		// Analysis Actions
		if (useSavedData) {
			await this.runAnalysisActions({ postId, postData })
		} else {
			await this.runAnalysisActions({ postId, postData, updatePost: false })
		}
		this.isAnalyzing = false
	}

	async runAnalysisActions ({ postId, updatePost = true, postData }) {
		const focusKeyphrase = this.hasFocusKeyphrase() ? this.keyphrases.focus.keyphrase : null
		const pageAnalysis   = await this.runPageAnalysis({ postId, focusKeyphrase, currentPost: postData })

		postData.seo_score      = pageAnalysis.seo_score
		postData.page_analysis  = pageAnalysis.page_analysis

		// Keyphrase Analysis.
		if (this.hasKeyphrases()) {
			if (this.hasFocusKeyphrase()) {
				const focusAnalysis       = await this.runFocusAnalysis({ postId, keyphrase: this.keyphrases.focus.keyphrase, currentPost: postData })
				postData.keyphrases.focus = focusAnalysis.keyphrases.focus
			}
			if (this.hasAdditionalKeyphrases()) {
				const additionalAnalysis = []
				this.keyphrases.additional.map(async (keyphrase, index) => {
					additionalAnalysis.push(await this.runAdditionalAnalysis({ postId, keyphrase: keyphrase.keyphrase, index, currentPost: postData }))
				})
				additionalAnalysis.forEach((additional, index) => {
					postData.keyphrases.additional.push(additional.keyphrases.additional[index])
				})
			}
			if (updatePost) {
				store.dispatch('updateKeyphrases', { postId, keyphrases: postData.keyphrases, page_analysis: postData.page_analysis, seo_score: postData.seo_score })
			}
		}

		// Page Analysis.
		if (updatePost) {
			store.dispatch('saveCurrentPost', postData)
		}
		return postData
	}

	async runFocusAnalysis ({ postId, keyphrase, currentPost }) {
		const focusAnalysis = {}

		focusAnalysis.keyphraseInTitle = analyzers.keyphraseInTitle(this.postParsedTitle, keyphrase)
		focusAnalysis.keyphraseInDescription = analyzers.keyphraseInDescription(this.postParsedDescription, keyphrase, 'focus')
		focusAnalysis.keyphraseLength = analyzers.keyphraseLength(keyphrase, 'focus')

		// Skip this if we're dealing with the static homepage.
		if (postId !== window.aioseo.data.staticHomePage) {
			focusAnalysis.keyphraseInURL = analyzers.keyphraseInURL(this.postSlug, keyphrase)
		}

		if (this.postContent) {
			focusAnalysis.keyphraseInIntroduction = analyzers.keyphraseInIntroduction(this.postContent, keyphrase, 'focus')
			focusAnalysis.keyphraseInSubHeadings = analyzers.keyphraseInSubHeadings(this.postContent, keyphrase)
			focusAnalysis.keyphraseInImageAlt = analyzers.keyphraseInImageAlt(this.postContent, keyphrase, 'focus')
			// focus.keyphraseDensity = analyzers.keyphraseDensity(this.postContent, keyphrase, 'focus')
		}

		const keyphraseScore = await this.calculateScore(focusAnalysis)
		// const focusAnalysis = focusAnalysis
		if (window.aioseo.currentPost.id) {
			currentPost.keyphrases.focus.analysis = focusAnalysis
			currentPost.keyphrases.focus.score    = keyphraseScore
			currentPost.loading.focus = false
			return currentPost
		} else {
			window.aioseo.currentPost = null
			currentPost = {
				postId     : postId,
				keyphrases : {
					focus : {
						keyphrase : keyphrase,
						score     : keyphraseScore,
						analysis  : focusAnalysis
					}
				}
			}
			return currentPost
		}
	}

	async runAdditionalAnalysis ({ postId, keyphrase, index, currentPost }) {
		const additionalAnalysis = {}

		additionalAnalysis.keyphraseInDescription = analyzers.keyphraseInDescription(this.postParsedDescription, keyphrase)
		additionalAnalysis.keyphraseLength = analyzers.keyphraseLength(keyphrase)

		if (this.postContent) {
			additionalAnalysis.keyphraseInIntroduction = analyzers.keyphraseInIntroduction(this.postContent, keyphrase)
			additionalAnalysis.keyphraseInImageAlt = analyzers.keyphraseInImageAlt(this.postContent, keyphrase)
			// additionalAnalysis.keyphraseDensity = analyzers.keyphraseDensity(this.postContent, keyphrase)
		}

		const additionalAnalysisScore = await this.calculateScore(additionalAnalysis)
		const keyphraseAnalysisResults = {}
		// const additionalAnalysis = additionalAnalysis

		if (window.aioseo.currentPost.id) {
			currentPost.keyphrases.additional[index].analysis = additionalAnalysis
			currentPost.keyphrases.additional[index].score = additionalAnalysisScore
			currentPost.loading.additional[index] = false
		} else {
			currentPost.postId                 = postId
			currentPost.keyphrases             = { additional: [] }
			keyphraseAnalysisResults.keyphrase = keyphrase
			keyphraseAnalysisResults.analysis  = additionalAnalysis
			keyphraseAnalysisResults.score     = additionalAnalysisScore
			currentPost.keyphrases.additional.push(keyphraseAnalysisResults)
		}
		return currentPost
	}

	async runPageAnalysis ({ focusKeyphrase, currentPost }) {
		const title = {}
		let basic = {},
			readability = {},
			pagePercentage = 100

		if (!getPostEditedTitle()) {
			return currentPost
		}

		if (this.hasFocusKeyphrase()) {
			basic.keyphraseInContent = analyzers.keyphraseInContent(this.postContent, focusKeyphrase)
			basic.keyphraseInIntroduction = analyzers.keyphraseInIntroduction(this.postContent, focusKeyphrase, 'focus')
			basic.keyphraseInDescription = analyzers.keyphraseInDescription(this.postParsedDescription, focusKeyphrase, 'focus')
			basic.keyphraseInURL = analyzers.keyphraseInURL(this.postSlug, focusKeyphrase)
			basic.keyphraseLength = analyzers.keyphraseLength(focusKeyphrase, 'focus')
			title.keyphraseInTitle = analyzers.keyphraseInTitle(this.postParsedTitle, focusKeyphrase)
			title.keyphraseInBeginningTitle = analyzers.keyphraseInBeginningTitle(this.postParsedTitle, focusKeyphrase)
		}

		title.titleLength = analyzers.titleLength(this.postParsedTitle)
		// title.titleHasNumber = analyzers.titleHasNumber(this.postParsedTitle)
		// title.titleHasPowerWords = analyzers.titleHasPowerWords(this.postParsedTitle)
		// title.titleSentiment = analyzers.titleSentiment(this.postParsedTitle)

		basic.metadescriptionLength = analyzers.metadescriptionLength(this.postParsedDescription)
		basic.lengthContent = analyzers.lengthContent(this.postContent)
		basic.isInternalLink = analyzers.isInternalLink(this.postContent)
		basic.isExternalLink = analyzers.isExternalLink(this.postContent)
		// basic.isExternalLinkNoFollow = analyzers.isExternalLinkNoFollow(this.postContent)

		readability.contentHasAssets = analyzers.contentHasAssets(this.postContent)
		readability.paragraphLength = analyzers.paragraphLength(this.postContent)
		readability.sentenceLength = analyzers.sentenceLength(this.postContent)
		readability.passiveVoice = analyzers.passiveVoice(this.postContent)
		readability.transitionWords = analyzers.transitionWords(this.postContent)
		readability.consecutiveSentences = analyzers.consecutiveSentences(this.postContent)
		readability.subheadingsDistribution = analyzers.subheadingsDistribution(this.postContent)
		readability.calculateFleschReading = analyzers.calculateFleschReading(this.postContent)

		const basicAnalysisScore = await this.calculateScore(basic)
		const titleAnalysisScore = await this.calculateScore(title)
		const readabilityAnalysisScore = await this.calculateScore(readability)
		basic.errors = await this.calculateErrors(basic)
		title.errors = await this.calculateErrors(title)
		readability.errors = await this.calculateErrors(readability)

		if (getPostEditedTitle() && !this.postContent) {
			pagePercentage = Math.floor(titleAnalysisScore)
			basic = {}
			readability = {}

			basic.lengthContent = analyzers.lengthContent(this.postContent)
			readability.contentHasAssets = analyzers.contentHasAssets(this.postContent)
		} else {
			pagePercentage = Math.floor((basicAnalysisScore + titleAnalysisScore + readabilityAnalysisScore) / 3)
		}

		const pageAnalysis = { basic, title, readability }

		currentPost.page_analysis.analysis = pageAnalysis
		currentPost.seo_score              = pagePercentage
		if ('attachment' !== window.aioseo.currentPost.postType && getPostEditedTitle()) {
			this.setSidebarButtonScore(pagePercentage)
		}
		store.dispatch('updateState', currentPost)

		return currentPost
	}
}

export default TruSEO