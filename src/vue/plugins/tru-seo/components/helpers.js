import { debounce } from '@/vue/utils/debounce'

// Importing these directly to avaoid circular dependencies.
import { maybeUpdatePostTitle } from './postTitle'
import { maybeUpdatePostContent } from './postContent'
import { maybeUpdatePostExcerpt } from './postExcerpt'
import { maybeUpdatePostSlug } from './postSlug'
import { maybeUpdatePermalink } from './postPermalink'
import { maybeUpdateTaxonomies } from './taxonomies'
import { maybeUpdateTerm } from './term'
import { maybeUpdateAttachment } from './attachments'

import TruSeo from '@/vue/plugins/tru-seo'
import store from '@/vue/store'

export {
	isBlockEditor,
	isClassicEditor,
	isClassicNoEditor,
	isWooCommerceProduct
} from '@/vue/utils/context'

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

	return !!(
		window.aioseo.options.advanced &&
		window.aioseo.options.advanced.truSeo &&
		shouldShowMetaBox(window.aioseo.screen.postType)
	)
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
			(new TruSeo()).runAnalysis({ postId: store.state.currentPost.id })
		}
	}, time)
}