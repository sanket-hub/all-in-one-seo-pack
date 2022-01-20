import { debounce } from '@/vue/utils/debounce'
import {
	maybeUpdatePostTitle,
	maybeUpdatePostContent,
	maybeUpdatePostExcerpt,
	maybeUpdatePostSlug,
	maybeUpdatePermalink,
	maybeUpdateTaxonomies,
	maybeUpdateTerm,
	maybeUpdateAttachment
} from './index.js'

import Vue from 'vue'
import store from '@/vue/store'

import { isBlockEditor, isClassicEditor, isWooCommerceProduct } from '@/vue/utils/context'
export { isBlockEditor, isClassicEditor, isWooCommerceProduct }

export const truSeoShouldAnalyze = () => {
	if (!window.aioseo.currentPost || !window.aioseo.currentPost.id) {
		return false
	}
	return (
		window.aioseo.options.advanced &&
		window.aioseo.options.advanced.truSeo &&
		!window.aioseo.currentPost.isSpecialPage &&
		'attachment' !== window.aioseo.currentPost.postType &&
		shouldShowMetaBox()
	)
}

export const shouldShowTruSeoScore = () => {
	if (!window.aioseo.screen || !window.aioseo.screen.postType) {
		return false
	}

	const showScore = !!(
		window.aioseo.options.advanced &&
		window.aioseo.options.advanced.truSeo &&
		shouldShowMetaBox(window.aioseo.screen.postType)
	)
	return showScore
}

export const shouldShowMetaBox = (postType = null) => {
	if (postType) {
		return !!(
			window.aioseo.dynamicOptions.searchAppearance.postTypes[postType] &&
			window.aioseo.dynamicOptions.searchAppearance.postTypes[postType].advanced &&
			window.aioseo.dynamicOptions.searchAppearance.postTypes[postType].advanced.showMetaBox
		)
	}

	if (!window.aioseo.currentPost || !window.aioseo.currentPost.id) {
		return false
	}
	const pt       = window.aioseo.currentPost.postType
	const taxonomy = window.aioseo.currentPost.termType
	const showForPost = !!(
		pt &&
		'post' === window.aioseo.currentPost.context &&
		window.aioseo.dynamicOptions.searchAppearance.postTypes[pt] &&
		window.aioseo.dynamicOptions.searchAppearance.postTypes[pt].advanced &&
		window.aioseo.dynamicOptions.searchAppearance.postTypes[pt].advanced.showMetaBox
	)
	const showForTerm = !!(
		taxonomy &&
		'term' === window.aioseo.currentPost.context &&
		window.aioseo.dynamicOptions.searchAppearance.taxonomies[taxonomy] &&
		window.aioseo.dynamicOptions.searchAppearance.taxonomies[taxonomy].advanced &&
		window.aioseo.dynamicOptions.searchAppearance.taxonomies[taxonomy].advanced.showMetaBox
	)

	return showForPost || showForTerm
}

export const maybeUpdatePost = async (time = 900, run = true) => {
	debounce(async () => {
		await maybeUpdatePostTitle(false)
		await maybeUpdatePostContent(false)
		await maybeUpdatePostExcerpt(false)
		await maybeUpdatePostSlug(false)
		await maybeUpdatePermalink(false)
		maybeUpdateTaxonomies(false)
		maybeUpdateTerm(false)
		maybeUpdateAttachment(false)

		if (run) {
			Vue.prototype.$truSEO.runAnalysis({ postId: store.state.currentPost.id })
		}
	}, time)
}