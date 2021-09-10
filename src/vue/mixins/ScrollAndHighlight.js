import { getParams, removeParam } from '@/vue/utils/params'
export const ScrollAndHighlight = {
	mounted () {
		if (getParams()['aioseo-scroll']) {
			setTimeout(() => {
				this.$scrollTo(`#${getParams()['aioseo-scroll']}`, { offset: -130 })
				removeParam('aioseo-scroll')
			}, 500)
		}

		if (getParams()['aioseo-highlight']) {
			const timeout = getParams()['aioseo-scroll'] ? 1500 : 500
			setTimeout(() => {
				const element = document.querySelector(`#${getParams()['aioseo-highlight']}`)
				if (element) {
					element.classList.add('aioseo-row-highlight')
					setTimeout(() => {
						element.classList.remove('aioseo-row-highlight')
					}, 1500)
				}
				removeParam('aioseo-highlight')
			}, timeout)
		}
	}
}