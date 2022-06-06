import Vue from 'vue'

const autoLoadComponents = (components, prefix = '') => {
	Object.keys(components).forEach(k => {
		const component = components[k]

		if ('Index' === k) {
			k = ''
		}

		Vue.component(`${prefix}${k}`, component)
	})
}

export {
	autoLoadComponents
}