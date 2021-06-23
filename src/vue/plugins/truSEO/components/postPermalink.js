import Vue from 'vue'
import store from '@/vue/store'
import { getPostEditedContent } from './postContent'
import { isBlockEditor, isClassicEditor  } from './helpers'

/**
 * Returns the stored post permalink.
 *
 * @returns {string} Post Permalink
 */
export const getPostPermalink = () => {
	if (store.state['live-tags'].liveTags.permalink) {
		return store.state['live-tags'].liveTags.permalink
	}

	let postPermalink
	if (isClassicEditor()) {
		const classicLink = document.querySelector('#editable-post-name')
		if (classicLink && classicLink.parentElement.href) {
			postPermalink = classicLink.parentElement.href
		}
	}
	if (isBlockEditor()) {
		postPermalink = window.wp.data.select('core/editor').getPermalink()
	}

	if (postPermalink) {
		store.commit('live-tags/updatePermalink', postPermalink)
	}
	return postPermalink
}

/**
 * Returns the edited post permalink.
 *
 * @returns {string} Post permalink
 */
export const getPostEditedPermalink = () => {
	let postPermalink
	if (isClassicEditor()) {
		const classicLink = document.querySelector('#editable-post-name')
		if (classicLink && classicLink.parentElement.href) {
			postPermalink = classicLink.parentElement.href
		}
	}
	if (isBlockEditor()) {
		postPermalink = window.wp.data.select('core/editor').getPermalink()
	}
	return postPermalink
}

export const maybeUpdatePermalink = async (run = true) => {
	let postPermalink = getPostPermalink()
	const newPermalink = getPostEditedPermalink()
	if (postPermalink !== newPermalink) {
		postPermalink = newPermalink
		if (postPermalink) {
			store.commit('live-tags/updatePermalink', postPermalink)
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
}