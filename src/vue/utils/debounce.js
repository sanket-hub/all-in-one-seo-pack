let timeout
export const debounce = (fn, time) => {
	return ((...args) => {
		const functionCall = () => fn(...args)

		clearTimeout(timeout)
		timeout = setTimeout(functionCall, time)
	}).call()
}