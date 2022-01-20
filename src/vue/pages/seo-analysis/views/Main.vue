<template>
	<core-main
		:page-name="strings.pageName"
		:show-save-button="false"
	>
		<component :is="$route.name" />
	</core-main>
</template>

<script>
import AnalyzeCompetitorSite from './AnalyzeCompetitorSite'
import SeoAuditChecklist from './SeoAuditChecklist'
import HeadlineAnalyzer from './HeadlineAnalyzer'
export default {
	components : {
		AnalyzeCompetitorSite,
		SeoAuditChecklist,
		HeadlineAnalyzer
	},
	data () {
		return {
			strings : {
				pageName : this.$t.__('SEO Analysis', this.$td)
			}
		}
	}
}
</script>