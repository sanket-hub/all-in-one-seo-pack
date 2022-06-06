<template>
	<div class="page-analysis-panel">
		<core-main-tabs
			:tabs="tabs"
			:showSaveButton="false"
			:active="this.initTab"
			internal
			@changed="value => processChangeTab(value)"
		/>
		<transition mode="out-in">
			<metaboxAnalysisDetail
				v-if="currentPost.page_analysis"
				:analysisItems="currentPost.page_analysis.analysis[this.initTab]"
			/>
		</transition>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import CoreMainTabs from '@/vue/components/common/core/main/Tabs'
import metaboxAnalysisDetail from './metaboxAnalysisDetail'
export default {
	components : {
		CoreMainTabs,
		metaboxAnalysisDetail
	},
	data () {
		return {
			initTab : 'basic',
			tabs    : [
				{
					slug : 'basic',
					name : this.$t.__('Basic SEO', this.$td)
				},
				{
					slug : 'title',
					name : this.$t.__('Title', this.$td)
				},
				{
					slug : 'readability',
					name : this.$t.__('Readability', this.$td)
				}
			]
		}
	},
	computed : {
		...mapState([ 'currentPost' ])
	},
	methods : {
		processChangeTab (newTabValue) {
			this.initTab = newTabValue
		}
	},
	mounted () {
		this.tabs.map(tab => {
			tab.errorCount = this.currentPost.page_analysis.analysis[tab.slug].errors
			return tab
		})
	}
}
</script>

<style lang="scss">
.aioseo-app .aioseo-post-general .page-analysis-panel {
	.aioseo-tabs {
		background: #fff;

		.md-button-content {
			display: flex;
		}

		.md-button {
			font-weight: 700;
		}
	}
}
</style>