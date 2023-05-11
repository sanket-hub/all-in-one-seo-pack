import { isClassicEditor } from '@/vue/plugins/tru-seo/components/helpers'
import { getTaxonomies } from './helpers'

if (isClassicEditor()) {
	getTaxonomies().forEach(taxonomyData => {
		const metaboxTaxonomyDiv = document.querySelector(`#${taxonomyData.name}div .inside`)
		if (!metaboxTaxonomyDiv) {
			return
		}

		const primaryTermDiv = document.createElement('div')
		primaryTermDiv.setAttribute('id', `aioseo-primary-term-${taxonomyData.slug}`)
		primaryTermDiv.setAttribute('class', 'aioseo-primary-term-app')
		primaryTermDiv.setAttribute('taxonomy', taxonomyData.slug)

		metaboxTaxonomyDiv.append(primaryTermDiv)

		// We need to use jQuery to listen to these events because jQuery provides an event layer over Vanilla JS.
		// That means that Vanilla JS cannot talk to that added layer.
		;(function ($) {
			$(`#${taxonomyData.name}checklist`).on('change', 'input[type="checkbox"]', () => {
				window.aioseoBus.$emit('updateSelectedTerms')
			})
			$(`#${taxonomyData.name}checklist`).on('wpListAddEnd', () => {
				window.aioseoBus.$emit('updateSelectedTerms')
			})
		})(window.jQuery)
	})
}