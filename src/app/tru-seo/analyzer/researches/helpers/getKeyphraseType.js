import { __ } from '@wordpress/i18n'
import { td } from '@/vue/plugins/constants'

export default function (keyphrase) {
	if ('focus' === keyphrase) {
		return __('Focus keyphrase', td)
	}
	return __('Keyphrase', td)
}