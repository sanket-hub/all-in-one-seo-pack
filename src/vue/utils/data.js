export const setData = (app, newData) => {
	const data = {
		...window.aioseo.data,
		...newData
	}

	// Set it on the window.
	window.aioseo.data = data

	// Set it on the app.
	app.$aioseo.data = app.config.globalProperties.$aioseo.data = data

	return data
}