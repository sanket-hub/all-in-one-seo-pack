import * as translate from '@wordpress/i18n'

translate.setLocaleData(window.aioseoTranslations.translations, process.env.VUE_APP_TEXTDOMAIN)

if (window.aioseoTranslationsPro && window.aioseoTranslationsPro.translationsPro) {
	translate.setLocaleData(window.aioseoTranslationsPro.translationsPro, process.env.VUE_APP_TEXTDOMAIN_PRO)
}

export default translate