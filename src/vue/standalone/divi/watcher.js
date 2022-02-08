/* globals ETBuilderBackendDynamic */
import store from '@/vue/store'
import isEqual from 'lodash/isEqual'
import set from 'lodash/set'
import { debounce } from '@/vue/utils/debounce'
import { maybeUpdatePost as updatePostData } from '@/vue/plugins/truSEO/components'
import { getEditorData } from './helpers'

let editorData = {}

/**
 * Run TruSEO analysis when content updates.
 *
 * @returns {void}.
 */
const handleEditorChange = () => {
	const oldData = { ...editorData }
	const data = getEditorData()

	if (!isEqual(oldData, data)) {
		editorData = data
		updatePostData()
	}
}

/**
 * Save SEO Settings when Divi editor is saved.
 *
 * @returns {void}.
 */
const handleEditorSave = () => {
	store.dispatch('saveCurrentPost', store.state.currentPost)
}

export default () => {
	// First load and analyze the content.
	handleEditorChange()

	// This hook will fire when the Divi content changes.
	window.addEventListener('message', (event) => {
		const etEvent = event.data.eventType
		if ('et_fb_section_content_change' === etEvent) {
			debounce(handleEditorChange, 1000)
		}
	})

	// This hook will fire when the Divi settings changes.
	window.wp && window.wp.hooks.addFilter(
		'et.builder.store.setting.update',
		'aioseo',
		(value, setting) => {
			if (value) {
				switch (setting) {
					case 'et_pb_post_settings_title':
						set(ETBuilderBackendDynamic, 'postTitle', value)
						debounce(handleEditorChange, 1000)
						break
					case 'et_pb_post_settings_excerpt':
						set(ETBuilderBackendDynamic, 'postMeta.post_excerpt', value)
						debounce(handleEditorChange, 1000)
						break
				}
			}
			return value
		}
	)

	// This hook will fire when the Save button is triggered.
	document.querySelector('.et-fb-button--save-draft, .et-fb-button--publish').addEventListener('click', handleEditorSave)
}