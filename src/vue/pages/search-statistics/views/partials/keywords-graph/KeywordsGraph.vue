<template>
	<div class="aioseo-search-statistics-keywords-graph">
		<graph
			:series="series"
			:loading="loading.keywords"
			:legend-style="legendStyle"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Graph from '../Graph.vue'
export default {
	components : {
		Graph
	},
	props : {
		legendStyle : String
	},
	computed : {
		...mapState('search-statistics', [ 'data', 'loading' ]),
		series () {
			if (!this.data?.keywords?.distribution || !this.data?.keywords?.distributionIntervals) {
				return []
			}

			const data  = this.data.keywords.distribution
			const graph = this.data.keywords.distributionIntervals

			return [ {
				name   : this.$t.__('Top 3 Position', this.$td),
				data   : graph.map((tick) => ({ x: tick.date, y: tick.top3 })),
				legend : {
					total : data.top3 || '0'
				}
			}, {
				name   : this.$t.__('4-10 Position', this.$td),
				data   : graph.map((tick) => ({ x: tick.date, y: tick.top10 })),
				legend : {
					total : data.top10 || '0'
				}
			}, {
				name   : this.$t.__('11-50 Position', this.$td),
				data   : graph.map((tick) => ({ x: tick.date, y: tick.top50 })),
				legend : {
					total : data.top50 || '0'
				}
			}, {
				name   : this.$t.__('50-100 Position', this.$td),
				data   : graph.map((tick) => ({ x: tick.date, y: tick.top100 })),
				legend : {
					total : data.top100 || '0'
				}
			} ]
		}
	}
}
</script>