import { __, sprintf } from '@wordpress/i18n';

(function (wp) {
	if ('undefined' === typeof wp.blocks) {
		return
	}

	if (window.aioseo.currentPost && window.aioseo.localBusiness) {
		const el = wp.element.createElement
		const Fragment = wp.element.Fragment
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
		wp.blocks.registerBlockType('aioseo/locationcategories', {
			// Translators: 1 - AIOSEO.
			title    : sprintf(__('%1$s Local - Location Categories', td), process.env.VUE_APP_SHORT_NAME),
			category : 'aioseo',
			icon     : icon,
			example  : {},
			save     : function () {
				return null
			},
			edit : withSelect(function (select) {
				const categories = select('core').getEntityRecords('taxonomy', window.aioseo.localBusiness.taxonomyName)
				return {
					categories : categories
				}
			})(function (props) {
				const { className, categories } = props

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

				return el(Fragment, {},
					el(
						'div',
						{ className: className },
						[
							el(
								ServerSideRender,
								{
									block : 'aioseo/locationcategories'
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