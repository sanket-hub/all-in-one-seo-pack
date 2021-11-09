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

const unForwardSlashIt = str => {
	return str.replace(/^\//, '')
}

const unTrailingSlashIt = str => {
	return str.replace(/\/$/, '')
}

const trailingSlashIt = str => {
	return unTrailingSlashIt(str) + '/'
}

export const restUrl = (path) => {
	path = window.aioseo.data.hasUrlTrailingSlash ? trailingSlashIt(path) : unTrailingSlashIt(path)
	return trailingSlashIt(window.aioseo.urls.restUrl) + trailingSlashIt('aioseo/v1') + unForwardSlashIt(path)
}