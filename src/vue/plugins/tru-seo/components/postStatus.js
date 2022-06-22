import store from '@/vue/store'
import { isBlockEditor } from '@/vue/utils/context'

/**
 * Returns the post status.
 *
 * @returns {string} Post status
 */
export const getPostStatus = () => {
	let postStatus = store.state.currentPost.postStatus
	if (isBlockEditor()) {
		postStatus = window.wp.data.select('core/editor').getCurrentPostAttribute('status')
	}

	return postStatus
}