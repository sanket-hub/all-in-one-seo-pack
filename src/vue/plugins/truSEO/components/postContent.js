import Vue from 'vue'
import store from '@/vue/store'
import { customFieldsContent } from './customFields'
import { getPostEditedPermalink } from './postPermalink'
import { isBlockEditor, isClassicEditor  } from './helpers'

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
		if (window.tinyMCE) {
			postContent = classicContent()
		} else {
			const classicInterval = window.setInterval(() => {
				if (window.tinyMCE) {
					window.clearInterval(classicInterval)
					postContent = classicContent()

					if (customFieldsContent()) {
						postContent = postContent + customFieldsContent()
					}

					if (postContent) {
						store.commit('live-tags/updatePostContent', postContent)
					}
					return postContent
				}
			}, 50)
		}
	}
	if (isBlockEditor()) {
		postContent = window.wp.data.select('core/editor').getCurrentPost().content
	}

	if (customFieldsContent()) {
		postContent = postContent + customFieldsContent()
	}

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
	let postContent
	if (isClassicEditor()) {
		if (window.tinyMCE) {
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

	if (customFieldsContent()) {
		postContent = postContent + customFieldsContent()
	}

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

	const editor = window.tinyMCE.get('content')
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