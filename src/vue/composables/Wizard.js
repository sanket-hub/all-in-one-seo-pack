import { __, sprintf } from '@wordpress/i18n'

const td = import.meta.env.VITE_TEXTDOMAIN

export const useWizard = () => {
	const strings = {
		skipThisStep       : __('Skip this Step', td),
		goBack             : __('Go Back', td),
		saveAndContinue    : __('Save and Continue', td),
		closeAndExit       : __('Close and Exit Wizard Without Saving', td),
		buildABetterAioseo : sprintf(
			// Translators: 1 - Plugin short name ("AIOSEO").
			__('Build a Better %1$s', td),
			import.meta.env.VITE_SHORT_NAME
		),
		getImprovedFeatures : sprintf(
			// Translators: 1 - Plugin short name ("AIOSEO").
			__('Get improved features and faster fixes by sharing non-sensitive data via usage tracking that shows us how %1$s is being used. No personal data is tracked or stored.', td),
			import.meta.env.VITE_SHORT_NAME
		),
		noThanks     : __('No thanks', td),
		yesCountMeIn : __('Yes, count me in!', td)
	}

	return {
		strings
	}
}