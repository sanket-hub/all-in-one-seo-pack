<template>
	<posts-table
		:posts="data?.seoStatistics?.pages?.topLosing || defaultPages"
		:columns="[ 'row', 'post_title', 'seo_score', 'clicks', 'impressions', 'position', 'diffDecay' ]"
		:show-header="false"
		:disableSorting="true"
	/>
</template>

<script>
import { mapState } from 'vuex'
import PostsTable from './PostsTable'
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