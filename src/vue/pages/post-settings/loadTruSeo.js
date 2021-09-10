import store from '@/vue/store'
import { setOptions } from '@/vue/utils/options'
import {
	isBlockEditor,
	shouldShowMetaBox,
	isClassicEditor,
	isWooCommerceProduct,
	maybeUpdatePost,
	maybeUpdateTerm,
	maybeUpdateAttachment
} from '@/vue/plugins/truSEO/components'
import {
	watchClassicEditor,
	watchBlockEditor,
	watchWooCommerce
} from '@/vue/plugins/truSEO/context'

export default (populateHiddenField = true) => {
	// If the options are not loaded, just call the setOptions with empty object.
	if (!store.state.loaded) {
		setOptions({})
	}

	if (!shouldShowMetaBox()) {
		return
	}

	// Update post analysis on initial page load.
	maybeUpdatePost()
	if ('term' === window.aioseo.currentPost.context) {
		maybeUpdateTerm()
	} else {
		// Make sure the API is available.
		store.dispatch('ping')

		if (populateHiddenField) {
			store.dispatch('savePostState')
		}

		if (isBlockEditor()) {
			const interval = window.setInterval(() => {
				const post = window.wp.data.select('core/editor').getCurrentPost()
				if (post.id) {
					window.clearInterval(interval)
					watchBlockEditor()
				}
			}, 50)
			window.addEventListener('beforeunload', (event) => {
				if (!store.state.isDirty) {
					return undefined
				}
				event.preventDefault()
				event.returnValue = ''
			})
		} else {
			if (isWooCommerceProduct()) {
				watchWooCommerce()
			}

			if (isClassicEditor()) {
				const interval = window.setInterval(() => {
					if (!window.tinyMCE) {
						return
					}
					if (window.tinyMCE.get('content')) {
						window.clearInterval(interval)
						watchClassicEditor()
					}
				}, 50)
			}

			// Attachemet Page
			maybeUpdateAttachment()
		}
	}
}