<template>
	<div class="aioseo-search-statistics-keywords-distribution-graph">
		<graph
			:series="series"
			:loading="loading.keywords"
			preset="keywordsDistribution"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Graph from './Graph.vue'
export default {
	components : {
		Graph
	},
	computed : {
		...mapState('search-statistics', [ 'data', 'loading' ]),
		series () {
			if (!this.data?.keywords?.distribution) {
				return []
			}

			const data = this.data.keywords.distribution

			return [ {
				name : this.$t.__('Keywords', this.$td),
				data : [ {
					x         : this.$t.__('Top 3 Position', this.$td),
					y         : data.top3,
					fillColor : '#005AE0'
				},
				{
					x         : this.$t.__('4-10 Position', this.$td),
					y         : data.top10,
					fillColor : '#00AA63'
				},
				{
					x         : this.$t.__('11-50 Position', this.$td),
					y         : data.top50,
					fillColor : '#F18200'
				},
				{
					x         : this.$t.__('50-100 Position', this.$td),
					y         : data.top100,
					fillColor : '#DF2A4A'
				} ]
			} ]
		}
	}
}
</script>