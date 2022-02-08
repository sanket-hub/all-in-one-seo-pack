import { __, sprintf } from '@wordpress/i18n'

/**
 * Initializes the introduction.
 *
 * @returns {void}
 */
export default () => {
	// Do nothing if the user already closed the introduction.
	if (true === window.elementor.config.user.introduction['aioseo-introduction']) {
		return
	}

	const introduction = new window.elementorModules.editor.utils.Introduction({
		introductionKey : 'aioseo-introduction',
		dialogType      : 'alert',
		dialogOptions   : {
			id            : 'aioseo-introduction',
			// Translators: 1 - The plugin short name ("AIOSEO"), 2 - The Elementor plugin name ("Elementor").
			headerMessage : sprintf(__('New: %1$s %2$s integration', process.env.VUE_APP_TEXTDOMAIN), process.env.VUE_APP_SHORT_NAME, 'Elementor'),
			// Translators: 1 - The plugin name ("All in One SEO"), 2 - The Elementor plugin name ("Elementor").
			message       : sprintf(
				__('You can now manage your SEO settings inside of %1$s via %2$s before you publish your post!', process.env.VUE_APP_TEXTDOMAIN),
				'Elementor',
				process.env.VUE_APP_NAME
			),
			position : {
				my : 'center center',
				at : 'center center'
			},
			strings : {
				confirm : __('Got It!', process.env.VUE_APP_TEXTDOMAIN)
			},
			hide : {
				onButtonClick : false
			},
			onConfirm : () => {
				introduction.setViewed()
				introduction.getDialog().hide()
			}
		}
	})

	introduction.show()
}