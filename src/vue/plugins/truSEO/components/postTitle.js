import Vue from 'vue'
import store from '@/vue/store'
import { getPostEditedContent } from './postContent'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor  } from './helpers'

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