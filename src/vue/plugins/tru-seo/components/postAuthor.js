import { isBlockEditor, isClassicEditor } from '@/vue/utils/context'

/**
 * Returns the post author.
 *
 * @returns {integer} The author id
 */
export const getPostAuthor = () => {
	let author = 0

	if (isClassicEditor()) {
		author = parseInt(document.getElementById('post_author_override').value)
	}

	if (isBlockEditor()) {
		author = window.wp.data.select('core/editor').getCurrentPost().author
	}

	return author
}

/**
 * Returns the edited post author.
 *
 * @returns {integer} The author id
 */
export const getPostEditedAuthor = () => {
	let author = 0

	if (isClassicEditor()) {
		author = parseInt(document.getElementById('post_author_override').value)
	}

	if (isBlockEditor()) {
		author = window.wp.data.select('core/editor').getEditedPostAttribute('author')
	}

	return author
}