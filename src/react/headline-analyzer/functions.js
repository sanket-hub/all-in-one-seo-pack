import superagent from 'superagent'
import { debounce } from '../../vue/utils/debounce'

export { debounce }

export const http = (nonce) => superagent
	.agent()
	.set('X-WP-Nonce', nonce)
	.use(req => {
		req.on('response', response => {
			if (401 === response.status) {
				console.error(response)
			} else if (403 === response.status) {
				console.error(response)
			}
		})
	})