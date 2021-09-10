import { __ } from '@wordpress/i18n'
const td = process.env.VUE_APP_TEXTDOMAIN

export default function( keyphrase ) {
	if ('focus' === keyphrase) {
		return __('Focus keyphrase', td)
	}
	return __('Keyphrase', td)
}