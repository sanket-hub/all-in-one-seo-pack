import {
	truSeoShouldAnalyze,
	maybeUpdatePost
} from '@/vue/plugins/truSEO/components'

/**
 * Get custom fields values used in content.
 * @returns {string} string of field values.
 */
export const customFieldsContent = () => {
	if (!window.aioseo.currentPost || !window.aioseo.currentPost.postType) {
		return ''
	}
	const postType  = window.aioseo.currentPost.postType
	const truFields = window.aioseo.dynamicOptions.searchAppearance.postTypes[postType].customFields

	// No custom fields have been specified.
	if (!truFields || !truSeoShouldAnalyze) {
		return ''
	}

	const updateValues = () => {
		maybeUpdatePost(2000)
	}
	const truFieldsArray = truFields.replace(/\n/g, ' ').split(' ')
	const fields         = []
	const inputTypes     = [ 'INPUT', 'TEXTAREA', 'IMG' ]
	truFieldsArray.forEach((truField) => {
		const customField    = document.querySelector(`#${truField}`)
		const WpCustomFields = document.querySelectorAll('#the-list > tr')
		const acfFields      = document.querySelectorAll('.acf-field')

		if (customField && (-1 !== inputTypes.indexOf(customField.tagName))) {
			// make sure it isn't an acf-field
			if (!customField.closest('.acf-field')) {
				// We have a meta_box. Add the value.
				fields.push(customField)
			}
		} else if (WpCustomFields.length) {
			// Maybe we have a core meta_box. Add the values.
			WpCustomFields.forEach((row) => {
				const key   = row.querySelector(`#${row.id}-key`)
				const value = row.querySelector(`#${row.id}-value`)

				if (value && (-1 !== inputTypes.indexOf(value.tagName)) && (-1 !== truFieldsArray.indexOf(key.value))) {
					fields.push(value)
				}
			})
		}
		if (acfFields.length) {
			// We have an acf meta_box. Add the values.
			acfFields.forEach((acfField) => {
				if (truField !== acfField.dataset.name) {
					return ''
				}

				let fieldEl = acfField.querySelector(`[id^="acf"][name$="[${acfField.dataset.key}]"]`)

				if ('image' === acfField.dataset.type) {
					fieldEl = acfField.querySelector('.has-value img')
				}

				if ('gallery' === acfField.dataset.type) {
					fieldEl = acfField.querySelector('.acf-gallery-attachment img')
				}

				if (!fieldEl) {
					return ''
				}

				if (fieldEl.type && 'hidden' === fieldEl.type) {
					return ''
				}

				if ('wysiwyg' === acfField.dataset.type) {
					const acfTmceInterval = window.setInterval(() => {
						if (window.tinyMCE && window.tinyMCE.activeEditor) {
							window.clearInterval(acfTmceInterval)
							window.tinyMCE.activeEditor.on('keyup', function () {
								if (!window.tinyMCE.activeEditor.acf) {
									return
								}
								maybeUpdatePost(2000)
							})
						}
					}, 50)
					// Watch for switching between tinyMCE and the text editor.
					const acfTmceSwitch = function (mutationsList) {
						mutationsList.forEach(mutation => {
							if ('class' === mutation.attributeName) {
								if (acfField.querySelector('.wp-editor-wrap.tmce-active')) {
									if (window.tinyMCE && window.tinyMCE.activeEditor) {
										window.tinyMCE.activeEditor.on('keyup', function () {
											maybeUpdatePost(2000)
										})
									}
								}
								const textEditor = acfField.querySelector(`[name="acf[${acfField.dataset.key}]"]`)
								if (textEditor) {
									textEditor.addEventListener('keyup', () => {
										maybeUpdatePost(2000)
									})
								}
							}
						})
					}
					const mutationObserver = new MutationObserver(acfTmceSwitch)
					const contentWrap = acfField.querySelector('.wp-editor-wrap')
					if (contentWrap) {
						mutationObserver.observe(contentWrap, { attributes: true })
					}
				}

				if (-1 !== inputTypes.indexOf(fieldEl.tagName)) {
					fields.push(fieldEl)
				}
			})
		}
	})

	let fieldsContent = ''

	if (fields.length) {
		fields.forEach((field) => {
			let content = ''

			if (field.tagName && (-1 !== inputTypes.indexOf(field.tagName))) {
				field.addEventListener('keyup', updateValues)
			}

			if (field.value) {
				content = field.value
			}

			if ('IMG' === field.tagName && field.src) {
				const alt = field.alt ? `alt="${field.alt}"` : ''
				content = `<img src="${field.src}" ${alt}>`
			}

			if (field.value && field.type && 'url' === field.type) {
				content = `<a href="${content}">${content}</a>`
			}

			if (content) {
				fieldsContent += `${content} `
			}
		})
	}
	return fieldsContent
}

/**
 * Get custom field image URL.
 *
 * @param   {string} fieldKey The field key.
 * @returns {string}          URL of the image.
 */
export const customFieldImage = (fieldKey) => {
	if (!fieldKey) {
		return ''
	}

	const customField    = document.querySelector(`#${fieldKey}`)
	const wpCustomFields = document.querySelectorAll('#the-list > tr')
	const acfFields      = document.querySelectorAll('.acf-field')
	const inputTypes     = [ 'INPUT', 'TEXTAREA', 'IMG' ]
	let url = ''

	if (customField && (-1 !== inputTypes.indexOf(customField.tagName))) {
		// Make sure it isn't an acf-field
		if (!customField.closest('.acf-field')) {
			// We have a meta_box, add the value.
			url = 'IMG' === customField.tagName ? customField.getAttribute('src') : customField.value
		}
	}

	if (wpCustomFields.length) {
		// Maybe we have a core meta_box, get the value.
		wpCustomFields.forEach((row) => {
			const inputKey   = row.querySelector(`#${row.id}-key`)
			const inputValue = row.querySelector(`#${row.id}-value`)

			if (inputValue && (-1 !== inputTypes.indexOf(inputValue.tagName)) && inputKey.value === fieldKey) {
				url = 'IMG' === inputValue.tagName ? inputValue.getAttribute('src') : inputValue.value
			}
		})
	}

	if (acfFields.length) {
		// We have an acf meta_box. Add the values.
		acfFields.forEach((acfField) => {
			if (fieldKey !== acfField.dataset.name) {
				return
			}

			const customField = acfField.querySelector(`[data-key="${acfField.dataset.key}"] img`)
			url = 'IMG' === customField.tagName ? customField.getAttribute('src') : customField.value
		})
	}

	return url
}