import { __ } from '@wordpress/i18n'

const td = import.meta.env.VITE_TEXTDOMAIN

export const useLinks = () => {
	const strings = {
		frontPage  : __('Front Page', td),
		deleteLink : __('Delete Link', td)
	}

	const modalStrings = {
		areYouSureSingle     : __('Are you sure you want to delete this link?', td),
		areYouSureMultiple   : __('Are you sure you want to delete these links?', td),
		areYouSureAll        : __('Are you sure you want to delete all links?', td),
		actionCannotBeUndone : __('This action cannot be undone.', td),
		yesSingle            : __('Yes, I want to delete this link', td),
		yesMultiple          : __('Yes, I want to delete these links', td),
		yesAll               : __('Yes, I want to delete all links', td),
		noChangedMind        : __('No, I changed my mind', td)
	}

	const bulkOptions = [
		{ label: __('Delete', td), value: 'delete' }
	]

	return {
		bulkOptions,
		modalStrings,
		strings
	}
}