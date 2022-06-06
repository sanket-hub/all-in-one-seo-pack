/**
 * Create a HTML element from a string.
 *
 * @since 4.2.1
 *
 * @param {string} html    The HTML string.
 * @param {string} element The wrapper element.
 * @returns {Element}      The element.
 */
const createElement = (html, element = 'div') => {
	const div = document.createElement(element)
	div.innerHTML = html.trim()
	return div
}

/**
 * Get the text from a HTML piece.
 *
 * @since 4.2.1
 *
 * @param {string|Object} html The HTML to retrieve text.
 * @returns {string}           The text.
 */
export const getText = (html) => {
	if ('string' === typeof html) {
		html = createElement(html.replace(/[\t|\n]/gm, ''))
	}

	// Return the text inside the HTML.
	return html.textContent || html.innerText || ''
}

/**
 * Get the image list from a HTML piece.
 *
 * @since 4.2.1
 *
 * @param {string|Object} html The HTML to retrieve images.
 * @returns {NodeList}         The image list.
 */
export const getImages = (html) => {
	if ('string' === typeof html) {
		html = createElement(html)
	}

	return html.querySelectorAll('img')
}