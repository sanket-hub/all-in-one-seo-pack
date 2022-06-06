import store from '@/vue/store'
import { isEmpty } from 'lodash-es'

/**
 * Save SEO Settings when SeedProd editor is saved.
 *
 * @returns {void}.
 */
const handleEditorSave = () => {
	if (isEmpty(store.state.currentPost)) {
		return
	}

	store.dispatch('saveCurrentPost', store.state.currentPost)
}

export default () => {
	// This hook will fire when the Save button is triggered.
	document.getElementById('seedprod-builder-save').addEventListener('click', handleEditorSave)
}