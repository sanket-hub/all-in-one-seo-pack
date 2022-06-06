/* globals ETBuilderBackendDynamic, ET_Builder */
import { get } from 'lodash-es'
import { getText, getImages } from '@/vue/utils/html'

/**
 * Gets the content area.
 *
 * @returns {Object} DOM node.
 */
const getContentArea = () => {
	const frameElement = get(
		ET_Builder,
		'Frames.app.frameElement',
		document.querySelector('iframe#et-fb-app-frame')
	)

	if (!frameElement) {
		return document.createElement('div')
	}

	const contentArea = frameElement.contentWindow.document.querySelector('#et-fb-app')

	if (1 > contentArea.length) {
		return document.createElement('div')
	}

	return contentArea
}

/**
 * Gets the post content.
 *
 * @returns {string} The post content.
 */
export const getContent = () => {
	const content = []
	const sections = getContentArea().querySelectorAll('.et_pb_section')
	const regex = new RegExp([
		/* eslint-disable no-useless-escape */
		'<style.*?<\/style>',
		'\\[object Object\\]'
		/* eslint-enable no-useless-escape */
	].join('|'), 'gi')

	for (let i = 0; i < sections.length; i++) {
		let html = sections[i].innerHTML

		// Remove unnecessary content for the analysis.
		html = sections[i].innerHTML.replace(regex, '')

		// Remove the wrapper <p> if there's just an image inside it.
		html = html.replaceAll(/<p.*>(<img.*>)<\/p>/g, '$1')

		// Skip if there's no text or images, just HTML markup.
		if ('' === getText(html) && 0 === getImages(html).length) {
			continue
		}

		content.push(html)
	}

	return content.join(' ')
}

/**
 * Gets the post permalink.
 *
 * @returns {string} The post permalink.
 */
export const getPermalink = () => {
	const permalink = new URL(get(ETBuilderBackendDynamic, 'currentPage.permalink', ''))

	// Delete the PageSpeed query arg from Divi builder.
	permalink.searchParams.delete('PageSpeed')

	return permalink.href
}

/**
 * Gets the data that is specific to this editor.
 *
 * @returns {Object} The editorData object.
 */
export const getEditorData = () => {
	return {
		content   : getContent(),
		title     : get(ETBuilderBackendDynamic, 'postTitle', ''),
		excerpt   : get(ETBuilderBackendDynamic, 'postMeta.post_excerpt', ''),
		slug      : get(ETBuilderBackendDynamic, 'postMeta.post_name', ''),
		permalink : getPermalink()
	}
}