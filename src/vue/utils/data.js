import Vue from 'vue'
export const setData = newData => {
	const data = {
		...window.aioseo.data,
		...newData
	}

	window.aioseo.data         = data
	Vue.prototype.$aioseo.data = data

	return data
}