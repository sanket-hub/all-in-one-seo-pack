import Vue from 'vue'
import store from '@/vue/store'
import { getPostEditedContent } from './postContent'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor  } from './helpers'

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
	return postExcerpt
}

export const maybeUpdatePostExcerpt = async (run = true) => {
	let postExcerpt   = getPostExcerpt()
	const newPostExcerpt = getPostEditedExcerpt()
	if (postExcerpt !== newPostExcerpt) {
		postExcerpt = newPostExcerpt
		store.commit('live-tags/updatePostExcerpt', postExcerpt)
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