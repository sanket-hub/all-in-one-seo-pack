<template>
	<posts-table
		:posts="data?.seoStatistics?.pages?.topPages || defaultPages"
		:columns="[ 'row', 'post_title', 'seo_score', 'clicks', 'impressions', 'position', 'diffPosition' ]"
		:show-header="false"
		:disableSorting="true"
	/>
</template>

<script>
import { mapState } from 'vuex'
import PostsTable from './PostsTable.vue'
export default {
	components : {
		PostsTable
	},
	data () {
		return {
			defaultPages : {
				rows : []
			}
		}
	},
	computed : {
		...mapState('search-statistics', [ 'data' ])
	}
}
</script>