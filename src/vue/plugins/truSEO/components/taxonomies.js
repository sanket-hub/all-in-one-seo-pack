import Vue from 'vue'
import store from '@/vue/store'
import { isBlockEditor, isClassicEditor  } from './helpers'

let taxonomyTitle = '',
	listOfCategories = ''

// Update post data
export const maybeUpdateTaxonomies = (run = true) => {
	if (isClassicEditor()) {
		// window.setInterval(() => {
		const categories = document.querySelectorAll('#post input[name="post_category[]"]:checked')
		if (categories.length) {
			if (taxonomyTitle !== categories[0].parentNode.innerText) {
				taxonomyTitle = categories[0].parentNode.innerText
				store.commit('live-tags/updateTaxonomyTitle', taxonomyTitle)
			}
			listOfCategories = Array.from(categories).map(category => category.parentNode.innerText).join(', ')
			store.commit('live-tags/updateCategories', listOfCategories)
		} else {
			if ('' !== taxonomyTitle) {
				taxonomyTitle = listOfCategories = ''
				store.commit('live-tags/updateTaxonomyTitle', taxonomyTitle)
				store.commit('live-tags/updateCategories', listOfCategories)
			}
		}
		// }, 1000)
	}
	if (isBlockEditor()) {
		const categories = window.wp.data.select('core').getEntityRecords('taxonomy', 'category')
		const selected   = window.wp.data.select('core/editor').getEditedPostAttribute('categories')

		if (selected && selected.length && categories) {
			const category = categories.find(c => c.id === selected[0])
			if (category && (taxonomyTitle !== category.name)) {
				taxonomyTitle = category.name
				store.commit('live-tags/updateTaxonomyTitle', taxonomyTitle)
			}
			listOfCategories = categories.filter(c => selected.includes(c.id)).map(category => category.name).join(', ')
			store.commit('live-tags/updateCategories', listOfCategories)
		} else {
			if ('' !== taxonomyTitle) {
				taxonomyTitle = listOfCategories = ''
				store.commit('live-tags/updateTaxonomyTitle', taxonomyTitle)
				store.commit('live-tags/updateCategories', listOfCategories)
			}
		}
	}
	if (run) {
		Vue.prototype.$truSEO.runAnalysis({ postId: store.state.currentPost.id })
	}
}