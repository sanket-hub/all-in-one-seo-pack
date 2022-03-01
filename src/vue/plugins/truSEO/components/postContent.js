import Vue from 'vue'
import store from '@/vue/store'
import { customFieldsContent } from './customFields'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor, isElementorEditor, isDiviEditor, isSeedProdEditor } from '@/vue/utils/context'
import { getEditorData as getElementorData } from '@/vue/standalone/elementor/helpers'
import { getEditorData as getDiviData } from '@/vue/standalone/divi/helpers'
import { getEditorData as getSeedProdData } from '@/vue/standalone/seedprod/helpers'

const base64regex = /base64,(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)/g

/**
 * Returns the post content from page builders.
 *
 * @returns {string} Post Content.
 */
const getEditorContent = () => {
	let postContent = ''

	if (isElementorEditor()) {
		postContent = getElementorData().content
	}

	if (isDiviEditor()) {
		postContent = getDiviData().content
	}

	if (isSeedProdEditor()) {
		postContent = getSeedProdData().content
	}

	return postContent
}

/**
 * Returns the stored post content.
 *
 * @returns {string} Post Content
 */
export const getPostContent = () => {
	if (store.state['live-tags'].liveTags.post_content) {
		return store.state['live-tags'].liveTags.post_content
	}

	let postContent = ''
	if (isClassicEditor()) {
		if (window.tinyMCE || document.querySelector('#wp-content-wrap.html-active')) {
			postContent = classicContent()
		} else {
			const classicInterval = window.setInterval(() => {
				if (window.tinyMCE) {
					window.clearInterval(classicInterval)
					postContent = classicContent()
				}
			}, 50)
		}
	}

	if (isBlockEditor()) {
		postContent = window.wp.data.select('core/editor').getCurrentPost().content
	}

	if (!postContent) {
		postContent = getEditorContent()
	}

	if (customFieldsContent()) {
		postContent = postContent + customFieldsContent()
	}

	// Replace base64 stuff, since we don't need it to analyze the content.
	postContent = postContent.replace(base64regex, '')

	if (postContent) {
		store.commit('live-tags/updatePostContent', postContent)
	}

	return postContent
}

/**
 * Returns the edited post content.
 *
 * @returns {string} Post content
 */
export const getPostEditedContent = () => {
	let postContent = ''
	if (isClassicEditor()) {
		if (window.tinyMCE || document.querySelector('#wp-content-wrap.html-active')) {
			postContent = classicContent()
		} else {
			const classicInterval = window.setInterval(() => {
				if (window.tinyMCE) {
					window.clearInterval(classicInterval)
					postContent = classicContent()
				}
			}, 50)
		}
	}
	if (isBlockEditor()) {
		postContent = window.wp.data.select('core/editor').getEditedPostContent()
	}

	if (!postContent) {
		postContent = getEditorContent()
	}

	if (customFieldsContent()) {
		postContent = postContent + customFieldsContent()
	}

	// Replace base64 stuff, since we don't need it to analyze the content.
	postContent = postContent.replace(base64regex, '')

	return postContent
}

export const maybeUpdatePostContent = async (run = true) => {
	let postContent      = getPostContent()
	const newPostContent = getPostEditedContent()
	if (postContent !== newPostContent) {
		postContent = newPostContent
		store.commit('live-tags/updatePostContent', postContent)
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

const classicContent = () => {
	let classicContent = ''

	const editor = window.tinyMCE ? window.tinyMCE.get('content') : ''
	if (document.querySelector('#wp-content-wrap.tmce-active') && editor) {
		// tinyMCE
		classicContent = editor.getContent({ format: 'raw' })
	} else {
		// No tinyMCE. Let's see if there's a proper #content textarea.
		const textEditor = document.querySelector('textarea#content')
		classicContent = textEditor ? textEditor.value : ''
	}
	return classicContent
}