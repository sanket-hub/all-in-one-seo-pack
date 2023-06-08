import { __ } from '@wordpress/i18n'

const td = import.meta.env.VITE_TEXTDOMAIN

export const useNotifications = () => {
	const strings = {
		notifications       : __('Notifications', td),
		newNotifications    : __('New Notifications', td),
		activeNotifications : __('Active Notifications', td)
	}

	return {
		strings
	}
}