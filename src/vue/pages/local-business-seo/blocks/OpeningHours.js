import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'

import OpeningHoursSidebar from './OpeningHoursSidebar.vue'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { observeElement } from '@/vue/utils/helpers'
import { __, sprintf } from '@wordpress/i18n';

// Vue integration inspired from this GIST
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
				height  : 20,
				viewBox : '0 0 20 20',
				xmlns   : 'http://www.w3.org/2000/svg'
			},
			el('path',
				{
					d : 'M9.99999 0.400024C15.304 0.400024 19.6 4.69602 19.6 10C19.6 15.304 15.304 19.6 9.99999 19.6C4.69599 19.6 0.399994 15.304 0.399994 10C0.399994 4.69602 4.69599 0.400024 9.99999 0.400024ZM9.99999 17.2C13.972 17.2 17.2 13.972 17.2 10C17.2 6.02802 13.972 2.80002 9.99999 2.80002C6.02799 2.80002 2.79999 6.02802 2.79999 10C2.79999 13.972 6.02799 17.2 9.99999 17.2ZM9.14799 10.852C9.23199 10.912 9.31599 10.972 9.42399 11.032L9.39999 11.056L14.8 13.6L11.164 9.77202L9.99999 4.00002L8.83599 9.77202H8.84799C8.84799 9.79602 8.83599 9.83202 8.82399 9.88002C8.81199 9.92802 8.79999 9.96402 8.79999 10C8.79999 10.336 8.91999 10.624 9.14799 10.852Z'
				}
			)
		)
		const multipleLocations = window.aioseo.options.localBusiness.locations.general.multiple
		wp.blocks.registerBlockType('aioseo/openinghours', {
			// Translators: 1 - AIOSEO.
			title      : sprintf(__('%1$s Local - Opening Hours', td), process.env.VUE_APP_SHORT_NAME),
			category   : 'aioseo',
			icon       : icon,
			example    : {},
			attributes : {
				locationId : {
					type    : 'number',
					default : null
				},
				layout : {
					type    : 'string',
					default : 'classic'
				},
				showTitle : {
					type    : 'boolean',
					default : true
				},
				showIcons : {
					type    : 'boolean',
					default : true
				},
				showMonday : {
					type    : 'boolean',
					default : true
				},
				showTuesday : {
					type    : 'boolean',
					default : true
				},
				showWednesday : {
					type    : 'boolean',
					default : true
				},
				showThursday : {
					type    : 'boolean',
					default : true
				},
				showFriday : {
					type    : 'boolean',
					default : true
				},
				showSaturday : {
					type    : 'boolean',
					default : true
				},
				showSunday : {
					type    : 'boolean',
					default : true
				},
				label : {
					type    : 'string',
					default : __('Our Opening Hours:', td)
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
			}
			)(function (props) {
				const { setAttributes, attributes, className, clientId, locations } = props
				const vueAIOSEOSettingsId = `aioseo-${clientId}-settings`

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

				if (null === vueInitialState) {
					vueInitialState = {}
					Object.keys(attributes).forEach(function (key) {
						vueInitialState[key] = attributes[key]
					})
					vueInitialState.locations = locations
				}

				observeElement({
					id      : vueAIOSEOSettingsId,
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
							render : h => h(OpeningHoursSidebar)
						})
					}
				})

				if (window.aioseo.currentPost.postType === window.aioseo.localBusiness.postTypeName) {
					observeElement({
						id      : vueAIOSEOSettingsId + '-watcher',
						parent  : document.querySelector('.block-editor'),
						subtree : true,
						done    : function (el) {
							new Vue({
								el   : el,
								data : function () {
									return window.aioseo.currentPost.local_seo.openingHours
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
							{},
							el(
								'div',
								{ id: vueAIOSEOSettingsId },
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
									block      : 'aioseo/openinghours',
									attributes : {
										locationId    : attributes.locationId ? attributes.locationId : 0,
										layout        : attributes.layout,
										showTitle     : attributes.showTitle,
										showIcons     : attributes.showIcons,
										showMonday    : attributes.showMonday,
										showTuesday   : attributes.showTuesday,
										showWednesday : attributes.showWednesday,
										showThursday  : attributes.showThursday,
										showFriday    : attributes.showFriday,
										showSaturday  : attributes.showSaturday,
										showSunday    : attributes.showSunday,
										label         : attributes.label,
										updated       : attributes.updated,
										dataObject    : window.aioseo.currentPost.postType === window.aioseo.localBusiness.postTypeName ? JSON.stringify(window.aioseo.currentPost.local_seo.openingHours) : null
									}
								}
							),
							el(
								'div',
								{},
								el(
									'div',
									{ id: vueAIOSEOSettingsId + '-watcher' },
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