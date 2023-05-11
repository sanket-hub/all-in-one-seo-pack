import TruSeo from '@/vue/plugins/tru-seo'
import store from '@/vue/store'
import { cleanForSlug } from '@/vue/utils/cleanForSlug'

export const maybeUpdateTerm = (run = false) => {
	if ('term' !== store.state.currentPost.context) {
		return
	}

	// Term Title
	const titleInput = document.querySelector('#edittag input#name')
	if (titleInput) {
		store.commit('live-tags/updateTaxonomyTitle', titleInput.value)
		titleInput.addEventListener('input', () => {
			store.commit('live-tags/updateTaxonomyTitle', titleInput.value)
		})
	}

	// Term Description
	const descriptionInput = document.querySelector('#edittag textarea#description')
	if (descriptionInput) {
		store.commit('live-tags/updateTaxonomyDescription', descriptionInput.value)
		descriptionInput.addEventListener('input', () => {
			store.commit('live-tags/updateTaxonomyDescription', descriptionInput.value)
		})
	}

	// Term Slug
	const slugInput = document.querySelector('#edittag input#slug')
	if (slugInput) {
		const slug = cleanForSlug(slugInput.value)
		store.commit('live-tags/updatePermalinkSlug', slug)

		store.commit('live-tags/updatePermalink', store.state.currentPost.permalink.replace(`/${store.state['live-tags'].permalinkSlug}`, `/${slug.replace(/ /gi, '-').replace(/[^a-z0-9-]/gi, '').toLowerCase()}`))

		slugInput.addEventListener('input', () => {
			store.commit('live-tags/updatePermalinkSlug', slug)

			store.commit('live-tags/updatePermalink', store.state.currentPost.permalink.replace(`/${store.state['live-tags'].permalinkSlug}`, `/${slug.replace(/ /gi, '-').replace(/[^a-z0-9-]/gi, '').toLowerCase()}`))
		})
	}

	store.dispatch('savePostState')

	if (run) {
		TruSeo.runAnalysis({ postId: store.state.currentPost.id })
	}
}