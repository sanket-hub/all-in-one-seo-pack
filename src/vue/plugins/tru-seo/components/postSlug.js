import TruSeo from '@/vue/plugins/tru-seo'
import store from '@/vue/store'
import { cleanForSlug } from '@/vue/utils/cleanForSlug'
import { getPostEditedContent } from './postContent'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor, isClassicNoEditor, isElementorEditor, isDiviEditor, isSeedProdEditor } from '@/vue/utils/context'
import { getEditorData as getElementorData } from '@/vue/standalone/elementor/helpers'
import { getEditorData as getDiviData } from '@/vue/standalone/divi/helpers'
import { getEditorData as getSeedProdData } from '@/vue/standalone/seedprod/helpers'

/**
 * Returns the post slug from page builders.
 *
 * @returns {string} Post Slug.
 */
const getEditorSlug = () => {
	let postSlug = ''

	if (isElementorEditor()) {
		postSlug = getElementorData().slug
	}

	if (isDiviEditor()) {
		postSlug = getDiviData().slug
	}

	if (isSeedProdEditor()) {
		postSlug = getSeedProdData().slug
	}

	return postSlug
}

/**
 * Returns the stored post slug.
 *
 * @returns {string} Post Slug
 */
export const getPostSlug = () => {
	if (store.state['live-tags'].permalinkSlug) {
		return store.state['live-tags'].permalinkSlug
	}

	let postSlug = ''

	if (isClassicEditor() || isClassicNoEditor()) {
		const classicSlug = document.querySelector('#post_name')
		if (classicSlug) {
			postSlug = cleanForSlug(classicSlug.value)
		}
	}

	if (isBlockEditor()) {
		postSlug = window.wp.data.select('core/editor').getCurrentPost().slug
	}

	if (!postSlug) {
		postSlug = getEditorSlug()
	}

	if (postSlug) {
		store.commit('live-tags/updatePermalinkSlug', postSlug)
	}

	return postSlug
}

/**
 * Returns the edited post slug.
 *
 * @returns {string} Post slug
 */
export const getPostEditedSlug = () => {
	let postSlug = ''

	if (isClassicEditor() || isClassicNoEditor()) {
		const classicSlug = document.querySelector('#post_name')
		if (classicSlug) {
			postSlug = cleanForSlug(classicSlug.value)
		}
	}

	if (isBlockEditor()) {
		postSlug = window.wp.data.select('core/editor').getEditedPostAttribute('slug')
	}

	if (isElementorEditor()) {
		const postTitle = window.elementor.settings.page.model.get('post_title')
		if (postTitle) {
			postSlug = cleanForSlug(postTitle)
		}
	}

	if (!postSlug) {
		postSlug = getEditorSlug()
	}

	return postSlug
}

export const maybeUpdatePostSlug = async (run = true) => {
	let postSlug      = getPostSlug()
	const newPostSlug = getPostEditedSlug()
	if (postSlug !== newPostSlug) {
		postSlug = newPostSlug
		store.commit('live-tags/updatePermalinkSlug', postSlug)
		if (run) {
			(new TruSeo()).runAnalysis({
				postId   : store.state.currentPost.id,
				postData : { ...store.state.currentPost },
				content  : getPostEditedContent(),
				slug     : getPostEditedPermalink()
			})
		}
	}
}