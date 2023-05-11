import { isBlockEditor } from '@/vue/plugins/tru-seo/components/helpers'

const blockEditor = {
	getTerms : async (taxSlug) => {
		const { apiFetch }     = window.wp
		const { addQueryArgs } = window.wp.url

		const taxonomyData = getTaxonomyData(taxSlug)
		const response     = await apiFetch({
			path : addQueryArgs(
				`/wp/v2/${taxonomyData.restBase}`,
				{
					per_page : -1,
					orderby  : 'count',
					order    : 'desc',
					_fields  : 'id,name'
				}
			)
		})

		return response
	},
	getSelectedTerms : (taxSlug) => {
		const taxonomyData = getTaxonomyData(taxSlug)

		return window.wp.data.select('core/editor').getEditedPostAttribute(taxonomyData.restBase) || []
	}
}

const classicEditor = {
	getTerms : async (taxSlug) => {
		const taxonomyTerms = []
		const taxonomyList = document.getElementById(`${taxSlug}checklist`).querySelectorAll('li')

		taxonomyList.forEach(taxonomy => {
			const termId   = taxonomy.querySelector('input').value
			const termName = taxonomy.querySelector('label').innerText

			taxonomyTerms.push({
				id   : parseInt(termId, 10),
				name : termName.trim()
			})
		})

		return new Promise(resolve => {
			resolve(taxonomyTerms)
		})
	},
	getSelectedTerms : (taxSlug) => {
		const taxonomyTerms = document.getElementById(`${taxSlug}checklist`).querySelectorAll('input:checked')
		const selectedTerms = []

		taxonomyTerms.forEach(term => {
			selectedTerms.push(parseInt(term.value, 10))
		})

		return selectedTerms
	}
}

/**
 * Returns the taxonomies that have primary term support.
 *
 * @returns {Array} The taxonomies that have primary term support.
 */
export const getTaxonomies = () => {
	const taxonomies = window.aioseo.postData?.taxonomies || []

	return taxonomies.filter(taxonomy => {
		return true === taxonomy.primaryTermSupport
	})
}

/**
 * Checks if the taxonomy has primary term support.
 *
 * @param {string} taxSlug The taxonomy slug.
 * @returns {boolean} Whether the taxonomy has primary term support.
 */
export const taxonomyHasPrimaryTermSupport = (taxSlug) => {
	return getTaxonomies().some(taxonomy => {
		return taxSlug === taxonomy.slug
	})
}

/**
 * Returns the taxonomy data.
 *
 * @param {string} taxSlug The taxonomy slug.
 * @returns {Object} The taxonomy data.
 */
export const getTaxonomyData = (taxSlug) => {
	const taxonomyData = getTaxonomies().filter(taxonomy => {
		return taxSlug === taxonomy.slug
	})

	return taxonomyData.length ? taxonomyData[0] : {}
}

/**
 * Returns the terms for the taxonomy.
 *
 * @param {string} taxSlug The taxonomy slug.
 * @returns {Array} The terms for the taxonomy.
 */
export const getTerms = (taxSlug) => {
	if (isBlockEditor()) {
		return blockEditor.getTerms(taxSlug)
	}

	return classicEditor.getTerms(taxSlug)
}

/**
 * Returns the selected terms for the taxonomy.
 *
 * @param {string} taxSlug The taxonomy slug.
 * @returns {Array} The selected terms for the taxonomy.
 */
export const getSelectedTerms = (taxSlug) => {
	if (isBlockEditor()) {
		return blockEditor.getSelectedTerms(taxSlug)
	}

	return classicEditor.getSelectedTerms(taxSlug)
}