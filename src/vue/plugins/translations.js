import * as translate from '@wordpress/i18n'

if (window.aioseoTranslations) {
	translate.setLocaleData(window.aioseoTranslations.translations, import.meta.env.VITE_TEXTDOMAIN)

	if (window.aioseoTranslationsPro && window.aioseoTranslationsPro.translationsPro) {
		translate.setLocaleData(window.aioseoTranslationsPro.translationsPro, import.meta.env.VITE_TEXTDOMAIN_PRO)
	}
} else {
	console.warn('Translations couldn\'t be loaded.')
}
export default translate