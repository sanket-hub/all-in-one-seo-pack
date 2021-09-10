import {
	isWooCommerceProduct,
	truSeoShouldAnalyze,
	maybeUpdatePost,
	maybeUpdateTaxonomies
} from '@/vue/plugins/truSEO/components'

export const watchClassicEditor = () => {
	if (!window.tinyMCE) {
		return
	}

	let isAnalyzing = false

	if (document.querySelector('#wp-content-wrap.tmce-active')) {
		// Run Analysis once tinyMCE loads.
		const mceActiveInterval = window.setInterval(() => {
			if (!window.tinyMCE.activeEditor) {
				return
			}
			window.clearInterval(mceActiveInterval)
			maybeUpdatePost()
		}, 50)

		// tinyMCE Content Update.
		if (window.tinyMCE) {
			window.tinyMCE.get('content').on('keyup', () => {
				maybeUpdatePost(2000)
			})
		}
	} else {
		// No TinyMCE. Look for a proper #content textarea.
		const textEditor = document.querySelector('textarea#content')
		if (textEditor) {
			textEditor.addEventListener('keyup', () => {
				maybeUpdatePost(2000)
			})
		}
	}

	// Title Change.
	const titleInput = document.querySelector('#post input#title')
	if (titleInput) {
		titleInput.addEventListener('input', () => {
			maybeUpdatePost(2000)
		})
	}

	// Excerpt Change.
	const excerptInput = document.querySelector('#post textarea#excerpt')
	if (excerptInput) {
		excerptInput.addEventListener('input', () => {
			maybeUpdatePost(2000)
		})
	}

	// Slug Change.
	const slug = document.querySelector('#post_name')
	if (slug) {
		slug.addEventListener('change', () => {
			maybeUpdatePost(2000)
		})
	}

	const permalinkButtons = document.querySelector('#edit-slug-buttons')
	if (permalinkButtons) {
		permalinkButtons.addEventListener('click', (event) => {
			if (event.target === permalinkButtons.querySelector('#edit-slug-buttons button.save')) {
				maybeUpdatePost()
			}
		})
	}

	// Category Change.
	const catInputs = document.querySelector('#categorychecklist')
	if (catInputs) {
		catInputs.addEventListener('change', function () {
			maybeUpdateTaxonomies()
		})
	}

	// Watch for switching between tinyMCE and the text editor.
	const callback = function (mutationsList) {
		mutationsList.forEach(mutation => {
			if ('class' === mutation.attributeName) {
				if (document.querySelector('#wp-content-wrap.tmce-active')) {
					if (!window.tinyMCE) {
						return
					}
					window.tinyMCE.get('content').on('keyup', () => {
						maybeUpdatePost(2000)
					})
				}
				const textEditor = document.querySelector('#content')
				if (textEditor) {
					textEditor.addEventListener('keyup', () => {
						maybeUpdatePost(2000)
					})
				}
			}
		})
	}
	const mutationObserver = new MutationObserver(callback)
	const contentWrap = document.querySelector('#wp-content-wrap')
	if (contentWrap) {
		mutationObserver.observe(contentWrap, { attributes: true })
	}
	setInterval(() => {
		if (isAnalyzing) {
			isAnalyzing = false
		}
	}, 2000)

	// Run Analysis on load and content change
	if (truSeoShouldAnalyze() && !isWooCommerceProduct()) {
		isAnalyzing = true
		setInterval(() => {
			if (
				window.tinyMCE &&
				window.tinyMCE.activeEditor &&
				window.tinyMCE.activeEditor.isDirty() &&
				!isAnalyzing
			) {
				isAnalyzing = true

				maybeUpdatePost()
			}
		}, 1500)
	}
}