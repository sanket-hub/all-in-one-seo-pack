import Vue from 'vue'
import store from '@/vue/store'
import { cleanForSlug } from '@/vue/utils/cleanForSlug'
import { getPostEditedContent } from './postContent'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor  } from './helpers'

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
	if (isClassicEditor()) {
		const classicSlug = document.querySelector('#post_name')
		if (classicSlug) {
			postSlug = cleanForSlug(classicSlug.value)
		}
	}
	if (isBlockEditor()) {
		postSlug = window.wp.data.select('core/editor').getCurrentPost().slug
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
	if (isClassicEditor()) {
		const classicSlug = document.querySelector('#post_name')
		if (classicSlug) {
			postSlug = cleanForSlug(classicSlug.value)
		}
	}
	if (isBlockEditor()) {
		postSlug = window.wp.data.select('core/editor').getEditedPostAttribute('slug')
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
			Vue.prototype.$truSEO.runAnalysis({
				postId   : store.state.currentPost.id,
				postData : { ...store.state.currentPost },
				content  : getPostEditedContent(),
				slug     : getPostEditedPermalink()
			})
		}
	}
}