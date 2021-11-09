import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'

import LocationsSidebar from './LocationsSidebar.vue'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { observeElement } from '@/vue/utils/helpers'
import { __, sprintf } from '@wordpress/i18n';

// Vue integration inspired from this GIST.
// https://gist.github.com/royboy789/dfd470c9ffc5d4391f90348033d6bd64

(function (wp) {
	if ('undefined' === typeof wp.blocks || 'undefined' === typeof wp.blockEditor) {
		return
	}

	let vueInitialState = null

	if (window.aioseo.currentPost && window.aioseo.localBusiness) {
		const el = wp.element.createElement
		const Fragment = wp.element.Fragment
		const InspectorControls = wp.blockEditor.InspectorControls || wp.editor.InspectorControls
		const PanelBody = wp.components.PanelBody
		const ServerSideRender = wp.serverSideRender || wp.components.ServerSideRender
		const withSelect = wp.data.withSelect
		const td = process.env.VUE_APP_TEXTDOMAIN
		const icon = el('svg',
			{
				width   : 20,
				height  : 19,
				viewBox : '0 0 20 19',
				xmlns   : 'http://www.w3.org/2000/svg'
			},
			el('path',
				{
					d : 'M17.2001 7.2L19.0361 9.036L17.7641 10.308L10.0001 2.544L2.23611 10.308L0.964111 9.036L10.0001 0L14.8001 4.8V2.4H17.2001V7.2ZM10.0001 4.248L17.2001 11.436V18.6H2.80011V11.436L10.0001 4.248ZM12.4001 17.4V11.4H7.60011V17.4H12.4001Z'
				}
			)
		)
		const multipleLocations = window.aioseo.options.localBusiness.locations.general.multiple
		wp.blocks.registerBlockType('aioseo/locations', {
			// Translators: 1 - AIOSEO.
			title      : sprintf(__('%1$s Local - Locations', td), process.env.VUE_APP_SHORT_NAME),
			category   : 'aioseo',
			icon       : icon,
			example    : {},
			attributes : {
				categoryId : {
					type    : 'number',
					default : null
				}
			},
			save : function () {
				return null
			},
			edit : withSelect(function (select) {
				const categories = select('core').getEntityRecords('taxonomy', window.aioseo.localBusiness.taxonomyName)
				return {
					categories : categories
				}
			})(function (props) {
				const { setAttributes, attributes, className, clientId, categories } = props
				const vueAioseoId   = 'aioseo-' + clientId

				if (null === categories) {
					return el(Fragment, {},
						el(
							'div',
							{},
							__('Loading...', td)
						)
					)
				}

				if (!multipleLocations) {
					return el(Fragment, {},
						el(
							'div',
							{},
							__('Please enable multiple locations before using this block.', td)
						)
					)
				}

				if (0 === categories.length) {
					return el(Fragment, {},
						el(
							'div',
							{},
							sprintf(__('No %s found', td), window.aioseo.localBusiness.taxonomyPluralLabel)
						)
					)
				}

				if (null === vueInitialState) {
					vueInitialState = {}
					Object.keys(attributes).forEach(function (key) {
						vueInitialState[key] = attributes[key]
					})
					vueInitialState.categories = categories
				}

				observeElement({
					id      : vueAioseoId,
					parent  : document.querySelector('.block-editor'),
					subtree : true,
					done    : function (el) {
						new Vue({
							el   : el,
							data : function () {
								return vueInitialState
							},
							watch : {
								$data : {
									handler : function (val) {
										setAttributes(val)
									},
									deep : true
								}
							},
							render : h => h(LocationsSidebar)
						})
					}
				})

				const sidebar = el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: window.aioseo.localBusiness.postTypePluralLabel, initialOpen: true },
						el(
							'div',
							{},
							el(
								'div',
								{ id: vueAioseoId },
								null
							)
						)
					)
				)

				if (null !== categories && 0 === categories.length) {
					return el(Fragment, {},
						el(
							'div',
							{},
							sprintf(__('No %s found', td), window.aioseo.localBusiness.taxonomyPluralLabel)
						)
					)
				}

				if (!attributes.categoryId) {
					return el(Fragment, {},
						sidebar,
						el(
							'div',
							{},
							sprintf(__('Select a %s', td), window.aioseo.localBusiness.taxonomySingleLabel)
						)
					)
				}

				return el(Fragment, {},
					sidebar,
					el(
						'div',
						{ className: className },
						[
							el(
								ServerSideRender,
								{
									block      : 'aioseo/locations',
									attributes : {
										categoryId : attributes.categoryId
									}
								}
							)
						]
					)
				)
			})
		})
	}
})(
	window.wp
)