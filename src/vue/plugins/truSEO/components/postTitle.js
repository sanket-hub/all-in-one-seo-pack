import Vue from 'vue'
import store from '@/vue/store'
import { getPostEditedContent } from './postContent'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor, isElementorEditor, isDiviEditor, isSeedProdEditor } from '@/vue/utils/context'
import { getEditorData as getElementorData } from '@/vue/standalone/elementor/helpers'
import { getEditorData as getDiviData } from '@/vue/standalone/divi/helpers'
import { getEditorData as getSeedProdData } from '@/vue/standalone/seedprod/helpers'

/**
 * Returns the post title from page builders.
 *
 * @returns {string} Post Title.
 */
const getEditorTitle = () => {
	let postTitle = ''

	if (isElementorEditor()) {
		postTitle = getElementorData().title
	}

	if (isDiviEditor()) {
		postTitle = getDiviData().title
	}

	if (isSeedProdEditor()) {
		postTitle = getSeedProdData().title
	}

	return postTitle
}

/**
 * Returns the stored post title.
 *
 * @returns {string} Post
 */
export const getPostTitle = () => {
	if (store.state['live-tags'].liveTags.post_title) {
		return store.state['live-tags'].liveTags.post_title
	}

	let postTitle

	if (isClassicEditor()) {
		const titleInput = document.querySelector('#post input#title')
		postTitle = titleInput ? titleInput.value : ''
	}

	if (isBlockEditor()) {
		postTitle = window.wp.data.select('core/editor').getCurrentPost().title
	}

	if (!postTitle) {
		postTitle = getEditorTitle()
	}

	if (postTitle) {
		store.commit('live-tags/updatePostTitle', postTitle)
	}

	return postTitle
}

/**
 * Returns the edited post title.
 *
 * @returns {string} Post Title
 */
export const getPostEditedTitle = () => {
	let postTitle

	if (isClassicEditor()) {
		const titleInput = document.querySelector('#post input#title')
		postTitle = titleInput ? titleInput.value : ''
	}

	if (isBlockEditor()) {
		postTitle = window.wp.data.select('core/editor').getEditedPostAttribute('title')
	}

	if (!postTitle) {
		postTitle = getEditorTitle()
	}

	return postTitle
}

// Update post data
export const maybeUpdatePostTitle = async (run = true) => {
	let postTitle      = getPostTitle()
	const newPostTitle = getPostEditedTitle()

	if (postTitle !== newPostTitle) {
		postTitle = newPostTitle
		store.commit('live-tags/updatePostTitle', postTitle)
		if (run) {
			Vue.prototype.$truSEO.runAnalysis({
				postId   : store.state.currentPost.id,
				postData : { ...store.state.currentPost },
				content  : getPostEditedContent(),
				slug     : getPostEditedPermalink()
			})
		}
	}
}