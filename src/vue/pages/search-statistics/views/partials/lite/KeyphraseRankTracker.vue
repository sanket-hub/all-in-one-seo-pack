<template>
	<div class="aioseo-search-statistics-keyword-tracker">
		<core-blur>
			<graph
				:series="series"
				:loading="loading.keywords"
				:chartOverrides="{
					legend: {
						show: false
					}
				}"
			/>

			<keywords-list
				:items="graphKeywords"
			/>

			<keywords-table
				:keywords="data.keywords.list"
				:loading="loading.keywords"
				:refreshOnLoad="false"
			>
				<template #buttons="{}">
					<a
						href="#"
						class="text-button"
					>
						<svg-circle-plus />
						{{ strings.addToGraph }}
					</a>

					<a
						href="#"
						class="delete-tracked"
					>
						<svg-trash />
					</a>
				</template>
			</keywords-table>
		</core-blur>

		<cta
			:feature-list="[
				strings.feature1,
				strings.feature2,
				strings.feature3,
				strings.feature4
			]"
			:cta-link="$links.getPricingUrl('search-statistics', 'search-statistics-upsell')"
			:button-text="strings.ctaButtonText"
			:learn-more-link="$links.getUpsellUrl('search-statistics', null, 'home')"
			align-top
		>
			<template #header-text>
				{{ strings.ctaHeader }}
			</template>
			<template #description>
				{{ strings.ctaDescription }}
			</template>
		</cta>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import CoreBlur from '@/vue/components/common/core/Blur'
import Cta from '@/vue/components/common/cta/Index.vue'
import Graph from '../Graph.vue'
import KeywordsTable from '../KeywordsTable.vue'
import KeywordsList from '../KeywordsList.vue'
import SvgCirclePlus from '@/vue/components/common/svg/circle/Plus'
import SvgTrash from '@/vue/components/common/svg/Trash'
export default {
	components : {
		CoreBlur,
		Cta,
		Graph,
		KeywordsTable,
		KeywordsList,
		SvgCirclePlus,
		SvgTrash
	},
	data () {
		return {
			strings : {
				addToGraph      : this.$t.__('Add to Graph', this.$tdPro),
				removeFromGraph : this.$t.__('Remove from Graph', this.$tdPro),
				feature1        : this.$t.__('Granular controls per role', this.$td),
				feature2        : this.$t.__('WP Roles (Editor, Author)', this.$td),
				feature3        : this.$t.__('SEO Manager Role', this.$td),
				feature4        : this.$t.__('SEO Editor Role', this.$td),
				ctaDescription  : this.$t.sprintf(
					// Translators: 1 - The plugin name ("All in One SEO")
					this.$t.__('By default, only users with an Administrator role have permission to manage %1$s within your WordPress admin area. With Access Controls, though, you can easily extend specific access permissions to other user roles.', this.$td),
					import.meta.env.VITE_NAME
				),
				ctaButtonText : this.$t.__('Upgrade to Pro and Unlock Search Statistics', this.$td),
				ctaHeader     : this.$t.sprintf(
					// Translators: 1 - Plugin short name ("AIOSEO"), 2 - "Pro".
					this.$t.__('Access Control is only available for licensed %1$s %2$s users.', this.$td),
					import.meta.env.VITE_SHORT_NAME,
					'Pro'
				)
			}
		}
	},
	computed : {
		...mapState('search-statistics', [ 'data', 'loading' ]),
		graphKeywords () {
			return Object.values(this.data.keywords.list.rows).slice(0, 3)
		},
		series () {
			return this.graphKeywords.map((row) => ({
				name : row.keyword,
				data : row.graph.map((tick) => ({ x: tick.date, y: tick.position }))
			}))
		}
	}
}
</script>

<style lang="scss">
.aioseo-search-statistics-keyword-tracker {
	.delete-tracked {
		line-height: 1;

		svg {
			width: 20px;
			color: $placeholder-color;
		}
	}
}
</style>