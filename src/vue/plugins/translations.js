import * as translate from '@wordpress/i18n'

if (window.aioseoTranslations) {
	translate.setLocaleData(window.aioseoTranslations.translations, process.env.VUE_APP_TEXTDOMAIN)

	if (window.aioseoTranslationsPro && window.aioseoTranslationsPro.translationsPro) {
		translate.setLocaleData(window.aioseoTranslationsPro.translationsPro, process.env.VUE_APP_TEXTDOMAIN_PRO)
	}
} else {
	console.warn('Translations couldn\'t be loaded.')
}
export default translate