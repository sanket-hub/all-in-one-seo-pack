<template>
	<div class="content">
		<template v-for="archive in archives">
			<component
				:key="archive.slug"
				:is="archive.slug"
				:active="archive.slug"
			/>
		</template>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import DateArchives from './DateArchives.vue'
import PostTypeArchives from './PostTypeArchives.vue'
import SearchArchives from './SearchArchives.vue'
import NotFound from './NotFound.vue'
import AuthorArchives from './AuthorArchives.vue'
import BlogArchives from './BlogArchives.vue'

export default {
	components : {
		DateArchives,
		PostTypeArchives,
		SearchArchives,
		NotFound,
		AuthorArchives,
		BlogArchives
	},
	data () {
		return {
			archives :
				[
					{
						slug   : 'DateArchives',
						name   : this.$t.__('Date Archives', this.$td),
						access : 'aioseo_general_settings',
						pro    : true
					},
					{
						slug   : 'SearchArchives',
						name   : this.$t.__('Search Archives', this.$td),
						access : 'aioseo_general_settings',
						pro    : true
					},
					{
						slug   : 'NotFound',
						name   : this.$t.__('404', this.$td),
						access : 'aioseo_general_settings',
						pro    : true
					},
					{
						slug   : 'AuthorArchives',
						name   : this.$t.__('Author Archives', this.$td),
						access : 'aioseo_general_settings',
						pro    : true
					},
					{
						slug   : 'BlogArchives',
						name   : this.$t.__('Blog Archive', this.$td),
						access : 'aioseo_general_settings',
						pro    : true
					},
					{
						slug   : 'PostTypeArchives',
						name   : this.$t.__('Post Type Archives', this.$td),
						access : 'aioseo_general_settings',
						pro    : true
					}
				]
		}
	},
	computed : {
		...mapState([ 'options' ])
	}
}
</script>