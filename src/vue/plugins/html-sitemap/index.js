import Vue from 'vue'
import store from '@/vue/store'
import '@/vue/plugins'
import '@/vue/components/common'
import { observeElement } from '@/vue/utils/helpers'
import { __, sprintf } from '@wordpress/i18n'

import HtmlSitemapSidebar from '../../standalone/HtmlSitemapSidebar'

(function (wp) {
	if ('undefined' === typeof wp || 'undefined' === typeof wp.blocks || 'undefined' === typeof wp.blockEditor) {
		return
	}

	if ('object' === typeof wp.blocks.getBlockType('aioseo/html-sitemap')) {
		return
	}

	let vueInitialState = null

	if (window.aioseo.currentPost) {
		const el = wp.element.createElement
		const Fragment = wp.element.Fragment
		const ServerSideRender = wp.serverSideRender || wp.components.ServerSideRender
		const InspectorControls = wp.blockEditor.InspectorControls || wp.editor.InspectorControls
		const PanelBody = wp.components.PanelBody
		const td = process.env.VUE_APP_TEXTDOMAIN
		const icon = el('svg',
			{
				width   : 25,
				height  : 25,
				viewBox : '0 0 25 25',
				xmlns   : 'http://www.w3.org/2000/svg'
			},
			el('path',
				{
					d        : 'M4.125 4.5H20.125V20.5H4.125V4.5ZM9.71875 6.89062H17.7188V8.49062H9.71875V6.89062ZM17.7188 10.0781H9.71875V11.6781H17.7188V10.0781ZM9.71875 13.2661H17.7188V14.8661H9.71875V13.2661ZM17.7188 16.5H9.71875V18.1H17.7188V16.5ZM6.51562 6.89062H8.11562V8.49062H6.51562V6.89062ZM8.11562 10.0781H6.51562V11.6781H8.11562V10.0781ZM6.51562 13.2661H8.11562V14.8661H6.51562V13.2661ZM8.11562 16.5H6.51562V18.1H8.11562V16.5Z',
					fillRule : 'evenodd',
					clipRule : 'evenodd'
				}
			)
		)
		wp.blocks.registerBlockType('aioseo/html-sitemap', {
			title      : sprintf(__('%1$s - HTML Sitemap', td), process.env.VUE_APP_SHORT_NAME),
			category   : 'aioseo',
			icon       : icon,
			example    : {},
			attributes : {
				default : {
					type    : 'boolean',
					default : true
				},
				post_types : {
					type    : 'string',
					default : '["post", "page"]'
				},
				post_types_all : {
					type    : 'boolean',
					default : true
				},
				taxonomies : {
					type    : 'string',
					default : '["category", "post_tag"]'
				},
				taxonomies_all : {
					type    : 'boolean',
					default : true
				},
				show_label : {
					type    : 'boolean',
					default : true
				},
				archives : {
					type    : 'boolean',
					default : false
				},
				publication_date : {
					type    : 'boolean',
					default : true
				},
				nofollow_links : {
					type    : 'boolean',
					default : false
				},
				order_by : {
					type    : 'string',
					default : 'publish_date'
				},
				order : {
					type    : 'string',
					default : 'asc'
				},
				excluded_posts : {
					type    : 'string',
					default : '[]'
				},
				excluded_terms : {
					type    : 'string',
					default : '[]'
				},
				is_admin : {
					type    : 'boolean',
					default : window.location && window.location.pathname.startsWith('/wp-admin/')
				}
			},
			save : function () {
				return null
			},
			edit : function (props) {
				const { setAttributes, attributes, className, clientId, isSelected } = props
				const vueAioseoHtmlSitemapID = 'aioseo-' + clientId

				if (isSelected) {
					vueInitialState = {}
					Object.keys(attributes).forEach(function (key) {
						vueInitialState[key] = attributes[key]
					})

					observeElement({
						id      : vueAioseoHtmlSitemapID,
						parent  : document.querySelector('.block-editor'),
						subtree : true,
						done    : function (el) {
							new Vue({
								store,
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
								render : h => h(HtmlSitemapSidebar)
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
								{ id: vueAioseoHtmlSitemapID },
								null
							)
						)
					)
				)

				return el(Fragment, {},
					sidebar,
					el(
						'div',
						{ className: className },
						[
							el(
								ServerSideRender,
								{
									block      : 'aioseo/html-sitemap',
									attributes : {
										...attributes
									}
								}
							)
						]
					)
				)
			}
		})
	}
})(
	window.wp
)