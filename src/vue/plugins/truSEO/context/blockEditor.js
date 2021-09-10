import store from '@/vue/store'
import { maybeUpdatePost } from '@/vue/plugins/truSEO/components'

export const watchBlockEditor = () => {
	// initial page load.
	maybeUpdatePost()

	// Subscribe to block editor changes.
	window.wp.data.subscribe(() => {
		maybeUpdatePost(2000)

		// Post save/update
		const isSavingPost     = window.wp.data.select('core/editor').isSavingPost()
		const isAutosavingPost = window.wp.data.select('core/editor').isAutosavingPost()
		if (isSavingPost && !isAutosavingPost) {
			store.commit('isDirty', false)
			maybeUpdatePost()
		}
	})
}