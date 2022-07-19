import { html } from '@/vue/standalone/blocks/utils'

const { RawHTML } = window.wp.element

/**
 * The save function defines the final markup.
 *
 * @returns {WPElement} Element to render.
 */
export default function save ({ attributes: { headings, listStyle } }) {
	if (!headings) {
		return ''
	}

	const htmlString = getNestedHeadings(headings, listStyle)

	return html`<${RawHTML}>${htmlString}</${RawHTML}>`
}

const getNestedHeadings = (headings, listStyle) => {
	let htmlString = `<${listStyle}>`

	headings.forEach((heading) => {
		if (heading.hidden) {
			return
		}

		let listItem = '<li>'

		listItem += `<a href="#${heading.anchor}">${heading.editedContent || heading.content}</a>`

		if (heading.headings?.length) {
			listItem += getNestedHeadings(heading.headings, listStyle)
		}

		listItem += '</li>'

		htmlString += listItem
	})

	htmlString += `</${listStyle}>`

	return htmlString
}