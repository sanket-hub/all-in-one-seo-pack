import Vue from 'vue'
import store from '@/vue/store'
import { getPostContent, getPostEditedContent } from './postContent'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor, isElementorEditor, isDiviEditor, isSeedProdEditor } from '@/vue/utils/context'
import { getEditorData as getElementorData } from '@/vue/standalone/elementor/helpers'
import { getEditorData as getDiviData } from '@/vue/standalone/divi/helpers'
import { getEditorData as getSeedProdData } from '@/vue/standalone/seedprod/helpers'

/**
 * Retrieves the excerpt from the given content.
 *
 * @since 4.2.2
 *
 * @param {string} content The content to extract the excerpt.
 * @returns {string}       The excerpt.
 */
const excerptFromContent = (content) => {
	if (!content) {
		return ''
	}

	const cleanupPatterns = [
		/\[.*?\]/g, // WordPress shortcode tags.
		/<\/?[a-z][^>]*?>/gi, // HTML tags.
		/<!--[\s\S]*?-->/g, // HTML comments.
		/(\r\n|\n|\r)/g // Line breaks.
	]

	// Remove linebreak.
	content = content.replaceAll(/\n\n/g, ' ')

	cleanupPatterns.forEach(regex => {
		content = content.replace(regex, '')
	})

	return content.trim()
}

/**
 * Returns the post excerpt from page builders.
 *
 * @returns {string} Post Excerpt.
 */
const getEditorExcerpt = () => {
	let postExcerpt = ''

	if (isElementorEditor()) {
		postExcerpt = getElementorData().excerpt
	}

	if (isDiviEditor()) {
		postExcerpt = getDiviData().excerpt
	}

	if (isSeedProdEditor()) {
		postExcerpt = getSeedProdData().excerpt
	}

	return postExcerpt
}

/**
 * Returns the stored post excerpt.
 *
 * @returns {string} Post Excerpt
 */
export const getPostExcerpt = () => {
	if (store.state['live-tags'].liveTags.post_excerpt) {
		return store.state['live-tags'].liveTags.post_excerpt
	}

	let postExcerpt

	if (isClassicEditor()) {
		const classicExcerpt = document.querySelector('#postexcerpt textarea#excerpt')
		postExcerpt = classicExcerpt ? classicExcerpt.value : ''
	}

	if (isBlockEditor()) {
		postExcerpt = window.wp.data.select('core/editor').getCurrentPost().excerpt
	}

	if (!postExcerpt) {
		postExcerpt = getEditorExcerpt()
	}

	if (!postExcerpt) {
		postExcerpt = excerptFromContent(getPostContent())
	}

	if (postExcerpt) {
		store.commit('live-tags/updatePostExcerpt', postExcerpt)
	}
	return postExcerpt
}

/**
 * Returns the edited post excerpt.
 *
 * @returns {string} Post excerpt
 */
export const getPostEditedExcerpt = () => {
	let postExcerpt

	if (isClassicEditor()) {
		const classicExcerpt = document.querySelector('#postexcerpt textarea#excerpt')
		postExcerpt = classicExcerpt ? classicExcerpt.value : ''
	}

	if (isBlockEditor()) {
		postExcerpt = window.wp.data.select('core/editor').getEditedPostAttribute('excerpt')
	}

	if (!postExcerpt) {
		postExcerpt = getEditorExcerpt()
	}

	if (!postExcerpt) {
		postExcerpt = excerptFromContent(getPostEditedContent())
	}

	return postExcerpt
}

export const maybeUpdatePostExcerpt = async (run = true) => {
	let postExcerpt   = getPostExcerpt()
	const newPostExcerpt = getPostEditedExcerpt()
	if (postExcerpt !== newPostExcerpt) {
		postExcerpt = newPostExcerpt
		store.commit('live-tags/updatePostExcerpt', postExcerpt)
		if (run) {
			Vue.prototype.$truSeo.runAnalysis({
				postId   : store.state.currentPost.id,
				postData : { ...store.state.currentPost },
				content  : getPostEditedContent(),
				slug     : getPostEditedPermalink()
			})
		}
	}
}