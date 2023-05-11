export const MetaTag = {
	methods : {
		maybeUpdateId (setting) {
			// First, let's see if the value is a valid HTML element.
			const meta = this.metaHtml(this.options.webmasterTools[setting])
			if (meta instanceof HTMLElement && 'META' === meta.nodeName) {
				if (meta.getAttribute('content').length) {
					this.options.webmasterTools[setting] = meta.getAttribute('content')
				}
			}
		},
		metaHtml (html) {
			const doc = document.createElement('div')
			doc.innerHTML = html
			return doc.firstChild
		}
	}
}