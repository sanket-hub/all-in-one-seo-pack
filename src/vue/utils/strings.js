import { decodeHTMLEntities } from '@/vue/utils/helpers'
import { isString } from 'lodash-es'

export const sanitizeString = (string) => {
	if (!isString(string)) {
		return ''
	}
	return decodeHTMLEntities(string).replace(/(<([^>]+)>)/gi, '')
}