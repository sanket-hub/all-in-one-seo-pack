import { decodeHTMLEntities } from '@/vue/utils/helpers'
import { isString } from 'lodash-es'

export const sanitizeString = (string) => {
	if (!isString(string)) {
		return ''
	}
	return stripTags(decodeHTMLEntities(string))
}

export const stripTags = (string) => {
	if (!isString(string)) {
		return ''
	}
	return string.replace(/(<([^>]+)>)/gi, '')
}