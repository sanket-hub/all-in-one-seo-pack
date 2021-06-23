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

export const isBlockEditor = () => {
	return document.body.classList.contains('block-editor-page') && window.wp.data
}

export const isClassicEditor = () => {
	if (document.querySelector('#wp-content-wrap.tmce-active')) {
		return true
	}
	if (document.querySelector('#wp-content-wrap.html-active')) {
		return true
	}
	return false
}

export const isWooCommerceProduct = () => {
	return (window.aioseo.data.isWooCommerceActive && 'product' === window.aioseo.currentPost.postType)
}

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
	const postType = window.aioseo.screen.postType
	const showScore = !!(
		window.aioseo.options.advanced &&
		window.aioseo.options.advanced.truSeo &&
		window.aioseo.options.searchAppearance.dynamic.postTypes[postType] &&
		window.aioseo.options.searchAppearance.dynamic.postTypes[postType].advanced &&
		window.aioseo.options.searchAppearance.dynamic.postTypes[postType].advanced.showMetaBox
	)
	return (
		shouldShowMetaBox() ||
		showScore
	)
}

export const shouldShowMetaBox = () => {
	if (!window.aioseo.currentPost || !window.aioseo.currentPost.id) {
		return false
	}
	const postType = window.aioseo.currentPost.postType
	const taxonomy = window.aioseo.currentPost.termType
	const showForPost = !!(
		postType &&
		'post' === window.aioseo.currentPost.context &&
		window.aioseo.options.searchAppearance.dynamic.postTypes[postType] &&
		window.aioseo.options.searchAppearance.dynamic.postTypes[postType].advanced &&
		window.aioseo.options.searchAppearance.dynamic.postTypes[postType].advanced.showMetaBox
	)
	const showForTerm = !!(
		taxonomy &&
		'term' === window.aioseo.currentPost.context &&
		window.aioseo.options.searchAppearance.dynamic.taxonomies[taxonomy] &&
		window.aioseo.options.searchAppearance.dynamic.taxonomies[taxonomy].advanced &&
		window.aioseo.options.searchAppearance.dynamic.taxonomies[taxonomy].advanced.showMetaBox
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