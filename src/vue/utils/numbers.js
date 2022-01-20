import animate from 'animate-vanilla-js'

const numberFormat = (number, decimals = 2) => {
	number = parseFloat(number).toFixed(decimals)

	return Number(number).toLocaleString('en')
}

const getDuration = (from, to) => {
	let duration     = 500
	const difference = to - from

	if (500 >= difference) {
		return duration
	}

	duration = difference / 10
	if (1000 > duration) {
		duration = 1000
	}

	if (3500 < duration) {
		duration = 3500
	}

	return duration
}

const animateNumbers = (from, to, callback, duration = null) => {
	return animate(
		from,
		to,
		duration || getDuration(0, to),
		'easeInOutQuad',
		value => callback instanceof Function ? callback(value.toFixed(0)) : (callback = value.toFixed(0))
	)
}

export default {
	numberFormat,
	getDuration,
	animateNumbers
}