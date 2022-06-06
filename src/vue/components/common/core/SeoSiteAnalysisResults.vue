<template>
	<div class="aioseo-seo-site-analysis-results">
		<template
			v-if="showGooglePreview && 'all-items' === section"
		>
			<core-google-search-preview
				:domain="searchPreviewDomain"
				:title="allResults.basic.title.value"
				:description="allResults.basic.description.value"
			/>
		</template>
		<template
			v-if="allResults.basic.keywords && 'all-items' === section"
		>
			<div class="group-header">{{ strings.keywords }}</div>

			<div class="group-keywords">
				<div class="keyword"
					v-for="(count, keyword) in allResults.basic.keywords"
					:key="keyword"
				>
					{{ keyword }}
				</div>
			</div>
		</template>

		<div
			class="group-header"
			v-if="shouldShowGroup('basic')"
		>{{ strings.basic }}</div>

		<template
			v-for="(result, index) in filterResults(allResults.basic)"
		>
			<core-seo-site-analysis-result
				:key="index"
				:test="index"
				:result="result"
				:show-instructions="showInstructions"
			/>
		</template>

		<div
			class="group-header"
			v-if="shouldShowGroup('advanced')"
		>{{ strings.advanced }}</div>

		<template
			v-for="(result, index) in filterResults(allResults.advanced)"
		>
			<core-seo-site-analysis-result
				:key="index"
				:test="index"
				:result="result"
				:show-instructions="showInstructions"
			/>
		</template>

		<div
			class="group-header"
			v-if="shouldShowGroup('performance')"
		>{{ strings.performance }}</div>

		<template
			v-for="(result, index) in filterResults(allResults.performance)"
		>
			<core-seo-site-analysis-result
				:key="index"
				:test="index"
				:result="result"
				:show-instructions="showInstructions"
			/>
		</template>

		<div
			class="group-header"
			v-if="shouldShowGroup('security')"
		>{{ strings.security }}</div>

		<template
			v-for="(result, index) in filterResults(allResults.security)"
		>
			<core-seo-site-analysis-result
				:key="index"
				:test="index"
				:result="result"
				:show-instructions="showInstructions"
			/>
		</template>
	</div>
</template>

<script>
import CoreGoogleSearchPreview from '@/vue/components/common/core/GoogleSearchPreview'
import CoreSeoSiteAnalysisResult from '@/vue/components/common/core/SeoSiteAnalysisResult'
export default {
	components : {
		CoreGoogleSearchPreview,
		CoreSeoSiteAnalysisResult
	},
	props : {
		section : {
			type     : String,
			required : true
		},
		allResults : {
			type     : Object,
			required : true
		},
		showGooglePreview : Boolean,
		showInstructions  : Boolean
	},
	data () {
		return {
			searchPreviewDomain : null,
			strings             : {
				basic       : this.$t.__('Basic SEO', this.$td),
				advanced    : this.$t.__('Advanced SEO', this.$td),
				performance : this.$t.__('Performance', this.$td),
				security    : this.$t.__('Security', this.$td),
				keywords    : this.$t.__('Keywords:', this.$td)
			}
		}
	},
	methods : {
		filterResults (resultSet) {
			const results = { ...resultSet }
			if (results.keywords) {
				delete results.keywords
			}
			if (results.searchPreview) {
				delete results.searchPreview
			}
			if (results.mobileSearchPreview) {
				delete results.mobileSearchPreview
			}
			if (results.mobileSnapshot) {
				delete results.mobileSnapshot
			}

			if ('all-items' === this.section) {
				return results
			}

			const sectionMap = {
				passed  : 'good-results',
				warning : 'recommended-improvements',
				error   : 'critical'
			}
			Object.keys(results).forEach(r => {
				const result = results[r]
				if (sectionMap[result.status] !== this.section) {
					delete results[r]
				}
			})

			return results
		},
		shouldShowGroup (group) {
			return Object.keys(this.filterResults(this.allResults[group])).length
		}
	},
	mounted () {
		if (this.allResults.advanced.searchPreview) {
			const div = document.createElement('div')
			div.innerHTML = this.allResults.advanced.searchPreview

			const domain = div.querySelector('.domain')
			if (domain) {
				this.searchPreviewDomain = domain.innerText
			}
		}
	}
}
</script>

<style lang="scss">
.aioseo-seo-site-analysis-results {
	.group-header {
		font-size: 16px;
		font-weight: 600;

		&:not(:first-child) {
			margin-top: 30px;
		}
	}

	.group-keywords {
		display: flex;
		margin-top: 5px;
		flex-wrap: wrap;
		align-items: center;

		.keyword {
			&:first-child {
				font-size: 20px;
			}

			font-size: 14px;
			color: $black2;
			font-weight: 600;
			background: $background;
			padding: 9px 10px;
			border-radius: 3px;
			margin: 0 10px 5px 0;
		}
	}
}
</style>