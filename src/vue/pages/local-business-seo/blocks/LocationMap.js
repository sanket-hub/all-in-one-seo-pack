import Vue from 'vue'
import '@/vue/plugins'
import '@/vue/components/common'
import { debounce } from '@/vue/utils/debounce'

import LocationMapSidebar from './LocationMapSidebar.vue'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { observeElement } from '@/vue/utils/helpers'
import { __, sprintf } from '@wordpress/i18n'
import { addQueryArgs } from '@wordpress/url'

// Vue integration inspired from this GIST.
// https://gist.github.com/royboy789/dfd470c9ffc5d4391f90348033d6bd64
(function (wp) {
	if ('undefined' === typeof wp.blocks || 'undefined' === typeof wp.blockEditor) {
		return
	}

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
					d : 'M11 11.14L9.83 5.2C9.04 4.77 8.5 3.95 8.5 3C8.5 1.62 9.62 0.499999 11 0.499999C12.38 0.499999 13.5 1.62 13.5 3C13.5 3.95 12.96 4.77 12.17 5.2L11 11.14ZM11 1.5C10.17 1.5 9.5 2.17 9.5 3C9.5 3.83 10.17 4.5 11 4.5C11.83 4.5 12.5 3.83 12.5 3C12.5 2.17 11.83 1.5 11 1.5ZM12.72 6.3L11 13.68L9.27 6.38L5 4.97L2.98023e-08 6.97V15.97L5 13.97L11.12 16L16 13.97V4.97L12.72 6.3Z'
				}
			)
		)
		const multipleLocations = window.aioseo.options.localBusiness.locations.general.multiple
		wp.blocks.registerBlockType('aioseo/locationmap', {
			// Translators: 1 - AIOSEO.
			title      : sprintf(__('%1$s Local - Map', td), process.env.VUE_APP_SHORT_NAME),
			category   : 'aioseo',
			icon       : icon,
			example    : {},
			attributes : {
				locationId : {
					type    : 'number',
					default : null
				},
				showLabel : {
					type    : 'boolean',
					default : true
				},
				showIcon : {
					type    : 'boolean',
					default : true
				},
				customMarker : {
					type    : 'string',
					default : null
				},
				width : {
					type    : 'string',
					default : '100%'
				},
				height : {
					type    : 'string',
					default : '450px'
				},
				label : {
					type    : 'string',
					default : __('Our location:', td)
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
				const { setAttributes, attributes, className, clientId, locations } = props
				const vueAioseoId   = 'aioseo-location-map-' + clientId

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

				const isLocationPostType = window.aioseo.currentPost.postType === window.aioseo.localBusiness.postTypeName

				// Force locationId if we're in the local-business post type.
				attributes.locationId = (!attributes.locationId && isLocationPostType) ? window.aioseo.currentPost.id : attributes.locationId
				const location = locations.find(item => item.id === attributes.locationId)
				const locationMap = isLocationPostType ? window.aioseo.currentPost.local_seo.maps : (location ? location.maps : null)

				const vueInitialState = {}
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
										debounce(() => {
											setAttributes(val)
										}, 1000)
									},
									deep : true
								}
							},
							render : h => h(LocationMapSidebar)
						})
					}
				})

				if (isLocationPostType) {
					observeElement({
						id      : vueAioseoId + '-watcher',
						parent  : document.querySelector('.block-editor'),
						subtree : true,
						done    : function (el) {
							new Vue({
								el   : el,
								data : function () {
									return window.aioseo.currentPost.local_seo.maps
								},
								watch : {
									$data : {
										handler : function () {
											setAttributes({
												updated : Date.now()
											})
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
						{ title: __('Settings', td), initialOpen: true },
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

				if (multipleLocations) {
					if (!attributes.locationId) {
						return el(Fragment, {},
							sidebar,
							el(
								'div',
								{},
								sprintf(__('Select a %s', td), window.aioseo.localBusiness.postTypeSingleLabel)
							)
						)
					}
					if (!locationMap) {
						const editLink = addQueryArgs('post.php', {
							post   : attributes.locationId,
							action : 'edit'
						})
						return el(Fragment, {},
							sidebar,
							el(
								'div',
								{
									dangerouslySetInnerHTML : {
										__html : sprintf(__('Please configure the map for this location: %s', td), '<a href="' + editLink + '" target="_blank">' + location.title.rendered + '</a>')
									}
								}
							)
						)
					}
				}

				const renderedMapDiv = '#' + vueAioseoId + '-preview .aioseo-local-map'
				observeElement({
					selector : renderedMapDiv,
					parent   : document.querySelector('.block-editor'),
					subtree  : true,
					done     : function () {
						const mapToRender =  locationMap || window.aioseo.options.localBusiness.maps
						document.dispatchEvent(new CustomEvent(window.aioseo.localBusiness.mapLoadEvent, {
							detail : {
								element           : renderedMapDiv,
								mapOptions        : mapToRender.mapOptions,
								customMarker      : attributes.customMarker || mapToRender.customMarker || window.aioseo.options.localBusiness.maps.customMarker,
								instance          : attributes,
								placeId           : window.aioseo.options.localBusiness.maps.mapsEmbedApiEnabled ? mapToRender.placeId : null,
								infoWindowContent : mapToRender.infoWindowContent ? mapToRender.infoWindowContent : null
							}
						}))
					}
				})

				return el(Fragment, {},
					sidebar,
					el(
						'div',
						{ className: className, id: vueAioseoId + '-preview' },
						[
							el(
								ServerSideRender,
								{
									block      : 'aioseo/locationmap',
									attributes : {
										locationId   : attributes.locationId ? attributes.locationId : 0,
										showLabel    : attributes.showLabel,
										showIcon     : attributes.showIcon,
										customMarker : attributes.customMarker,
										width        : attributes.width,
										height       : attributes.height,
										label        : attributes.label,
										updated      : attributes.updated,
										dataObject   : isLocationPostType ? JSON.stringify(window.aioseo.currentPost.local_seo.maps) : null
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