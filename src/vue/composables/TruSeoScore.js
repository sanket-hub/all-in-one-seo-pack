import { __, sprintf } from '@wordpress/i18n'

const td = import.meta.env.VITE_TEXTDOMAIN

export const useTruSeoScore = () => {
	const strings = {
		weveGotWorkToDo : sprintf(
			// Translators: 1 - HTML Line break tag.
			__('We\'ve got some%1$swork to do!', td),
			'<br>'
		),
		needsImprovement : sprintf(
			// Translators: 1 - HTML Line break tag.
			__('Needs%1$sImprovement!', td),
			'<br>'
		),
		veryGood  : __('Very Good!', td),
		excellent : __('Excellent!', td),
		allGood   : __('All Good!', td)
	}

	return {
		strings
	}
}