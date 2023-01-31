import { getParams, removeParam } from '@/vue/utils/params'
export const ScrollAndHighlight = {
	mounted () {
		if (getParams()['aioseo-scroll']) {
			setTimeout(() => {
				this.$scrollTo(`#${getParams()['aioseo-scroll']}`, { offset: -130, container: this.scrollContainer || 'body' })
				removeParam('aioseo-scroll')
			}, this.scrollTimeout || 500)
		}

		if (getParams()['aioseo-highlight']) {
			const timeout = getParams()['aioseo-scroll'] ? this.scrollAndHighlightTimeout || 1500 : this.highlightTimeout || 500
			setTimeout(() => {
				const elements = document.querySelectorAll(`#${getParams()['aioseo-highlight'].replace(/,/g, ', #').replace(/%2C/ig, ', #')}`)
				if (elements.length) {
					elements.forEach(element => {
						element.classList.add('aioseo-row-highlight')
						setTimeout(() => {
							element.classList.remove('aioseo-row-highlight')
						}, 1500)
					})
				}
				removeParam('aioseo-highlight')
			}, timeout)
		}
	}
}