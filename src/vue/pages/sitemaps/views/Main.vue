<template>
	<core-main
		:page-name="strings.pageName"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import CoreMain from '@/vue/components/common/core/main/Index.vue'
import GeneralSitemap from './GeneralSitemap'
import HtmlSitemap from './HtmlSitemap'
import NewsSitemap from './NewsSitemap'
import RssSitemap from './RssSitemap'
import VideoSitemap from './VideoSitemap'
export default {
	components : {
		CoreMain,
		GeneralSitemap,
		HtmlSitemap,
		NewsSitemap,
		RssSitemap,
		VideoSitemap
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('Sitemaps', this.$td)
			}
		}
	}
}
</script>