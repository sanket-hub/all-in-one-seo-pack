import * as translate from '@wordpress/i18n'

translate.setLocaleData(window.aioseo.translations, process.env.VUE_APP_TEXTDOMAIN)
translate.setLocaleData(window.aioseo.translationsPro, process.env.VUE_APP_TEXTDOMAIN_PRO)

export default translate