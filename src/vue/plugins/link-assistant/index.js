import store from '@/vue/store'
import { isBlockEditor, isClassicEditor, isWooCommerceProduct } from '@/vue/utils/context'
import { debounce } from 'lodash'

export default class LinkAssistant {
	previousPostContent
	updatingLinks = false

	constructor () {
		const addon = window.aioseo.addons.find(item => 'aioseo-link-assistant' === item.sku)
		if (
			!window.aioseo.currentPost ||
			!window.aioseo.currentPost.context ||
			'term' === window.aioseo.currentPost.context ||
			!addon ||
			!addon.isActive ||
			!window.aioseo.currentPost.linkAssistant ||
			window.aioseo.currentPost.linkAssistant.isExcludedPost
		) {
			return
		}

		if (!window.aioseo.linkAssistantWatcherSet) {
			this.initWatchers()
			window.aioseo.linkAssistantWatcherSet = true
		}
	}

	initWatchers () {
		if (isWooCommerceProduct()) {
			return
		}

		if (isBlockEditor()) {
			const interval = window.setInterval(() => {
				const post = window.wp.data.select('core/editor').getCurrentPost()
				if (post.id) {
					window.clearInterval(interval)
					this.watchBlockEditor()
				}
			}, 50)
			return
		}

		if (isClassicEditor()) {
			const interval = window.setInterval(() => {
				if (!window.tinyMCE) {
					return
				}
				if (window.tinyMCE.get('content')) {
					window.clearInterval(interval)
					this.watchClassicEditor()
				}
			}, 50)
		}
	}

	watchBlockEditor () {
		window.wp.data.subscribe(() => {
			if (!this.updatingLinks) {
				this.update()
			}
		})
	}

	watchClassicEditor () {
		if (!window.tinyMCE) {
			return
		}

		if (document.querySelector('#wp-content-wrap.tmce-active')) {
			// Run Analysis once tinyMCE loads.
			const mceActiveInterval = window.setInterval(() => {
				if (!window.tinyMCE.activeEditor) {
					return
				}
				window.clearInterval(mceActiveInterval)
			}, 50)

			// tinyMCE Content Update.
			if (window.tinyMCE) {
				window.tinyMCE.get('content').on('keyup', () => {
					this.update()
				})
				window.tinyMCE.get('content').on('paste', () => {
					this.update()
				})
			}
		} else {
			// No TinyMCE. Look for a proper #content textarea.
			const textEditor = document.querySelector('textarea#content')
			if (textEditor) {
				textEditor.addEventListener('keyup', () => {
					this.update()
				})
				textEditor.addEventListener('paste', () => {
					this.update()
				})
			}
		}
	}

	update = debounce(() => {
		const postContent = this.getPostContent()
		// If the content is still the exact same, we don't need to update the results.
		if (!this.previousPostContent || this.previousPostContent === postContent) {
			this.previousPostContent = postContent
			return
		} else {
			this.previousPostContent = postContent
		}

		this.updatingLinks = true
		store.dispatch('linkAssistant/postSettingsUpdate', { postContent: postContent }, { root: true }).finally(() => {
			this.updatingLinks = false
		})
	}, 2500)

	getPostContent () {
		if (isClassicEditor()) {
			if (window.tinyMCE) {
				const editor = window.tinyMCE.get('content')
				if (document.querySelector('#wp-content-wrap.tmce-active') && editor) {
					return editor.getContent({ format: 'raw' })
				} else {
					const textEditor = document.querySelector('textarea#content')
					return textEditor ? textEditor.value : ''
				}
			}
			return
		}
		return window.wp.data.select('core/editor').getEditedPostContent()
	}
}