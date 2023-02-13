import dateFormat from '@/vue/utils/dateFormat'
export default {
	data () {
		return {
			orderBy         : 'clicks',
			orderDir        : 'desc',
			resultsPerPage  : 10,
			selectedFilters : {},
			strings         : {
				position : this.$t.__('Position', this.$td)
			}
		}
	},
	methods : {
		getSeries (row) {
			if (2 > row.graph?.length) {
				return []
			}

			const uniquePositions = []
			row.graph.forEach((tick) => {
				if (!uniquePositions.includes(tick.position)) {
					uniquePositions.push(tick.position)
				}
			})

			if (1 === uniquePositions.length) {
				return []
			}

			return [ {
				name : this.strings.position,
				data : row.graph?.map((tick) => ({
					x : dateFormat(new Date(tick.date + ' 00:00:00'), this.$aioseo.data.dateFormat),
					y : tick.position
				}))
			} ]
		},
		openPostDetail (post) {
			this.$router.push({
				path  : '/post-detail',
				query : {
					postId        : post.postId,
					previousRoute : this.$route.name
				}
			})
		},
		processFilter (filter) {
			this.showUpsell = (!this.$isPro || this.isUnlicensed) && 'all' !== filter.slug
			this.processFilterTable(filter)
		},
		processAdditionaFilterOptionSelected ({ name, selectedValue }) {
			this.selectedFilters[name] = selectedValue
		}
	}
}