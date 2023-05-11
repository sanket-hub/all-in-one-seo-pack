
export default {
	methods : {
		formatStatistic (name, number) {
			if ('ctr' === name) {
				return `${Math.abs(number)}%`
			}

			if ('position' === name) {
				return Math.abs(number).toFixed(0)
			}

			if ('decay' === name) {
				return this.$t.sprintf(
					// Translators: 1 - The number of points.
					this.$t.__('%1$s Points', this.$td),
					this.$numbers.numberFormat(number, 0)
				)
			}

			if ('decayPercent' === name) {
				return `${number}%`
			}

			number = Math.abs(number)
			return this.$numbers.compactNumber(number)
		}
	}
}