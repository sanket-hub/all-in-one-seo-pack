import { isBlockEditor } from '@/vue/plugins/tru-seo/components/helpers'
import { taxonomyHasPrimaryTermSupport } from './helpers'

if (isBlockEditor() && window.wp) {
	/**
	 * WordPress dependencies
	 */
	const { createElement, Fragment }    = window.wp.element
	const { addFilter }                  = window.wp.hooks
	const { createHigherOrderComponent } = window.wp.compose
	const { subscribe }                  = window.wp.data

	addFilter(
		'editor.PostTaxonomyType',
		'aioseo/primary-term',
		createHigherOrderComponent((OriginalComponent) => {
			return (props) => {
				const { slug } = props

				if (!taxonomyHasPrimaryTermSupport(slug)) {
					return createElement(OriginalComponent, props)
				}

				return createElement(Fragment, {},
					createElement(OriginalComponent, props),
					createElement('div', { id: `aioseo-primary-term-${slug}` },
						createElement('div', {
							className : 'aioseo-primary-term-app',
							taxonomy  : slug
						})
					)
				)
			}
		}, 'withInspectorControls')
	)

	subscribe(() => {
		window.aioseoBus.$emit('updateSelectedTerms')
	})
}