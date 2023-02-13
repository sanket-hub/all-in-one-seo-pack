
export default {
	methods : {
		formatStatistic (name, number) {
			number = Math.abs(number)

			if ('ctr' === name) {
				return `${number}%`
			}

			if ('position' === name) {
				return number.toFixed(0)
			}

			return this.$numbers.compactNumber(number)
		}
	}
}