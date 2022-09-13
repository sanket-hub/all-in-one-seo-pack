import Vue from 'vue'
import store from '@/vue/store'
import { getPostEditedContent } from './postContent'
import { isBlockEditor, isClassicEditor, isClassicNoEditor, isElementorEditor, isDiviEditor, isSeedProdEditor } from '@/vue/utils/context'
import { getEditorData as getElementorData } from '@/vue/standalone/elementor/helpers'
import { getEditorData as getDiviData } from '@/vue/standalone/divi/helpers'
import { getEditorData as getSeedProdData } from '@/vue/standalone/seedprod/helpers'

/**
 * Returns the post permalink from page builders.
 *
 * @returns {string} Post Permalink.
 */
const getEditorPermalink = () => {
	let postPermalink = ''

	if (isElementorEditor()) {
		postPermalink = getElementorData().permalink
	}

	if (isDiviEditor()) {
		postPermalink = getDiviData().permalink
	}

	if (isSeedProdEditor()) {
		postPermalink = getSeedProdData().permalink
	}

	return postPermalink
}

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

	if (isClassicEditor() || isClassicNoEditor) {
		const classicLink = document.querySelector('#edit-slug-box a')
		if (classicLink && classicLink.href) {
			postPermalink = classicLink.href
		}
	}

	if (isBlockEditor()) {
		postPermalink = window.wp.data.select('core/editor').getPermalink()
	}

	if (!postPermalink) {
		postPermalink = getEditorPermalink()
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

	if (isClassicEditor() || isClassicNoEditor) {
		const classicLink = document.querySelector('#edit-slug-box a')
		if (classicLink && classicLink.href) {
			postPermalink = classicLink.href
		}
	}

	if (isBlockEditor()) {
		postPermalink = window.wp.data.select('core/editor').getPermalink()
	}

	if (!postPermalink) {
		postPermalink = getEditorPermalink()
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
				Vue.prototype.$truSeo.runAnalysis({
					postId   : store.state.currentPost.id,
					postData : { ...store.state.currentPost },
					content  : getPostEditedContent(),
					slug     : getPostEditedPermalink()
				})
			}
		}
	}
}