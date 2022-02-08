import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'

import BusinessInfoSidebar from './BusinessInfoSidebar.vue'

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
		wp.blocks.registerBlockType('aioseo/businessinfo', {
			// Translators: 1 - AIOSEO.
			title      : sprintf(__('%1$s Local - Business Info', td), process.env.VUE_APP_SHORT_NAME),
			category   : 'aioseo',
			icon       : icon,
			example    : {},
			attributes : {
				locationId : {
					type    : 'number',
					default : null
				},
				showLabels : {
					type    : 'boolean',
					default : true
				},
				addressLabel : {
					type    : 'string',
					default : __('Address:', td)
				},
				vatIdLabel : {
					type    : 'string',
					default : __('VAT ID:', td)
				},
				taxIdLabel : {
					type    : 'string',
					default : __('Tax ID:', td)
				},
				phoneLabel : {
					type    : 'string',
					default : __('Phone:', td)
				},
				faxLabel : {
					type    : 'string',
					default : __('Fax:', td)
				},
				emailLabel : {
					type    : 'string',
					default : __('Email:', td)
				},
				showIcons : {
					type    : 'boolean',
					default : true
				},
				showName : {
					type    : 'boolean',
					default : true
				},
				showAddress : {
					type    : 'boolean',
					default : true
				},
				showPhone : {
					type    : 'boolean',
					default : true
				},
				showFax : {
					type    : 'boolean',
					default : true
				},
				showCountryCode : {
					type    : 'boolean',
					default : true
				},
				showEmail : {
					type    : 'boolean',
					default : true
				},
				showVat : {
					type    : 'boolean',
					default : true
				},
				showTax : {
					type    : 'boolean',
					default : true
				},
				dataObject : {
					type    : 'string',
					default : null
				},
				updated : {
					type    : 'string',
					default : Date.now()
				}
			},
			save : function () {
				return null
			},
			edit : withSelect(function (select) {
				const locations = select('core').getEntityRecords('postType', window.aioseo.localBusiness.postTypeName, { per_page: 100 })
				return {
					locations : locations
				}
			})(function (props) {
				const { setAttributes, attributes, className, clientId, locations, isSelected } = props
				const vueAioseoId   = 'aioseo-' + clientId

				if (!multipleLocations && attributes.locationId) {
					return el(Fragment, {},
						el(
							'div',
							{},
							__('Please enable multiple locations before using this block.', td)
						)
					)
				}

				if (null === locations) {
					return el(Fragment, {},
						el(
							'div',
							{},
							__('Loading...', td)
						)
					)
				}

				if (multipleLocations && 0 === locations.length) {
					return el(Fragment, {},
						el(
							'div',
							{},
							sprintf(__('No %s found', td), window.aioseo.localBusiness.postTypePluralLabel)
						)
					)
				}

				// Force locationId if we're in the local-business post type.
				attributes.locationId = (!attributes.locationId && window.aioseo.currentPost.postType === window.aioseo.localBusiness.postTypeName) ? window.aioseo.currentPost.id : attributes.locationId

				if (isSelected) {
					vueInitialState = {}
					Object.keys(attributes).forEach(function (key) {
						vueInitialState[key] = attributes[key]
					})
					vueInitialState.locations = locations

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
								render : h => h(BusinessInfoSidebar)
							})
						}
					})
				}

				if (window.aioseo.currentPost.postType === window.aioseo.localBusiness.postTypeName) {
					observeElement({
						id      : vueAioseoId + '-watcher',
						parent  : document.querySelector('.block-editor'),
						subtree : true,
						done    : function (el) {
							new Vue({
								el   : el,
								data : function () {
									return window.aioseo.currentPost.local_seo.locations.business
								},
								watch : {
									$data : {
										handler : function () {
											setAttributes({ updated: Date.now() })
										},
										deep : true
									}
								},
								render : h => h(null) // This stops the watcher from rendering multiple times.
							})
						}
					})
				}

				const sidebar = el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __('Display Settings', td), initialOpen: true },
						el(
							'div',
							null,
							el(
								'div',
								{ id: vueAioseoId },
								null
							)
						)
					)
				)

				if (multipleLocations && !attributes.locationId) {
					return el(Fragment, {},
						sidebar,
						el(
							'div',
							{},
							sprintf(__('Select a %s', td), window.aioseo.localBusiness.postTypeSingleLabel)
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
									block      : 'aioseo/businessinfo',
									attributes : {
										locationId      : attributes.locationId ? attributes.locationId : 0,
										layout          : attributes.layout,
										showLabels      : attributes.showLabels,
										showIcons       : attributes.showIcons,
										showName        : attributes.showName,
										showAddress     : attributes.showAddress,
										showPhone       : attributes.showPhone,
										showFax         : attributes.showFax,
										showCountryCode : attributes.showCountryCode,
										showEmail       : attributes.showEmail,
										showVat         : attributes.showVat,
										showTax         : attributes.showTax,
										addressLabel    : attributes.addressLabel,
										vatIdLabel      : attributes.vatIdLabel,
										taxIdLabel      : attributes.taxIdLabel,
										phoneLabel      : attributes.phoneLabel,
										faxLabel        : attributes.faxLabel,
										emailLabel      : attributes.emailLabel,
										updated         : attributes.updated,
										dataObject      : window.aioseo.currentPost.postType === window.aioseo.localBusiness.postTypeName ? JSON.stringify(window.aioseo.currentPost.local_seo.locations.business) : null
									}
								}
							),
							el(
								'div',
								{},
								el(
									'div',
									{ id: vueAioseoId + '-watcher' },
									null
								)
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